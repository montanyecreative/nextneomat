/** A run of text that can carry emphasis without needing raw HTML. */
export type RichText = Array<string | { bold: string }>;

export type CaseStudyImage = {
	src: string;
	alt: string;
	width: number;
	height: number;
	caption?: string;
};

export type CaseStudyLink = {
	label: string;
	href: string;
	external?: boolean;
};

/**
 * Per-study colour tokens. These are emitted as CSS variables on the case study
 * root so one set of components can render studies with different identities.
 */
export type CaseStudyPalette = {
	/**
	 * Whether the study's non-dark bands really read as light. A "dark" scheme keeps
	 * image frames and captions on their dark treatment across every band.
	 */
	scheme: "light" | "dark";
	/** Dark band background (hero, showcase, CTA). */
	dark: string;
	/** Backing colour behind an image framed on a dark band. */
	darkFrame: string;
	/** Tinted light band, sits between paper sections. */
	mist: string;
	/** Page background. */
	paper: string;
	/** Headings on light bands. */
	ink: string;
	/** Primary text on dark bands. */
	onDark: string;
	/** Secondary text on dark bands. */
	onDarkMuted: string;
	/** Captions and meta labels on dark bands. */
	mutedDark: string;
	/** Captions on light bands. */
	mutedLight: string;
	/** Lead paragraph on light bands. */
	bodyStrong: string;
	/** Body copy on light bands. */
	body: string;
	/** Smaller supporting copy on light bands. */
	bodySoft: string;
	/** Bright accent, used on dark bands. */
	accent: string;
	/** Deep accent, used on light bands. */
	accentDeep: string;
	/** Solid accent for buttons and rules. */
	accentSolid: string;
	/** Text sitting on top of accentSolid. */
	onAccent: string;
	/** Spec sheet term colour. */
	specLabel: string;
	/** Colour of the hero glow. */
	glow: string;
	tagDarkBg: string;
	tagDarkBorder: string;
	tagDarkText: string;
	tagLightBg: string;
	tagLightBorder: string;
	tagLightText: string;
	/** Card background inside the system panel. */
	systemCard: string;
};

/** Warm espresso identity — Compounds Coffee. */
export const espressoPalette: CaseStudyPalette = {
	scheme: "light",
	dark: "#1b1714",
	darkFrame: "#0d0b09",
	mist: "#f4efe6",
	paper: "#fbf8f2",
	ink: "#221d18",
	onDark: "#f4efe6",
	onDarkMuted: "#cabfb2",
	mutedDark: "#8d8377",
	mutedLight: "#746b60",
	bodyStrong: "#3a332c",
	body: "#413a32",
	bodySoft: "#4a423a",
	accent: "#c88a4a",
	accentDeep: "#96612c",
	accentSolid: "#c88a4a",
	onAccent: "#1b1410",
	specLabel: "#5b3d24",
	glow: "rgba(200,138,74,0.16)",
	tagDarkBg: "rgba(200,138,74,0.16)",
	tagDarkBorder: "rgba(200,138,74,0.3)",
	tagDarkText: "#e6b787",
	tagLightBg: "rgba(200,138,74,0.14)",
	tagLightBorder: "rgba(200,138,74,0.3)",
	tagLightText: "#8a5928",
	systemCard: "#241f1a",
};

/** Cool navy identity — the Client Portal. */
export const navyPalette: CaseStudyPalette = {
	scheme: "light",
	dark: "#0e1f2b",
	darkFrame: "#0a161e",
	mist: "#eef1f3",
	paper: "#ffffff",
	ink: "#15242e",
	onDark: "#eaf1f3",
	onDarkMuted: "#b9cad2",
	mutedDark: "#7f929b",
	mutedLight: "#5b6b75",
	bodyStrong: "#33424b",
	body: "#3d4b53",
	bodySoft: "#4a5860",
	accent: "#45a8bd",
	accentDeep: "#1d6273",
	accentSolid: "#2a7d90",
	onAccent: "#ffffff",
	specLabel: "#1d6273",
	glow: "rgba(69,168,189,0.15)",
	tagDarkBg: "rgba(69,168,189,0.16)",
	tagDarkBorder: "rgba(69,168,189,0.3)",
	tagDarkText: "#9fd4e2",
	tagLightBg: "rgba(44,130,150,0.11)",
	tagLightBorder: "rgba(44,130,150,0.26)",
	tagLightText: "#1d6273",
	systemCard: "#15303f",
};

/** Dark gallery identity — Montanye Creative Prints. */
export const crimsonPalette: CaseStudyPalette = {
	scheme: "dark",
	dark: "#08080a",
	darkFrame: "#000000",
	mist: "#0d0d10",
	paper: "#08080a",
	ink: "#ffffff",
	onDark: "#f3f1ef",
	onDarkMuted: "#b3b3bb",
	mutedDark: "#787c85",
	mutedLight: "#787c85",
	bodyStrong: "#d3d3d9",
	body: "#b3b3bb",
	bodySoft: "#a9a9b1",
	accent: "#e64a6c",
	accentDeep: "#e64a6c",
	accentSolid: "#c6284a",
	onAccent: "#ffffff",
	specLabel: "#e64a6c",
	glow: "rgba(198,40,74,0.22)",
	tagDarkBg: "rgba(198,40,74,0.12)",
	tagDarkBorder: "rgba(198,40,74,0.3)",
	tagDarkText: "#e64a6c",
	tagLightBg: "rgba(198,40,74,0.12)",
	tagLightBorder: "rgba(198,40,74,0.3)",
	tagLightText: "#e64a6c",
	systemCard: "#15151a",
};

/** A stage strip showing where an order sits as it moves through fulfillment. */
export type CaseStudyPipeline = {
	stages: Array<{
		step: string;
		label: string;
		description: string;
		/** "done" dims the step marker, "current" leaves it on the accent. */
		state: "done" | "current";
	}>;
	note?: string;
};

/** Two images shown side by side under a single shared caption. */
export type CaseStudyImagePair = {
	images: [CaseStudyImage, CaseStudyImage];
	caption?: string;
};

export type CaseStudyFeature = {
	kick: string;
	heading: string;
	/** Larger opening paragraph, used by full-width features. */
	lead?: string;
	body: RichText[];
	tags?: string[];
	image?: CaseStudyImage;
	/** Shown in place of `image` when a feature needs two frames side by side. */
	imagePair?: CaseStudyImagePair;
	pipeline?: CaseStudyPipeline;
	/** "dark" renders the accent band, "mist" a tinted band, "light" the paper background. */
	theme: "dark" | "mist" | "light";
	/** "split" sets the copy beside the image, "full" runs it full width with any image below. */
	layout?: "split" | "full";
	/** Places the image before the copy on desktop. Only applies to the split layout. */
	reverse?: boolean;
};

export type CaseStudySystem = {
	kick: string;
	heading: string;
	note?: string;
	groups: Array<{ title: string; items: RichText[] }>;
};

export type CaseStudy = {
	slug: string;
	/** Colour identity for the slider card and the case study page. */
	palette: CaseStudyPalette;
	eyebrow: string;
	/** Title split into the lines it should break on in the hero and slider. */
	titleLines: string[];
	summary: string;
	/** Short blurb used on the slider card when the full summary is too long. */
	cardSummary?: string;
	liveUrl?: string;
	metaDescription?: string;
	meta?: Array<{ label: string; value: string }>;
	showcase?: CaseStudyImage;
	brief?: {
		kick: string;
		heading: string;
		lead: string;
		body: RichText[];
		/** The band the brief sits on. Defaults to the tinted band. */
		theme?: "mist" | "light";
	};
	spec?: {
		kick: string;
		heading: string;
		items: Array<{ label: string; value: string }>;
		note?: string;
	};
	/** Stack panel, an alternative to the spec sheet. */
	system?: CaseStudySystem;
	/**
	 * Where the system panel sits relative to the feature blocks. Defaults to
	 * "after-brief", so it reads as an overview before the walkthrough.
	 */
	systemPlacement?: "after-brief" | "after-features";
	features?: CaseStudyFeature[];
	demonstrates?: {
		kick: string;
		heading: string;
		items: Array<{ title: string; description: string }>;
	};
	cta?: {
		kick: string;
		heading: string;
		body: string;
		links?: CaseStudyLink[];
		footNote?: string;
	};
};

export const caseStudies: CaseStudy[] = [
	{
		slug: "montanye-prints",
		palette: crimsonPalette,
		eyebrow: "Case Study",
		titleLines: ["Montanye", "Creative Prints"],
		summary:
			"A complete e-commerce store and a custom order-management system, designed, built, and operated end to end. Infrared aluminum art prints, made on demand, tracked from checkout to doorstep.",
		cardSummary:
			"A complete e-commerce store plus the custom order-management system behind it — infrared aluminum art prints, made on demand and tracked from checkout to doorstep.",
		liveUrl: "https://montanyecreative.shop/",
		metaDescription:
			"How Montanye Creative designed, built, and operates Montanye Creative Prints: a Next.js storefront on Contentful and Stripe, with a custom order-management system tracking every print from checkout to doorstep.",
		meta: [
			{ label: "Role", value: "Design, build & ops (solo)" },
			{ label: "Type", value: "E-commerce + OMS" },
			{ label: "Stack", value: "Next.js · React · TS" },
			{ label: "Status", value: "Live" },
		],
		showcase: {
			src: "/case-studies/montanye-prints/montanye-prints-home.webp",
			alt: "Montanye Creative Prints homepage with a full-bleed infrared peony photograph",
			width: 1400,
			height: 763,
			caption: "The storefront leads with the work — a dark gallery treatment so the art carries the page.",
		},
		brief: {
			kick: "The brief",
			heading: "A storefront is only half of it",
			theme: "light",
			lead: "Montanye Creative Prints is a live store selling infrared aluminum art prints. But the store is only the front half. Behind it runs a custom order-management system I built and operate myself, tracking every order from checkout through production to shipment.",
			body: [
				[
					"That's the point of this one: it's proof I can deliver an entire e-commerce operation — storefront, checkout, fulfillment, and the back-office that runs it — and hand it off to a client as a working product, not just a website.",
				],
			],
		},
		features: [
			{
				kick: "Browsing the collection",
				heading: "The grid is the gallery",
				theme: "mist",
				reverse: true,
				body: [
					[
						"The prints listing puts the art first. A chromium, content-aware layout lets each image's own colors bleed through the interface, so the browsing experience takes on the palette of the work itself. Nothing competes with the photography — the grid becomes the gallery wall.",
					],
				],
				tags: ["content-aware UI", "color bleed", "art-first grid"],
				image: {
					src: "/case-studies/montanye-prints/montanye-prints-plp.webp",
					alt: "Prints listing page with a full-bleed grid where each image's colors bleed through the interface",
					width: 1200,
					height: 657,
					caption: "The prints grid — a content-aware layout that takes on the palette of the work.",
				},
			},
			{
				kick: "The product page",
				heading: "Heavy contrast, simple decision",
				theme: "light",
				body: [
					[
						"Each product page uses deep black contrast to make the art the entire focus, then keeps the commerce dead simple: price, a clear size selector, quantity, one button. The aluminum-print details (high-gloss surface, float-mount hangers, print-on-demand) are there for the curious without ever crowding the decision.",
					],
					[
						"The same template carries the store's two infrared themes, the vivid reds and the cooler whites, each page reshaping around the image it holds.",
					],
				],
				tags: ["black-contrast focus", "easy size select", "print-on-demand"],
				imagePair: {
					images: [
						{
							src: "/case-studies/montanye-prints/montanye-prints-pdp-red.webp",
							alt: "Product page for a red infrared print, Yellow Orchid Bunch",
							width: 1200,
							height: 1781,
						},
						{
							src: "/case-studies/montanye-prints/montanye-prints-pdp-white.webp",
							alt: "Product page for a white infrared print, Lone Elk Park Lake",
							width: 1200,
							height: 1781,
						},
					],
					caption: "One product template, two infrared themes — the page reshapes around the art.",
				},
			},
			{
				kick: "The cart",
				heading: "Never interrupt the browse",
				theme: "mist",
				reverse: true,
				body: [
					[
						"The cart is a simple slide-in drawer, content-aware and styled to match, that keeps shoppers exactly where they are. Adding a print, adjusting size or quantity, and heading to checkout all happen without a full-page detour, so momentum never breaks.",
					],
				],
				tags: ["drawer cart", "stay-on-page"],
				image: {
					src: "/case-studies/montanye-prints/montanye-prints-cart.webp",
					alt: "Slide-in cart drawer showing a print, size, quantity, and subtotal",
					width: 1400,
					height: 762,
					caption: "A slide-in cart that keeps shoppers on the page.",
				},
			},
			{
				kick: "Checkout",
				heading: "One page, no drop-off",
				theme: "light",
				body: [
					[
						"Checkout is a single Stripe-hosted page, deliberately kept to one step to protect conversion. Card, Apple Pay, Link, Klarna, Cash App, and bank pay are all available, with shipping and tax handled inline. The momentum from “add to cart” carries straight through to purchase instead of leaking out across a multi-step funnel.",
					],
				],
				tags: ["Stripe Checkout", "one-step", "conversion-first"],
				image: {
					src: "/case-studies/montanye-prints/montanye-prints-checkout.webp",
					alt: "Single-page Stripe checkout for Montanye Creative LLC with multiple payment methods",
					width: 1400,
					height: 779,
					caption: "A single-page Stripe checkout — every payment method, one screen.",
				},
			},
			{
				kick: "Transactional email",
				heading: "The customer is never in the dark",
				theme: "mist",
				reverse: true,
				body: [
					[
						"Every order triggers transactional emails through Postmark: a confirmation the moment they buy, and a shipping notice with a live tracking link when the print goes out. The customer always knows exactly where their order stands, without ever having to ask.",
					],
				],
				tags: ["Postmark", "order confirmation", "tracking notice"],
				imagePair: {
					images: [
						{
							src: "/case-studies/montanye-prints/montanye-prints-email-confirm.webp",
							alt: "Order confirmation email reading 'Thanks for your order'",
							width: 1330,
							height: 602,
						},
						{
							src: "/case-studies/montanye-prints/montanye-prints-email-track.webp",
							alt: "Shipping confirmation email with a UPS tracking number",
							width: 1244,
							height: 732,
						},
					],
					caption: "Order confirmation on purchase, shipping notice with tracking when it ships.",
				},
			},
			{
				kick: "The part most stores don't have",
				heading: "A custom order-management system",
				theme: "light",
				layout: "full",
				lead: "This is what turns a storefront into a business. Behind the store, I built and operate a custom OMS where every order flows through a tracked pipeline that I manage by hand, from placing the print-lab order to marking it shipped.",
				body: [],
				pipeline: {
					stages: [
						{ step: "01", label: "Received", description: "Order lands, payment captured", state: "done" },
						{
							step: "02",
							label: "In Production",
							description: "Sent to the print lab, made on demand",
							state: "done",
						},
						{
							step: "03",
							label: "Shipped",
							description: "Carrier + tracking, customer notified",
							state: "current",
						},
					],
					note: "// each order tracked through the pipeline, operated by me end to end",
				},
				image: {
					src: "/case-studies/montanye-prints/montanye-prints-oms.webp",
					alt: "Order-management system order detail: fulfillment pipeline, carrier and tracking, customer, ship-to, and Stripe payment record",
					width: 1400,
					height: 1128,
					caption:
						"The OMS order view — fulfillment status, carrier and tracking, customer and ship-to, and the Stripe payment record, all in one place.",
				},
			},
			{
				kick: "Content & resilience",
				heading: "Managed content that stays up",
				theme: "mist",
				layout: "full",
				lead: "All of the site's content — products, copy, and imagery — lives in Contentful, so the catalog and messaging can be managed without touching code.",
				body: [
					[
						"And because a store can't go dark when a third party does, every piece of copy has a ",
						{ bold: "built-in fallback" },
						" that renders if Contentful's API is ever unavailable. The store keeps selling either way. The site runs Google Analytics for traffic insight and is built responsive from the ground up.",
					],
				],
				tags: ["Contentful CMS", "API-failure fallbacks", "Google Analytics", "responsive"],
			},
		],
		systemPlacement: "after-features",
		system: {
			kick: "Under the hood",
			heading: "The system",
			groups: [
				{
					title: "Platform",
					items: [
						[{ bold: "Next.js 13" }, " · App Router"],
						[{ bold: "React 18" }, " · TypeScript"],
						[{ bold: "Tailwind + Radix" }, " primitives"],
						[{ bold: "Vercel Analytics" }, " + Google Analytics"],
					],
				},
				{
					title: "Commerce & ops",
					items: [
						[{ bold: "Stripe" }, " · single-page checkout"],
						[{ bold: "Custom OMS" }, " · order pipeline"],
						[{ bold: "Postmark" }, " · transactional email"],
					],
				},
				{
					title: "Content",
					items: [
						[{ bold: "Contentful" }, " · products + copy"],
						[{ bold: "Fallback copy" }, " · API-outage safe"],
						[{ bold: "Embla" }, " · related-print carousels"],
					],
				},
				{
					title: "UI & forms",
					items: [
						[{ bold: "react-hook-form + Zod" }, " · validation"],
						[{ bold: "CVA + tailwind-merge" }, " · design system"],
						[{ bold: "react-scroll-parallax" }, " · motion"],
					],
				},
			],
		},
		demonstrates: {
			kick: "What it demonstrates",
			heading: "An entire store, ready to hand off",
			items: [
				{
					title: "End-to-end e-commerce",
					description: "Storefront, cart, checkout, fulfillment, and back-office — the whole operation, built solo.",
				},
				{
					title: "A custom OMS, not just a store",
					description:
						"An order pipeline I operate from print-lab order through to shipment. This is the part most storefronts lack.",
				},
				{
					title: "Resilient architecture",
					description: "Headless content with built-in fallbacks, so a third-party outage never takes the store down.",
				},
				{
					title: "Conversion-focused",
					description:
						"A stay-on-page drawer cart and a single-step Stripe checkout, built to carry buyers through without drop-off.",
				},
				{
					title: "Art-forward & accessible",
					description: "A dark, content-aware design that showcases the work, responsive and accessible throughout.",
				},
				{
					title: "A product in itself",
					description:
						"Proof I can build and hand a client an entire e-commerce store and the order system that runs it.",
				},
			],
		},
		cta: {
			kick: "Montanye Creative",
			heading: "Need a store — or a store plus the operation behind it?",
			body: "I build complete e-commerce systems, storefront to back office, and hand them off as working products.",
			links: [
				{ label: "Visit the store", href: "https://montanyecreative.shop/", external: true },
				{ label: "Work with me", href: "/contact" },
			],
			footNote: "Montanye Creative — montanyecreative@outlook.com",
		},
	},
	{
		slug: "compounds-coffee",
		palette: espressoPalette,
		eyebrow: "Case Study",
		titleLines: ["Compounds", "Coffee"],
		summary:
			"A headless, bilingual coffee-discovery platform — brews, brew methods, and a searchable roaster locator — designed and built end to end on a modern composable stack.",
		liveUrl: "https://www.compoundscoffee.com",
		metaDescription:
			"How Montanye Creative designed and built Compounds Coffee: a headless, bilingual coffee-discovery platform on Next.js and Contentful with a Google Places powered roaster locator.",
		meta: [
			{ label: "Role", value: "Design & build (solo)" },
			{ label: "Type", value: "Headless web app" },
			{ label: "Core stack", value: "Next.js · React · TS" },
			{ label: "Content", value: "Contentful (headless)" },
		],
		showcase: {
			src: "/case-studies/compounds-coffee/compounds-coffee-home.webp",
			alt: "Compounds Coffee homepage with a roasting hero image and 'For the love of coffee' headline",
			width: 1400,
			height: 1214,
			caption: "compoundscoffee.com — home. Warm editorial identity, bilingual (EN/FR), authenticated login.",
		},
		brief: {
			kick: "The brief",
			heading: "A content-rich coffee library that stays fast and easy to run",
			lead: "Build a bilingual site where coffee lovers can explore brews, brew methods, and roasters, and where non-technical editors manage everything without touching code — all on an architecture that stays fast, accessible, and maintainable.",
			body: [
				[
					"The catch is that the content is deep and relational: a single brew carries a full pour-over recipe and tasting notes, links to the roaster that made it, and that roaster links to its physical shops on a map. That richness is exactly where a monolithic CMS gets brittle, so the whole thing is built composable from the ground up.",
				],
			],
		},
		spec: {
			kick: "Under the hood",
			heading: "The build, spec sheet",
			items: [
				{ label: "Architecture", value: "Headless / composable" },
				{ label: "Content", value: "Contentful, decoupled API" },
				{ label: "Front end", value: "Next.js · React · TypeScript" },
				{ label: "Locator data", value: "Contentful + Google Places API" },
				{ label: "Localization", value: "English / Français" },
				{ label: "Access", value: "Authenticated login" },
				{ label: "Content model", value: "Relational (brew → roaster → shop)" },
				{ label: "Delivery", value: "Fast, accessible, SEO-ready" },
			],
			note: "// styled after the site's own brew-parameter tables",
		},
		features: [
			{
				kick: "The centerpiece",
				heading: "A store locator that fuses two data sources",
				theme: "dark",
				body: [
					[
						"Most store locators are an afterthought. Here it was the most interesting problem in the project. Instead of one source, it merges ",
						{ bold: "curated roaster and shop data from Contentful" },
						" with ",
						{ bold: "live business data from the Google Places API" },
						" — so visitors get searchable, real-time results with accurate mapping that neither source delivers alone.",
					],
					[
						"Search by zip or city, filter by distance, and switch between map and grid views. The real work was reconciling two differently-shaped datasets into one clean, fast, user-facing feature.",
					],
				],
				tags: ["Google Places API", "Distance search", "Map / grid views", "Themed map"],
				image: {
					src: "/case-studies/compounds-coffee/compounds-coffee-locator.webp",
					alt: "Roasters and Shops locator showing a results list and an interactive map centered on St. Louis",
					width: 1500,
					height: 657,
					caption: "Roasters & Shops — Contentful locations reconciled with live Google Places details.",
				},
			},
			{
				kick: "The content model",
				heading: "Deep, relational, editor-friendly",
				theme: "light",
				reverse: true,
				body: [
					[
						"Every brew is a rich, structured record: region, roast, and process alongside a complete pour-over recipe — method, grinder, grind setting, water temp, dose, bloom, yield, and times — plus free-form tasting notes. Each brew links to the roaster that produced it, and each roaster links to its shops in the locator.",
					],
					[
						"Modeling that in Contentful means editors add a new coffee, roaster, or shop through simple forms, and it flows automatically into the brew pages, the roaster links, and the map — in both English and French, with no developer in the loop.",
					],
				],
				tags: ["Relational modeling", "Structured content", "i18n (EN/FR)"],
				image: {
					src: "/case-studies/compounds-coffee/compounds-coffee-brew-detail.webp",
					alt: "A brew detail page for Lift-Off Bochica with coffee details, full brew parameters, and tasting notes",
					width: 1300,
					height: 1171,
					caption: "A single brew: structured recipe data, linked roaster, and tasting notes — all localized.",
				},
			},
		],
		demonstrates: {
			kick: "What it demonstrates",
			heading: "The engineering behind the cup",
			items: [
				{
					title: "Composable architecture",
					description:
						"A cleanly decoupled front end over an API-first content layer — the direction modern content and commerce sites are moving.",
				},
				{
					title: "Multi-source integration",
					description: "Two live data sources reconciled and fused into one performant, user-facing feature.",
				},
				{
					title: "Relational content design",
					description:
						"A content model deep enough to be useful and simple enough for non-technical editors to run.",
				},
				{
					title: "Internationalization",
					description: "Full English/French localization across structured content, not bolted on after the fact.",
				},
				{
					title: "Accessible, fast front end",
					description: "An SEO-ready Next.js build with accessibility considered from the start.",
				},
				{
					title: "End-to-end ownership",
					description: "Architecture, design, and implementation through to production — one person, whole stack.",
				},
			],
		},
		cta: {
			kick: "Montanye Creative",
			heading: "Building something headless, or need a fast, data-driven front end?",
			body: "This is the same composable approach I bring to client work — from architecture to a shipped, maintainable product.",
			links: [
				{ label: "View the live site", href: "https://www.compoundscoffee.com", external: true },
				{ label: "Work with me", href: "/contact" },
			],
			footNote: "Montanye Creative — montanyecreative@outlook.com",
		},
	},
	{
		slug: "client-portal",
		palette: navyPalette,
		eyebrow: "Case Study · Studio Product",
		titleLines: ["The Client", "Portal"],
		summary:
			"A production client portal Montanye Creative builds and operates for engagements — project tracking, invoicing, live delivery feeds, and analytics, on a real modern stack. Part product tour, part proof of craft.",
		cardSummary:
			"A production client portal built and operated for engagements — project tracking, invoicing, live delivery feeds, and analytics on a real modern stack.",
		liveUrl: "https://www.montanyecreative.support",
		metaDescription:
			"How Montanye Creative designed, built, and operates its client portal: a passwordless, role-aware Next.js application with project tracking, invoicing, GitHub commit feeds, and GA4 analytics.",
		meta: [
			{ label: "Role", value: "Architecture & build (solo)" },
			{ label: "Type", value: "Full-stack web app" },
			{ label: "Stack", value: "Next.js · React · Postgres" },
			{ label: "Status", value: "In production" },
		],
		showcase: {
			src: "/case-studies/client-portal/client-portal-status-board.webp",
			alt: "The portal's Project Status screen: a sidebar of portal sections beside four delivery columns — Backlog, In Progress, Review, and Done — with one ticket card in Backlog showing its feature label, assignee, and priority.",
			width: 1500,
			height: 817,
			caption: "Project Status — a drag-and-drop delivery board inside the portal. Demo data shown.",
		},
		brief: {
			kick: "The brief",
			heading: "Not a bolted-on SaaS template — a product the studio owns",
			lead: "The portal is a custom application built and operated for client engagements: a calm place for clients to track work, ideas, invoices, and outcomes, and a real production app that shows how the studio ships software.",
			body: [
				[
					"Access is invite-only and passwordless. The goal was a polished client experience backed by production-grade engineering — the same class of concerns (auth, sessions, sanitization, backups, integrations) you would bring to any serious app, not a template with the logo swapped.",
				],
			],
		},
		system: {
			kick: "Under the hood",
			heading: "The system",
			note: "// deliberately boring in the best way: proven vendors, clear boundaries",
			groups: [
				{
					title: "Platform & delivery",
					items: [
						[{ bold: "Next.js 16" }, " · App Router"],
						[{ bold: "React 19" }],
						[{ bold: "Vercel" }, " · edge, analytics, speed insights"],
						[{ bold: "Tailwind + Radix" }, " primitives"],
						[{ bold: "GSAP" }, " · motion"],
					],
				},
				{
					title: "Data & storage",
					items: [
						[{ bold: "Neon Postgres" }, " · projects, tickets, invoices"],
						[{ bold: "Vercel Blob" }, " · file uploads"],
						[{ bold: "Weekly S3 backups" }, " · automated"],
					],
				},
				{
					title: "Auth & access",
					items: [
						[{ bold: "Better Auth" }, " · passwordless email OTP"],
						[{ bold: "Postmark" }, " · transactional email"],
						[{ bold: "Server-gated sessions" }, " · allowlisted"],
						[{ bold: "reCAPTCHA v3" }],
					],
				},
				{
					title: "Content & forms",
					items: [
						[{ bold: "TipTap" }, " + DOMPurify · sanitized rich text"],
						[{ bold: "react-hook-form + Zod" }, " · validation"],
						[{ bold: "cmdk" }, " · command palette"],
					],
				},
				{
					title: "Integrations",
					items: [
						[{ bold: "GitHub App + Octokit" }, " · commit sync"],
						[{ bold: "Google Analytics 4" }, " · Data API"],
						[{ bold: "Stripe" }, " · billing / payments"],
					],
				},
			],
		},
		features: [
			{
				kick: "Project status & collaboration",
				heading: "A lightweight kanban with the collaboration teams actually use",
				theme: "light",
				body: [
					[
						"Delivery runs on a drag-and-drop board across Backlog, In Progress, Review, and Done, with features grouping related tickets. Every ticket carries status, assignee, priority, a rich-text description, threaded comments, and file attachments.",
					],
					[
						"An All Tickets view keeps a searchable, filterable inventory — by status, priority, assignee, or feature — including archived work that has left the board, so nothing is ever lost.",
					],
				],
				tags: ["Drag & drop", "Comments", "Attachments (Blob)", "Searchable archive"],
				image: {
					src: "/case-studies/client-portal/client-portal-ticket-detail.webp",
					alt: "An open ticket dialog layered over the board. A side panel holds status, assignee, priority, and created-by fields, and below the description sit an attachments area and a comment box with a rich-text toolbar.",
					width: 1500,
					height: 819,
					caption: "The discussion and its files stay attached to the work itself. Demo data shown.",
				},
			},
			{
				kick: "Project information",
				heading: "A single source of truth, with a live development feed",
				theme: "mist",
				reverse: true,
				body: [
					[
						"Each project keeps its environment links, brand context, documentation, and an e-commerce toggle in one place. A GitHub App syncs recent commits straight into the portal, so clients can see shipping activity and exactly when the last code push went live — without ever opening a repository.",
					],
					["Multi-project accounts switch context from the header without losing the rest of the portal."],
				],
				tags: ["GitHub App + Octokit", "Live commit feed", "Multi-project"],
				image: {
					src: "/case-studies/client-portal/client-portal-project-info.webp",
					alt: "The Project Information screen listing development and production environment links, three documentation cards, an e-commerce toggle, and a list of recent commits with hashes, authors, and timestamps beside a last-code-push readout.",
					width: 1500,
					height: 821,
					caption: "Project Information: environment links, docs, and a live GitHub commit feed.",
				},
			},
			{
				kick: "Invoices & billing",
				heading: "Billing lives in the same product as the work",
				theme: "light",
				body: [
					[
						"No second system to hunt for an invoice. Account-scoped invoices carry line items, discounts, status, and printable documents. Clients can report a payment as sent so follow-up never gets stuck in email limbo, and the studio marks it paid when funds clear.",
					],
					[
						"Drafting, line items, bill-to details, issuing, and payment reporting all run inside the portal, with Stripe wired in for payments.",
					],
				],
				tags: ["Line items & discounts", "Printable invoices", "Payment reporting", "Stripe"],
				image: {
					src: "/case-studies/client-portal/client-portal-invoice.webp",
					alt: "An issued invoice marked paid, with a bill-to block, issue and due dates, two groups of line items showing hours and rates, and a totals column where a percentage discount reduces the subtotal.",
					width: 1500,
					height: 814,
					caption: "Billing sits beside the work it bills for, not in a second system. Demo data shown.",
				},
			},
			{
				kick: "Analytics",
				heading: "Just enough signal, without the full GA console",
				theme: "mist",
				reverse: true,
				body: [
					[
						"When a project links its Google Analytics 4 property, the portal pulls traffic through the official Data API: a last-7-days snapshot with week-over-week comparison across active users, sessions, page views, engagement, and session duration.",
					],
					[
						"Each engagement links its own GA4 property, so the numbers always stay scoped to the right site — enough to orient a weekly conversation without dumping a client into the full console.",
					],
				],
				tags: ["GA4 Data API", "Week-over-week", "Per-project scope"],
				image: {
					src: "/case-studies/client-portal/client-portal-analytics.webp",
					alt: "The Analytics screen showing a linked Google Analytics 4 property above five metric cards — active users, sessions, page views, engagement rate, and average session duration — each with its change against the prior seven days.",
					width: 1500,
					height: 821,
					caption: "GA4 traffic, pulled through the official Data API — enough to ground a weekly check-in.",
				},
			},
			{
				kick: "Access & reliability",
				heading: "Passwordless in, production-grade underneath",
				theme: "light",
				body: [
					[
						"Sign-in is passwordless: enter your email, receive a six-digit code through Postmark, and you are in — no passwords to reuse or leak. Sessions are server-gated and access is allowlisted, so the product is built for approved collaborators, not open registration.",
					],
					[
						"The portal is role-aware — clients see their engagement while the studio operates across active projects from the same shell. Data lives in Neon Postgres with automatic weekly backups to S3.",
					],
				],
				tags: ["Better Auth · OTP", "Server-gated sessions", "Role-aware", "Weekly S3 backups"],
				image: {
					src: "/case-studies/client-portal/client-portal-signin.webp",
					alt: "The portal sign-in card, with a single email field and an Email sign-in code button, and no password field.",
					width: 1500,
					height: 770,
					caption: "Passwordless sign-in — a six-digit code by email, no password to manage.",
				},
			},
		],
		demonstrates: {
			kick: "What it demonstrates",
			heading: "Proof of craft, end to end",
			items: [
				{
					title: "Full-stack ownership",
					description: "Architecture, data model, UI, and delivery — designed and shipped solo, in production.",
				},
				{
					title: "Real production concerns",
					description:
						"Passwordless auth, server-gated sessions, input sanitization, bot protection, and automated backups.",
				},
				{
					title: "Third-party integration",
					description: "GitHub, Google Analytics 4, Stripe, and Postmark wired into a coherent product.",
				},
				{
					title: "Role-aware multi-tenant",
					description: "One product shell serving both clients and the studio, scoped correctly per account.",
				},
				{
					title: "Accessible, on-brand UI",
					description: "Radix primitives and Tailwind for accessible patterns that still feel designed.",
				},
				{
					title: "Considered content editing",
					description:
						"Sanitized TipTap rich text for descriptions, comments, and notes — not textareas pretending to be documents.",
				},
			],
		},
		cta: {
			kick: "Montanye Creative",
			heading: "Want a portal like this — or a custom app for your business?",
			body: "This is a real production application, not a template: the same engineering I bring to client work, from architecture to a shipped, maintainable product.",
			links: [
				{ label: "View the live product", href: "https://www.montanyecreative.support", external: true },
				{ label: "Work with me", href: "/contact" },
			],
			footNote: "Montanye Creative — montanyecreative@outlook.com",
		},
	},
];

/** Every case study URL ends with this, e.g. /website-development/compounds-coffee-case-study */
export const CASE_STUDY_URL_SUFFIX = "-case-study";

/** The route segment for a case study, i.e. the slug plus the shared URL suffix. */
export function caseStudyParam(study: CaseStudy): string {
	return `${study.slug}${CASE_STUDY_URL_SUFFIX}`;
}

export function caseStudyPath(study: CaseStudy): string {
	return `/website-development/${caseStudyParam(study)}`;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
	return caseStudies.find((study) => study.slug === slug);
}

/** Resolves a `[caseStudyName]` route param back to a published case study. */
export function getCaseStudyByParam(param: string): CaseStudy | undefined {
	if (!param.endsWith(CASE_STUDY_URL_SUFFIX)) {
		return undefined;
	}

	return getCaseStudy(param.slice(0, -CASE_STUDY_URL_SUFFIX.length));
}
