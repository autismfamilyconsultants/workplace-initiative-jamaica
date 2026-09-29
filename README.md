# PodWash Jamaica

Production: https://www.podwashjamaica.com

The current build is `scripts/build-site.mjs`. It produces `dist/`: one landing page with six anchor sections, three dedicated forms (`/forms/corporate`, `/forms/podpro`, `/forms/area`), a contact form, `/admin`, and privacy/terms pages. The older `static/index.html` and `workplace.css` are retained as source history and are not served by the new build.

## Forms and founder inbox

`supabase/functions/podwash-forms/schema.mjs` is shared by client and server validation. Conditional fields are disabled and excluded when not applicable. The handler uses JWT verification and additionally requires the existing AFC founder access key for inbox actions. The key stays in memory, never local storage.

Submissions are saved to the separate `podwash_submissions` table in the existing AFC Supabase project. RLS is enabled; anonymous and authenticated clients have no direct table or RPC access. Only the server role can read/write. The server stores the submission before sending email. Resend notifications go to `autismfamilyconsultantslimited@gmail.com`, with the submitter as Reply-To. The current verified AFC sender is reused until a PodWash sender is verified.

The inbox at `/admin` offers form-type filtering, pagination, new/reviewing/closed status, email reply links, notification status, and a retry action. Notification success means acceptance by Resend, not proof of inbox delivery.

Spam controls: honeypot, minimum completion time, bounded server validation, atomic per-email and salted per-IP rate limits, origin checks, and submission UUID idempotency. The raw IP is not stored. Social placeholders are intentionally unlinked until real account URLs are supplied.

## Development and verification

Run `npm run build`, then `node scripts/serve.mjs` for http://127.0.0.1:4190.

Run `node scripts/test-forms.mjs` for validation checks. The optional `--live` flag creates clearly marked synthetic submissions and sends real test notifications to the founder; use only for intentional deployment checks.

Configure public `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel. Supabase uses its own server role, existing `RESEND_API_KEY`, `AFC_EMAIL_FROM`, optional `AFC_EMAIL_TO` (defaults to `autismfamilyconsultantslimited@gmail.com`), and existing founder-key hash (`ADMIN_REVIEW_TOKEN_HASH` if configured). No email key or server-role key belongs in browser configuration.

The schema is recorded in `supabase/migrations/20260926190634_podwash_submissions.sql`. It was applied directly to the existing shared database; do not push an incomplete migration history over the AFC project. Deploy only `podwash-forms` with JWT verification enabled.

## Original project notes

Standalone site for the Jamaica Workplace Initiative and PodWash Jamaica partnership.

## Vercel environment variables

Set these in the Vercel project so the interest-list form can keep writing to the existing AFC Supabase leads table:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The build writes those public values into `static/config.js`.

## Deploy

Import this repository into Vercel and use the repository defaults. `vercel.json` runs `npm run build` and serves the `static` directory.


## SEO

The build generates:

- `robots.txt`
- `sitemap.xml`
- canonical URL
- Open Graph / Twitter metadata
- Organization structured data

For the final custom domain, set this Vercel environment variable:

- `SITE_URL=https://your-final-domain.example`

If `SITE_URL` is not set, the build falls back to Vercel's production URL. After the final domain is connected, set `SITE_URL` and redeploy before submitting the sitemap to Google Search Console.

Google Search Console sitemap URL:

- `https://your-final-domain.example/sitemap.xml`
