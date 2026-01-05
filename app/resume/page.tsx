"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import Image from "next/image";
import IntroSection from "./intro";
import MatrixSection from "./matrix";
import ExperienceSection from "./experience";
import EducationSection from "./education";
import SkillsSection from "./skills";

export default function Resume() {
	return (
		<main>
			<Navbar />
			<div className="bg-transparent">
				<div className="sm:mx-auto md:mx-auto flex banner-home-copy">
					<div className="w-full comparison-slider relative">
						<Image src="/banners/resume-banner.webp" alt="Resume Banner" fill className="object-cover" priority />
						<h1 className="text-[42px] absolute bottom-0 left-0 p-5 text-white md:block hidden proxima-nova-medium">Resume</h1>
					</div>
				</div>
				<div className="container resume-page mx-auto text-center text-white aktiv-grotesk-regular">
					<h1 className="text-[32px] mt-5 md:hidden">Resume</h1>
					<IntroSection />
					<MatrixSection />
					<ExperienceSection />
					<EducationSection />
					<SkillsSection />
				</div>
			</div>
			<Promotion />
			<Footer />
		</main>
	);
}
