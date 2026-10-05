import { BODY_TEXT, CARD, CONTAINER, SECTION_HEADING } from "./tokens";

const options = [
	{
		title: "A new site",
		copy: "Built on a proven foundation and shaped around your brand, your products and the way your team works.",
	},
	{
		title: "A migration",
		copy: "Your products, content and customer data moved from your current platform onto a faster, more flexible foundation.",
	},
];

/** Charcoal band: the two ways a project starts. */
export default function StartOrMigrate() {
	return (
		<section className="bg-[#151515]">
			<div className={`${CONTAINER} py-[clamp(72px,9vw,120px)]`}>
				<h2 className={SECTION_HEADING}>Start fresh, or bring what you have</h2>
				<div className="mt-10 flex flex-wrap gap-6">
					{options.map((option) => (
						<div key={option.title} className={`${CARD} flex-[1_1_320px] bg-[#000000] p-8`}>
							<h3 className="m-0 aktiv-grotesk-semibold text-white text-[22px] leading-[1.3]">{option.title}</h3>
							<p className={`mt-3 mb-0 ${BODY_TEXT}`}>{option.copy}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
