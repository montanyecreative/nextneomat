import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { Topic } from "@/app/start-a-project/intake/data";

/**
 * Neon-backed storage for project intake submissions. Raw parameterised SQL,
 * no ORM: the whole surface is the handful of statements below.
 *
 * See migrations/001_create_intake_submissions.sql for the table.
 */

let client: NeonQueryFunction<false, false> | null = null;

function sql(): NeonQueryFunction<false, false> {
	if (client) return client;

	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error("DATABASE_URL is not set");
	}

	client = neon(url);
	return client;
}

export type Reach = "email" | "call" | "text";

export type SubmissionRow = {
	id: string;
	edit_token_hash: string | null;
	status: "partial" | "complete";
	topic: Topic;
	name: string;
	email: string;
	phone: string | null;
	reach: Reach | null;
	details: string | null;
	answers: Record<string, unknown>;
	calculator: { toggles?: string[]; estimate?: string | null } | null;
	recaptcha_score: number | null;
	created_at: string;
	completed_at: string | null;
	notified_at: string | null;
};

export type CalculatorHandoff = { toggles: string[]; estimate?: string | null };

export async function insertSubmission(input: {
	topic: Topic;
	name: string;
	email: string;
	calculator: CalculatorHandoff | null;
	editTokenHash: string;
	ipHash: string | null;
	userAgent: string | null;
}): Promise<{ id: string }> {
	const rows = (await sql()`
		insert into intake_submissions (topic, name, email, calculator, edit_token_hash, ip_hash, user_agent)
		values (
			${input.topic}, ${input.name}, ${input.email},
			${input.calculator ? JSON.stringify(input.calculator) : null}::jsonb,
			${input.editTokenHash}, ${input.ipHash}, ${input.userAgent}
		)
		returning id
	`) as { id: string }[];

	return rows[0];
}

export async function getSubmissionById(id: string): Promise<SubmissionRow | null> {
	const rows = (await sql()`
		select id, edit_token_hash, status, topic, name, email, phone, reach, details,
		       answers, calculator, recaptcha_score, created_at, completed_at, notified_at
		from intake_submissions
		where id = ${id}
	`) as SubmissionRow[];

	return rows[0] ?? null;
}

/**
 * Applies a step 1 correction made with the back button. Changing the topic
 * clears the answers: the old branch's answers are meaningless on the new one,
 * and leaving them would let a prints row carry website fields.
 */
export async function updateSubmissionContact(input: {
	id: string;
	topic: Topic;
	resetAnswers: boolean;
	contact?: { name: string; email: string };
}): Promise<boolean> {
	const rows = (await sql()`
		update intake_submissions
		set topic = ${input.topic},
		    name  = coalesce(${input.contact?.name ?? null}, name),
		    email = coalesce(${input.contact?.email ?? null}, email),
		    answers = case when ${input.resetAnswers} then '{}'::jsonb else answers end,
		    updated_at = now()
		where id = ${input.id} and status = 'partial'
		returning id
	`) as { id: string }[];

	return rows.length > 0;
}

/** Shallow-merges the branch answers onto whatever is already stored. */
export async function mergeSubmissionAnswers(id: string, answers: Record<string, unknown>): Promise<boolean> {
	const rows = (await sql()`
		update intake_submissions
		set answers = answers || ${JSON.stringify(answers)}::jsonb,
		    updated_at = now()
		where id = ${id} and status = 'partial'
		returning id
	`) as { id: string }[];

	return rows.length > 0;
}

/**
 * Completion is guarded by `status = 'partial'`, so a double-submit updates
 * zero rows the second time rather than reopening a finished submission. The
 * edit token dies here: once complete, the row can never be edited again.
 *
 * The answers are replaced outright rather than merged, because the final
 * request carries the whole branch as the visitor left it — a field they
 * cleared on the way back through has to come out of the row too.
 */
export async function completeSubmission(input: {
	id: string;
	answers: Record<string, unknown>;
	details: string | null;
	phone: string | null;
	reach: Reach;
	calculator: CalculatorHandoff | null;
	recaptchaScore: number | null;
}): Promise<SubmissionRow | null> {
	const rows = (await sql()`
		update intake_submissions
		set answers = ${JSON.stringify(input.answers)}::jsonb,
		    details = ${input.details},
		    phone = ${input.phone},
		    reach = ${input.reach},
		    calculator = coalesce(${input.calculator ? JSON.stringify(input.calculator) : null}::jsonb, calculator),
		    recaptcha_score = ${input.recaptchaScore},
		    status = 'complete',
		    completed_at = now(),
		    updated_at = now(),
		    edit_token_hash = null
		where id = ${input.id} and status = 'partial'
		returning id, edit_token_hash, status, topic, name, email, phone, reach, details,
		          answers, calculator, recaptcha_score, created_at, completed_at, notified_at
	`) as SubmissionRow[];

	return rows[0] ?? null;
}

/**
 * Idempotency guard for notifications. Claims the row by setting notified_at
 * only if it is still null, so two concurrent completions send once between
 * them. Returns true for the caller that won the claim.
 */
export async function claimSubmissionNotification(id: string): Promise<boolean> {
	const rows = (await sql()`
		update intake_submissions
		set notified_at = now()
		where id = ${id} and notified_at is null
		returning id
	`) as { id: string }[];

	return rows.length > 0;
}

/** Released when every send failed, so the row reads as un-notified. */
export async function releaseSubmissionNotification(id: string): Promise<void> {
	await sql()`update intake_submissions set notified_at = null where id = ${id}`;
}

export async function countRecentSubmissionsByIpHash(ipHash: string): Promise<number> {
	const rows = (await sql()`
		select count(*)::int as count
		from intake_submissions
		where ip_hash = ${ipHash} and created_at > now() - interval '1 hour'
	`) as { count: number }[];

	return rows[0]?.count ?? 0;
}
