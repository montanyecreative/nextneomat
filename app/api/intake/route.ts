import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { insertSubmission } from "@/lib/intake/db";
import { clientIpFrom, hashIp, isRateLimited } from "@/lib/intake/rate-limit";
import { createSubmissionSchema } from "@/lib/intake/schema";
import { generateEditToken, hashEditToken } from "@/lib/intake/tokens";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/intake — creates the partial record at the end of step 1, before
 * any branch question is shown. This is the partial-save: a name, an email and
 * what they are reaching out about are durable even if the visitor closes the
 * tab on step 2.
 *
 * Anti-spam is three cheap layers: the honeypot, an hourly rate limit by
 * hashed IP, and completion gating — nothing here notifies anybody, so a bot
 * has to walk the whole form to produce an email.
 */
export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "invalid_json" }, { status: 400 });
	}

	const parsed = createSubmissionSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json({ error: "invalid_body" }, { status: 400 });
	}

	const { topic, name, email, calculator, company } = parsed.data;

	// Honeypot: a silent success beats a 400, which just tells a bot to retry
	// differently. Nothing is written, and the ids handed back lead nowhere.
	if (company && company.trim().length > 0) {
		return NextResponse.json({ id: randomUUID(), token: generateEditToken() }, { status: 201 });
	}

	const ipHash = hashIp(clientIpFrom(request.headers));

	try {
		if (await isRateLimited(ipHash)) {
			return NextResponse.json({ error: "rate_limited" }, { status: 429 });
		}

		const token = generateEditToken();
		const { id } = await insertSubmission({
			topic,
			name,
			email,
			calculator: calculator ? { toggles: calculator.toggles, estimate: calculator.estimate ?? null } : null,
			editTokenHash: hashEditToken(token),
			ipHash,
			userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
		});

		// The raw token is handed over exactly once. Only its hash is stored.
		return NextResponse.json({ id, token }, { status: 201 });
	} catch (error) {
		console.error("[intake] failed to create the submission", error);
		return NextResponse.json({ error: "server_error" }, { status: 500 });
	}
}
