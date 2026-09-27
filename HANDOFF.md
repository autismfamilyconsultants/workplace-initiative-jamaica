# PodWash Jamaica — continuation context

## Repository and deployment
- Local repository: C:/Users/misha/Documents/Codex/2026-08-31/x20/outputs/podwash-jamaica
- GitHub: autismfamilyconsultants/workplace-initiative-jamaica, branch main.
- Production: https://www.podwashjamaica.com/.
- Vercel project: workplace-initiative-jamaica, team autismfamilyconsultants. GitHub main pushes automatically deploy production.
- Last production feature before this fix: ecf4e7f, same-page questionnaire dialogs.

## Architecture
- Static HTML generator: scripts/build-site.mjs builds dist with shared navigation/footer, home, fallback form pages, admin and legal pages.
- scripts/landing.mjs owns homepage content. static/site.css is baseline CSS; static/brand.css overrides typography, layout and colors.
- Fonts: Outfit headings/navigation, Inter body. Green #107128, gold #fac32a, black #020202.
- Supplied static/podwash-header-logo.svg is used only in the header; static/podwash-logo.svg remains in footer.
- static/site.js renders all forms from /schema.mjs, validates, submits, handles native dialog popups and the founder inbox.
- Three dialogs (corporate, podpro, area) are created on home before form rendering. Delegated link handling opens them; fallback /forms/* routes remain. Contact form stays inline. Native dialogs provide focus containment; Escape/close returns focus. Values persist when dismissed.
- Shared schema/validation: supabase/functions/podwash-forms/schema.mjs, copied to dist/schema.mjs.
- Backend endpoint: Supabase project aabqjokzpjadmpdoyhfe, function podwash-forms. Stores podwash_submissions; founder inbox /admin authenticates via x-founder-key. Email notifications use Resend, recipient autismfamilyconsultantslimited@gmail.com. No backend changes in this task.

## Current scoped fix
- Dropdowns use a select-control wrapper and Bootstrap Icons chevron-down, positioned 16px from the right edge. Select reserves 44px for the icon.
- Native select behavior is retained; icon ignores pointer events and is aria-hidden. Forced-colors mode restores native arrow.
- Files for this fix: static/site.js, static/site.css, HANDOFF.md.

## IMPORTANT pending unrelated changes
- scripts/landing.mjs and static/brand.css contain an interrupted, uncommitted minimal redesign: centered hero, quieter surfaces, wide photo, reduced colored panels.
- Do NOT include those files in the dropdown-only commit or deploy them accidentally.
- Latest local redesign screenshots: qa/minimal-desktop.png, qa/minimal-full.png, qa/minimal-mobile.png. Latest captures still need final visual QA and design-qa.md update. This redesign is not approved as complete.
- Existing design-qa.md describes earlier work and should not be treated as evidence for the unfinished redesign.

## Verification and commands
- Build: node --env-file=.env.podwash.local scripts/build-site.mjs
- Tests: node scripts/test-site.mjs; node scripts/test-forms.mjs
- Preview: node scripts/serve.mjs (http://127.0.0.1:4190/).
- Browser: npx --yes agent-browser --session podwash open http://127.0.0.1:4190/.
- Deployment status: npx vercel ls workplace-initiative-jamaica --scope autismfamilyconsultants.
- dist, qa, node_modules and environment files are ignored. Never commit environment files or credentials. Avoid live form submissions unless explicitly needed; they notify the real recipient.
- Local preview builds include pending redesign files; Git deployment includes only committed files.

## User requirement
For each code-change handoff, provide a link to a file with complete architectural/technical continuation context. Keep this document updated.
