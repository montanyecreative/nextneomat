import { claimSubmissionNotification, releaseSubmissionNotification, type SubmissionRow } from "./db";
import { answerLabels, answerOrder, labelFor, topicHeadings } from "./schema";

/**
 * Postmark notifications for a completed intake submission.
 *
 * Two emails go out, both only on completion: one to whoever is listed in
 * INTAKE_NOTIFY_EMAILS, and a confirmation copy to the person who filled the
 * form in — which is what the done screen promises them. A partial row never
 * emails anybody, which is the anti-spam measure that matters most: a bot
 * would have to walk the whole form to reach this code.
 *
 * Nothing in here is allowed to break the visitor's experience. The submission
 * is already safely in the database by the time this is called, and that is the
 * part that cannot be lost.
 *
 * Environment:
 *   POSTMARK_SERVER_TOKEN    server token for the Postmark server
 *   POSTMARK_FROM            verified sender signature, e.g. hello@example.com
 *   INTAKE_NOTIFY_EMAILS     comma-separated recipients for the notification
 *   POSTMARK_MESSAGE_STREAM  optional, defaults to "outbound"
 *   POSTMARK_REPLY_TO        optional reply-to on the visitor's copy
 */

/** Email content is untrusted visitor input. */
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function centralTime(iso: string): string {
	return new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Chicago",
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(iso));
}

export function firstNameOf(submission: SubmissionRow): string {
	return submission.name.trim().split(/\s+/)[0] || "there";
}

/* --------------------------------------------------------------- content */

type Row = { label: string; value: string };

/**
 * One stored answer as a display row. Arrays become a comma-separated list of
 * labels; everything is mapped through the option labels so the email reads
 * "A migration" rather than "migration".
 */
function answerRow(submission: SubmissionRow, key: string): Row | null {
	const raw = submission.answers?.[key];
	if (raw === undefined || raw === null) return null;

	const value = Array.isArray(raw)
		? raw.map((entry) => labelFor(key, String(entry))).join(", ")
		: labelFor(key, String(raw)).trim();

	if (!value) return null;
	return { label: answerLabels[key] ?? key, value };
}

/** Branch answers in the order they were asked, blanks dropped. */
export function orderedAnswers(submission: SubmissionRow): Row[] {
	const rows: Row[] = [];

	for (let i = 0; i < answerOrder[submission.topic].length; i += 1) {
		const row = answerRow(submission, answerOrder[submission.topic][i]);
		if (row) rows.push(row);
	}

	return rows;
}

/** Contact details, and how they asked to be reached. */
function contactRows(submission: SubmissionRow): Row[] {
	const rows: Row[] = [
		{ label: "Name", value: submission.name },
		{ label: "Email", value: submission.email },
	];

	if (submission.phone) rows.push({ label: "Phone", value: submission.phone });
	if (submission.reach) rows.push({ label: "Preferred contact", value: labelFor("reach", submission.reach) });
	rows.push({ label: "Reaching out about", value: labelFor("topic", submission.topic) });

	return rows;
}

/** The pricing calculator handoff, when the visitor came in through it. */
function calculatorRows(submission: SubmissionRow): Row[] {
	const estimate = submission.calculator?.estimate;
	if (!estimate) return [];
	return [{ label: "Calculator estimate", value: estimate }];
}

/* ----------------------------------------------------------- notification */

export function buildNotificationSubject(submission: SubmissionRow): string {
	return `${topicHeadings[submission.topic]}: ${submission.name}`;
}

function textBlock(heading: string, rows: Row[]): string[] {
	if (rows.length === 0) return [];

	const width = rows.reduce((longest, row) => Math.max(longest, row.label.length), 0);
	const lines = [heading, "-".repeat(heading.length)];

	for (let i = 0; i < rows.length; i += 1) {
		lines.push(`${rows[i].label.padEnd(width)}  ${rows[i].value}`);
	}

	lines.push("");
	return lines;
}

export function buildNotificationText(submission: SubmissionRow): string {
	const lines: string[] = [topicHeadings[submission.topic], ""];

	lines.push(...textBlock("Contact", contactRows(submission)));
	lines.push(...textBlock("Project", orderedAnswers(submission)));
	lines.push(...textBlock("Estimate", calculatorRows(submission)));

	if (submission.details) {
		lines.push("Anything else I should know", "---------------------------", submission.details, "");
	}

	lines.push(
		`Submitted ${centralTime(submission.completed_at ?? submission.created_at)} (US Central)`,
		`Started ${centralTime(submission.created_at)}`,
		`Submission id: ${submission.id}`,
	);

	return lines.join("\n");
}

function htmlRows(rows: Row[]): string {
	return rows
		.map(
			(row) =>
				`<tr><td style="padding:3px 16px 3px 0;color:#6e6e6e;white-space:nowrap;vertical-align:top;">${escapeHtml(row.label)}</td>` +
				`<td style="padding:3px 0;color:#151515;">${escapeHtml(row.value)}</td></tr>`,
		)
		.join("");
}

function htmlBlock(heading: string, rows: Row[]): string {
	if (rows.length === 0) return "";
	return (
		`<p style="margin:0 0 6px;font-weight:600;">${escapeHtml(heading)}</p>` +
		`<table style="border-collapse:collapse;margin:0 0 20px;">${htmlRows(rows)}</table>`
	);
}

/** Free text keeps the visitor's line breaks. */
function htmlParagraph(value: string): string {
	return escapeHtml(value).replace(/\n/g, "<br />");
}

const SHELL_OPEN =
	'<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#151515;">';

export function buildNotificationHtml(submission: SubmissionRow): string {
	return [
		SHELL_OPEN,
		`<h2 style="font-size:17px;margin:0 0 16px;">${escapeHtml(topicHeadings[submission.topic])}</h2>`,
		htmlBlock("Contact", contactRows(submission)),
		htmlBlock("Project", orderedAnswers(submission)),
		htmlBlock("Estimate", calculatorRows(submission)),
		submission.details
			? `<p style="margin:0 0 6px;font-weight:600;">Anything else I should know</p>` +
				`<blockquote style="margin:0 0 20px;padding-left:12px;border-left:3px solid #e2e8f0;color:#333333;">${htmlParagraph(submission.details)}</blockquote>`
			: "",
		`<p style="color:#6e6e6e;font-size:12px;margin:0;">Submitted ${escapeHtml(centralTime(submission.completed_at ?? submission.created_at))} (US Central) · started ${escapeHtml(centralTime(submission.created_at))} · ${escapeHtml(submission.id)}</p>`,
		"</div>",
	].join("");
}

/* ----------------------------------------------------------- confirmation */

export function buildConfirmationSubject(submission: SubmissionRow): string {
	return submission.topic === "website"
		? "I've got your project details — Montanye Creative"
		: "I've got your message — Montanye Creative";
}

/** What the visitor is told happens next, matching the done screen's promise. */
const NEXT_STEPS = [
	"I read every submission myself.",
	"I'll reach out within 2 business days, the way you asked me to.",
];

const WEBSITE_NEXT_STEP = "Website projects get a line-item estimate before any work begins.";

function nextSteps(submission: SubmissionRow): string[] {
	return submission.topic === "website" ? NEXT_STEPS.concat(WEBSITE_NEXT_STEP) : NEXT_STEPS;
}

export function buildConfirmationText(submission: SubmissionRow): string {
	const lines: string[] = [
		`Thanks, ${firstNameOf(submission)}.`,
		"",
		submission.topic === "website"
			? "Your project details came straight to me. Here's a copy for your records."
			: "Your message came straight to me. Here's a copy for your records.",
		"",
		"What happens next",
		"-----------------",
	];

	const steps = nextSteps(submission);
	for (let i = 0; i < steps.length; i += 1) {
		lines.push(`${i + 1}. ${steps[i]}`);
	}
	lines.push("");

	lines.push(...textBlock("What you sent", contactRows(submission).concat(orderedAnswers(submission))));

	if (submission.details) {
		lines.push("Anything else I should know", "---------------------------", submission.details, "");
	}

	lines.push(
		"If any of that looks wrong, just reply to this email and I'll correct it.",
		"",
		"— John Montanye, Montanye Creative",
		`Submitted ${centralTime(submission.completed_at ?? submission.created_at)} (US Central)`,
	);

	return lines.join("\n");
}

export function buildConfirmationHtml(submission: SubmissionRow): string {
	const steps = nextSteps(submission)
		.map((step) => `<li style="margin:4px 0;">${escapeHtml(step)}</li>`)
		.join("");

	return [
		SHELL_OPEN,
		`<h2 style="font-size:19px;margin:0 0 12px;">Thanks, ${escapeHtml(firstNameOf(submission))}.</h2>`,
		`<p style="margin:0 0 20px;">${
			submission.topic === "website"
				? "Your project details came straight to me. Here&rsquo;s a copy for your records."
				: "Your message came straight to me. Here&rsquo;s a copy for your records."
		}</p>`,
		`<p style="margin:0 0 6px;font-weight:600;">What happens next</p>`,
		`<ol style="margin:0 0 20px;padding-left:20px;">${steps}</ol>`,
		htmlBlock("What you sent", contactRows(submission).concat(orderedAnswers(submission))),
		submission.details
			? `<p style="margin:0 0 6px;font-weight:600;">Anything else I should know</p>` +
				`<blockquote style="margin:0 0 20px;padding-left:12px;border-left:3px solid #e2e8f0;color:#333333;">${htmlParagraph(submission.details)}</blockquote>`
			: "",
		`<p style="margin:0 0 20px;">If any of that looks wrong, just reply to this email and I&rsquo;ll correct it.</p>`,
		`<p style="margin:0 0 4px;">&mdash; John Montanye, Montanye Creative</p>`,
		`<p style="color:#6e6e6e;font-size:12px;margin:0;">Submitted ${escapeHtml(centralTime(submission.completed_at ?? submission.created_at))} (US Central)</p>`,
		"</div>",
	].join("");
}

/* ------------------------------------------------------------- transport */

/** A hung provider must not hold the visitor's request open. */
const SEND_TIMEOUT_MS = 8000;

/** Provider error bodies can be a whole HTML page; keep the log readable. */
async function errorDetail(response: Response): Promise<string> {
	const body = await response.text().catch(() => "");
	return body.replace(/\s+/g, " ").slice(0, 200);
}

function notifyRecipients(): string[] {
	return (process.env.INTAKE_NOTIFY_EMAILS ?? "")
		.split(",")
		.map((address) => address.trim())
		.filter(Boolean);
}

type Email = { to: string; replyTo?: string; subject: string; text: string; html: string };

/** Both halves are needed: a token with no verified sender cannot send. */
function isPostmarkConfigured(): boolean {
	return Boolean(process.env.POSTMARK_SERVER_TOKEN && process.env.POSTMARK_FROM);
}

async function send(email: Email): Promise<void> {
	const token = process.env.POSTMARK_SERVER_TOKEN;
	const from = process.env.POSTMARK_FROM;

	if (!token || !from) {
		console.info("[intake] Postmark is not configured — skipping email.");
		return;
	}

	const response = await fetch("https://api.postmarkapp.com/email", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			accept: "application/json",
			"x-postmark-server-token": token,
		},
		body: JSON.stringify({
			From: from,
			To: email.to,
			ReplyTo: email.replyTo,
			Subject: email.subject,
			TextBody: email.text,
			HtmlBody: email.html,
			MessageStream: process.env.POSTMARK_MESSAGE_STREAM || "outbound",
		}),
		signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
	});

	if (!response.ok) {
		throw new Error(`Postmark responded ${response.status}: ${await errorDetail(response)}`);
	}
}

async function sendNotification(submission: SubmissionRow): Promise<void> {
	const recipients = notifyRecipients();
	if (recipients.length === 0) {
		console.info("[intake] INTAKE_NOTIFY_EMAILS is unset — skipping the notification email.");
		return;
	}

	await send({
		to: recipients.join(","),
		// Replying to the notification reaches the visitor directly.
		replyTo: submission.email,
		subject: buildNotificationSubject(submission),
		text: buildNotificationText(submission),
		html: buildNotificationHtml(submission),
	});
}

async function sendConfirmation(submission: SubmissionRow): Promise<void> {
	await send({
		to: submission.email,
		replyTo: process.env.POSTMARK_REPLY_TO || undefined,
		subject: buildConfirmationSubject(submission),
		text: buildConfirmationText(submission),
		html: buildConfirmationHtml(submission),
	});
}

/**
 * Sends both emails for a completed submission, exactly once.
 *
 * The claim is taken before anything is sent, so a double-submit notifies once
 * between the two requests. If every send fails the claim is released, so the
 * row reads as un-notified in the Neon console rather than looking delivered.
 */
export async function notifySubmissionComplete(submission: SubmissionRow): Promise<void> {
	// Checked before the claim, so notified_at only ever means an email really
	// went out. Stamping a row that nothing was sent for would make the column
	// lie for every submission taken before Postmark was configured.
	if (!isPostmarkConfigured()) {
		console.info(`[intake] Postmark is not configured — ${submission.id} saved without emailing.`);
		return;
	}

	const claimed = await claimSubmissionNotification(submission.id);
	if (!claimed) return;

	const results = await Promise.allSettled([sendNotification(submission), sendConfirmation(submission)]);

	for (let i = 0; i < results.length; i += 1) {
		const result = results[i];
		if (result.status === "rejected") {
			console.error("[intake] email failed", result.reason);
		}
	}

	if (results.every((result) => result.status === "rejected")) {
		await releaseSubmissionNotification(submission.id).catch((error) => {
			console.error("[intake] failed to release the notification claim", error);
		});
	}
}
