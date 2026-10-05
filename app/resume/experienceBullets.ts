/**
 * Experience bullets for both views of the resume page, stored per role.
 *
 * The two lists are not paired one for one: the counts differ by role, so nothing here should
 * ever match a business bullet to a technical one by position. The whole list swaps at once.
 *
 * The technical lists are the copy the page has always shown and are the recruiter view. The
 * business lists are John's own copy and are final.
 */

/** Which list a role renders. Business view is the default. */
export type ResumeView = "business" | "recruiter";

export type RoleKey =
	| "montanyeCreative"
	| "citizen"
	| "ignition"
	| "newBalance"
	| "syllogisteksNewBalance"
	| "syllogisteksWebDeveloper"
	| "gateway";

type RoleBullets = {
	business: string[];
	technical: string[];
};

export const EXPERIENCE_BULLETS: Record<RoleKey, RoleBullets> = {
	/** Montanye Creative, Founder / Principal Engineer */
	montanyeCreative: {
		business: [
			"Founder of an independent web development studio building production web applications for clients, from architecture and design through deployment and ongoing support.",
			"Architected and built a production, multi-tenant client portal with automated invoicing and real-time GitHub commit tracking (Next.js, React, TypeScript, PostgreSQL, Better Auth, Postmark; AI-assisted with Claude/Cursor).",
			"Designed and built a headless brand website for Compounds Coffee (Next.js, React, TypeScript, Contentful), including a searchable store locator that fuses Contentful location data with the Google Places API for real-time search and mapping.",
			"Designed, developed, and maintain a range of customer-facing sites, including an insurance talent recruitment site, a newsletter landing page, and digital portfolios, on a consistent modern stack (Next.js, React, TypeScript, Tailwind, SASS, GSAP, shadcn/ui, Google Analytics).",
		],
		technical: [
			"Designed and built a full e-commerce print shop for original infrared photography with a custom order-management system (Next.js, React, TypeScript, Stripe, Contentful), featuring a single-page Stripe checkout, a self-operated order pipeline (received, in production, shipped) with transactional email via Postmark, and Contentful-managed products and copy with built-in fallbacks for API downtime.",
			"Architected and built a production multi-tenant client portal with automated invoicing and real-time GitHub commit tracking (Next.js, React, TypeScript, PostgreSQL, Better Auth, Postmark; AI-assisted with Claude/Cursor).",
			"Designed and built a headless brand website for Compounds Coffee (Next.js, React, TypeScript) with all content managed in Contentful and served through a decoupled API, including a searchable store-locator experience that combined Contentful location data with the Google Places API to power real-time search and mapping.",
			"Designed, developed, and maintain external facing insurance talent recruitment website using Next.js, React, TypeScript, HTML5, CSS, SASS, Tailwind CSS, GSAP, Google Analytics, and shadcn/ui.",
			"Designed, developed, and maintain external facing one-page newsletter website using Next.js, React, TypeScript, HTML5, CSS, SASS, Tailwind CSS, GSAP, Google Analytics, and shadcn/ui.",
			"Designed, developed, and maintain external facing digital portfolio website using Next.js, React, TypeScript, HTML5, CSS, SASS, Tailwind CSS, GSAP, Google Analytics, and shadcn/ui.",
		],
	},
	/** Citizen Watch America */
	citizen: {
		business: [
			"Co-owned the front-end across a portfolio of global watch brands (Citizen, Bulova, Accutron, Frederique Constant, Alpina) on Salesforce Commerce Cloud, spanning US, CA, MX, and UK storefronts, building everything from headers and footers to home pages, account pages, PLPs, PDPs, and PGPs.",
			"Helped lead brand migrations onto SFRA, building new cartridges and sites for Alpina, Frederique Constant, and Accutron from Shopify/WordPress, and migrating the UK brands from Magento, each seen through to release and ongoing support.",
			"Helped design and build a master template cartridge (extended from RedVan Workshop's Autobahn) used as the shell for new site implementations, and wrote the supporting Confluence documentation.",
			"Owned ADA/WCAG accessibility compliance across the multi-brand sites, leading communication with the compliance partner.",
			"Participated in multi-site architecture and higher-scope planning, accounting for code hierarchy, extensibility, and DRY principles across new site and cartridge builds.",
			"Cut average deploy time ~75% by migrating the codebase from Bitbucket to GitHub and optimizing build pipelines for dev and staging.",
			"Reduced error-log bloat 80–90% by regularly auditing Salesforce Log Center for repetitive errors.",
			"Built a headless store-locator PWA against Contentful (TypeScript, Next.js/React, Tailwind, GSAP) to prep the move toward PWA Kit, plus custom SFRA-to-Klaviyo metrics to improve customer segmentation.",
			"Worked largely independently while code reviewing team members' code daily, managing the Jira board and weekly release notes, and facilitating Agile delivery across PMs, product owners, executives, and designers.",
		],
		technical: [
			"Developed several external facing website sections for the Citizen/Bulova/Accutron/Frederique Constant/Alpina Salesforce Commerce Cloud US/CA/MX sites, including headers, footers, home pages, account pages, PLPs, PDPs, and PGPs, using JavaScript, ISML, Bootstrap, SASS, and responsive design.",
			"Led the creation and development of a new cartridge/site for the Alpina US brand migration to SFRA from Shopify/WordPress, and participated in leading the same for the Frederique Constant (US) and Accutron (US/CA/MX/UK) migrations from Shopify/WordPress, each seen to release and support beyond, using JavaScript, ISML, Bootstrap, SASS, and SFRA.",
			"Participated in leading the design, creation, and development of a master template cartridge, extended from the RedVan Workshop Autobahn product, to be used as a shell for new site implementations using JavaScript, ISML, Bootstrap, SASS, and SFRA. Wrote extensive support documentation for this template in Confluence.",
			"Migrated UK sites for Citizen/Bulova/Accutron/Frederique Constant/Alpina from Magento to SFRA.",
			"Created an example store locator Progressive Web App to interface with Contentful Headless CMS in prep for moving to the pwa-kit from SFRA, using TypeScript, Tailwind CSS, GSAP, and NextJS/React.",
			"Developed custom metrics sent from the SFRA implementation to the Klaviyo portal to improve the ability of the business to target customers via segmentation, using JavaScript, Klaviyo API, ISML, and OOD methodologies.",
			"Developed \"real time\" watch functionality to show the user's real time on watch faces while on PDPs, using JavaScript, ISML, Bootstrap, SASS, SFRA, and Photoshop.",
			"Led the development and communication between Citizen and an ADA compliance client to ensure the multi-sites met necessary WCAG compliance.",
			"Actively participated in the architecture and higher scope planning of the brand's multisite implementation, accounting for code hierarchy, extensibility, and DRY principles several times throughout new site and cartridge integrations.",
			"Regularly reviewed Salesforce's Log Center to find repetitive errors, effectively reducing error log bloat by 80-90%; migrated the codebase from Bitbucket to GitHub to optimize builds for development and staging environments, cutting deploy time by 75% on average and running build pipelines to deploy code across environments.",
			"Managed the Jira Salesforce board to create more accurate project timelines via road-mapping, ticket scoping/refining, and business communication; created, summarized, and managed weekly release notes for iterative code builds shared with developers, project managers, and stakeholders.",
			"Facilitated communication between project managers, product owners, and the development team, often running the development team independently without needing intervention or oversight, and code reviewed team members' code daily.",
			"Met weekly and daily with business stakeholders including executives, product owners, scrum masters, developers, and designers to communicate workflows, and used Agile methodologies and artifacts to refine, plan, and scope tickets for various projects set in complex timelines. Helped write READMEs for AI tools like Claude to ensure actions, queries, and linting were optimized for codebase architecture and branding rules.",
		],
	},
	/** Ignition Commerce */
	ignition: {
		business: [
			"Built Salesforce Commerce Cloud components in Page Designer to help clients produce and manage content as they migrated onto SFRA, using ISML, SCSS, and JavaScript.",
			"Initialized and developed SFCC sibling/multi-sites for a main brand, standing up new storefronts from the ground up.",
			"Developed customer-facing site sections (headers, footers, home pages, PDPs, PGPs, and category/content landing pages) for multiple clients migrating to SFRA, with responsive design across the board.",
			"Diagnosed and fixed bugs across live SFRA storefronts, keeping client sites stable through active migrations.",
			"Balanced multiple clients, projects, and complex daily timelines, consistently delivering on schedule.",
			"Wrote weekly status reports (implementations, process, and blockers) for product owners and project managers, and authored technical documentation for systems as they evolved.",
		],
		technical: [
			"Developed several Salesforce Commerce Cloud components for Page Designer using ISML, Bootstrap, SASS, and JavaScript to help clients facilitate content production migrating to SFRA.",
			"Initialized and developed Salesforce Commerce Cloud sibling/multi sites for main brand using Bootstrap, SASS, and ISML.",
			"Developed several external facing website sections for Salesforce Commerce Cloud sites, including headers, footers, home pages, PDPs, PGPs, and CLPs, for multiple clients migrating to SFRA implementation using JavaScript, ISML, Bootstrap, SASS, and responsive design.",
			"Developed solutions for several bugs, for external facing SFRA implemented websites using ISML, Bootstrap, SASS, and JavaScript.",
			"Worked with multiple clients, projects, and complex daily timelines to produce deliverables on time.",
			"Wrote comprehensive weekly reports that discussed current implementations, processes, and blockers for projects to product owners and project managers.",
			"Wrote technical documentation for various systems as discovered through development and usage.",
		],
	},
	/** New Balance, Software Engineer */
	newBalance: {
		business: [
			"Built customer-facing site sections for New Balance's global SFRA migration, shipping flagship storefronts across 15+ markets (US, CA, AU, NZ, UK, DE, FR, BE, AT, NL, ES, IT, Malaysia, Taiwan, Hong Kong, and more), frequently handling multiple locales per site.",
			"Developed Salesforce Commerce Cloud components for Page Designer to automate developer workflows, including a custom attribute editor that extended Page Designer's functionality, and reported on the measured impact of that automation.",
			"Built a video enhancement used across New Balance sites, auto-playing videos inline on scroll while keeping them ADA compliant.",
			"Integrated Emarsys email automation for the Malaysia release (Emarsys, ESL, Deck Commerce, SFRA), and connected and tested transactional emails across multiple releases.",
			"Owned ADA/WCAG accessibility as a daily discipline, translating complex Photoshop/InVision creatives into pixel-perfect, responsive, compliant pages, and ensuring US-to-CA sites met French-language legal requirements without losing design integrity.",
			"Built an internal interactive style guide (React, JavaScript, SASS) and wrote unit tests for customer-facing features (Mocha, Sinon).",
			"Managed Salesforce access and permissions across regions and environments, creating and modifying roles between teams.",
			"Trained team members on internal systems and on writing accurate, DRY, ADA-compliant code, and code-reviewed the team's work daily.",
			"Worked in SAFe/Agile delivery, sprints, grooming, retrospectives, train syncs, and daily standups, collaborating across product owners, designers, PMs, and developers, often internationally.",
		],
		technical: [
			"Developed several external facing website sections using JavaScript, Bootstrap, SASS, ISML, and Salesforce Commerce Cloud for flagship transitioning releases of the IT, PT, ES, BE, AT, NL, DE, FR, UK, Malaysia, and Taiwan websites to the SFRA platform, often with several different locales.",
			"Developed several Salesforce Commerce Cloud components for Page Designer to automate work processes using JavaScript, Bootstrap, SASS, and ISML.",
			"Created a custom attribute editor to expand the functionality of Salesforce Commerce Cloud Page Designer using JavaScript, Bootstrap, SASS, and ISML.",
			"Developed a video enhancement for various Salesforce Commerce Cloud Page Designer components and for all other videos on New Balance sites to auto play inline on user scroll and be ADA compliant, using JavaScript, Bootstrap, SASS, and ISML.",
			"Developed and integrated the Emarsys email automation programs and emails for the Malaysia website release using Emarsys, Deck Commerce, HTML, ESL (Emarsys Scripting Language), SFRA, and Salesforce Commerce Cloud; connected and tested emails for various releases using the Emarsys platform and JavaScript.",
			"Participated in several coding and international business activities to migrate the Magento website to SFRA for the flagship release of the Hong Kong website.",
			"Developed an internal facing interactive style guide using HTML, SASS, React, and JavaScript.",
			"Wrote unit tests for external facing features using JavaScript, Mocha, and Sinon.",
			"Conducted and wrote several reports that demonstrated and measured the impact of Page Designer on automation of developer processes and wrote technical and organizational documentation for developers and business users.",
			"Handled several Salesforce access requests and managed users' access and permissions to multiple environments, at times creating or modifying roles and permissions between regions and environments.",
			"Worked with SAFe agile practices including sprints, project planning and innovation sprints, retrospectives, train synchs, and refinement sessions. Used sprint boards to communicate workflow among the primary team, and participated in daily standups with stakeholders, product owners, project managers, designers, and other developers, often internationally, to communicate workflows.",
			"Worked with multiple projects and complex daily timelines to produce deliverables on time, using version control (Git through SourceTree and CLI) to collaborate on projects, and code reviewed team members' code daily.",
		],
	},
	/** SyllogisTeks, Web Developer Contractor at New Balance. The New Balance business list covers
 * this role too, so business view shows the title and dates only */
	syllogisteksNewBalance: {
		business: [],
		technical: [
			"Developed several external facing website sections using HTML5, Bootstrap, CSS3, JavaScript, and Salesforce Commerce Cloud for flagship transitioning releases of the US, CA, AU, NZ, BE, AT, NL, DE, FR, and UK websites, often with several locales for each site.",
			"Developed a Salesforce Commerce Cloud component for Page Designer to automate work processes using ISML, HTML, SASS, and JavaScript.",
			"Translated complex, multi-layer Photoshop and inVision creatives into pixel perfect, responsive, ADA compliant external facing web pages, daily, for the US and CA Salesforce Commerce Cloud websites using HTML5, Bootstrap, Foundations, CSS3, and JavaScript.",
			"Developed and ensured that code was ADA compliant and translated properly, to match French language laws, from the US external facing Salesforce Commerce Cloud website to the CA external facing Salesforce Commerce Cloud website, adjusting designs when necessary to retain design integrity.",
			"Used Photoshop to export optimized web safe images from complex and multi-layered creatives.",
			"Trained team members how to use various systems and how to write accurate and DRY code that upheld ADA compliance, and code reviewed team members' code daily.",
			"Held cross team meetings to demo and present web page projects with product owners and designers, at times internationally.",
			"Wrote organizational documentation for systems as discovered through development and usage.",
			"Agile experience: bi-weekly sprints, weekly grooming sessions, and Kanban/sprint boards to communicate workflow among the primary team and other teams related to projects. Participated in daily standups with stakeholders, product owners, project managers, designers, and other developers, often internationally, to communicate workflows.",
			"Worked with multiple projects and complex daily timelines to produce deliverables on time, using version control (Git through SourceTree and CLI) to collaborate on projects.",
		],
	},
	/** SyllogisTeks, Web Developer */
	syllogisteksWebDeveloper: {
		business: [
			"Built customer-facing web applications with Angular (7/8) and JavaScript, including a multi-brand front-end architected with SASS for reuse across brands.",
			"Audited and remediated a customer-facing application to ADA AA / WCAG accessibility standards.",
			"Designed and built an internal statistical dashboard front-end (Angular, SASS, responsive design).",
			"Built and consumed REST APIs across the stack, including a GET endpoint in C# consumed with TypeScript.",
			"Translated designer mocks into pixel-accurate, responsive web pages, and supported a WordPress/PHP site alongside the Angular work.",
			"Set up front-end build and optimization tooling (Gulp, Vagrant, batch scripts) and collaborated across Git, SVN, and Mercurial.",
		],
		technical: [
			"Audited and optimized an external facing application for ADA AA compliance using HTML, CSS, Bootstrap, JavaScript, and AngularJS.",
			"Developed external facing websites and application front-ends using JavaScript, Angular (7/8), AngularJS, Bootstrap 4, SASS, CSS3, and HTML5.",
			"Designed and developed the front-end for an internal facing statistical dashboard using JavaScript, Angular 7, Bootstrap 4, SASS, CSS3, and HTML5.",
			"Built a GET REST method API and consumed it using C# and TypeScript, and consumed RESTful web services/APIs across projects.",
			"Took mocks from the designer and developed responsive web pages using JavaScript, AngularJS, Bootstrap 4, HTML5, and CSS3.",
			"Developed a SASS implementation for an external facing application to be optimized for multiple brands and created a variety of websites using responsive design.",
			"Supported an external facing WordPress website utilizing PHP.",
			"Supported projects with Git, SVN, and TortoiseHg, and developed optimization tasks using Gulp, Batch files, and Vagrant.",
		],
	},
	/** Gateway IT Consulting */
	gateway: {
		business: [
			"Ran a freelance web development practice, delivering full-stack sites and applications for clients end to end, from prototyping (Sketch, InVision) through development, launch, and ongoing support.",
			"Designed and built customer-facing React applications, including a portfolio site (React, MUI) and a data-driven wedding site with full GET/POST API integration (React, Node.js, PostgreSQL, Google Analytics, Mailchimp).",
			"Built responsive, data-driven dashboards and applications in Angular (7 and 11) with TypeScript, SASS, and Material Design.",
			"Authored a custom CSS3/SASS component library as a lightweight Bootstrap alternative for client projects.",
			"Built and supported WordPress/PHP sites, automating client business processes and documenting the functionality.",
			"Turned Google Analytics data into reporting that helped organizations optimize social outreach and grow event traffic and revenue, and technically project-managed a successful virtual marathon built to offset COVID business impact.",
			"Handled the full studio workflow: Git/GitHub, front-end build tooling (Gulp, Node, npm), graphics optimization (Photoshop), and client-facing RFPs (InDesign).",
		],
		technical: [
			"Designed and developed an external facing digital portfolio website using React, Material Design (MUI), JavaScript, HTML5, and CSS.",
			"Designed and developed an external facing wedding website that interfaced with an API for GET/POST requests using React, Material Design, JavaScript, HTML5, CSS, PostgreSQL, Node.js, Google Analytics, and Mailchimp.",
			"Prototyped in inVision and developed an external facing, data driven dashboard using TypeScript, Angular 11, Material Design, SASS, and HTML5.",
			"Designed and developed an external facing, responsive application using JavaScript, Angular 7, Bootstrap 4, SASS, HTML5, and JSON.",
			"Prototyped in Sketch and developed an external facing, responsive website using JavaScript, AngularJS, PHP, SASS, CSS3, and HTML5, built on a custom-written SASS library.",
			"Developed a custom-made CSS3/SASS library to be used as an alternative to Bootstrap for clients.",
			"Improved WordPress functionality to automate business processes for a client and wrote documentation to support the functionality using PHP, HTML5, CSS, and JavaScript.",
			"Developed and supported several WordPress websites using JavaScript, CSS3, HTML5, PHP, SQL, and Google Analytics.",
			"Developed information reports of user data from Google Analytics for organizations to optimize social media outreach, and used 3rd party form integration tools to increase website traffic and profit generation from virtual events.",
			"Project managed, from a technical perspective, a successful virtual marathon in response to COVID business impact.",
			"Supported projects with Git and GitHub, and developed optimization tasks using Gulp, Node.js, NPM, and Batch files.",
			"Used Photoshop to create and optimize multi-layered graphics for applications and brands, and used InDesign to create and present RFPs for potential clients.",
		],
	},
};

/** The list a role shows in the given view. */
export function bulletsFor(role: RoleKey, view: ResumeView) {
	return view === "recruiter" ? EXPERIENCE_BULLETS[role].technical : EXPERIENCE_BULLETS[role].business;
}
