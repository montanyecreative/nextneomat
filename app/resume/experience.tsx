import React from "react";
import Image from "next/image";

const citizenLogo = "/resume/citizen-logo.webp";
const ignitionLogo = "/resume/ignition-commerce-logo.webp";
const newbalanceLogo = "/resume/newbalance.svg";
const syllogisteksLogo = "/resume/syllogisteks.ico";
const montanyecreativeLogo = "/logo.webp";
const gatewayitconsultingLogo = "/resume/gitc.svg";

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

	// Current job: October 2022
	const currentJobStart = new Date(2022, 9, 1); // Month is 0-indexed, so 9 = October
	const currentJobDuration = calculateYearsAndMonths(currentJobStart);
	const currentJobDisplay = formatDuration(currentJobDuration.years, currentJobDuration.months);

	// Side job: March 2023
	const currentSideJobStart = new Date(2023, 2, 1); // Month is 0-indexed, so 2 = March
	const currentSideJobDuration = calculateYearsAndMonths(currentSideJobStart);
	const currentSideJobDisplay = formatDuration(currentSideJobDuration.years, currentSideJobDuration.months);

	return (
		<div className="resume-intro text-left" id="experience">
			<h1 className="text-[32px] my-5">Experience</h1>
			<div className="job border-t py-4">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M7.49985 0.877045C3.84216 0.877045 0.877014 3.84219 0.877014 7.49988C0.877014 11.1575 3.84216 14.1227 7.49985 14.1227C11.1575 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1575 0.877045 7.49985 0.877045ZM1.82701 7.49988C1.82701 4.36686 4.36683 1.82704 7.49985 1.82704C10.6328 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6328 13.1727 7.49985 13.1727C4.36683 13.1727 1.82701 10.6329 1.82701 7.49988ZM7.49999 9.49999C8.60456 9.49999 9.49999 8.60456 9.49999 7.49999C9.49999 6.39542 8.60456 5.49999 7.49999 5.49999C6.39542 5.49999 5.49999 6.39542 5.49999 7.49999C5.49999 8.60456 6.39542 9.49999 7.49999 9.49999Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">October, 2022 - Current ({currentJobDisplay})</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={citizenLogo} className="job-logo" alt="Citizen Watch America logo" width="40" height="25" />
						<h3 className="text-[28px] ml-2">Citizen Watch America</h3>
					</div>
					<h4 className="text-[24px] mb-2">Salesforce Commerce Cloud Developer</h4>
					<p className="ml-5">
						<i>Currently hidden to maintain client privacy.</i>
					</p>
				</div>
			</div>
			<div className="job border-t py-4">
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
						<h3 className="text-[28px] ml-2">Ignition Commerce</h3>
					</div>
					<h4 className="text-[24px] mb-2">Salesforce Commerce Cloud Developer</h4>
					<p className="ml-5">
						<i>
							Brands/sites worked include Johnston &amp; Murphy, Sheet Music Plus, Cherished Memories, ReserveBar, and
							LuxeDecor.
						</i>
					</p>
					<p className="ml-5 mt-1">
						- Developed several Salesforce Commerce Cloud components for Page Designer using ISML, Bootstrap, SASS, and
						JavaScript to help clients facilitate content production migrating to SFRA.
					</p>
					<p className="ml-5 mt-1">
						- Initialized and developed Salesforce Commerce Cloud sibling/multi sites for main brand using Bootstrap, SASS, and
						ISML.
					</p>
					<p className="ml-5 mt-1">
						- Developed several external facing website sections for Salesforce Commerce Cloud sites, including headers,
						footers, home pages, PDPs, PGPs, and CLPs, for multiple clients migrating to SFRA implementation using JavaScript,
						ISML, Bootstrap, SASS, and responsive design.
					</p>
					<p className="ml-5 mt-1">
						- Developed solutions for several bugs, for external facing SFRA implemented websites using ISML, Bootstrap, SASS,
						and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Worked with multiple clients, projects, and complex daily timelines to produce deliverables on time.
					</p>
					<p className="ml-5 mt-1">
						- Wrote comprehensive weekly reports that discussed current implementations, processes, and blockers for projects to
						product owners and project managers.
					</p>
					<p className="ml-5 mt-1">
						- Wrote technical documentation for various systems as discovered through development and usage.
					</p>
				</div>
			</div>
			<div className="job border-t py-4">
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
						<h3 className="text-[28px] ml-2">New Balance</h3>
					</div>
					<h4 className="text-[24px] mb-2">Software Engineer - Salesforce Commerce Cloud Developer</h4>
					<p className="ml-5">
						- Developed several external facing website sections using JavaScript, Bootstrap, SASS, ISML, and Salesforce
						Commerce Cloud for flagship transitioning releases of IT, PT, ES, BE, AT, NL, DE, FR, UK, Malaysia, and Taiwan
						websites to SFRA platform, often with several different locales.
					</p>
					<p className="ml-5 mt-1">
						- Developed several Salesforce Commerce Cloud components for Page Designer to automate work processes using
						JavaScript, Bootstrap, SASS, and ISML.
					</p>
					<p className="ml-5 mt-1">
						- Developed a video enhancement for various Salesforce Commerce Cloud Page Designer components and for all other
						videos on New Balance sites to auto play inline on user scroll and be ADA compliant using JavaScript, Bootstrap,
						SASS, and ISML.
					</p>
					<p className="ml-5 mt-1">
						- Created a custom attribute editor to expand the functionality of Salesforce Commerce Cloud Page Designer using
						JavaScript, Bootstrap, SASS, and ISML.
					</p>
					<p className="ml-5 mt-1">
						- Developed and integrated the Emarsys email automation programs and emails for the Malaysia website release using
						Emarsys, Deck Commerce, HTML, ESL (Emarsys Scripting Language), SFRA, and Salesforce Commerce Cloud.
					</p>
					<p className="ml-5 mt-1">
						- Participated in several coding and international business activities to migrate Magento website to SFRA for
						flagship release of Hong Kong website.
					</p>
					<p className="ml-5 mt-1">
						- Developed internal facing interactive style guide using HTML, SASS, React, and JavaScript.
					</p>
					<p className="ml-5 mt-1">- Wrote unit tests for external facing features using JavaScript, Mocha, and Sinon.</p>
					<p className="ml-5 mt-1">- Connected and tested emails for various releases using Emarsys platform and JavaScript.</p>
					<p className="ml-5 mt-1">
						- Worked with SAFe agile practices including sprints, project planning and innovation sprints, retrospectives, train
						synchs, and refinement sessions. Used sprint boards to communicate workflow among primary team. Participated in
						daily standups with stakeholders, product owners, project managers, designers, and other developers, often
						internationally to communicate workflows.
					</p>
					<p className="ml-5 mt-1">
						- Conducted and wrote several reports that demonstrated and measured the impact of Page Designer on automation of
						developer processes.
					</p>
					<p className="ml-5 mt-1">- Wrote technical and organizational documentation for developers and business users.</p>
					<p className="ml-5 mt-1">
						- Handled several Salesforce access requests and managed users&apos; access and permissions to multiple
						environments, at times creating or modifying roles and permissions between regions and environments.
					</p>
					<p className="ml-5 mt-1">
						- Worked with multiple projects and complex daily timelines to produce deliverables on time.
					</p>
					<p className="ml-5 mt-1">- Used version control system Git through SourceTree and CLI to collaborate on projects.</p>
					<p className="ml-5 mt-1">- Code reviewed team members code daily.</p>
				</div>
			</div>
			<div className="job border-t py-4">
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
						<h3 className="text-[28px] ml-2">SyllogisTeks</h3>
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
					<p className="ml-5">
						- Developed several external facing website sections using HTML5, Bootstrap, CSS3, JavaScript, and Salesforce
						Commerce Cloud for flagship transitioning releases of US, CA, AU, NZ, BE, AT, NL, DE, FR, and UK websites, often
						with several locales for each site.
					</p>
					<p className="ml-5 mt-1">
						- Developed Salesforce Commerce Cloud component for Page Designer to automate work processes using ISML, HTML, SASS,
						and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Translated complex, multi-layer Photoshop and inVision creatives into pixel perfect, responsive, ADA compliant
						external facing web pages, daily, for US and CA Salesforce Commerce Cloud websites using HTML5, Bootstrap,
						Foundations, CSS3, and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Developed and ensured that code was ADA compliant and translated properly, to match French language laws, from US
						external facing Salesforce Commerce Cloud website to CA external facing Salesforce Commerce Cloud website, adjusting
						designs when necessary to retain design integrity.
					</p>
					<p className="ml-5 mt-1">
						- Used Photoshop to export optimized web safe images from complex and multi-layered creatives.
					</p>
					<p className="ml-5 mt-1">
						- Trained team members how to use various systems and how to write accurate and DRY code that upheld ADA compliance.
					</p>
					<p className="ml-5 mt-1">- Code reviewed team members code daily.</p>
					<p className="ml-5 mt-1">
						- Held cross team meetings to demo and present web page projects with product owners and designers, at times
						Internationally.
					</p>
					<p className="ml-5 mt-1">
						- Wrote organizational documentation for systems as discovered through development and usage.
					</p>
					<p className="ml-5 mt-1">
						- Agile experience - bi-weekly sprints, weekly refinement sessions, used Kanban/sprint boards to communicate
						workflow among primary team and other teams related to projects. Participated in daily standups with stakeholders,
						product owners, project managers, designers, and other developers, often Internationally to communicate workflows.
					</p>
					<p className="ml-5 mt-1">
						- Worked with multiple projects and complex daily timelines to produce deliverables on time.
					</p>
					<p className="ml-5 mt-1">- Used version control system Git through SourceTree and CLI to collaborate on projects.</p>
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
					<p className="ml-5 mt-1">
						- Audited and optimized external facing application for ADA AA compliance using HTML, CSS, Bootstrap, JavaScript,
						and AngularJS.
					</p>
					<p className="ml-5 mt-1">
						- Developed external facing website using JavaScript, Angular 8, Bootstrap 4, SASS, CSS3, and HTML5.
					</p>
					<p className="ml-5 mt-1">
						- Developed front-end for external facing application using JavaScript, AngularJS, Bootstrap 4, SASS, CSS3, and
						HTML5.
					</p>
					<p className="ml-5 mt-1">- Built GET REST method API and consumed API using C# and TypeScript.</p>
					<p className="ml-5 mt-1">
						- Designed and developed front-end for internal facing statistical dashboard using JavaScript, Angular 7, Bootstrap
						4, SASS, CSS3, and HTML5.
					</p>
					<p className="ml-5 mt-1">
						- Took mocks from designer and developed JavaScript, AngularJS, Bootstrap 4, HTML5, CSS3, responsive web pages.
					</p>
					<p className="ml-5 mt-1">
						- Developed SASS implementation for external facing application to be optimized for multiple brands.
					</p>
					<p className="ml-5 mt-1">- Supported external facing WordPress website utilizing PHP.</p>
					<p className="ml-5 mt-1">- Supported projects with Git, SVN, and TortoiseHg.</p>
					<p className="ml-5 mt-1">- Developed optimization tasks using Gulp, Batch files, and Vagrant.</p>
					<p className="ml-5 mt-1">- Created a variety of websites using Responsive Design.</p>
					<p className="ml-5 mt-1">- Consumed RESTful Web Services / API&apos;s.</p>
				</div>
			</div>
			<div className="job border-t py-4">
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
						<h3 className="text-[28px] ml-2">Montanye Creative</h3>
					</div>
					<h4 className="text-[24px] mb-2">Owner &amp; Lead Software Engineer</h4>
					<p className="ml-5">
						<i>Clients include internal and Palladium Point.</i>
					</p>
					<p className="ml-5 mt-1">
						- Designed, developed, and maintain external facing one-page newsletter website using Next.JS, React JS, TypeScript,
						HTML5, CSS, SASS, TailwindCSS, GSAP, Google Analytics, and shadcnui.
					</p>
					<p className="ml-5 mt-1">
						- Designed, developed, and maintain external facing insurance talent recruitment website using Next.JS, React JS,
						TypeScript, HTML5, CSS, SASS, TailwindCSS, GSAP, Google Analytics, and shadcnui.
					</p>
					<p className="ml-5 mt-1">
						- Designed, developed, and maintain external facing digital portfolio website using Next.JS, React JS, TypeScript,
						HTML5, CSS, SASS, TailwindCSS, GSAP, Google Analytics, and shadcnui.
					</p>
				</div>
			</div>
			<div className="job border-t py-4">
				<div className="flex py-1">
					<svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						></path>
					</svg>
					<p className="text-[18px] ml-1">2018 - 2023 (5 years)</p>
				</div>
				<div className="company-section">
					<div className="flex">
						<Image src={gatewayitconsultingLogo} className="job-logo" alt="Gateway IT Consulting logo" width="30" height="25" />
						<h3 className="text-[28px] ml-2">Gateway IT Consulting</h3>
					</div>
					<h4 className="text-[24px] mb-2">Owner &amp; Lead Software Engineer</h4>
					<p className="ml-5">
						<i>Clients include internal and Our Lady&apos;s Inn.</i>
					</p>
					<p className="ml-5 mt-1">
						- Designed and developed external facing digital portfolio website using React, Material Design (MUI), JavaScript,
						HTML5, CSS.
					</p>
					<p className="ml-5 mt-1">
						- Designed and developed external facing wedding website that interfaced with API for GET/POST requests using React,
						Material Design, JavaScript, HTML5, CSS, PostgreSQL, Nodejs, Google Analytics, and Mailchimp.
					</p>
					<p className="ml-5 mt-1">
						- Project managed from a technical perspective, successful virtual marathon for response to COVID business impact.
					</p>
					<p className="ml-5 mt-1">
						- Prototyped in inVision and developed TypeScript, Angular 11, Material Design, SASS, HTML5, external facing, data
						driven dashboard.
					</p>
					<p className="ml-5 mt-1">
						- Designed and developed JavaScript, Angular 7, Bootstrap 4, SASS, HTML5, JSON-using external facing, responsive
						application.
					</p>
					<p className="ml-5 mt-1">
						- Prototyped in Sketch and developed JavaScript, AngularJS, PHP, SASS, CSS3, HTML5 external facing, responsive
						website using custom wrote SASS library.
					</p>
					<p className="ml-5 mt-1">
						- Developed application using WordPress, JavaScript, CSS3, HTML5, PHP, SQL, and Google Analytics.
					</p>
					<p className="ml-5 mt-1">
						- Developed information reports of user data from Google Analytics for organizations to optimize social media
						outreach and used 3rd party form integration tools to increase website traffic and profit generation from virtual
						events.
					</p>
					<p className="ml-5 mt-1">
						- Supported several WordPress websites using JavaScript, CSS3, HTML5, PHP, SQL, and Google Analytics.
					</p>
					<p className="ml-5 mt-1">
						- Developed custom made CSS3/SASS library to be used as an alternative for clients to Bootstrap.
					</p>
					<p className="ml-5 mt-1">- Supported projects with Git and GitHub.</p>
					<p className="ml-5 mt-1">- Developed optimization tasks using Gulp, NPM, and Batch files.</p>
					<p className="ml-5 mt-1">- Used Photoshop to create and optimize multi-layered graphics for applications and brands.</p>
				</div>
			</div>
		</div>
	);
}
