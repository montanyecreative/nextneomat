/** Options and copy for the project intake form. The copy here is final. */

export type Topic = "website" | "prints" | "digitization" | "other";

export type Option = { value: string; label: string; help?: string };

export const topicOptions: Option[] = [
	{ value: "website", label: "A website project", help: "New sites, migrations and e-commerce" },
	{ value: "prints", label: "Prints", help: "Infrared photography prints" },
	{ value: "digitization", label: "Photo or VHS digitization", help: "Preserving photos and tapes" },
	{ value: "other", label: "Something else", help: "Questions, partnerships or anything else" },
];

export const buildTypeOptions: Option[] = [
	{ value: "new", label: "A new site", help: "Starting from scratch" },
	{ value: "migration", label: "A migration", help: "Moving from a site I already have" },
];

export const platformOptions: Option[] = [
	{ value: "shopify", label: "Shopify" },
	{ value: "wordpress", label: "WordPress" },
	{ value: "squarespace-wix", label: "Squarespace or Wix" },
	{ value: "sfcc", label: "Salesforce Commerce Cloud" },
	{ value: "other", label: "Something else" },
	{ value: "not-sure", label: "Not sure" },
];

export const needsOptions: Option[] = [
	{ value: "sell", label: "Sell products online" },
	{ value: "leads", label: "Capture and route leads" },
	{ value: "marketing", label: "Email and text marketing" },
	{ value: "locales", label: "Multiple languages or markets" },
	{ value: "staff", label: "Staff accounts and roles" },
	{ value: "not-sure", label: "Not sure yet" },
];

export const timelineOptions: Option[] = [
	{ value: "asap", label: "As soon as possible" },
	{ value: "1-3-months", label: "In 1 to 3 months" },
	{ value: "3-6-months", label: "In 3 to 6 months" },
	{ value: "exploring", label: "Just exploring" },
];

export const printsTopicOptions: Option[] = [
	{ value: "before-ordering", label: "A question before ordering" },
	{ value: "existing-order", label: "An order I've already placed" },
	{ value: "other", label: "Something else" },
];

export const digitizeOptions: Option[] = [
	{ value: "photos", label: "Photo prints" },
	{ value: "vhs", label: "VHS tapes" },
	{ value: "other", label: "Something else" },
];

export const reachOptions: Option[] = [
	{ value: "email", label: "Email" },
	{ value: "call", label: "Phone call" },
	{ value: "text", label: "Text message" },
];

/** The route header, shown as the step heading on step 2 and above the card on step 3. */
export const routeHeading: Record<Topic, string> = {
	website: "Tell me about your project",
	prints: "Tell me about your prints",
	digitization: "Tell me about your digitization needs",
	other: "Tell me what you need",
};

export const errorCopy = {
	name: "Enter your name.",
	email: "Enter an email address like name@example.com.",
	topic: "Choose what you're reaching out about.",
	buildType: "Choose a new site or a migration.",
	printsTopic: "Choose what I can help with.",
	phone: "Enter a phone number so I can call or text you.",
};

/**
 * What each calculator toggle checks under "What does the site need to do?". Anything the
 * calculator sends that is not listed here is ignored.
 */
export const calculatorNeedsMap: Record<string, string> = {
	forms: "leads",
	transactional: "staff",
	marketing: "marketing",
	store: "sell",
	languages: "locales",
};

/** Loose by design: the browser's type="email" check is the strict one. */
export function isEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
