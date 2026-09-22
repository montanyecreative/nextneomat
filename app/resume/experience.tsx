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

	// Side job: March 2023
	const currentSideJobStart = new Date(2023, 2, 1); // Month is 0-indexed, so 2 = March
	const currentSideJobDuration = calculateYearsAndMonths(currentSideJobStart);
	const currentSideJobDisplay = formatDuration(currentSideJobDuration.years, currentSideJobDuration.months);

	return (
		<div className="resume-intro text-left" id="experience">
			<h1 className="text-[32px] my-5 proxima-nova-semibold">Experience</h1>
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
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">Montanye Creative</h3>
					</div>
					<h4 className="text-[24px] mb-2">Founder / Principal Engineer</h4>
					<p className="ml-5">
						<i>Clients include Palladium Point as well as personal projects.</i>
					</p>
					<p className="ml-5 mt-1">
						- Designed and built a full e-commerce print shop for original infrared photography with a custom order-management
						system (Next.js, React, TypeScript, Stripe, Contentful), featuring a single-page Stripe checkout, a self-operated
						order pipeline (received, in production, shipped) with transactional email via Postmark, and Contentful-managed
						products and copy with built-in fallbacks for API downtime.
					</p>
					<p className="ml-5 mt-1">
						- Architected and built a production multi-tenant client portal with automated invoicing and real-time GitHub commit
						tracking (Next.js, React, TypeScript, PostgreSQL, Better Auth, Postmark; AI-assisted with Claude/Cursor).
					</p>
					<p className="ml-5 mt-1">
						- Designed and built a headless brand website for Compounds Coffee (Next.js, React, TypeScript) with all content
						managed in Contentful and served through a decoupled API, including a searchable store-locator experience that
						combined Contentful location data with the Google Places API to power real-time search and mapping.
					</p>
					<p className="ml-5 mt-1">
						- Designed, developed, and maintain external facing insurance talent recruitment website using Next.js, React,
						TypeScript, HTML5, CSS, SASS, Tailwind CSS, GSAP, Google Analytics, and shadcn/ui.
					</p>
					<p className="ml-5 mt-1">
						- Designed, developed, and maintain external facing one-page newsletter website using Next.js, React, TypeScript,
						HTML5, CSS, SASS, Tailwind CSS, GSAP, Google Analytics, and shadcn/ui.
					</p>
					<p className="ml-5 mt-1">
						- Designed, developed, and maintain external facing digital portfolio website using Next.js, React, TypeScript,
						HTML5, CSS, SASS, Tailwind CSS, GSAP, Google Analytics, and shadcn/ui.
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
					<p className="ml-5 mt-1">
						- Developed several external facing website sections for the Citizen/Bulova/Accutron/Frederique Constant/Alpina
						Salesforce Commerce Cloud US/CA/MX sites, including headers, footers, home pages, account pages, PLPs, PDPs, and
						PGPs, using JavaScript, ISML, Bootstrap, SASS, and responsive design.
					</p>
					<p className="ml-5 mt-1">
						- Led the creation and development of a new cartridge/site for the Alpina US brand migration to SFRA from
						Shopify/WordPress, and participated in leading the same for the Frederique Constant (US) and Accutron (US/CA/MX/UK)
						migrations from Shopify/WordPress, each seen to release and support beyond, using JavaScript, ISML, Bootstrap, SASS,
						and SFRA.
					</p>
					<p className="ml-5 mt-1">
						- Participated in leading the design, creation, and development of a master template cartridge, extended from the
						RedVan Workshop Autobahn product, to be used as a shell for new site implementations using JavaScript, ISML,
						Bootstrap, SASS, and SFRA. Wrote extensive support documentation for this template in Confluence.
					</p>
					<p className="ml-5 mt-1">
						- Migrated UK sites for Citizen/Bulova/Accutron/Frederique Constant/Alpina from Magento to SFRA.
					</p>
					<p className="ml-5 mt-1">
						- Created an example store locator Progressive Web App to interface with Contentful Headless CMS in prep for moving
						to the pwa-kit from SFRA, using TypeScript, Tailwind CSS, GSAP, and NextJS/React.
					</p>
					<p className="ml-5 mt-1">
						- Developed custom metrics sent from the SFRA implementation to the Klaviyo portal to improve the ability of the
						business to target customers via segmentation, using JavaScript, Klaviyo API, ISML, and OOD methodologies.
					</p>
					<p className="ml-5 mt-1">
						- Developed &quot;real time&quot; watch functionality to show the user&apos;s real time on watch faces while on
						PDPs, using JavaScript, ISML, Bootstrap, SASS, SFRA, and Photoshop.
					</p>
					<p className="ml-5 mt-1">
						- Led the development and communication between Citizen and an ADA compliance client to ensure the multi-sites met
						necessary WCAG compliance.
					</p>
					<p className="ml-5 mt-1">
						- Actively participated in the architecture and higher scope planning of the brand&apos;s multisite implementation,
						accounting for code hierarchy, extensibility, and DRY principles several times throughout new site and cartridge
						integrations.
					</p>
					<p className="ml-5 mt-1">
						- Regularly reviewed Salesforce&apos;s Log Center to find repetitive errors, effectively reducing error log bloat by
						80-90%; migrated the codebase from Bitbucket to GitHub to optimize builds for development and staging environments,
						cutting deploy time by 75% on average and running build pipelines to deploy code across environments.
					</p>
					<p className="ml-5 mt-1">
						- Managed the Jira Salesforce board to create more accurate project timelines via road-mapping, ticket
						scoping/refining, and business communication; created, summarized, and managed weekly release notes for iterative
						code builds shared with developers, project managers, and stakeholders.
					</p>
					<p className="ml-5 mt-1">
						- Facilitated communication between project managers, product owners, and the development team, often running the
						development team independently without needing intervention or oversight, and code reviewed team members&apos; code
						daily.
					</p>
					<p className="ml-5 mt-1">
						- Met weekly and daily with business stakeholders including executives, product owners, scrum masters, developers,
						and designers to communicate workflows, and used Agile methodologies and artifacts to refine, plan, and scope
						tickets for various projects set in complex timelines. Helped write READMEs for AI tools like Claude to ensure
						actions, queries, and linting were optimized for codebase architecture and branding rules.
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
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">Ignition Commerce</h3>
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
						<h3 className="text-[28px] ml-2 proxima-nova-semibold">New Balance</h3>
					</div>
					<h4 className="text-[24px] mb-2">Software Engineer - Salesforce Commerce Cloud (March, 2021 - May, 2022)</h4>
					<p className="ml-5">
						- Developed several external facing website sections using JavaScript, Bootstrap, SASS, ISML, and Salesforce
						Commerce Cloud for flagship transitioning releases of the IT, PT, ES, BE, AT, NL, DE, FR, UK, Malaysia, and Taiwan
						websites to the SFRA platform, often with several different locales.
					</p>
					<p className="ml-5 mt-1">
						- Developed several Salesforce Commerce Cloud components for Page Designer to automate work processes using
						JavaScript, Bootstrap, SASS, and ISML.
					</p>
					<p className="ml-5 mt-1">
						- Created a custom attribute editor to expand the functionality of Salesforce Commerce Cloud Page Designer using
						JavaScript, Bootstrap, SASS, and ISML.
					</p>
					<p className="ml-5 mt-1">
						- Developed a video enhancement for various Salesforce Commerce Cloud Page Designer components and for all other
						videos on New Balance sites to auto play inline on user scroll and be ADA compliant, using JavaScript, Bootstrap,
						SASS, and ISML.
					</p>
					<p className="ml-5 mt-1">
						- Developed and integrated the Emarsys email automation programs and emails for the Malaysia website release using
						Emarsys, Deck Commerce, HTML, ESL (Emarsys Scripting Language), SFRA, and Salesforce Commerce Cloud; connected and
						tested emails for various releases using the Emarsys platform and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Participated in several coding and international business activities to migrate the Magento website to SFRA for
						the flagship release of the Hong Kong website.
					</p>
					<p className="ml-5 mt-1">
						- Developed an internal facing interactive style guide using HTML, SASS, React, and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Wrote unit tests for external facing features using JavaScript, Mocha, and Sinon.
					</p>
					<p className="ml-5 mt-1">
						- Conducted and wrote several reports that demonstrated and measured the impact of Page Designer on automation of
						developer processes and wrote technical and organizational documentation for developers and business users.
					</p>
					<p className="ml-5 mt-1">
						- Handled several Salesforce access requests and managed users&apos; access and permissions to multiple
						environments, at times creating or modifying roles and permissions between regions and environments.
					</p>
					<p className="ml-5 mt-1">
						- Worked with SAFe agile practices including sprints, project planning and innovation sprints, retrospectives, train
						synchs, and refinement sessions. Used sprint boards to communicate workflow among the primary team, and participated
						in daily standups with stakeholders, product owners, project managers, designers, and other developers, often
						internationally, to communicate workflows.
					</p>
					<p className="ml-5 mt-1">
						- Worked with multiple projects and complex daily timelines to produce deliverables on time, using version control
						(Git through SourceTree and CLI) to collaborate on projects, and code reviewed team members&apos; code daily.
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
					<p className="ml-5">
						- Developed several external facing website sections using HTML5, Bootstrap, CSS3, JavaScript, and Salesforce
						Commerce Cloud for flagship transitioning releases of the US, CA, AU, NZ, BE, AT, NL, DE, FR, and UK websites, often
						with several locales for each site.
					</p>
					<p className="ml-5 mt-1">
						- Developed a Salesforce Commerce Cloud component for Page Designer to automate work processes using ISML, HTML,
						SASS, and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Translated complex, multi-layer Photoshop and inVision creatives into pixel perfect, responsive, ADA compliant
						external facing web pages, daily, for the US and CA Salesforce Commerce Cloud websites using HTML5, Bootstrap,
						Foundations, CSS3, and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Developed and ensured that code was ADA compliant and translated properly, to match French language laws, from the
						US external facing Salesforce Commerce Cloud website to the CA external facing Salesforce Commerce Cloud website,
						adjusting designs when necessary to retain design integrity.
					</p>
					<p className="ml-5 mt-1">
						- Used Photoshop to export optimized web safe images from complex and multi-layered creatives.
					</p>
					<p className="ml-5 mt-1">
						- Trained team members how to use various systems and how to write accurate and DRY code that upheld ADA compliance,
						and code reviewed team members&apos; code daily.
					</p>
					<p className="ml-5 mt-1">
						- Held cross team meetings to demo and present web page projects with product owners and designers, at times
						internationally.
					</p>
					<p className="ml-5 mt-1">
						- Wrote organizational documentation for systems as discovered through development and usage.
					</p>
					<p className="ml-5 mt-1">
						- Agile experience: bi-weekly sprints, weekly grooming sessions, and Kanban/sprint boards to communicate workflow
						among the primary team and other teams related to projects. Participated in daily standups with stakeholders,
						product owners, project managers, designers, and other developers, often internationally, to communicate workflows.
					</p>
					<p className="ml-5 mt-1">
						- Worked with multiple projects and complex daily timelines to produce deliverables on time, using version control
						(Git through SourceTree and CLI) to collaborate on projects.
					</p>
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
					<p className="ml-5">
						- Audited and optimized an external facing application for ADA AA compliance using HTML, CSS, Bootstrap, JavaScript,
						and AngularJS.
					</p>
					<p className="ml-5 mt-1">
						- Developed external facing websites and application front-ends using JavaScript, Angular (7/8), AngularJS,
						Bootstrap 4, SASS, CSS3, and HTML5.
					</p>
					<p className="ml-5 mt-1">
						- Designed and developed the front-end for an internal facing statistical dashboard using JavaScript, Angular 7,
						Bootstrap 4, SASS, CSS3, and HTML5.
					</p>
					<p className="ml-5 mt-1">
						- Built a GET REST method API and consumed it using C# and TypeScript, and consumed RESTful web services/APIs across
						projects.
					</p>
					<p className="ml-5 mt-1">
						- Took mocks from the designer and developed responsive web pages using JavaScript, AngularJS, Bootstrap 4, HTML5,
						and CSS3.
					</p>
					<p className="ml-5 mt-1">
						- Developed a SASS implementation for an external facing application to be optimized for multiple brands and created
						a variety of websites using responsive design.
					</p>
					<p className="ml-5 mt-1">
						- Supported an external facing WordPress website utilizing PHP.
					</p>
					<p className="ml-5 mt-1">
						- Supported projects with Git, SVN, and TortoiseHg, and developed optimization tasks using Gulp, Batch files, and
						Vagrant.
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
					<p className="ml-5">
						- Designed and developed an external facing digital portfolio website using React, Material Design (MUI),
						JavaScript, HTML5, and CSS.
					</p>
					<p className="ml-5 mt-1">
						- Designed and developed an external facing wedding website that interfaced with an API for GET/POST requests using
						React, Material Design, JavaScript, HTML5, CSS, PostgreSQL, Node.js, Google Analytics, and Mailchimp.
					</p>
					<p className="ml-5 mt-1">
						- Prototyped in inVision and developed an external facing, data driven dashboard using TypeScript, Angular 11,
						Material Design, SASS, and HTML5.
					</p>
					<p className="ml-5 mt-1">
						- Designed and developed an external facing, responsive application using JavaScript, Angular 7, Bootstrap 4, SASS,
						HTML5, and JSON.
					</p>
					<p className="ml-5 mt-1">
						- Prototyped in Sketch and developed an external facing, responsive website using JavaScript, AngularJS, PHP, SASS,
						CSS3, and HTML5, built on a custom-written SASS library.
					</p>
					<p className="ml-5 mt-1">
						- Developed a custom-made CSS3/SASS library to be used as an alternative to Bootstrap for clients.
					</p>
					<p className="ml-5 mt-1">
						- Improved WordPress functionality to automate business processes for a client and wrote documentation to support
						the functionality using PHP, HTML5, CSS, and JavaScript.
					</p>
					<p className="ml-5 mt-1">
						- Developed and supported several WordPress websites using JavaScript, CSS3, HTML5, PHP, SQL, and Google Analytics.
					</p>
					<p className="ml-5 mt-1">
						- Developed information reports of user data from Google Analytics for organizations to optimize social media
						outreach, and used 3rd party form integration tools to increase website traffic and profit generation from virtual
						events.
					</p>
					<p className="ml-5 mt-1">
						- Project managed, from a technical perspective, a successful virtual marathon in response to COVID business impact.
					</p>
					<p className="ml-5 mt-1">
						- Supported projects with Git and GitHub, and developed optimization tasks using Gulp, Node.js, NPM, and Batch
						files.
					</p>
					<p className="ml-5 mt-1">
						- Used Photoshop to create and optimize multi-layered graphics for applications and brands, and used InDesign to
						create and present RFPs for potential clients.
					</p>
				</div>
			</div>
		</div>
	);
}
