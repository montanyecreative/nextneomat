This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

```bash
npm install
npm run build
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Linting

```bash
npm run lint       # eslint .
npm run lint:fix   # eslint . --fix
```

Config lives in `eslint.config.mjs`. It calls ESLint directly rather than going through `next lint`,
which Next 16 removed, and it is a flat config because that is the only format ESLint 9 reads.
`next build` no longer runs ESLint of its own accord, so this is the only place lint runs.

## Project intake (`/start-a-project`)

The form is a three-step stepper that writes to Neon twice.

1. **End of step 1** — `POST /api/intake` inserts a `partial` row holding the name, email and
   topic, and hands the browser a one-time edit token. Somebody who abandons on step 2 is still
   reachable; that is the whole point of saving this early.
2. **End of step 2** — `PATCH /api/intake/[id]` merges the branch answers onto the row. Best
   effort and silent, because the final submit sends them again.
3. **Submit** — the same `PATCH` with `complete: true` flips the row to `complete`, nulls the edit
   token so it can never be edited again, and **this is the only call that sends email**.

Two Postmark emails go out on completion: a notification to `INTAKE_NOTIFY_EMAILS` (reply-to set
to the visitor) and a copy of their answers to the visitor, which is what the done screen promises
them. Partial rows never email anybody.

Spam is handled in several cheap layers, scored on the final submit. The guiding rule is that no
check is ever allowed to discard a submission: a false positive is a real person, so anything
uncertain is stored and triaged rather than dropped. See `lib/intake/` for the specifics.

### Migrations

Applied by hand; there is no ledger.

```bash
node --env-file=.env.local scripts/migrate.mjs migrations/001_create_intake_submissions.sql
```

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | Neon connection string. Without it the form cannot save. |
| `POSTMARK_SERVER_TOKEN` | for email | Postmark server token. |
| `POSTMARK_FROM` | for email | A **verified** Postmark sender signature. Nothing sends without this. |
| `INTAKE_NOTIFY_EMAILS` | for the notification | Comma-separated recipients. Unset means only the visitor's copy sends. |
| `POSTMARK_MESSAGE_STREAM` | no | Defaults to `outbound`. |
| `POSTMARK_REPLY_TO` | no | Reply-to on the visitor's copy. |
| `INTAKE_IP_HASH_SALT` | recommended | Salts the IP hash used for rate limiting. Unset falls back to a per-process random salt, so the limit only holds within one instance. |
| `RECAPTCHA_SECRET_KEY` | no | Enables scoring. Unset means no verdict, and everything notifies. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | no | Loads the reCAPTCHA script on the intake page. |

Postmark and reCAPTCHA are both optional: with neither configured the form still saves every
submission, which is the part that cannot be lost.

## Analytics

Every GA4 event goes through `lib/gtag.ts`; nothing calls `window.gtag` directly. Site-wide events
(page views, scroll depth, outbound clicks, file downloads, mailto/tel taps) come from the
delegated listeners in `components/analytics/AnalyticsListeners.tsx`.

Buttons and toggles report themselves, because the delegated listener deliberately ignores
same-page and internal links. Two custom events carry them:

-   `button_click` — `button_name`, `button_location`, `button_text`, `button_value`
-   `toggle` — `toggle_name`, `toggle_location`, `toggle_text`, `toggle_value`, `toggle_state`

The intake form adds `form_step` and `form_option_select` on top of the standard
`form_start` / `form_submit` / `generate_lead` / `form_error` set, so each step's drop-off and each
chosen option are visible.

**Custom event parameters need registering before they appear anywhere outside DebugView and the
realtime report:** Admin → Custom definitions → Create custom dimension, event-scoped, one per
parameter name above.

To verify locally, set `NEXT_PUBLIC_GA_DEBUG=true` and watch the console for `[ga4] <name>` lines,
or GA → Admin → DebugView.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Resources

-   https://www.radix-ui.com/icons
-   https://animate.style/
-   https://ui.shadcn.com/docs
-   https://tailwindcss.com/docs/installation
-   https://nextjs.org/docs
-   https://react.dev/
