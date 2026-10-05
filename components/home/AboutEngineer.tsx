import Image from "next/image";
import Link from "next/link";
import { BODY_TEXT, CONTAINER, SECTION_HEADING, TEXT_LINK } from "./tokens";

/** Charcoal band: portrait beside the background copy. */
export default function AboutEngineer() {
	return (
		<section id="about" className="bg-[#151515]">
			{/* The pair is centred as a group rather than stretched, so the full width band stays balanced */}
			<div className={`${CONTAINER} py-[clamp(72px,9vw,128px)] flex flex-wrap items-center justify-center gap-x-16 gap-y-12`}>
				<div className="flex-[0_1_360px]">
					<Image
						src="/john.webp"
						alt="John Montanye"
						width={512}
						height={640}
						className="w-full aspect-[4/5] object-cover object-top rounded-[12px]"
					/>
				</div>
				<div className="flex-[0_1_720px] min-w-0">
					<h2 className={SECTION_HEADING}>The engineer behind the studio</h2>
					<p className={`mt-6 mb-0 max-w-[36em] ${BODY_TEXT}`}>
						I&apos;m John Montanye, a senior front-end engineer with 8+ years building high-end, customer-facing web
						experiences. At New Balance, my work spanned multi-locale storefronts serving Europe, Canada, Latin America and
						several Asian markets. At Citizen Watch America, I owned ADA and WCAG accessibility across a five-brand portfolio
						(Citizen, Bulova, Accutron, Frederique Constant and Alpina) on storefronts in the US, Canada, Mexico and the UK.
					</p>
					<p className={`mt-5 mb-0 max-w-[36em] ${BODY_TEXT}`}>
						Through Montanye Creative, I design and build complete web applications and e-commerce platforms end to end,
						bringing that same brand-caliber engineering to my clients.
					</p>
					<Link href="/resume" className={`mt-4 ${TEXT_LINK}`} aria-label="Go to Resume page">
						Read my full background
					</Link>
				</div>
			</div>
		</section>
	);
}
