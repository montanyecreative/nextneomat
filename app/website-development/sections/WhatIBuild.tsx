import { BODY_TEXT, CARD, CONTAINER, SECTION_HEADING } from "@/components/site/tokens";

const builds = [
	{
		title: "A new site",
		copy: "Built on a proven foundation and shaped around your brand, your products and the way your team works.",
	},
	{
		title: "A migration",
		copy: "Your products, content and customer data moved from your current platform onto a faster, more flexible foundation.",
	},
	{
		title: "An online store",
		copy: "Product variants, inventory, tax setup, shipping rules and order management connected to your customer records.",
	},
	{
		title: "A landing page",
		copy: "A focused single page for a launch, a campaign or a new offer, built to the same standards as everything else.",
	},
];

/** Charcoal band: four cards that fall two by two on desktop and stack on phones. */
export default function WhatIBuild() {
	return (
		<section className="bg-[#151515]">
			<div className={`${CONTAINER} py-[clamp(72px,9vw,128px)]`}>
				<h2 className={SECTION_HEADING}>What I build</h2>
				<div className="mt-10 flex flex-wrap gap-5">
					{builds.map((build) => (
						<div key={build.title} className={`${CARD} flex-[1_1_420px] bg-[#000000] p-8`}>
							<h3 className="m-0 aktiv-grotesk-semibold text-white text-[22px] leading-[1.3]">{build.title}</h3>
							<p className={`mt-3 mb-0 ${BODY_TEXT}`}>{build.copy}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
