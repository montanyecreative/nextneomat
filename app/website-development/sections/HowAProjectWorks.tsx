import Image from "next/image";
import { BODY_TEXT, CARD, CONTAINER, SECTION_HEADING } from "@/components/site/tokens";

const steps = [
	{
		number: "01",
		title: "Kickoff Meeting",
		copy: "Give me 15 minutes of your time over a call or meeting, and I'll get a clear sense of what you're aiming to achieve and who you want to reach. From there, I'll walk you through the many ways I can help you succeed, combining thoughtful conversation or workshops to shape a solution that is natural, supportive and genuinely aligned with your end goal.",
	},
	{
		number: "02",
		title: "Design & Development",
		copy: "You can expect the design and development phase to progress swiftly. From our conversations and workshops, I create beautiful, user-centered designs and bring them to life with clean, performant code. Your site is built iteratively in a test environment, so you can watch the build take shape in real time before it goes live, and I take your feedback to achieve the vision you want.",
	},
	{
		number: "03",
		title: "Launch & Optimization",
		copy: "Once your site is built, we step through a final workshop where you review everything. Then I launch at an agreed time that won't impact your business and run performance tests once it's live. From there, I can hand it off and teach you how to run it, or keep supporting you at an affordable rate. Either way, you'll understand how it all works.",
	},
];

/**
 * Black band: the three steps of a project, then the client portal panel.
 *
 * Each card spans two rows of the grid and picks them up again with grid-template-rows: subgrid,
 * so the body copy starts at the same height across all three even when a title wraps.
 */
export default function HowAProjectWorks() {
	return (
		<section className="bg-[#000000]">
			<div className={`${CONTAINER} py-[clamp(80px,10vw,144px)]`}>
				<h2 className={SECTION_HEADING}>How a project works</h2>
				<ol className="mt-12 mb-0 p-0 list-none grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
					{steps.map((step) => (
						<li key={step.number} className={`${CARD} row-span-2 grid grid-rows-subgrid min-w-0 bg-[#151515] p-8`}>
							<h3 className="m-0 flex items-start gap-[14px] aktiv-grotesk-semibold text-white text-[24px] leading-[1.25]">
								<span className="flex-none aktiv-grotesk-regular text-[#a3a3a3]">{step.number}</span>
								{/* The rule stretches to the full height of the title, however many lines it takes */}
								<span aria-hidden="true" className="flex-none w-[2px] self-stretch bg-mcRed" />
								<span className="text-balance">{step.title}</span>
							</h3>
							<p className={`m-0 text-[17px] leading-[1.6] text-pretty ${BODY_TEXT}`}>{step.copy}</p>
						</li>
					))}
				</ol>
				<div className={`${CARD} mt-5 bg-[#151515] p-8 flex flex-wrap items-center gap-x-12 gap-y-8`}>
					<div className="flex-[1_1_360px] min-w-0">
						<h3 className="m-0 aktiv-grotesk-semibold text-white text-[24px] leading-[1.25]">Watch the work happen</h3>
						<p className={`mt-3 mb-0 max-w-[32em] text-[17px] ${BODY_TEXT}`}>
							Every project comes with its own client portal: your project board, invoices and a live feed of code changes,
							all in one place.
						</p>
					</div>
					{/* The Project Status board, the same screenshot the client portal case study leads with */}
					<div className="flex-[1_1_420px] min-w-0">
						<Image
							src="/case-studies/client-portal/client-portal-status-board.webp"
							alt="The client portal's Project Status board, with delivery columns for Backlog, In Progress, Review and Done, and a ticket card showing its feature label, assignee and priority."
							width={1500}
							height={817}
							sizes="(min-width: 1024px) 50vw, 100vw"
							className="w-full h-auto rounded-[10px] border border-[#333333]"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
