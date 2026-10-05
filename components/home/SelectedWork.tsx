import BusinessCaseStudies from "@/app/website-development/BusinessCaseStudies";
import { CONTAINER, SECTION_HEADING } from "./tokens";

/**
 * Black band holding the case study slider from the Website Development page. The heading is
 * passed in because it is pinned with the cards, so the sideways scroll starts as it reaches
 * the top. The id is what the hero's "See the work" button scrolls to.
 */
export default function SelectedWork() {
	// Lighter padding than the other bands: the pinned slider already holds the viewport on its own
	return (
		<section id="work" className="bg-[#000000] scroll-mt-24 py-[clamp(40px,5vw,64px)]">
			<div className={CONTAINER}>
				<BusinessCaseStudies heading="Our work" headingClassName={`${SECTION_HEADING} mb-10`} />
			</div>
		</section>
	);
}
