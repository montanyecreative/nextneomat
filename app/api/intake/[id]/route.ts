import { after, NextResponse } from "next/server";
import {
	completeSubmission,
	getSubmissionById,
	mergeSubmissionAnswers,
	updateSubmissionContact,
} from "@/lib/intake/db";
import { notifySubmissionComplete } from "@/lib/intake/notify";
import { isLikelySpam, verifyRecaptcha } from "@/lib/intake/recaptcha";
import { parseAnswersForTopic, patchSubmissionSchema } from "@/lib/intake/schema";
import { verifyEditToken } from "@/lib/intake/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Room for the two emails, which are sent after the response has gone out.
export const maxDuration = 30;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * PATCH /api/intake/[id] — called when step 2 is completed, and again when the
 * form is submitted. Completing is what fires the emails.
 *
 * The API is write-only by design. There is no GET route for a submission, and
 * nothing stored about one is echoed back in a response.
 */
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
	const { id } = await context.params;
	if (!UUID_RE.test(id)) {
		return NextResponse.json({ error: "not_found" }, { status: 404 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "invalid_json" }, { status: 400 });
	}

	const parsed = patchSubmissionSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json({ error: "invalid_body" }, { status: 400 });
	}

	const { topic, contact, answers, final, calculator, complete, recaptchaToken } = parsed.data;

	// Answers are always validated against a topic already committed to the
	// row, so a client can never assert a branch and smuggle that branch's
	// answers past validation in the same request.
	if (topic && answers) {
		return NextResponse.json({ error: "invalid_body" }, { status: 400 });
	}

	try {
		const submission = await getSubmissionById(id);
		if (!submission) {
			return NextResponse.json({ error: "not_found" }, { status: 404 });
		}

		if (submission.status === "complete") {
			return NextResponse.json({ error: "already_complete" }, { status: 409 });
		}

		// 403 with no detail: a wrong token learns nothing about the row.
		if (!verifyEditToken(request.headers.get("x-intake-token"), submission.edit_token_hash)) {
			return NextResponse.json({ error: "forbidden" }, { status: 403 });
		}

		// A back-button correction to step 1, applied and committed before
		// anything is validated against the row's topic.
		let effectiveTopic = submission.topic;
		if (topic || contact) {
			effectiveTopic = topic ?? submission.topic;
			await updateSubmissionContact({
				id,
				topic: effectiveTopic,
				resetAnswers: effectiveTopic !== submission.topic,
				contact,
			});
		}

		if (!complete) {
			// Step 2: merge the branch answers onto the row so an abandonment
			// after this point still carries them.
			if (answers) {
				const result = parseAnswersForTopic(effectiveTopic, answers);
				if (!result.success) {
					return NextResponse.json({ error: "invalid_answers" }, { status: 400 });
				}
				await mergeSubmissionAnswers(id, result.data as Record<string, unknown>);
			}
			return NextResponse.json({ ok: true }, { status: 200 });
		}

		if (!final) {
			return NextResponse.json({ error: "invalid_body" }, { status: 400 });
		}

		// Asking for a call or a text without leaving a number would make the
		// submission unanswerable the only way they want to be answered.
		if ((final.reach === "call" || final.reach === "text") && !final.phone) {
			return NextResponse.json({ error: "phone_required" }, { status: 400 });
		}

		// The final request carries the whole branch as the visitor left it, so
		// it has to satisfy the branch on its own — it replaces what is stored
		// rather than merging onto it.
		const branch = parseAnswersForTopic(effectiveTopic, answers ?? {});
		if (!branch.success) {
			return NextResponse.json({ error: "invalid_answers" }, { status: 400 });
		}

		// Fails open: only a verified low score counts against the submission,
		// and even then the row is still saved.
		const recaptchaScore = await verifyRecaptcha(recaptchaToken);

		const completed = await completeSubmission({
			id,
			answers: branch.data as Record<string, unknown>,
			details: final.details ?? null,
			phone: final.phone ?? null,
			reach: final.reach as "email" | "call" | "text",
			calculator: calculator ? { toggles: calculator.toggles, estimate: calculator.estimate ?? null } : null,
			recaptchaScore,
		});

		// Zero rows means a concurrent request completed it first, and that
		// request owns the emails.
		if (completed) {
			if (isLikelySpam(recaptchaScore)) {
				// Saved and visible in the database, but not emailed. A real
				// person caught by a bad score is still reachable; spam is not
				// pushed into an inbox.
				console.warn(`[intake] ${completed.id} scored ${recaptchaScore} — saved without emailing.`);
			} else {
				// After the response, so the thank-you screen never waits on
				// Postmark. The submission is already safe either way.
				after(async () => {
					try {
						await notifySubmissionComplete(completed);
					} catch (error) {
						console.error("[intake] notification failed", error);
					}
				});
			}
		}

		return NextResponse.json({ ok: true }, { status: 200 });
	} catch (error) {
		console.error("[intake] failed to update the submission", error);
		return NextResponse.json({ error: "server_error" }, { status: 500 });
	}
}
