import { createHash, randomBytes } from "node:crypto";
import { countRecentSubmissionsByIpHash } from "./db";

/** More than this many starts from one IP in an hour and we stop inserting. */
export const MAX_STARTS_PER_HOUR = 6;

let fallbackSalt: string | null = null;

function ipHashSalt(): string {
	const configured = process.env.INTAKE_IP_HASH_SALT;
	if (configured) return configured;

	// A missing salt must not take the form down. A per-process random salt
	// keeps rate limiting working within an instance and keeps dev unblocked.
	if (!fallbackSalt) {
		fallbackSalt = randomBytes(32).toString("hex");
		console.warn("[intake] INTAKE_IP_HASH_SALT is unset — using an ephemeral per-process salt.");
	}
	return fallbackSalt;
}

/**
 * Raw IPs are never stored. The hash exists only for the hourly count, and
 * hashing keeps visitor data out of the table entirely.
 */
export function hashIp(ip: string | null): string | null {
	if (!ip) return null;
	return createHash("sha256").update(`${ipHashSalt()}:${ip}`, "utf8").digest("hex");
}

/** Vercel puts the client IP first in x-forwarded-for. */
export function clientIpFrom(headers: Headers): string | null {
	const forwarded = headers.get("x-forwarded-for");
	if (forwarded) {
		const first = forwarded.split(",")[0]?.trim();
		if (first) return first;
	}
	return headers.get("x-real-ip")?.trim() || null;
}

export async function isRateLimited(ipHash: string | null): Promise<boolean> {
	if (!ipHash) return false;
	const recent = await countRecentSubmissionsByIpHash(ipHash);
	return recent >= MAX_STARTS_PER_HOUR;
}
