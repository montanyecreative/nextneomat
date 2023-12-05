"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Promotion from "@/components/promotion";
import IntroSection from "./intro";
import MatrixSection from "./matrix";
import ExperienceSection from "./experience";
import EducationSection from "./education";
import SkillsSection from "./skills";

export default function Resume() {
	return (
		<main>
			<Navbar />
			<div className="bg-black">
				<div className="container resume-page mx-auto text-center text-white">
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
