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

## Backlog / Next
- P1: Swap stylized avatar for a likeness generated from Mansi's real photos (she sent 3); optional GLTF animated model.
- P2: Admin view for contact messages; email notifications (Resend/SendGrid).
- P2: Pause WebGL RAF on tab hidden; replace deprecated THREE.Clock; add rate limiting/captcha on contact.
- P2: More travel/fashion photos, project screenshots, downloadable resume button.
