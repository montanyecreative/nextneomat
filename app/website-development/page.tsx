"use client";

// The shared nav and footer rely on their importing page being a client component, as every
// other page in the app is.
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BusinessCaseStudies from "@/app/website-development/BusinessCaseStudies";
import DevHero from "./sections/DevHero";
import WhatIBuild from "./sections/WhatIBuild";
import BuiltIntoEverySite from "./sections/BuiltIntoEverySite";
import HowAProjectWorks from "./sections/HowAProjectWorks";
import PricingCalculator from "./sections/PricingCalculator";
import ToolsIBuildWith from "./sections/ToolsIBuildWith";
import DevClosingCta from "./sections/DevClosingCta";
import { CONTAINER, SECTION_HEADING } from "@/components/site/tokens";

export default function WebsiteDevelopment() {
	return (
		<main className="overflow-x-hidden">
			<Navbar />
			<div className="w-full bg-[#000000] text-white aktiv-grotesk-regular text-[18px] leading-[1.6]">
				<DevHero />
				<WhatIBuild />
				{/*
					The case study slider, untouched and only moved into its new place in the order. Lighter
					padding than the other bands, since the pinned slider already holds the viewport on its own.
				*/}
				<section id="work" className="bg-[#000000] scroll-mt-24 py-[clamp(40px,5vw,64px)]">
					<div className={CONTAINER}>
						{/* The component is untouched: only its heading class is passed, to match the other sections */}
						<BusinessCaseStudies headingClassName={`${SECTION_HEADING} mb-10`} />
					</div>
				</section>
				<BuiltIntoEverySite />
				<HowAProjectWorks />
				<PricingCalculator />
				<ToolsIBuildWith />
				<DevClosingCta />
			</div>
			<Footer />
		</main>
	);
}
