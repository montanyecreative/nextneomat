import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const johnImage = "/john.webp";

export default function IntroSection() {
	var beganStartMonth = 1;
	var beganStartYear = 2018;

	var beganStartYears = yearDiff(new Date(beganStartYear, beganStartMonth), new Date());

	function yearDiff(dateFrom: Date, dateTo: Date) {
		return dateTo.getFullYear() - dateFrom.getFullYear();
	}

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
			<p className="my-5 mx-auto sm:mx-5 md:mx-unset">
				Senior front-end engineer with {beganStartYears ? beganStartYears + "+" : ""} years of industry experience and deep
				specialization in Salesforce B2C Commerce (SFCC/SFRA), built on 6+ years of SFRA, ISML, SCSS, and JavaScript, with strong
				focus on Page Designer and accessibility (ADA/WCAG). Delivered multi-brand, multi-region storefronts for global brands
				including Citizen, Bulova, and New Balance. Recently extended into the modern composable stack (React, Next.js, TypeScript)
				as the platform and industry have shifted. Operates at a lead level on the experience layer: owning front-end architecture
				and standards, raising the bar on accessibility and maintainability, and mentoring the engineers around them.
			</p>
			{/* <p className="my-5 lg:mt-10 mx-auto sm:mx-5 md:mx-unset italic">
				Currently only looking for small freelance projects outside of 8am-6pm schedule.
			</p> */}
			<p className="my-5 lg:mt-10 mx-auto sm:mx-5 md:mx-unset italic">
				Seeking new opportunities &mdash; open to full time, contract, and part time work.
			</p>

			<p className="italic my-5 text-[16px]">Leans front-end</p>
			<div className="flex justify-center">
				<p className="text-[14px]">Front-end</p>
				<Slider defaultValue={[40]} max={100} step={10} disabled={true} aria-label="Skill comfort slider" name="Skill comfort slider" className="mx-10" />
				<p className="text-[14px]">Back-end</p>
			</div>
			<p className="mt-3 text-[16px]">Fullstack</p>
			<div className="page-links-container my-10 flex flex-wrap justify-center gap-2">
				<Button
					asChild
					variant="outline"
					className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a] proxima-nova-semibold"
				>
					<Link href="/resume#experience" aria-label="Go to Experience section">
						Experience
					</Link>
				</Button>
				<Button
					asChild
					variant="outline"
					className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a] proxima-nova-semibold"
				>
					<Link href="/resume#education" aria-label="Go to Education section">
						Education
					</Link>
				</Button>
				<Button
					asChild
					variant="outline"
					className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a] proxima-nova-semibold"
				>
					<Link href="/resume#skills" aria-label="Go to Skills section">
						Skills
					</Link>
				</Button>
			</div>
		</div>
	);
}
