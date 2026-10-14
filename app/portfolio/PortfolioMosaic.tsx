"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, caseStudyPath, type CaseStudy } from "@/app/website-development/caseStudies";
import { useFadeInFromBottomOnScroll } from "@/components/animations";

/**
 * How a tile is drawn. The lead tile spans both columns and runs much larger than the rest; the
 * others are a column wide and take their height from a cycled set of ratios, which is the only
 * thing creating the masonry stagger.
 *
 * Phones get a portrait crop at every size: one column is narrow enough that a landscape tile
 * leaves no room under the screenshot for the name to sit on.
 */
type TileStyle = {
	/** Shape of the frame. */
	ratio: string;
	/** Width the frame occupies, for the responsive image set. */
	sizes: string;
	/** Inset of the copy laid over the screenshot. */
	pad: string;
	/** Size of the project name. */
	heading: string;
	/** Lines of summary before it truncates. */
	clamp: string;
};

/**
 * The showpiece. `column-span: all` takes it across both columns, so it reads as the lead rather
 * than as the tallest of three equals.
 */
const LEAD_TILE: TileStyle = {
	ratio: "aspect-[3/4] sm:aspect-[16/10] lg:aspect-[2/1]",
	sizes: "100vw",
	pad: "p-7 md:p-10 lg:p-14",
	heading: "text-[clamp(34px,6.2vw,86px)]",
	clamp: "line-clamp-2 max-w-[40em] md:text-[17px]",
};

/** The tiles in the masonry below it. Two ratios, so no two neighbours are the same height. */
const COLUMN_TILES: TileStyle[] = [
	{
		ratio: "aspect-[3/4] md:aspect-[4/3]",
		sizes: "(min-width: 768px) 50vw, 100vw",
		pad: "p-6 md:p-8 lg:p-10",
		heading: "text-[clamp(28px,4.2vw,52px)]",
		clamp: "line-clamp-3 max-w-[32em] md:text-[16px]",
	},
	{
		ratio: "aspect-[3/4] md:aspect-[16/11]",
		sizes: "(min-width: 768px) 50vw, 100vw",
		pad: "p-6 md:p-8 lg:p-10",
		heading: "text-[clamp(28px,4.2vw,52px)]",
		clamp: "line-clamp-3 max-w-[32em] md:text-[16px]",
	},
];

/**
 * One study: its showcase screenshot, with the name and summary laid over it. The whole tile is a
 * single link, so the image and the copy on it behave as one thing.
 */
function ProjectTile({ study, index, lead }: { study: CaseStudy; index: number; lead: boolean }) {
	const tileRef = useRef<HTMLLIElement>(null);
	const tileStyles = useFadeInFromBottomOnScroll(tileRef, { distance: 40, start: "top 88%" });

	// Nothing to show in a gallery of screenshots if the study has no showcase frame
	if (!study.showcase) return null;

	const tile = lead ? LEAD_TILE : COLUMN_TILES[index % COLUMN_TILES.length];

	// The study's identity, so each tile hovers to its own colour rather than to one house accent
	const tileVars = {
		"--study-accent": study.palette.accent,
		"--study-glow": study.palette.glow,
		...tileStyles.style,
	} as React.CSSProperties;

	return (
		<li
			ref={tileRef}
			style={tileVars}
			className={`mb-[clamp(20px,2.4vw,32px)] break-inside-avoid list-none ${lead ? "md:[column-span:all]" : ""}`}
		>
			<Link
				href={caseStudyPath(study)}
				aria-label={`Read the ${study.titleLines.join(" ")} case study`}
				className={`group relative block overflow-hidden rounded-[16px] border border-white/10 bg-[#0b0b0d] no-underline transition-colors duration-500 hover:border-[var(--study-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--study-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none ${tile.ratio}`}
			>
				{/*
					object-top keeps the top of each screenshot, which is the part carrying the site's own
					identity; the crop takes from the bottom, where the copy sits anyway.
				*/}
				<Image
					src={study.showcase.src}
					alt={study.showcase.alt}
					fill
					priority={lead}
					fetchPriority={lead ? "high" : "auto"}
					sizes={tile.sizes}
					className="object-cover object-top opacity-[0.85] transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
				/>
				{/*
					Decorative. The wash is what makes white copy legible over a screenshot whose brightness
					the gallery cannot know, so it stays on at rest rather than arriving on hover. The second
					layer is the study's own colour bleeding up from the corner as the tile is pointed at.
				*/}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_12%_100%,var(--study-glow),transparent_62%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:transition-none"
				/>
				<span
					aria-hidden="true"
					className="absolute right-5 top-5 text-[12px] tracking-[0.3em] text-white/45 aktiv-grotesk-semibold md:right-7 md:top-7"
				>
					{String(index + 1).padStart(2, "0")}
				</span>
				<div className={`absolute inset-x-0 bottom-0 ${tile.pad}`}>
					<span className="inline-flex items-center gap-[9px] text-[11px] uppercase tracking-[0.22em] text-[var(--study-accent)] aktiv-grotesk-semibold md:text-[12px]">
						<span aria-hidden="true" className="h-px w-[26px] bg-[var(--study-accent)] opacity-70" />
						{study.eyebrow}
					</span>
					<h2
						className={`mt-3 leading-[0.98] tracking-[-0.025em] text-white proxima-nova-semibold ${tile.heading}`}
					>
						{study.titleLines.map((line) => (
							<span key={line} className="block">
								{line}
							</span>
						))}
					</h2>
					<p className={`mb-0 mt-4 text-[15px] leading-[1.5] text-[#cfcfcf] aktiv-grotesk-regular ${tile.clamp}`}>
						{study.cardSummary ?? study.summary}
					</p>
					<span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-white/80 transition-colors duration-500 group-hover:text-white aktiv-grotesk-semibold md:text-[12px]">
						Read the case study
						<ArrowUpRight
							aria-hidden="true"
							className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
						/>
					</span>
				</div>
			</Link>
		</li>
	);
}

/**
 * The wall. Real masonry, via CSS columns rather than a grid: the tiles keep their exact aspect
 * ratios and pack by height, and the document order stays the reading order, so the single column
 * on phones runs in the order the studies are listed.
 *
 * The first study listed takes the lead tile, so changing which build leads the page is a matter
 * of reordering `caseStudies` rather than of touching the gallery.
 */
export default function PortfolioMosaic() {
	return (
		<ul className="m-0 columns-1 gap-x-[clamp(20px,2.4vw,32px)] p-0 md:columns-2" aria-label="Selected work">
			{caseStudies.map((study, index) => (
				<ProjectTile key={study.slug} study={study} index={index} lead={index === 0} />
			))}
		</ul>
	);
}
