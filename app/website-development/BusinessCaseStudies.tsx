"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { caseStudies, caseStudyPath, type CaseStudy } from "./caseStudies";

/** Each slide fills 5/7 of the track so exactly 2/5 of the next slide peeks in. */
const SLIDE_WIDTH_CLASS = "w-[71.4286%]";

function SlideCard({ study }: { study: CaseStudy }) {
	/** Each card carries its own identity, so colours come from the study, not the slider. */
	const cardVars = {
		"--card-dark": study.palette.dark,
		"--card-card": study.palette.systemCard,
		"--card-accent": study.palette.accent,
		"--card-glow": study.palette.glow,
		"--card-summary": study.palette.onDarkMuted,
	} as React.CSSProperties;

	return (
		<li data-slide style={cardVars} className={`${SLIDE_WIDTH_CLASS} shrink-0 snap-start pr-4`}>
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
	const trackRef = useRef<HTMLUListElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const syncArrows = useCallback(() => {
		const track = trackRef.current;
		if (!track) return;
		const maxScroll = track.scrollWidth - track.clientWidth;
		setCanScrollLeft(track.scrollLeft > 8);
		setCanScrollRight(track.scrollLeft < maxScroll - 8);
	}, []);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;

		syncArrows();
		track.addEventListener("scroll", syncArrows, { passive: true });
		window.addEventListener("resize", syncArrows);

		return () => {
			track.removeEventListener("scroll", syncArrows);
			window.removeEventListener("resize", syncArrows);
		};
	}, [syncArrows]);

	const scrollBehavior = (): ScrollBehavior =>
		window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

	const scrollBySlide = (direction: 1 | -1) => {
		const track = trackRef.current;
		if (!track) return;
		const slide = track.querySelector<HTMLElement>("[data-slide]");
		const distance = slide ? slide.offsetWidth : track.clientWidth * 0.714286;
		track.scrollBy({ left: direction * distance, behavior: scrollBehavior() });
	};

	/** At the end of the track the right arrow rewinds to the first slide. */
	const handleNext = () => {
		const track = trackRef.current;
		if (!track) return;

		if (!canScrollRight) {
			track.scrollTo({ left: 0, behavior: scrollBehavior() });
			return;
		}

		scrollBySlide(1);
	};

	return (
		<div className="relative">
			<ul
				ref={trackRef}
				className="custom-scrollbar flex snap-x snap-mandatory list-none overflow-x-auto pb-4"
				role="region"
				aria-label="Business case studies"
				tabIndex={0}
			>
				{caseStudies.map((study) => (
					<SlideCard key={study.slug} study={study} />
				))}
			</ul>

			<button
				type="button"
				onClick={() => scrollBySlide(-1)}
				aria-label="Show previous case study"
				disabled={!canScrollLeft}
				className={`absolute left-2 top-[200px] z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur transition-all duration-300 hover:border-red hover:bg-red hover:text-white md:top-1/2 ${
					canScrollLeft ? "opacity-100" : "pointer-events-none opacity-0"
				}`}
			>
				<ChevronLeft aria-hidden="true" className="h-8 w-8" />
			</button>

			<button
				type="button"
				onClick={handleNext}
				aria-label={canScrollRight ? "Show next case study" : "Back to the first case study"}
				className="absolute right-2 top-[200px] z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur transition-all duration-300 hover:border-red hover:bg-red hover:text-white md:top-1/2"
			>
				{canScrollRight ? (
					<ChevronRight aria-hidden="true" className="h-8 w-8" />
				) : (
					<RotateCcw aria-hidden="true" className="h-7 w-7" />
				)}
			</button>
		</div>
	);
}
