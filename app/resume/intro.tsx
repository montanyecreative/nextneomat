"use client";

import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import ResumeViewToggle from "./ResumeViewToggle";
import type { ResumeView } from "./experienceBullets";
import { FADE_MS, useResumeView } from "./resumeView";
import { trackButtonClick } from "@/lib/gtag";

const johnImage = "/john.webp";

/**
 * The jump buttons under the summary. They are same-page links, which the
 * delegated listener in AnalyticsListeners deliberately ignores, so each one
 * reports itself.
 */
const SECTION_LINKS = [
	{ href: "/resume#experience", label: "Experience" },
	{ href: "/resume#education", label: "Education" },
	{ href: "/resume#skills", label: "Skills" },
];

/**
 * The summary, in both views. Business view leads on what the work was for; recruiter view is the
 * platform and stack reading the page has always carried. The year count is the one the page
 * already worked out from the start date, so both stay current without being edited.
 */
function summaryFor(view: ResumeView, years: string) {
	if (view === "recruiter") {
		return `Senior front-end engineer with ${years} years of industry experience and deep specialization in Salesforce B2C Commerce (SFCC/SFRA), built on 6+ years of SFRA, ISML, SCSS, and JavaScript, with strong focus on Page Designer and accessibility (ADA/WCAG). Delivered multi-brand, multi-region storefronts for global brands including Citizen, Bulova, and New Balance. Recently extended into the modern composable stack (React, Next.js, TypeScript) as the platform and industry have shifted. Operates at a lead level on the experience layer: owning front-end architecture and standards, raising the bar on accessibility and maintainability, and mentoring the engineers around them.`;
	}

	return `Senior front-end engineer with ${years} years building high-end, customer-facing web experiences, including multi-market storefronts for New Balance and a five-brand portfolio for Citizen Watch America. Owned accessibility across Citizen's sites in the US, Canada, Mexico and the UK. Now runs Montanye Creative, an independent studio that designs and builds complete websites, online stores and web applications for businesses of every size, bringing the same brand-caliber engineering to each build. Known for pairing real design sensibility with disciplined, maintainable engineering, and for taking a project from first conversation to a polished, accessible launch.`;
}

export default function IntroSection() {
	var beganStartMonth = 1;
	var beganStartYear = 2018;

	var beganStartYears = yearDiff(new Date(beganStartYear, beganStartMonth), new Date());

	function yearDiff(dateFrom: Date, dateTo: Date) {
		return dateTo.getFullYear() - dateFrom.getFullYear();
	}

	const { view, swapping } = useResumeView();

	return (
		<div className="resume-intro" id="highlights">
			<Avatar className="avatar avatar-shadow mx-auto my-10">
				{/*
					The photo is a 4:5 portrait, so the round avatar crops it. object-top keeps the top of the
					frame, which sits John lower in the circle; nudge with e.g. object-[50%_15%] to raise him.
				*/}
				<AvatarImage src={johnImage} alt="John Montanye" className="object-cover object-top" />
				<AvatarFallback>John Montanye</AvatarFallback>
			</Avatar>
			<h5 className="my-5 text-[24px] proxima-nova-semibold">John Montanye</h5>
			{/* Swaps with the experience bullets, and fades on the same timing so the page changes as one */}
			<p
				className={`my-5 mx-auto sm:mx-5 md:mx-unset transition-opacity motion-reduce:transition-none ${
					swapping ? "opacity-0" : "opacity-100"
				}`}
				style={{ transitionDuration: `${FADE_MS}ms` }}
			>
				{summaryFor(view, beganStartYears ? beganStartYears + "+" : "")}
			</p>
			{/* <p className="my-5 lg:mt-10 mx-auto sm:mx-5 md:mx-unset italic">
				Currently only looking for small freelance projects outside of 8am-6pm schedule.
			</p> */}
			<p className="my-5 lg:mt-10 mx-auto sm:mx-5 md:mx-unset italic">
				Seeking new opportunities &mdash; open to full time, contract, and part time work.
			</p>

			{/*
				The corner recruiter control. It displays fixed to the bottom right of the viewport, but it
				is rendered here, right after the summary, so it is reached near the top of the page.
			*/}
			<ResumeViewToggle />

			<p className="italic my-5 text-[16px]">Leans front-end</p>
			<div className="flex justify-center">
				<p className="text-[14px]">Front-end</p>
				<Slider defaultValue={[40]} max={100} step={10} disabled={true} aria-label="Skill comfort slider" name="Skill comfort slider" className="mx-10" />
				<p className="text-[14px]">Back-end</p>
			</div>
			<p className="mt-3 text-[16px]">Fullstack</p>
			<div className="page-links-container my-10 flex flex-wrap justify-center gap-2">
				{SECTION_LINKS.map((section) => (
					<Button
						key={section.href}
						asChild
						variant="outline"
						className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a] proxima-nova-semibold"
					>
						<Link
							href={section.href}
							aria-label={`Go to ${section.label} section`}
							onClick={() =>
								trackButtonClick({
									name: "resume_section_jump",
									location: "resume",
									text: section.label,
									value: section.href,
								})
							}
						>
							{section.label}
						</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
