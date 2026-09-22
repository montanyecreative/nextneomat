"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies, caseStudyPath, type CaseStudy } from "./caseStudies";
import { useIsMobile } from "./projects";
import { useFadeInFromBottomOnScroll } from "@/components/animations";

gsap.registerPlugin(ScrollTrigger);

/** Each slide fills 5/7 of the track so exactly 2/5 of the next slide peeks in. */
const SLIDE_WIDTH_CLASS = "w-[71.4286%]";

function SlideCard({ study, className }: { study: CaseStudy; className: string }) {
	/** Each card carries its own identity, so colours come from the study, not the slider. */
	const cardVars = {
		"--card-dark": study.palette.dark,
		"--card-card": study.palette.systemCard,
		"--card-accent": study.palette.accent,
		"--card-glow": study.palette.glow,
		"--card-summary": study.palette.onDarkMuted,
	} as React.CSSProperties;

	return (
		<li style={cardVars} className={className}>
			<Link
				href={caseStudyPath(study)}
				aria-label={`Read the ${study.titleLines.join(" ")} case study`}
				className="group block h-full rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--card-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
			>
				<article
					className="relative flex h-full min-h-[400px] flex-col justify-center overflow-hidden rounded-[14px] border border-white/10 bg-gradient-to-br from-[var(--card-dark)] to-[var(--card-card)] p-8 text-left transition-colors duration-300 group-hover:border-[var(--card-accent)] md:p-12"
				>
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,var(--card-glow),transparent)]"
					/>
					<div className="relative">
						<span className="inline-flex items-center gap-[9px] text-[12px] uppercase tracking-[0.22em] text-[var(--card-accent)] aktiv-grotesk-semibold">
							<span aria-hidden="true" className="h-px w-[26px] bg-[var(--card-accent)] opacity-60" />
							{study.eyebrow}
						</span>
						<h3 className="mt-5 text-[38px] leading-[1.02] tracking-[-0.02em] text-white md:text-[56px] proxima-nova-semibold">
							{study.titleLines.map((line) => (
								<span key={line} className="block">
									{line}
								</span>
							))}
						</h3>
						<p className="mt-5 max-w-[640px] text-[17px] leading-[1.5] text-[var(--card-summary)] md:text-[20px] aktiv-grotesk-regular">
							{study.cardSummary ?? study.summary}
						</p>
						<span className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-white aktiv-grotesk-semibold">
							Read the case study
							<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					</div>
				</article>
			</Link>
		</li>
	);
}

export default function BusinessCaseStudies() {
	const galleryWrapperRef = useRef<HTMLDivElement>(null);
	const galleryStripRef = useRef<HTMLUListElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const isMobile = useIsMobile();
	const headingStyles = useFadeInFromBottomOnScroll(headingRef);

	/**
	 * Same pinned horizontal scroll as the Projects gallery: vertical scroll drives the strip sideways.
	 * The heading is pinned with the cards, so the effect starts as soon as it reaches the top.
	 */
	useLayoutEffect(() => {
		if (isMobile) return;

		if (!galleryWrapperRef.current || !galleryStripRef.current) return;

		const pinWrap = galleryStripRef.current;
		const wrapper = galleryWrapperRef.current;
		let pinWrapWidth: number;
		let horizontalScrollLength: number;
		let scrollTrigger: gsap.core.Tween | null = null;
		let refreshHandler: () => void;

		function refresh() {
			pinWrapWidth = pinWrap.scrollWidth;
			// The section sits inside a padded container, so scroll against the wrapper rather than the viewport
			horizontalScrollLength = pinWrapWidth - wrapper.clientWidth;
		}

		const initTimeout = setTimeout(() => {
			refresh();

			refreshHandler = () => {
				refresh();
			};

			scrollTrigger = gsap.to(pinWrap, {
				scrollTrigger: {
					scrub: true,
					trigger: wrapper,
					pin: wrapper,
					start: "top top",
					end: () => `+=${pinWrapWidth}`,
					invalidateOnRefresh: true,
					// This pin sits above the Projects pin, so it must be measured first
					refreshPriority: 1,
				},
				x: () => -horizontalScrollLength,
				ease: "none",
			});

			ScrollTrigger.addEventListener("refreshInit", refreshHandler);
			ScrollTrigger.refresh();
		}, 150);

		const handleResize = () => {
			refresh();
			ScrollTrigger.refresh();
		};
		window.addEventListener("resize", handleResize);

		let resizeObserverTimeout: ReturnType<typeof setTimeout>;
		const layoutObserver = new ResizeObserver(() => {
			clearTimeout(resizeObserverTimeout);
			resizeObserverTimeout = setTimeout(() => {
				refresh();
				ScrollTrigger.refresh();
			}, 200);
		});
		layoutObserver.observe(document.documentElement);

		return () => {
			clearTimeout(initTimeout);
			clearTimeout(resizeObserverTimeout);
			window.removeEventListener("resize", handleResize);
			layoutObserver.disconnect();
			if (scrollTrigger) {
				scrollTrigger.scrollTrigger?.kill();
				scrollTrigger.kill();
			}
			if (refreshHandler) {
				ScrollTrigger.removeEventListener("refreshInit", refreshHandler);
			}
		};
	}, [isMobile]);

	const heading = (
		<h2 ref={headingRef} style={headingStyles.style} className="my-10 text-center text-white">
			Business case studies
		</h2>
	);

	// Mobile layout: case studies stacked vertically
	if (isMobile) {
		return (
			<section>
				{heading}
				<ul className="flex list-none flex-col gap-6" aria-label="Business case studies">
					{caseStudies.map((study) => (
						<SlideCard key={study.slug} study={study} className="w-full" />
					))}
				</ul>
			</section>
		);
	}

	// Desktop layout: pinned horizontal scrolling gallery
	return (
		<div ref={galleryWrapperRef} className="w-full overflow-hidden">
			{heading}
			<ul
				ref={galleryStripRef}
				className="flex list-none flex-nowrap will-change-transform"
				aria-label="Business case studies"
			>
				{caseStudies.map((study) => (
					<SlideCard key={study.slug} study={study} className={`${SLIDE_WIDTH_CLASS} shrink-0 pr-4`} />
				))}
			</ul>
		</div>
	);
}
