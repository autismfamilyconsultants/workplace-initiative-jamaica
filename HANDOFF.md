# PodWash Jamaica — continuation context

## Latest update (supersedes older icon notes below)
- User requested text-only buttons. Removed decorative icons from the shared button helper and CTA text links in scripts/landing.mjs. Labels, targets, popup handlers and forms are unchanged.
- Informational icons, select chevrons and popup close icon remain. Prior release 9edc160 is deployed; this update is being committed and pushed through the same main-branch workflow. Use git log -1 for the resulting commit.

## Repository and deployment
- Local repository: C:/Users/misha/Documents/Codex/2026-08-31/x20/outputs/podwash-jamaica
- GitHub: autismfamilyconsultants/workplace-initiative-jamaica, branch main.
- Production: https://www.podwashjamaica.com/.
- Vercel project: workplace-initiative-jamaica, team autismfamilyconsultants. GitHub main pushes automatically deploy production.
- Previous production commit: 71fe75d. This release commits the accumulated icon, popup alignment and vertical checklist changes; resolve its SHA with git log -1.

## Architecture
- Static HTML generator: scripts/build-site.mjs builds dist with shared navigation/footer, home, fallback form pages, admin and legal pages.
- scripts/landing.mjs owns homepage content. static/site.css is baseline CSS; static/brand.css overrides typography, layout and colors.
- Fonts: Outfit headings/navigation, Inter body. Green #107128, gold #fac32a, black #020202.
- Supplied static/podwash-header-logo.svg is used only in the header; static/podwash-logo.svg remains in footer.
- static/site.js renders all forms from /schema.mjs, validates, submits, handles native dialog popups and the founder inbox.
- Three dialogs (corporate, podpro, area) are created on home before form rendering. Delegated link handling opens them; fallback /forms/* routes remain. Contact form stays inline. Native dialogs provide focus containment; Escape/close returns focus. Values persist when dismissed.
- Shared schema/validation: supabase/functions/podwash-forms/schema.mjs, copied to dist/schema.mjs.
- Backend endpoint: Supabase project aabqjokzpjadmpdoyhfe, function podwash-forms. Stores podwash_submissions; founder inbox /admin authenticates via x-founder-key. Email notifications use Resend, recipient autismfamilyconsultantslimited@gmail.com. No backend changes in this task.

## Current local state — restored original design
- Latest local adjustment: corporate .service-layout is stacked, with the checklist below the description; .sector-list is one column at all breakpoints. Text and checklist max-width 760px, vertical gap 28px. Requested interpretation was stated to user before implementation. Included in the release requested by the user on 2026-09-27.
- User requested the old design shown in codex-clipboard-ea936fb2-4e55-4ea3-8b58-69a3923c8605.png.
- Removed the entire experimental editorial CSS override block. Original two-column hero, uppercase headline, section backgrounds, card grids, spacing and photo placement are restored.
- Restored hero headline and caption line breaks.
- Retained newer semantic Bootstrap CTA icons in scripts/landing.mjs (building, person-badge, geo-alt, people, globe2, shield-check).
- Retained local popup fixes: bi-x-lg centered with grid; radio/checkbox input margins reset and labels aligned.
- Dropdown chevron inset is already published in commit 71fe75d. Semantic icons, popup alignment, vertical checklist and this document are included in this release.
- The minimalist redesign is abandoned, not pending. Old qa/minimal-* screenshots are historical and should not guide further work.
- User explicitly requested commit and push. Git push main triggers production; verify Ready and the live domain after pushing.

## Verification and commands
- Build: node --env-file=.env.podwash.local scripts/build-site.mjs
- Tests: node scripts/test-site.mjs; node scripts/test-forms.mjs
- Preview: node scripts/serve.mjs (http://127.0.0.1:4190/).
- Browser: npx --yes agent-browser --session podwash open http://127.0.0.1:4190/.
- Deployment status: npx vercel ls workplace-initiative-jamaica --scope autismfamilyconsultants.
- dist, qa, node_modules and environment files are ignored. Never commit environment files or credentials. Avoid live form submissions unless explicitly needed; they notify the real recipient.
- Experimental redesign was removed. There are no intended pending redesign changes after this release.

## User requirement
For each code-change handoff, provide a link to a file with complete architectural/technical continuation context. Keep this document updated.

## Runtime, assets, routes and boundaries
- Node >=22; npm run build invokes scripts/build-site.mjs. No React runtime or client-side router. Bootstrap Icons 1.13.1 is the sole npm dependency; icon fonts are copied into dist/icons.
- Vercel uses buildCommand npm run build, outputDirectory dist, cleanUrls true. Home revalidates with max-age=0. .vercel/project.json links the existing project; do not create a second project.
- Public build variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. They generate window.PODWASH_CONFIG in dist/config.js. Local .env.podwash.local is ignored. Keep all private keys server-side and never print environment files.
- Routes: / with anchors home/corporate/podpro/area/about/contact; /forms/corporate, /forms/podpro, /forms/area as fallback; /admin noindex; /privacy; /terms; robots.txt and sitemap.xml.
- Backend implementation: supabase/functions/podwash-forms/index.ts; DB migration: supabase/migrations/20260926190634_podwash_submissions.sql; companion SQL: supabase/podwash-schema.sql. Frontend push does not deploy an Edge Function or migrate the DB. Read Supabase skill before backend changes.
- Client request actions: submit, list, status, retry. Submit includes UUID, honeypot and started timestamp; list/status/retry use founder access key. Admin supports form filtering, pagination, status changes, email reply and notification retry. Do not expose private submission data in logs/screenshots.
- Forms use shared schema: required/optional labels, conditional guardian fields under 18, previous-experience follow-up, Other follow-ups, optional partner details. Current age bounds remain 1–120 despite advertised 16–25; budget assumes JMD; parish uses dropdown. These were reported as open content decisions, not silently changed.
- Header aligns to content max-width 1240px. Header text stays black for active/hover states. Water number/unit gap is 4px. Contact is inline; detailed questionnaires are modal on home. Select chevrons have 16px inset and 44px reserved text padding.
- Photos static/vehicle-care.webp and static/team-work.webp are generated illustrative images, not actual staff. Keep disclosure captions. ASSETS.md documents provenance. User SVG logos must not be regenerated.
- scripts/build-static.mjs is a legacy script, not the active npm build. Avoid changing unused files accidentally.
- QA screenshots are local/ignored. Prior design-qa.md is historical, not evidence for every later fix. Latest restored-layout evidence: qa/restored-design.png; popup alignment: qa/aligned-popup.png. No new live email submissions are needed for this styling release.

