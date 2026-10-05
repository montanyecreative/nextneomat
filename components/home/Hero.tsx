"use client";

import { useRef } from "react";
import Link from "next/link";
import { useFadeInFromBottom } from "@/components/animations";
import { CONTAINER, PILL_PRIMARY, PILL_SECONDARY } from "./tokens";

/** Lifts the copy off the photograph, the way the banner heading has always been treated. */
const TEXT_SHADOW = "[text-shadow:0_2px_10px_rgba(0,0,0,0.5)]";

/**
 * The original site banner, now holding the whole hero: heading, supporting copy and both
 * calls to action, left aligned on the same gutter as the sections below. The heading keeps
 * its Proxima Nova treatment rather than the Aktiv Grotesk used everywhere else.
 */
export default function Hero() {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const headingStyles = useFadeInFromBottom(headingRef);

	return (
		<div className="banner-home">
			<div className={`${CONTAINER} h-full flex flex-col items-center justify-center text-center`}>
				<h1
					ref={headingRef}
					style={headingStyles.style}
					className={`m-0 text-[42px] md:text-[48px] text-white proxima-nova-semibold ${TEXT_SHADOW}`}
				>
					Technology simplified,
					<br />
					<span className="proxima-nova-regular">yet uncompromised.</span>
				</h1>
				<p
					className={`mt-6 mb-0 max-w-[34em] aktiv-grotesk-regular text-[#c4c4c4] text-[clamp(19px,1.6vw,22px)] leading-[1.55] ${TEXT_SHADOW}`}
				>
					Complete websites and online stores, built to enterprise standards by an engineer whose background includes New Balance
					and Citizen.
				</p>
				{/* Equal columns sized to the wider label, so both pills match */}
				<div className="mt-8 grid w-max max-w-full grid-cols-1 gap-4 sm:grid-cols-2">
					<Link href="/start-a-project" className={PILL_PRIMARY}>
						Start a project
					</Link>
					<Link href="#work" className={PILL_SECONDARY}>
						See the work
					</Link>
				</div>
			</div>
		</div>
	);
}
