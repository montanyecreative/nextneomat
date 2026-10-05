import Link from "next/link";
import { CARD, CONTAINER, FOCUS_RING, SECTION_HEADING } from "./tokens";

const tiles = [
	{ title: "Infrared photography prints", linkText: "See the prints", href: "/prints", ariaLabel: "Go to Prints page" },
	{
		title: "Photo and VHS digitization",
		linkText: "See digitization services",
		href: "/photo-vhs-digitization",
		ariaLabel: "Go to Photo and VHS Digitization page",
	},
	{ title: "Tools", linkText: "Browse the tools", href: "/tools", ariaLabel: "Go to Tools page" },
	{ title: "Blog", linkText: "Read the blog", href: "/blogs", ariaLabel: "Go to Blogs page" },
];

/** Charcoal band: the rest of the studio, directly above the existing footer. */
export default function AlsoFromStudio() {
	return (
		<section className="bg-[#151515]">
			<div className={`${CONTAINER} py-16`}>
				<h2 className={SECTION_HEADING}>Also from the studio</h2>
				<div className="mt-6 flex flex-wrap gap-4">
					{tiles.map((tile) => (
						<div key={tile.title} className={`${CARD} flex-[1_1_220px] flex flex-col gap-4 p-6`}>
							<h3 className="m-0 aktiv-grotesk-semibold text-white text-[18px] leading-[1.4]">{tile.title}</h3>
							{/* mt-auto keeps the links on one line across tiles when a title wraps */}
							<Link
								href={tile.href}
								aria-label={tile.ariaLabel}
								className={`mt-auto self-start inline-flex items-center min-h-[44px] text-[16px] text-white aktiv-grotesk-regular underline underline-offset-4 ${FOCUS_RING}`}
							>
								{tile.linkText}
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
