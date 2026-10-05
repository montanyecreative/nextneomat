#!/usr/bin/env node
// Applies a file from migrations/ to the Neon database behind DATABASE_URL.
//
//   node --env-file=.env.local scripts/migrate.mjs migrations/001_create_intake_submissions.sql
//
// There is no migration ledger: the files are few, named in order, and applied
// by hand. Each one is written to be safe to re-read, not safe to re-run.
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
	console.error("DATABASE_URL is not set. Pass --env-file=.env.local, or export it.");
	process.exit(1);
}

const file = process.argv[2];
if (!file) {
	console.error("Usage: node --env-file=.env.local scripts/migrate.mjs <migrations/file.sql>");
	process.exit(1);
}

// Strip "--" comments before splitting: a semicolon inside a comment would
// otherwise cut a statement in half.
const text = (await readFile(file, "utf8"))
	.split("\n")
	.map((line) => line.replace(/--.*$/, ""))
	.join("\n");

const statements = text
	.split(";")
	.map((statement) => statement.trim())
	.filter(Boolean);

const sql = neon(url);
for (const statement of statements) {
	console.log(`> ${statement.split("\n")[0].slice(0, 80)}…`);
	await sql.query(statement);
}
console.log(`Applied ${statements.length} statement(s) from ${file}.`);
