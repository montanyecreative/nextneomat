"use client";

import React from "react";
import Image from "next/image";
import { bulletsFor, type RoleKey } from "./experienceBullets";
import { FADE_MS, useResumeView } from "./resumeView";

const citizenLogo = "/resume/citizen-logo.webp";
const ignitionLogo = "/resume/ignition-commerce-logo.webp";
const newbalanceLogo = "/resume/newbalance.svg";
const syllogisteksLogo = "/resume/syllogisteks.ico";
const montanyecreativeLogo = "/logo.webp";
const gatewayitconsultingLogo = "/resume/gitc.svg";

/**
 * One role's bullets, in whichever view the page is in. The list fades out and back in around the
 * swap, which is why it reads the midpoint rather than the view alone.
 *
 * The business and technical lists have different counts, so the whole list is replaced at once.
 * A role with no business bullets renders nothing, leaving its title and dates on their own.
 */
function RoleBullets({ role }: { role: RoleKey }) {
	const { view, swapping } = useResumeView();
	const bullets = bulletsFor(role, view);

	if (!bullets.length) return null;

	return (
		<div
			className={`transition-opacity motion-reduce:transition-none ${swapping ? "opacity-0" : "opacity-100"}`}
			style={{ transitionDuration: `${FADE_MS}ms` }}
		>
			{bullets.map((bullet) => (
				<p key={bullet} className="ml-5 mt-1">
					{`- ${bullet}`}
				</p>
			))}
		</div>
	);
}

export default function ExperienceSection() {
	// Helper function to calculate years and months between two dates
	function calculateYearsAndMonths(startDate: Date, endDate: Date = new Date()) {
		let years = endDate.getFullYear() - startDate.getFullYear();
		let months = endDate.getMonth() - startDate.getMonth();

		// Adjust if the end date hasn't reached the start date's day of month
		if (endDate.getDate() < startDate.getDate()) {
			months--;
		}

		// Handle negative months
		if (months < 0) {
			months += 12;
			years--;
		}

		return { years, months };
	}

	// Format years and months for display
	function formatDuration(years: number, months: number): string {
		const parts: string[] = [];

		if (years > 0) {
			parts.push(`${years} ${years === 1 ? "year" : "years"}`);
		}

		if (months > 0) {
			parts.push(`${months} ${months === 1 ? "month" : "months"}`);
		}

		// Edge case: if both are 0, show "0 months"
		if (parts.length === 0) {
			return "0 months";
		}

		return parts.join(" ");
	}

	// Side job: March 2023
	const currentSideJobStart = new Date(2023, 2, 1); // Month is 0-indexed, so 2 = March
	const currentSideJobDuration = calculateYearsAndMonths(currentSideJobStart);
	const currentSideJobDisplay = formatDuration(currentSideJobDuration.years, currentSideJobDuration.months);

	return (
		<div className="resume-intro text-left" id="experience">
			<h1 className="text-[32px] my-5 proxima-nova-semibold">Experience</h1>
			<div className="job border-t py-4" data-resume-entry="montanyeCreative">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.49985 0.877045C3.84216 0.877045 0.877014 3.84219 0.877014 7.49988C0.877014 11.1575 3.84216 14.1227 7.49985 14.1227C11.1575 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1575 0.877045 7.49985 0.877045ZM1.82701 7.49988C1.82701 4.36686 4.36683 1.82704 7.49985 1.82704C10.6328 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6328 13.1727 7.49985 13.1727C4.36683 13.1727 1.82701 10.6329 1.82701 7.49988ZM7.49999 9.49999C8.60456 9.49999 9.49999 8.60456 9.49999 7.49999C9.49999 6.39542 8.60456 5.49999 7.49999 5.49999C6.39542 5.49999 5.49999 6.39542 5.49999 7.49999C5.49999 8.60456 6.39542 9.49999 7.49999 9.49999Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">March 2023 - Current ({currentSideJobDisplay})</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={montanyecreativeLogo} className="job-logo" alt="Montanye Creative logo" width="30" height="25" />
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">Montanye Creative</h3>
					</div>
					<h4 className="text-[24px] mb-2">Founder / Principal Engineer</h4>
					<p className="ml-5">
						<i>Clients include Palladium Point as well as personal projects.</i>
					</p>
					<RoleBullets role="montanyeCreative" />
				</div>
			</div>
			<div className="job border-t py-4" data-resume-entry="citizen">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">October, 2022 - July, 2026 (3 years 9 months)</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={citizenLogo} className="job-logo" alt="Citizen Watch America logo" width="40" height="25" />
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">Citizen Watch America</h3>
					</div>
					<h4 className="text-[24px] mb-2">Salesforce Commerce Cloud Developer</h4>
					<p className="ml-5">
						<i>Brands/sites worked include Citizen, Bulova, Accutron, Frederique Constant, and Alpina.</i>
					</p>
					<RoleBullets role="citizen" />
				</div>
			</div>
			<div className="job border-t py-4" data-resume-entry="ignition">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">May, 2022 - September, 2022 (5 months)</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={ignitionLogo} className="job-logo" alt="Ignition Commerce logo" width="30" height="25" />
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">Ignition Commerce</h3>
					</div>
					<h4 className="text-[24px] mb-2">Salesforce Commerce Cloud Developer</h4>
					<p className="ml-5">
						<i>
							Brands/sites worked include Johnston &amp; Murphy, Sheet Music Plus, Cherished Memories, ReserveBar, and
							LuxeDecor.
						</i>
					</p>
					<RoleBullets role="ignition" />
				</div>
			</div>
			<div className="job border-t py-4" data-resume-entry="newBalance">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">March, 2020 - May, 2022 (2 years 3 months)</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={newbalanceLogo} className="job-logo" alt="New Balance logo" width="30" height="25" />
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">New Balance</h3>
					</div>
					<h4 className="text-[24px] mb-2">Software Engineer - Salesforce Commerce Cloud (March, 2021 - May, 2022)</h4>
					<RoleBullets role="newBalance" />
				</div>
			</div>
			<div className="job border-t py-4" data-resume-entry="syllogisteks">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">March, 2018 - March, 2021 (3 years 1 month)</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={syllogisteksLogo} className="job-logo" alt="SyllogisTeks logo" width="30" height="25" />
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">SyllogisTeks</h3>
					</div>
					<div className="flex py-1">
						<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							></path>
						</svg>
						<p className="text-[18px] ml-1">March, 2020 - March, 2021</p>
					</div>
					<div className="flex">
						<Image src={newbalanceLogo} className="job-logo" alt="New Balance logo" width="30" height="25" />
						<h4 className="text-[20px] mb-2 ml-2">Web Developer Contractor - Salesforce Commerce Cloud at New Balance</h4>
					</div>
					<RoleBullets role="syllogisteksNewBalance" />
					<div className="flex py-1 mt-3">
						<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.00003 1.84861C4.10114 2.1017 1.82707 4.53515 1.82707 7.49972C1.82707 10.4643 4.10114 12.8977 7.00003 13.1508V1.84861ZM8.00003 13.1508C10.8988 12.8976 13.1727 10.4642 13.1727 7.49972C13.1727 4.53524 10.8988 2.10185 8.00003 1.84864V13.1508Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							></path>
						</svg>
						<p className="text-[18px] ml-1">March, 2018 - March, 2020</p>
					</div>
					<div className="flex">
						<Image src={syllogisteksLogo} className="job-logo" alt="SyllogisTeks logo" width="30" height="25" />
						<h4 className="text-[20px] mb-2 ml-2">Web Developer</h4>
					</div>
					<p className="ml-5">
						<i>Clients include internal and PohlmanUSA.</i>
					</p>
					<RoleBullets role="syllogisteksWebDeveloper" />
				</div>
			</div>
			<div className="job border-t py-4" data-resume-entry="gateway">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">December, 2017 - March, 2023 (5 years 3 months)</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={gatewayitconsultingLogo} className="job-logo" alt="Gateway IT Consulting logo" width="30" height="25" />
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">Gateway IT Consulting</h3>
					</div>
					<h4 className="text-[24px] mb-2">Owner / Web Developer</h4>
					<p className="ml-5">
						<i>Clients include internal and Our Lady&apos;s Inn.</i>
					</p>
					<RoleBullets role="gateway" />
				</div>
			</div>
		</div>
	);
}
