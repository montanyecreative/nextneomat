import CheckIcon from "@/components/site/CheckIcon";
import { BODY_TEXT, CARD, CONTAINER, SECTION_HEADING } from "@/components/site/tokens";

const standards = [
	"Tested to WCAG 2.2 AA accessibility",
	"Lighthouse 90+ with passing Core Web Vitals",
	"Content your team can edit without a developer",
	"Search-friendly structure and metadata",
	"Interactive brand playbook for your team",
	"Secure staff sign-in with role-based access",
	"Spam-protected forms",
	"Built-in analytics",
	"Weekly backups",
];

/** Charcoal band: the nine standards every build ships with, in one panel. */
export default function BuiltIntoEverySite() {
	return (
		<section className="bg-[#151515]">
			<div className={`${CONTAINER} py-[clamp(72px,9vw,128px)]`}>
				<h2 className={SECTION_HEADING}>Built into every site</h2>
				<p className={`mt-5 mb-0 max-w-[36em] ${BODY_TEXT}`}>Every build comes with these, whatever its size.</p>
				<ul className={`${CARD} mt-10 mb-0 list-none bg-[#000000] p-8 flex flex-wrap gap-x-8 gap-y-[18px]`}>
					{standards.map((standard) => (
						<li
							key={standard}
							className="flex flex-[1_1_300px] items-start gap-3 text-[17px] text-[#e6e6e6] aktiv-grotesk-regular"
						>
							<CheckIcon className="mt-1" />
							<span>{standard}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
