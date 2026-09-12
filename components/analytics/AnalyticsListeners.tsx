"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackContactClick, trackFileDownload, trackOutboundClick, trackPageView, trackScroll } from "@/lib/gtag";

/** Scroll milestones, in percent of the scrollable page height. */
const SCROLL_THRESHOLDS = [25, 50, 75, 90];

/** Extensions GA4 counts as a file download. */
const DOWNLOAD_EXTENSIONS =
	/\.(pdf|xlsx?|docx?|pptx?|txt|rtf|csv|exe|key|pps|7z|pkg|rar|gz|zip|dmg|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma)$/i;

function linkText(anchor: HTMLAnchorElement): string | undefined {
	const text = (anchor.textContent || "").replace(/\s+/g, " ").trim();
	if (text) return text.slice(0, 100);

	// Icon-only links (social icons, logo) carry their meaning in the label.
	const label = anchor.getAttribute("aria-label") || anchor.getAttribute("title");
	return label ? label.slice(0, 100) : undefined;
}

/**
 * Sends a page_view on first load and on every client-side navigation.
 * Search params are included so filtered views are distinguishable.
 */
function PageViews() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const query = searchParams.toString();
		const url = query ? `${pathname}?${query}` : pathname;

		// Let the new route commit its <title> before reading it.
		const timer = window.setTimeout(() => trackPageView(url), 0);
		return () => window.clearTimeout(timer);
	}, [pathname, searchParams]);

	return null;
}

/**
 * Fires a scroll event the first time each milestone is crossed. Milestones
 * reset on navigation, which the GA4 Enhanced Measurement equivalent does not
 * do reliably in a single-page app.
 */
function ScrollDepth() {
	const pathname = usePathname();

	useEffect(() => {
		const fired: Record<number, boolean> = {};
		let frame = 0;

		const measure = () => {
			frame = 0;

			const scrollable = document.documentElement.scrollHeight - window.innerHeight;
			if (scrollable <= 0) return; // Nothing to scroll — GA4 reports no depth.

			const percent = (window.scrollY / scrollable) * 100;

			for (let i = 0; i < SCROLL_THRESHOLDS.length; i++) {
				const threshold = SCROLL_THRESHOLDS[i];
				if (!fired[threshold] && percent >= threshold) {
					fired[threshold] = true;
					trackScroll(threshold);
				}
			}
		};

		const onScroll = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(measure);
		};

		// A deep-linked hash can land the visitor mid-page on arrival.
		measure();

		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });

		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [pathname]);

	return null;
}

/**
 * One delegated click listener covers outbound links, file downloads and
 * mailto/tel taps across the whole site, including links rendered later.
 */
function LinkClicks() {
	useEffect(() => {
		const onClick = (event: MouseEvent) => {
			const target = event.target;
			if (!(target instanceof Element)) return;

			// Icons on this site are SVG inside an HTML anchor, so closest() lands
			// on the anchor. An SVG <a> would expose href/className as
			// SVGAnimatedString objects rather than strings, so skip those.
			const anchor = target.closest("a");
			if (!(anchor instanceof HTMLAnchorElement)) return;

			const raw = anchor.getAttribute("href");
			if (!raw || raw.startsWith("#")) return;

			if (raw.startsWith("mailto:")) {
				trackContactClick("email", raw.replace(/^mailto:/, ""), linkText(anchor));
				return;
			}

			if (raw.startsWith("tel:")) {
				trackContactClick("phone", raw.replace(/^tel:/, ""), linkText(anchor));
				return;
			}

			let url: URL;
			try {
				url = new URL(anchor.href, window.location.href);
			} catch {
				return;
			}

			if (url.protocol !== "http:" && url.protocol !== "https:") return;

			const text = linkText(anchor);
			const extension = url.pathname.match(DOWNLOAD_EXTENSIONS);
			const isDownload = Boolean(extension) || anchor.hasAttribute("download");

			if (isDownload) {
				const name = decodeURIComponent(url.pathname.split("/").pop() || url.pathname);
				trackFileDownload({
					url: url.href,
					name,
					extension: extension ? extension[1].toLowerCase() : (name.split(".").pop() || "").toLowerCase(),
					text,
				});
			}

			// GA4 counts an external file link as both a download and an
			// outbound click, so this is intentionally not an else-branch.
			if (url.hostname !== window.location.hostname) {
				trackOutboundClick({
					url: url.href,
					domain: url.hostname,
					id: anchor.id,
					classes: anchor.className || undefined,
					text,
				});
			}
		};

		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, []);

	return null;
}

export default function AnalyticsListeners() {
	return (
		<>
			{/* useSearchParams needs a boundary so it does not opt whole pages out of static rendering. */}
			<Suspense fallback={null}>
				<PageViews />
			</Suspense>
			<ScrollDepth />
			<LinkClicks />
		</>
	);
}
