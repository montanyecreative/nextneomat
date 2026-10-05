"use client";

import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ResumeView } from "./experienceBullets";

/** Each role's bullet list fades out, swaps, and fades back in. */
export const FADE_MS = 150;

/** The corner card's expand and collapse. */
export const EXPAND_MS = 200;

const ANNOUNCEMENTS: Record<ResumeView, string> = {
	recruiter: "Showing the recruiter view with technical details",
	business: "Showing the business view.",
};

type ResumeViewState = {
	view: ResumeView;
	/** True while the bullet lists are faded out, which is the midpoint of a swap. */
	swapping: boolean;
	toggle: () => void;
};

const ResumeViewContext = createContext<ResumeViewState | null>(null);

export function useResumeView() {
	const state = useContext(ResumeViewContext);

	if (!state) {
		throw new Error("useResumeView has to be called inside a ResumeViewProvider");
	}

	return state;
}

function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The experience entry nearest the top of the viewport, and how far from the top it sits. */
type ScrollAnchor = { role: string; top: number };

function measureAnchor(): ScrollAnchor | null {
	const entries = document.querySelectorAll<HTMLElement>("[data-resume-entry]");
	let anchor: ScrollAnchor | null = null;

	for (let i = 0; i < entries.length; i += 1) {
		const role = entries[i].dataset.resumeEntry;
		if (!role) continue;

		const top = entries[i].getBoundingClientRect().top;
		if (!anchor || Math.abs(top) < Math.abs(anchor.top)) {
			anchor = { role, top };
		}
	}

	/*
		Nothing to hold on to if the nearest entry is still more than a screen away: the reader is up
		in the summary, which swaps as well, and pinning an entry down there would pull the words they
		are reading out from under them. Someone inside a tall entry measures as a negative offset, so
		they are not caught by this.
	*/
	if (anchor && anchor.top > window.innerHeight) return null;

	return anchor;
}

/**
 * Holds which view the page is in, and runs the three things a change has to do: swap the bullets,
 * keep the reader's place, and say what happened.
 *
 * The technical bullets are longer than the business ones, so a swap changes the height of
 * everything above the reader. Safari has no scroll anchoring, so the entry nearest the top of the
 * viewport is measured before the swap and put back at the same offset after it.
 */
export function ResumeViewProvider({
	initialView,
	children,
}: {
	initialView: ResumeView;
	children: React.ReactNode;
}) {
	const [view, setView] = useState<ResumeView>(initialView);
	const [swapping, setSwapping] = useState(false);
	const [announcement, setAnnouncement] = useState("");
	const anchorRef = useRef<ScrollAnchor | null>(null);
	const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
		};
	}, []);

	const commit = useCallback((next: ResumeView) => {
		anchorRef.current = measureAnchor();
		setView(next);
		setAnnouncement(ANNOUNCEMENTS[next]);

		// The view is shareable as /resume?view=recruiter. replaceState keeps it out of the history
		// stack, so the back button still leaves the page rather than undoing a toggle.
		const url = new URL(window.location.href);
		if (next === "recruiter") {
			url.searchParams.set("view", "recruiter");
		} else {
			url.searchParams.delete("view");
		}
		window.history.replaceState(window.history.state, "", url);
	}, []);

	const toggle = useCallback(() => {
		const next: ResumeView = view === "recruiter" ? "business" : "recruiter";

		// A second press during a fade replaces the first one rather than queueing behind it.
		if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);

		if (prefersReducedMotion()) {
			commit(next);
			setSwapping(false);
			return;
		}

		setSwapping(true);
		fadeTimerRef.current = setTimeout(() => {
			commit(next);
			setSwapping(false);
		}, FADE_MS);
	}, [commit, view]);

	// Runs after the new bullets are in the DOM and before the browser paints them.
	useLayoutEffect(() => {
		const anchor = anchorRef.current;
		anchorRef.current = null;
		if (!anchor) return;

		const entry = document.querySelector<HTMLElement>(`[data-resume-entry="${anchor.role}"]`);
		if (!entry) return;

		const drift = entry.getBoundingClientRect().top - anchor.top;
		if (drift) window.scrollTo({ top: window.scrollY + drift, behavior: "auto" });
	}, [view]);

	return (
		<ResumeViewContext.Provider value={{ view, swapping, toggle }}>
			{children}
			{/*
				Announced on a change rather than read on load, so the region starts empty. It stays
				mounted for the life of the page, since a region added at the same time as its text is
				not reliably announced.
			*/}
			<p aria-live="polite" className="sr-only">
				{announcement}
			</p>
		</ResumeViewContext.Provider>
	);
}
