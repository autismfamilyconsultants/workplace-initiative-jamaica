# PodWash brand alignment — 2026-09-27

final result: passed

## Typography refinement
- Adapted the supplied oomh reference with joined rectangular hero panels, thin dividers and uppercase Space Grotesk headings. Inter is used for body copy; original logo colors and content remain unchanged.
- Verified loaded font faces in the browser, not just CSS declarations.
- Screenshots: `qa/type-desktop.png` (1440 × 1000), `qa/type-mobile.png` (390 × 844), `qa/type-tablet.png` (768 × 1024). No horizontal overflow or browser errors. Image zoom respects reduced-motion preferences.
- This iteration supersedes the earlier Manrope typography noted below.

## Source and scope
- Primary visual reference: user attachment `codex-clipboard-be62d3f7-c553-4cf1-ba12-29161dda01f0.png` (1000 × 1723), supported by supplied bento-layout references.
- Brand truth: supplied `podwash jamaica without bg.svg`; colors #107128, #FAC32A, #020202. Only its viewBox was tightened to remove empty space; paths retained.
- This is an intentional brand adaptation, not a pixel clone of a solar presentation. Reference imagery, lime palette, statistics, and placeholder copy are not reproduced.
- Reference and rendered desktop screenshot opened together in the same comparison input. No false pixel-equivalence claimed between a presentation board and a web viewport.

## Evidence
- `qa/redesign-desktop.png`: 1440 × 1000 desktop, top of home, 1×.
- `qa/redesign-full.png`: full page, with lazy images decoded before capture.
- `qa/redesign-mobile.png`: 390 × 844, home, 1×.
- `qa/redesign-tablet.png`: 768 × 1024, home, 1×.
- `qa/redesign-team.png`: 1440 × 1000, supervision photo and process, 1×.
- `qa/redesign-form-desktop.png`, `qa/form-mobile.png`: form typography and input spacing.

## Findings and iteration
1. Initial local SVG was not rendered because the running preview server lacked its MIME mapping. Restarted the task-owned server with SVG/WebP/font mappings. Recaptured desktop; logo and every image decode successfully. Resolved.
2. Full-page screenshot initially showed deferred images before scrolling; decoded lazy assets for the evidence capture. Verified team image separately in viewport. Not a production image failure.
3. No remaining P0/P1/P2 visual findings.

## Required surfaces
- Typography: Manrope replaces the inherited serif/rounded pairing, with bold, clean headlines and quieter body copy. No clipping observed.
- Spacing: two-column desktop hero, modular benefits, four process steps, eight skill cells. Mobile stacks long content and forms; no horizontal overflow at 390 or 768.
- Colors: actual logo green/gold/black with white and pale green-neutral surfaces; dark-green panels provide controlled contrast. No reference lime/purple palette carried over.
- Images: two optimized generated WebP scenes; identified as illustrative, not real employees. Supplied vector logo remains sharp. Bootstrap Icons replaces decorative glyphs in new sections.
- Content: all six main sections retained; service scope, ~2 litres, paid work ages 16–25, inclusion, supervision, six benefits, four stages, eight skills, AFC/EcoWash context, and final three pathways covered.
- Interactions: six mobile links present; actual menu click opens; corporate anchor changes hash and closes menu. PodPro guardian fields show at 17/hide at 22; experience follow-up shows for Yes/hides for No. Browser error list empty. Existing form validation suite passes.

## Requirements / remaining inputs
- Detailed questionnaires remain on their own routes. General contact remains on home. Confirmation strings, persistence, notifications, anti-spam and founder authentication untouched.
- Social destinations were not supplied: recognizable reserved icons are non-links with coming-soon labels, not fake destinations.
- No new live messages sent during this visual-only update; delivery/storage integration was verified in the preceding release.
- Follow-up polish: replace illustrative photos with commissioned PodWash photography when available.
