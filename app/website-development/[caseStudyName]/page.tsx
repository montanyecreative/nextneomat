import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/footer";
import { caseStudies, caseStudyParam, getCaseStudyByParam } from "../caseStudies";
import CaseStudyView from "./CaseStudyView";

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-space-grotesk",
	display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

type CaseStudyPageProps = {
	params: Promise<{ caseStudyName: string }>;
};

export function generateStaticParams() {
	return caseStudies.map((study) => ({ caseStudyName: caseStudyParam(study) }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
	const { caseStudyName } = await params;
	const study = getCaseStudyByParam(caseStudyName);

	if (!study) {
		return { title: "Case Study | Montanye Creative" };
	}

	const title = study.titleLines.join(" ");

	return {
		title: `${title} Case Study | Montanye Creative`,
		description: study.metaDescription ?? study.summary,
	};
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
	const { caseStudyName } = await params;
	const study = getCaseStudyByParam(caseStudyName);

	if (!study) {
		notFound();
	}

	return (
		<main className={`overflow-x-hidden ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
			<CaseStudyView study={study} />
			<Footer />
		</main>
	);
}
