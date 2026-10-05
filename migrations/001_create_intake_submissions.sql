-- 001_create_intake_submissions.sql
-- Project intake submissions from /start-a-project.
--
-- Run by hand against the Neon database referenced by DATABASE_URL:
--   node --env-file=.env.local scripts/migrate.mjs migrations/001_create_intake_submissions.sql
--
-- Checked in so the schema is reviewable in version control.
--
-- A row is written at the end of step 1, before any branch question is shown,
-- so somebody who abandons at step 2 is still reachable. Only `status` tells
-- the two apart: a partial is a real person who got interrupted, not an error.

create extension if not exists pgcrypto;

create table intake_submissions (
  id               uuid primary key default gen_random_uuid(),
  -- SHA-256 of the token handed to the browser once, at creation. Nulled on
  -- completion, so a finished submission can never be edited again.
  edit_token_hash  text,
  status           text        not null default 'partial'
                     check (status in ('partial', 'complete')),
  topic            text        not null
                     check (topic in ('website', 'prints', 'digitization', 'other')),
  name             text        not null,
  email            text        not null,

  -- Collected on the last step, so null on every partial.
  phone            text,
  reach            text        check (reach in ('email', 'call', 'text')),
  details          text,

  -- The branch questions, which differ per topic. Validated in
  -- lib/intake/schema.ts against the topic stored on this row.
  answers          jsonb       not null default '{}'::jsonb,
  -- The pricing calculator handoff, when the visitor arrived from it.
  calculator       jsonb,

  -- reCAPTCHA v3 score from the final submit. Null means it was never checked
  -- (not configured, or the check itself failed), which is not held against
  -- the submission.
  recaptcha_score  real,

  -- Raw IPs are never stored; the hash exists only for the hourly rate limit.
  ip_hash          text,
  user_agent       text,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  completed_at     timestamptz,
  -- Claimed before the emails go out, so a double-submit notifies once.
  notified_at      timestamptz
);

create index intake_submissions_status_created_idx on intake_submissions (status, created_at desc);
create index intake_submissions_topic_idx          on intake_submissions (topic);
create index intake_submissions_ip_hash_idx        on intake_submissions (ip_hash, created_at desc);
-- Case-insensitive lookup by email, for spotting a repeat enquiry.
create index intake_submissions_email_idx          on intake_submissions (lower(email));
