import { z } from "zod";
import {
	buildTypeOptions,
	calculatorNeedsMap,
	digitizeOptions,
	needsOptions,
	platformOptions,
	printsTopicOptions,
	reachOptions,
	timelineOptions,
	topicOptions,
	type Option,
	type Topic,
} from "@/app/start-a-project/intake/data";

/**
 * Validation for /start-a-project, shared by the two API routes.
 *
 * Every allowed value is derived from the option lists the form renders, so a
 * new chip in data.ts is accepted here without a second edit, and a value the
 * form cannot produce is rejected.
 */

/** A zod enum over an option list's values. */
function optionEnum(options: Option[]) {
	const values = options.map((option) => option.value) as [string, ...string[]];
	return z.enum(values);
}

export const topicValues = topicOptions.map((option) => option.value) as Topic[];

const topicEnum = optionEnum(topicOptions) as unknown as z.ZodType<Topic>;

/* ------------------------------------------------------------------ step 1 */

const name = z.string().trim().min(1, "Enter your name").max(120);
const email = z.string().trim().toLowerCase().email().max(254);

/**
 * The pricing calculator hands off through the query string. Unknown toggles
 * are dropped rather than rejected: a stale link is still a real visitor.
 */
export const calculatorSchema = z.object({
	toggles: z
		.array(z.string().max(40))
		.max(12)
		.transform((toggles) => toggles.filter((toggle) => toggle in calculatorNeedsMap)),
	estimate: z.string().trim().max(120).nullable().optional(),
});

export const createSubmissionSchema = z.object({
	topic: topicEnum,
	name,
	email,
	calculator: calculatorSchema.optional(),
	// Honeypot. Handled in the route, never persisted. The form renders this
	// field off-screen as `company`; see the Honeypot component.
	company: z.string().max(200).optional(),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;

/* ------------------------------------------------------- step 2, per topic */

/** Blank optional answers are dropped on the client, so absent beats empty. */
const optionalText = (max: number) => z.string().trim().min(1).max(max).optional();

const websiteAnswersSchema = z.strictObject({
	buildType: optionEnum(buildTypeOptions),
	// Only asked while the build type is a migration, so optional here.
	platform: optionEnum(platformOptions).optional(),
	needs: z.array(optionEnum(needsOptions)).max(needsOptions.length).optional(),
	timeline: optionEnum(timelineOptions).optional(),
	currentSite: optionalText(300),
});

const printsAnswersSchema = z.strictObject({
	printsTopic: optionEnum(printsTopicOptions),
	orderNumber: optionalText(120),
});

const digitizationAnswersSchema = z.strictObject({
	digitize: z.array(optionEnum(digitizeOptions)).max(digitizeOptions.length).optional(),
	itemCount: optionalText(120),
});

/** "Something else" has no questions of its own, so this branch carries none. */
const otherAnswersSchema = z.strictObject({});

const answersByTopic = {
	website: websiteAnswersSchema,
	prints: printsAnswersSchema,
	digitization: digitizationAnswersSchema,
	other: otherAnswersSchema,
} as const;

/**
 * Discriminated on the topic stored on the row, never on a topic sent in the
 * same request. Strict objects mean answers from the wrong branch are rejected
 * outright rather than silently stripped.
 */
export function parseAnswersForTopic(topic: Topic, answers: unknown) {
	return answersByTopic[topic].safeParse(answers);
}

/* ------------------------------------------------------------------ step 3 */

// Permissive on purpose: real people type phone numbers a dozen different ways
// and a rejected digit costs a lead.
const phone = z
	.string()
	.trim()
	.min(7, "Enter a phone number so I can call or text you")
	.max(25)
	.regex(/^[0-9+\-().\s]+$/, "Enter a phone number so I can call or text you");

const finalSchema = z.object({
	details: optionalText(4000),
	phone: phone.optional(),
	reach: optionEnum(reachOptions),
});

/* ------------------------------------------------------------------- patch */

export const patchSubmissionSchema = z.object({
	// Set when somebody uses the back button to correct step 1 after the row
	// already exists. Changing the topic resets the stored answers, because the
	// previous branch's answers no longer mean anything.
	topic: topicEnum.optional(),
	contact: z.object({ name, email }).optional(),
	answers: z.record(z.string(), z.unknown()).optional(),
	final: finalSchema.optional(),
	calculator: calculatorSchema.optional(),
	complete: z.boolean().optional(),
	// reCAPTCHA v3 token for the final submit. A missing or unverifiable token
	// never blocks the save; see lib/intake/recaptcha.ts.
	recaptchaToken: z.string().max(4000).optional(),
});

export type PatchSubmissionInput = z.infer<typeof patchSubmissionSchema>;

/* -------------------------------------------------------- labels for email */

/** Option labels, so a notification reads "A migration" and not "migration". */
const optionLabels: Record<string, Record<string, string>> = {
	topic: labelMap(topicOptions),
	buildType: labelMap(buildTypeOptions),
	platform: labelMap(platformOptions),
	needs: labelMap(needsOptions),
	timeline: labelMap(timelineOptions),
	printsTopic: labelMap(printsTopicOptions),
	digitize: labelMap(digitizeOptions),
	reach: labelMap(reachOptions),
};

function labelMap(options: Option[]): Record<string, string> {
	const map: Record<string, string> = {};
	for (let i = 0; i < options.length; i += 1) {
		map[options[i].value] = options[i].label;
	}
	return map;
}

/** The label for a stored value, falling back to the raw value. */
export function labelFor(field: string, value: string): string {
	return optionLabels[field]?.[value] ?? value;
}

export const answerLabels: Record<string, string> = {
	buildType: "New site or migration",
	platform: "Current platform",
	needs: "What the site needs to do",
	timeline: "Launch timeline",
	currentSite: "Current website",
	printsTopic: "What I can help with",
	orderNumber: "Order number",
	digitize: "What to digitize",
	itemCount: "Roughly how many items",
};

/** Branch answers in the order they were asked, so every email reads the same. */
export const answerOrder: Record<Topic, string[]> = {
	website: ["buildType", "platform", "needs", "timeline", "currentSite"],
	prints: ["printsTopic", "orderNumber"],
	digitization: ["digitize", "itemCount"],
	other: [],
};

/** The heading a notification leads with. */
export const topicHeadings: Record<Topic, string> = {
	website: "New website project enquiry",
	prints: "New prints enquiry",
	digitization: "New digitization enquiry",
	other: "New enquiry",
};
