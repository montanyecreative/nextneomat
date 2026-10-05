import Image from "next/image";
import Link from "next/link";
import { BODY_TEXT, CONTAINER, PILL_PRIMARY, PILL_SECONDARY, SECTION_HEADING } from "@/components/site/tokens";

/** Lifts the copy off the photograph, the way the homepage banner heading is treated. */
const TEXT_SHADOW = "[text-shadow:0_2px_10px_rgba(0,0,0,0.5)]";

/**
 * The page banner: the photograph behind the heading, intro and both calls to action.
 * "Estimate your costs" scrolls to the calculator.
 *
 * The 720px floor matches the .banner-home height the homepage banner uses, so the two pages
 * open at the same size. It is a minimum rather than a fixed height, so the copy can never be
 * clipped on a narrow screen.
 */
export default function DevHero() {
	return (
		<section className="relative isolate flex min-h-[720px] bg-[#000000]">
			{/*
				Decorative. The photograph is held at 40% over black, then a scrim darkens the side the
				copy sits on, since the bright areas of the photo would otherwise wash the body text out.
			*/}
			<div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
				<Image
					src="/banners/website-development-banner.webp"
					alt=""
					fill
					priority
					sizes="100vw"
					className="object-cover opacity-40"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
			</div>
			{/* Centred in the banner the way the homepage centres its own, but left aligned per the design */}
			<div className={`${CONTAINER} flex flex-col justify-center py-[clamp(56px,7vw,112px)]`}>
				<h1 className={`${SECTION_HEADING} max-w-[15em] ${TEXT_SHADOW}`}>
					Websites and online stores, built as one connected system.
				</h1>
				<p className={`mt-8 mb-0 max-w-[34em] text-[clamp(19px,1.6vw,22px)] leading-[1.55] ${BODY_TEXT} ${TEXT_SHADOW}`}>
					New builds and migrations made to enterprise standards, planned and built start to finish by the engineer
					accountable for the result.
				</p>
				{/* Equal columns sized to the wider label, so both pills match, stacked or side by side */}
				<div className="mt-10 grid w-max max-w-full grid-cols-1 gap-4 sm:grid-cols-2">
					<Link href="/start-a-project" className={PILL_PRIMARY}>
						Start a project
					</Link>
					<Link href="#pricing" className={PILL_SECONDARY}>
						Estimate your costs
					</Link>
				</div>
			</div>
		</section>
	);
}
