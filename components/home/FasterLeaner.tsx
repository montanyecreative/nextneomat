import { BODY_TEXT, CARD, CONTAINER, SECTION_HEADING } from "./tokens";

const pillars = [
	{
		title: "A proven foundation",
		copy: "Every build starts from infrastructure already running on live production sites, so the hours go into your brand, catalog and workflows.",
	},
	{
		title: "Principal-led",
		copy: "The person who plans your system builds it and answers for it, with no layers of account and project management in between.",
	},
	{
		title: "No platform license",
		copy: "No enterprise license fees to carry, and services that scale as your business grows.",
	},
];

const standards = [
	"Tested to WCAG 2.2 AA accessibility",
	"Lighthouse 90+ with passing Core Web Vitals",
	"Secure staff sign-in with role-based access",
	"Spam-protected forms",
	"Built-in analytics",
	"Weekly backups",
];

/**
 * Live Lighthouse numbers in report order: performance, accessibility, best practices, SEO.
 */
const lighthouseScores: { site: string; scores: number[] }[] = [
	{ site: "Montanye Creative (this site)", scores: [90, 100, 100, 100] },
	{ site: "Montanye Creative Prints Store", scores: [96, 98, 100, 100] },
	{ site: "Palladium Point", scores: [100, 96, 100, 100] },
];

type LighthouseEntry = (typeof lighthouseScores)[number];

/**
 * One site and its four numbers, kept together as a unit. The pair breaks between the name and
 * the numbers only when the panel is too narrow to hold both, which on a phone it is.
 *
 * `wrapperClass` lets the two line layout drop the wrapper to display:contents, so the name and
 * the numbers become cells of the grid above and line up with the row below them. `namePad`
 * opens the second pair on a grid row clear of the first.
 *
 * There is deliberately no justify on the wrapper: when the pair wraps on a narrow screen, the
 * name and the numbers have to stay flush with the lines above them. The wide layout centres the
 * pairs from its own container, where a pair is never narrow enough to wrap.
 */
function ScoreEntry({ entry, wrapperClass = "", namePad = "" }: { entry: LighthouseEntry; wrapperClass?: string; namePad?: string }) {
	return (
		<span className={`inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 ${wrapperClass}`}>
			<span className={`whitespace-nowrap ${namePad}`}>{entry.site}</span>
			<b className="whitespace-nowrap text-[#4ade80] aktiv-grotesk-semibold">{entry.scores.join(", ")}</b>
		</span>
	);
}

function CheckMark() {
	return (
		<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="flex-none mt-1">
			<path d="M4 10.5 L8.5 15 L16 6" fill="none" stroke="#c6284a" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

/** Charcoal band: why the work costs less, plus what every build includes. */
export default function FasterLeaner() {
	return (
		<section className="bg-[#151515]">
			<div className={`${CONTAINER} py-[clamp(80px,10vw,144px)]`}>
				<h2 className={SECTION_HEADING}>Faster and leaner, without lowering the bar</h2>
				<p className={`mt-5 mb-0 max-w-[36em] ${BODY_TEXT}`}>
					Projects come in at a fraction of the cost and timeline of a traditional enterprise build. The difference is in how the
					work is structured.
				</p>
				<div className="mt-12 flex flex-wrap gap-x-12 gap-y-10">
					{pillars.map((pillar) => (
						<div key={pillar.title} className="flex-[1_1_260px] border-t-2 border-mcRed pt-5">
							<h3 className="m-0 aktiv-grotesk-semibold text-white text-[20px] leading-[1.3]">{pillar.title}</h3>
							<p className={`mt-2.5 mb-0 text-[17px] ${BODY_TEXT}`}>{pillar.copy}</p>
						</div>
					))}
				</div>
				<div className={`${CARD} mt-[72px] bg-[#000000] p-8`}>
					<h3 className="m-0 aktiv-grotesk-semibold text-white text-[20px] leading-[1.3]">Built into every site</h3>
					<ul className="mt-5 mb-0 p-0 list-none flex flex-wrap gap-x-8 gap-y-3.5">
						{standards.map((standard) => (
							<li
								key={standard}
								className="flex flex-[1_1_300px] items-start gap-3 text-[17px] text-[#e6e6e6] aktiv-grotesk-regular"
							>
								<CheckMark />
								<span>{standard}</span>
							</li>
						))}
					</ul>
					{/*
						Two arrangements, swapped at the width where all three sites fit across the panel.
						Only one of them is ever in the page, so neither is read out twice.
					*/}
					<div className="mt-7 pt-6 border-t border-[#2e2e2e] text-[16px] text-[#b5b5b5] aktiv-grotesk-regular">
						{/* Wide: the label centred on its own line, the three sites centred on the line below */}
						<div className="hidden min-[1366px]:block">
							<p className="m-0 text-center">Live Lighthouse scores</p>
							<div className="mt-3 flex flex-wrap items-baseline justify-center gap-x-12 gap-y-2.5">
								{lighthouseScores.map((entry) => (
									<ScoreEntry key={entry.site} entry={entry} />
								))}
							</div>
						</div>
						{/*
							Narrower: two lines, left aligned. From lg it is a four column grid, so names line
							up under names and numbers under numbers, with the label taking the first pair of
							cells. Between 791px and lg the grid is wider than the panel, so the pairs pack
							into two wrapped lines instead.

							At 790px even that no longer holds and the last site would drop to a line of its
							own, so from there down it goes straight to one item per line rather than sitting
							in a lopsided three line state.
						*/}
						<div className="min-[1366px]:hidden">
							<div className="flex flex-wrap items-baseline gap-x-8 gap-y-2.5 max-[790px]:flex-col max-[790px]:items-start lg:grid lg:w-max lg:max-w-full lg:grid-cols-[auto_auto_auto_auto] lg:gap-x-4">
								<span className="lg:col-span-2">Live Lighthouse scores</span>
								{lighthouseScores.map((entry, index) => (
									<ScoreEntry
										key={entry.site}
										entry={entry}
										wrapperClass="lg:contents"
										// Entries 0 and 2 open the right hand pair on their row
										namePad={index % 2 === 0 ? "lg:pl-6 custom1060:pl-12" : ""}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
