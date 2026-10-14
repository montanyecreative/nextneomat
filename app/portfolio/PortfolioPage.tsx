"use client";

// The shared nav and footer rely on their importing component being a client component, which is
// why the route is a thin server shell around this.
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PortfolioMosaic from "./PortfolioMosaic";
import { caseStudies } from "@/app/website-development/caseStudies";
import { BODY_TEXT, CONTAINER, FOCUS_RING, PILL_PRIMARY, PILL_SECONDARY, SECTION_HEADING } from "@/components/site/tokens";

/**
 * Back to the resume. It sits at the end of the hero's facts line and nowhere else: not on a row of
 * its own above the headline, which made a way back the page's opening move, and not in the closing
 * band, where it pulled against the two calls to action that band exists for.
 *
 * Shorter and thinner than PILL_SECONDARY on purpose: it is a way back rather than a call to
 * action, and it should not carry the same weight as Start a project. The border is held at 45%
 * white, which still clears the 3:1 rule for a control's edge while reading as secondary.
 */
const BACK_PILL = `inline-flex items-center gap-2 min-h-[44px] px-6 box-border rounded-full border border-white/45 bg-transparent text-white text-[12px] uppercase tracking-[1.5px] aktiv-grotesk-semibold no-underline transition-colors duration-300 hover:border-mcRed hover:bg-mcRed ${FOCUS_RING}`;

function BackToResume() {
	return (
		<Link href="/resume" className={BACK_PILL}>
			<ArrowLeft aria-hidden="true" className="h-4 w-4" />
			Back to resume
		</Link>
	);
}

/** The facts under the heading. Short enough to read as one line of type rather than a list. */
function MetaRow() {
	const items = [`${String(caseStudies.length).padStart(2, "0")} case studies`, "design and build", "solo, start to finish"];

	return (
		<ul className="m-0 flex list-none flex-wrap items-center gap-x-4 gap-y-2 p-0 text-[12px] uppercase tracking-[0.2em] text-[#8f8f8f] aktiv-grotesk-semibold">
			{items.map((item, index) => (
				<li key={item} className="flex items-center gap-4">
					{index > 0 && <span aria-hidden="true" className="h-px w-5 bg-[#3a3a3a]" />}
					{item}
				</li>
			))}
		</ul>
	);
}

export default function PortfolioPage() {
	return (
		<main className="overflow-x-hidden">
			<Navbar />
			<div className="w-full bg-[#000000] text-white aktiv-grotesk-regular text-[18px] leading-[1.6]">
				{/*
					No banner photograph here. The screenshots are the imagery on this page, so the opening is
					type on black and the first case study block carries the colour.
				*/}
				<section className={`${CONTAINER} pb-[clamp(32px,4vw,56px)] pt-[clamp(96px,11vw,176px)]`}>
					<span className="inline-flex items-center gap-[9px] text-[12px] uppercase tracking-[0.22em] text-mcRed aktiv-grotesk-semibold">
						<span aria-hidden="true" className="h-px w-[26px] bg-mcRed opacity-70" />
						Montanye Creative
					</span>
					<h1 className="mb-0 mt-6 text-[clamp(44px,9vw,120px)] leading-[0.92] tracking-[-0.035em] text-white proxima-nova-semibold">
						<span className="block">Portfolio</span>
					</h1>
					<p className={`mb-0 mt-8 max-w-[34em] text-[clamp(18px,1.6vw,22px)] leading-[1.55] ${BODY_TEXT}`}>
						Stores, platforms and products built end to end &mdash; designed, engineered and operated by the person accountable
						for the result. Every screen below is the real thing in production.
					</p>
					<div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
						<MetaRow />
						<BackToResume />
					</div>
				</section>
				<section className={`${CONTAINER} pb-[clamp(72px,9vw,144px)]`}>
					<PortfolioMosaic />
				</section>
				<section className={`${CONTAINER} border-t border-[#262626] py-[clamp(56px,7vw,112px)]`}>
					<h2 className={`${SECTION_HEADING} max-w-[20em]`}>Want this kind of build for your own business?</h2>
					<p className={`mb-0 mt-6 max-w-[36em] text-[clamp(17px,1.4vw,20px)] leading-[1.55] ${BODY_TEXT}`}>
						Each of these started as a conversation about what the business actually needed. Yours can too.
					</p>
					<div className="mt-10 grid w-max max-w-full grid-cols-1 gap-4 sm:grid-cols-2">
						<Link href="/start-a-project" className={PILL_PRIMARY}>
							Start a project
						</Link>
						<Link href="/website-development" className={PILL_SECONDARY}>
							How I build
						</Link>
					</div>
				</section>
			</div>
			<Footer />
		</main>
	);
}
