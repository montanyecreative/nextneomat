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
				<AvatarImage src={johnImage} alt="John Montanye" />
				<AvatarFallback>John Montanye</AvatarFallback>
			</Avatar>
			<h5 className="my-5 text-[24px]">John Montanye</h5>
			<p className="my-5 mx-auto sm:mx-5 md:mx-unset">
				Ambitious Salesforce B2C Commerce Cloud Developer with {beganStartYears ? beganStartYears + "+" : ""} years of hands-on
				industry experience, including experience with Salesforce Commerce Cloud, SFRA, Page Designer, JavaScript, ISML/SASS,
				Bootstrap, React, Nodejs, and a variety of other web platforms. Passionate about learning new technologies with an eagerness
				to go above and beyond both individually and with a team to get the job done. Seeking new challenges and growth
				opportunities within a growing organization.
			</p>
			<p className="my-5 lg:mt-10 mx-auto sm:mx-5 md:mx-unset italic">
				Currently only looking for small freelance projects outside of 8am-6pm schedule.
			</p>

			<p className="italic my-5 text-[16px]">Leans front-end</p>
			<div className="flex justify-center">
				<p className="text-[14px]">Front-end</p>
				<Slider defaultValue={[40]} max={100} step={10} disabled={true} aria-label="Skill comfort slider" className="mx-10" />
				<p className="text-[14px]">Back-end</p>
			</div>
			<p className="mt-3 text-[16px]">Fullstack</p>
			<div className="page-links-container my-10 flex flex-wrap justify-center gap-2">
				<Button asChild variant="outline" className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a]">
					<Link href="/resume#experience" aria-label="Go to Experience section">
						Experience
					</Link>
				</Button>
				<Button asChild variant="outline" className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a]">
					<Link href="/resume#education" aria-label="Go to Education section">
						Education
					</Link>
				</Button>
				<Button asChild variant="outline" className="rounded-full w-28 hover:bg-[#c6284a] hover:border-[#c6284a]">
					<Link href="/resume#skills" aria-label="Go to Skills section">
						Skills
					</Link>
				</Button>
			</div>
		</div>
	);
}
