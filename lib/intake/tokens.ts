import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Edit tokens guard the partial-save update path: a row is created at step 1
 * and updated by the browser at steps 2 and 3, so knowing an id must not be
 * enough to overwrite somebody else's submission.
 *
 * The raw token is returned to the client exactly once. Only its SHA-256 hash
 * is ever stored, and it is nulled out on completion so a finished submission
 * can never be edited again.
 */

export function generateEditToken(): string {
	return randomBytes(32).toString("base64url");
}

export function hashEditToken(token: string): string {
	return createHash("sha256").update(token, "utf8").digest("hex");
}

export function verifyEditToken(rawToken: string | null | undefined, storedHash: string | null | undefined): boolean {
	if (!rawToken || !storedHash) return false;

	const candidate = Buffer.from(hashEditToken(rawToken), "hex");
	let stored: Buffer;
	try {
		stored = Buffer.from(storedHash, "hex");
	} catch {
		return false;
	}

	// timingSafeEqual throws on a length mismatch, and both sides are
	// fixed-length SHA-256 digests, so a mismatch means a malformed stored hash.
	if (candidate.length !== stored.length) return false;
	return timingSafeEqual(candidate, stored);
}
