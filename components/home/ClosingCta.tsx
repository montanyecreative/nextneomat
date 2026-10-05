import Link from "next/link";
import { BODY_TEXT, CONTAINER, PILL_PRIMARY, PILL_SECONDARY, SECTION_HEADING } from "./tokens";

/** Black band: the closing call to action the hero button scrolls to. */
export default function ClosingCta() {
	return (
		<section id="start" className="bg-[#000000] scroll-mt-24">
			<div className={`${CONTAINER} py-[clamp(80px,10vw,144px)]`}>
				<div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
					<div className="flex-[999_1_420px] min-w-0">
						<h2 className={SECTION_HEADING}>Tell me about your project</h2>
						<p className={`mt-5 mb-0 max-w-[32em] ${BODY_TEXT}`}>
							A few short questions about your business and what you need. Your answers come straight to me, and I follow up
							personally.
						</p>
					</div>
					{/*
						w-max sizes the grid to its content and the equal columns then take the wider
						label's width, so both buttons match without being squeezed into a narrow track.
					*/}
					<div className="flex-[0_0_auto] grid w-max max-w-full grid-cols-1 gap-4 sm:grid-cols-2">
						<Link href="/start-a-project" className={PILL_PRIMARY}>
							Start a project
						</Link>
						<a
							href="mailto:montanyecreative@outlook.com"
							className={PILL_SECONDARY}
							aria-label="Email montanyecreative@outlook.com"
						>
							Email the studio
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
