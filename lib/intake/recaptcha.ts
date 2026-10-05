/**
 * reCAPTCHA v3 verification for the final intake submit.
 *
 * The score decides whether the notification emails go out — never whether the
 * submission is saved. A v3 false negative is a real person with a browser
 * extension or a cautious network, and losing their enquiry costs far more
 * than reading one piece of spam. So this fails open by design: anything other
 * than a verified low score returns null, which the route treats as "no
 * opinion" and notifies as usual.
 */

/** Google's own guidance: 0.5 and above reads as human. */
export const RECAPTCHA_SCORE_THRESHOLD = 0.5;

/** A hung verification must not hold the visitor's submit open. */
const VERIFY_TIMEOUT_MS = 5000;

/**
 * The verified score, or null when there is no usable verdict — no token sent,
 * no secret configured, Google unreachable, or a malformed response.
 */
export async function verifyRecaptcha(token: string | undefined): Promise<number | null> {
	if (!token) return null;

	const secret = process.env.RECAPTCHA_SECRET_KEY;
	if (!secret) {
		console.info("[intake] RECAPTCHA_SECRET_KEY is unset — skipping reCAPTCHA verification.");
		return null;
	}

	try {
		const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: { "content-type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({ secret, response: token }).toString(),
			signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
		});

		if (!response.ok) {
			console.warn(`[intake] reCAPTCHA siteverify responded ${response.status}.`);
			return null;
		}

		const data = (await response.json()) as { success?: boolean; score?: number; "error-codes"?: string[] };

		// A failed verification is not the same as a low score: an expired or
		// duplicate token means we learned nothing, so there is no verdict.
		if (!data.success) {
			console.warn("[intake] reCAPTCHA verification failed", data["error-codes"]);
			return null;
		}

		return typeof data.score === "number" ? data.score : null;
	} catch (error) {
		console.warn("[intake] reCAPTCHA verification errored", error);
		return null;
	}
}

/** True only for a verified score below the threshold. Null never counts. */
export function isLikelySpam(score: number | null): boolean {
	return score !== null && score < RECAPTCHA_SCORE_THRESHOLD;
}
