import { BODY_TEXT, CONTAINER, SECTION_HEADING } from "./tokens";

type SystemCard = {
	heading: string;
	steps: string[];
	/** The crimson footer: where the steps above it land. */
	outcome: string;
};

/** Card order is fixed by the design: reaches out, staff signs in, team updates, buys. */
const cards: SystemCard[] = [
	{
		heading: "When someone reaches out",
		steps: [
			"Fills out a contact form",
			"The submission is saved the moment it's sent",
			"Can also post to apps like Slack automatically",
		],
		outcome: "It's routed to the right person in real time",
	},
	{
		heading: "When your staff signs in",
		steps: ["Signs in securely with their own account", "Sees only the tools their role allows"],
		outcome: "Leads, orders and content stay in the right hands",
	},
	{
		heading: "When your team updates the site",
		steps: ["Edits pages, products and campaigns on their own", "Manages languages and markets from one place"],
		outcome: "Changes publish to the live site without a developer",
	},
	{
		heading: "When someone buys",
		steps: [
			"Browses products with real variants and tracked inventory",
			"Checks out with tax and shipping rules applied",
			"Gets an order confirmation and updates automatically",
		],
		outcome: "The order lands in your customer records",
	},
];

/**
 * Black band: four cards, each a short path ending in a crimson outcome.
 *
 * auto-fit gives four across on desktop and a single stack on phones with no breakpoints.
 * Each card spans four rows of that grid and picks them up again with grid-template-rows:
 * subgrid, so headings, step areas and footers line up across all four cards and every footer
 * takes the height of the tallest one. The card itself is drawn by its first three rows; the
 * fourth holds the connector tick that joins the line running under the whole row.
 */
export default function ConnectedSystem() {
	return (
		<section id="what-you-get" className="bg-[#000000]">
			<div className={`${CONTAINER} py-[clamp(80px,10vw,144px)]`}>
				<h2 className={SECTION_HEADING}>One connected system behind your site</h2>
				<p className={`mt-5 mb-0 max-w-[36em] ${BODY_TEXT}`}>
					Every build is a complete platform. Each piece hands off to the next, so what happens on your site shows up where
					your business needs it.
				</p>
				<div className="mt-14">
					<div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-4">
						{cards.map((card) => (
							<div key={card.heading} className="row-span-4 grid grid-rows-subgrid min-w-0">
								<h3 className="m-0 box-border px-5 pt-6 rounded-t-[12px] border border-b-0 border-[#333333] bg-[#151515] text-[20px] leading-[1.3] text-white aktiv-grotesk-semibold text-balance">
									{card.heading}
								</h3>
								<div className="relative box-border px-5 pt-5 pb-8 border-x border-[#333333] bg-[#151515]">
									{/* The rail runs behind the dots, from the first one down into the footer */}
									<div aria-hidden="true" className="absolute left-[25px] top-7 bottom-0 w-[2px] bg-mcRed" />
									<ol className="relative m-0 p-0 list-none flex flex-col gap-[18px]">
										{card.steps.map((step) => (
											<li
												key={step}
												className="flex items-start gap-3 text-[16px] leading-[1.45] text-[#e6e6e6] aktiv-grotesk-regular text-pretty"
											>
												<span
													aria-hidden="true"
													className="flex-none mt-[5px] box-border w-3 h-3 rounded-full border-2 border-mcRed bg-[#151515]"
												/>
												<span>{step}</span>
											</li>
										))}
									</ol>
								</div>
								<div className="box-border flex items-center px-5 py-[18px] rounded-b-[12px] bg-mcRed text-[16px] leading-[1.45] text-white aktiv-grotesk-semibold text-balance">
									{card.outcome}
								</div>
								{/* Drops from the rail's position into the line below, or into the next card when stacked */}
								<div aria-hidden="true" className="ml-[26px] w-[2px] h-8 bg-mcRed" />
							</div>
						))}
					</div>
					<div aria-hidden="true" className="h-[2px] bg-mcRed" />
				</div>
			</div>
		</section>
	);
}
