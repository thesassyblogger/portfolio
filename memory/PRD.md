# PRD — Mansi Patel 3D Portfolio

## Original Problem Statement
Build a premium personal portfolio for Mansi Patel, a 21-year-old Full Stack (Cloud) Engineer (Mumbai → Regina). Best-in-class animations/transitions with 3D/WebGL; a stylized 3D avatar as the hero centerpiece that changes pose per section on scroll. Space + fashion-editorial aesthetic. Exclude YMCA and Guac Mexi Grill experience.

## User Choices
- Theme: "You decide the best" → cosmic + fashion-editorial (dark, Cormorant Garamond / Outfit / Space Mono).
- Avatar: stylized 3D character now (swappable later); generated from prompts, backgrounds removed (transparent PNGs in /public/avatars).
- Sections: Hero, About, Skills, Experience, Projects, Travel&Cosmos, Style/Fashion, Contact.
- Contact form: saves messages to MongoDB (backend).
- No authentication.

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + @react-three/fiber/three (WebGL starfield). Native smooth scroll. IntersectionObserver drives active section + avatar pose. ErrorBoundary + WebGL-availability check with CSS starfield fallback.
- Backend: FastAPI + Motor (MongoDB). Endpoints: POST/GET /api/contact (collection: contact_messages).
- Assets: user's real photos converted from HEIC → /public/photos/mansi_1..3.jpg (used in Style & Cosmos). Avatars in /public/avatars.

## Implemented (2026-07-01)
- Full 8-section portfolio with 3D WebGL cosmic hero, pose-changing avatar, scroll-driven Framer Motion animations.
- Content sourced from resume (experience excludes YMCA/Guac). GitHub: thesassyblogger; LinkedIn linked.
- Working contact form (save + list), validation (422 on bad email), success/error toasts.
- Robust WebGL fallback so no crash on devices without WebGL.
- Verified: testing agent — backend 7/7, frontend all checks pass, no runtime overlay.

## Iteration 2 — Major Redesign (2026-07-01)
Per user feedback the dark space theme hurt readability; redesigned to a LIGHT neutral editorial theme.
- Theme: cream/bone (#EFEBE3) bg, charcoal ink (#1B1A16), terracotta accent (#BF5537). Removed all space/cosmos + starfield.
- Avatar: regenerated mature, fair-skinned, elegant cream-suit set (hero/coding/present/wave), transparent PNGs. Age removed from copy.
- Removed ALL personal photos; removed Cosmos & Style photo sections. Sections now: Home, About, Skills, Work, Projects, Contact.
- Added cinematic Preloader intro (Cyberfiction-style; hard-cap so it always completes; skippable via ?fast).
- Distinct per-section animations: hero letter-reveal + keyword stagger, About word-by-word blur reveal, Skills marquee + 3D tilt cards, Experience scroll-drawn timeline, Projects rotating 3D cylinder.
- Projects rebuilt as a rotating 3D CYLINDER carousel: 6 projects (Mango, Sunflower, Real-Time Chat, Cloud Vendor/Task Manager, Production AWS DevOps, DevOps Pipeline) with correct links; auto-rotate + drag + hover-pause, fullscreen toggle, click-to-open detail modal, infinite loop.
- Responsive; fixed mobile horizontal overflow (overflow-x: clip on html + overflow-hidden on projects).
- Verified: testing agent — backend 7/7, frontend ~95% (mobile overflow fixed after retest guidance).

## Iteration 3 — Polish & Interactivity (2026-07-01)
- Project cards now use real cropped screenshots (Mango, Sunflower, Real-Time Chat, Task Manager) with browser chrome/taskbar removed; removed the Live/Code tag badge.
- Single CONSTANT avatar (one character) that crossfades between poses per section (no vanish/replace), with a one-time entrance animation and cursor-follow tilt on the Home section only.
- Added a creative desktop custom cursor (lagging ring + dot; disabled on touch; pointer-events none so it never blocks clicks).
- Redesigned About (animated count-up stats + interests marquee), Skills (interactive accordion), Experience (scroll-drawn timeline + hover-expand cards) for unique motion.
- Verified: testing agent — backend 7/7, frontend ~97%→fixed (Sunflower image wired; front-only card click).

## Backlog / Next
- P1: Swap stylized avatar for a likeness generated from Mansi's real photos (she sent 3); optional GLTF animated model.
- P1: Replace Travel & Style stock placeholders with Mansi's own travel/fashion photos.
- P2: Admin view for contact messages; email notifications (Resend/SendGrid).
- P2: Pause WebGL RAF on tab hidden; replace deprecated THREE.Clock; add rate limiting/captcha on contact.
- P2: Downloadable resume button; SEO/OG meta tags for shareability.

## Iteration 5 — Real WebGL 3D Avatar + résumé + fixes (2026-07-06)
- Replaced the 2D PNG avatar with a genuine real-time **WebGL 3D rigged model** (@react-three/fiber + three.js, GLTFLoader). Model: three.js Xbot (`/public/models/avatar.glb`), tinted to a warm bronze/terracotta "sculpture" matching the editorial palette, lit with RoomEnvironment + directional/hemisphere lights.
  - Cursor-follow rotation (true 3D), looping idle animation ("agree" nod on About/Contact), per-section positioning (center/left/right), hidden on Skills, entrance fade after preloader, tag bubbles.
  - NOTE: Ready Player Me shut down (Jan 31 2026, DNS dead) so it's a GENERIC rigged figure per user choice, not a likeness. Swap `/public/models/avatar.glb` with any rigged `.glb` to change it.
- Skills accordion: multiple groups can now stay open independently (Set-based state).
- Added **Résumé download** button (navbar desktop + mobile); generated `/public/mansi-patel-resume.pdf` from site data (reportlab). Swap the PDF anytime.
- Single consistent avatar likeness era (earlier iteration) is superseded by the 3D model. Old pose PNGs (`pose_wave/arms/present.png`, hero.png) now unused but retained.

## Backlog / Next
- P1: If a matching `.glb` likeness becomes available (MetaPerson / 3D artist), swap it into Avatar.jsx model path.
- P1: Replace résumé placeholder PDF with Mansi's official résumé.
- P2: Pause WebGL render loop when tab hidden / avatar off-screen for perf.
- P2: Admin view + email notifications for contact messages; SEO/OG meta tags.

## Iteration 4 — Loading Animation + Travel & Style (2026-07-03)
- New unique Preloader: scattered serif letters spring-assemble into "MANSI PATEL" inside a progress ring, then vertical panels sweep up to reveal the site (skippable via ?fast). Verified working.
- Re-added TRAVEL section: horizontal sticky-scroll gallery (Mumbai, Regina, Saskatchewan, Kyoto, Cam Ranh) with parallax image cards + location typography overlays. (05) — Travel.
- Re-added STYLE / Off-hours section: editorial magazine spread (4 images, asymmetric overlapping grid, parallax + hover captions). (06) — Off Hours.
- Enhanced About (parallax watermark, slow-spinning editorial seal, animated underline draw, interactive count-up stats), Skills (growing accent bar, tool counts, row hover motion), Experience (large faint index numerals).
- Navbar now 8 links; Avatar gained Travel(right)/Style(left) shifted+shrunk poses so it doesn't block content.
- Verified: testing agent iteration_9 — frontend 100%, no console errors, no regressions on cylinder/contact. Travel/Style stock images are placeholders.
