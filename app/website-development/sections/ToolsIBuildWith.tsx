import Image from "next/image";
import { CONTAINER, FOCUS_RING, SECTION_HEADING } from "@/components/site/tokens";

type Tool = {
	name: string;
	/** Vendor site the logo links out to. */
	url: string;
	src: string;
	/** Width the logo takes at the shared 32px height, from its own aspect ratio. */
	width: number;
};

/**
 * Order follows the design. John may adjust which tools appear.
 *
 * The SVGs are each vendor's own logo file. Postmark's is cropped with a viewBox to its wordmark,
 * since the file they publish is an ActiveCampaign lockup that would otherwise set the Postmark
 * name about 40% smaller than everything beside it.
 */
const tools: Tool[] = [
	{ name: "Vercel", url: "https://vercel.com/", src: "/website-development/vercel-logo.webp", width: 161 },
	{ name: "Next.js", url: "https://nextjs.org/", src: "/website-development/nextjs-logo.svg", width: 158 },
	{ name: "Contentful", url: "https://www.contentful.com/", src: "/website-development/contentful-logo.webp", width: 156 },
	{ name: "Stripe", url: "https://stripe.com/", src: "/website-development/stripe-logo.svg", width: 77 },
	{ name: "Neon", url: "https://neon.com/", src: "/website-development/neon-logo.svg", width: 112 },
	{ name: "Postmark", url: "https://postmarkapp.com/", src: "/website-development/postmark-logo.svg", width: 196 },
	{ name: "Klaviyo", url: "https://www.klaviyo.com/", src: "/website-development/klaviyo-logo.webp", width: 104 },
	{ name: "Shopify", url: "https://www.shopify.com/", src: "/website-development/shopify-logo.webp", width: 112 },
	{ name: "GitHub", url: "https://github.com/", src: "/website-development/github-logo.webp", width: 93 },
	{
		name: "Google Analytics",
		url: "https://marketingplatform.google.com/about/analytics/",
		src: "/website-development/google-analytics-logo.webp",
		width: 145,
	},
];

/**
 * Every logo is drawn at this height, so the row reads as one line of marks. Tiles take their
 * basis from the logo inside them and never shrink, so a wide wordmark keeps its full width
 * instead of being letterboxed down to something shorter than its neighbours.
 */
const LOGO_HEIGHT = 32;

/** Black band: the tools behind the builds, as white monochrome wordmarks linking to each vendor. */
export default function ToolsIBuildWith() {
	return (
		<section className="bg-[#000000]">
			<div className={`${CONTAINER} py-[clamp(64px,8vw,112px)]`}>
				<h2 className={SECTION_HEADING}>Tools I build with</h2>
				<div className="mt-8 flex flex-wrap gap-3">
					{tools.map((tool) => (
						<a
							key={tool.name}
							href={tool.url}
							target="_blank"
							rel="noopener"
							aria-label={`Leave website to go to the ${tool.name} website`}
							className={`flex flex-[1_0_auto] min-w-[160px] min-h-[72px] box-border items-center justify-center rounded-[10px] p-4 transition-opacity duration-300 hover:opacity-70 ${FOCUS_RING}`}
						>
							{/* The stored logos are full colour, so they are knocked back to white here */}
							<Image
								src={tool.src}
								alt={tool.name}
								width={tool.width}
								height={LOGO_HEIGHT}
								// SVGs are already vector and tiny, and Next does not optimise them by default
								unoptimized={tool.src.endsWith(".svg")}
								className="h-8 w-auto object-contain [filter:brightness(0)_invert(1)]"
							/>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
