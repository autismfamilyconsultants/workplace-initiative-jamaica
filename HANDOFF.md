# PodWash Jamaica — continuation context

## Latest update (supersedes older icon notes below)
- 2026-09-30 submission routing hardening: all four public forms (Corporate, PodPro, Area, Contact) continue to submit through `podwash-forms`, which persists each validated submission to `podwash_submissions` before attempting email delivery. Notification recipient is now configurable through server-side `AFC_EMAIL_TO`, defaulting to the established AFC form inbox `autismfamilyconsultantslimited@gmail.com`; sender remains `AFC_EMAIL_FROM`/Resend and submitter remains Reply-To. The admin inbox continues to show notification status and supports retry. This repository change does not itself deploy the Supabase Edge Function; the existing AFC Supabase project must deploy the updated `podwash-forms` function separately if the environment variable override is needed.
- 2026-09-28 requirements alignment: the production source now follows the client-provided PodWash Jamaica brief. All six anchor navigation items are present (Home / Corporate Partnerships / Become a PodPro / Bring PodWash to Your Area / About / Contact); landing-page copy and CTA labels were expanded back to the approved wording instead of shortened marketing paraphrases. Detailed forms remain modal/dedicated-route experiences, while the general Contact form stays inline. The shared form schema now uses the approved labels, combined under-18 guardian field, PodPro age range 16–25, exact confirmation strings and CTA labels. Because Supabase deployment access was unavailable in-chat, static/site.js temporarily duplicates the combined guardian value into legacy guardianName for compatibility with the currently deployed backend; remove that bridge only after podwash-forms is redeployed with the current schema.mjs. Latest Vercel deployment after commit 9398ef2 reported success.
- 2026-09-28: User-provided drop mark is static/favicon.png, copied unchanged from the supplied desktop favicon.png. Shared page template now links /favicon.png (image/png), covering home, forms, admin and legal pages; build copies the file into dist. Social preview image remains the full logo.
- 2026-09-28 latest: User replaced the two-tier header with a compact single desktop row. Full five labels retained, no Home link; logo links home. Gap 22px / font 16px, reduced to 16px / 14px at 901–1150px; logo 190px / 165px. Mobile menu <=900px unchanged. Desktop anchor offset 110px. This supersedes all two-tier-header notes below. Validate desktop, narrow desktop and mobile before main push.
- 2026-09-28: Corporate introductory heading, lead, description and CTA now share the left column of .service-layout. The eight-item sector checklist sits in the right column, vertically centered against the entire text block. Single-column list retained; <=650px layout stacks text then checklist. This supersedes the earlier stacked desktop checklist instruction. Changed scripts/landing.mjs and static/brand.css; verify desktop/mobile before main push.
- 2026-09-28: PodPro section now uses a dedicated built-in ImageGen photograph static/podpro-training.webp, replacing the reused clipboard photo only in this section. Corporate team photo remains team-work.webp. Build copies the new asset; alt text and illustrative disclosure retained. ASSETS.md records prompt/provenance. Verify desktop/mobile crop before publishing via main.
- 2026-09-28: Header has two desktop tiers: centered supplied SVG logo, then full labels Corporate Partnerships / Become a PodPro / Bring PodWash to Your Area / About / Contact. Home removed from navigation; logo retains /#home. Shared navigation labels also apply to footer. Mobile <=900px uses logo + Menu with full wrapping labels. Styles at end of static/brand.css; sticky header retained. Anchor offsets now use scroll-padding only (160px desktop / 100px mobile), removing additive section offsets. Build and visual verification precede main push; resolve final commit with git log -1.
- Current fix: static/site.css overrides focus for text-like inputs, select and textarea using a 2px green outline inset by 2px, green border and no box shadow. This removes the global 5px outline gap without hiding keyboard focus. Radio/checkbox and button focus are unchanged. Applies to admin access key, inline contact and modal questionnaires. Previous production commit b4eb00b; resolve new release SHA via git log -1.
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

