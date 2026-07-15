# Mansi Patel Portfolio

A polished personal portfolio for Mansi Patel, a Full Stack Cloud Engineer based in Regina, Canada. The site presents my work, skills, experience, projects, resume, GitHub, and LinkedIn profile through an editorial interface with motion, WebGL, and a custom 3D avatar.

Live site: https://mansicodes.dev/

## Highlights

- Interactive hero section with a real-time 3D avatar
- Smooth scroll-based motion and section-aware navigation
- Project showcase with visual cards and live/code links
- Skills grouped across cloud, backend, frontend, DevOps, and tools
- Experience section focused on full-stack engineering and IT support work
- Contact form powered by FormSubmit
- Responsive layout for desktop, tablet, and mobile
- GitHub Pages deployment through GitHub Actions

## Tech Stack

- React 19
- Tailwind CSS
- Framer Motion
- Three.js and React Three Fiber
- GSAP
- Lucide React
- Axios
- GitHub Actions
- GitHub Pages

## Project Structure

```text
.
|-- frontend/                 # React portfolio app
|   |-- public/               # Static assets, models, resume, project images
|   `-- src/
|       |-- components/       # UI, avatar, navigation, sections
|       |-- data/             # Portfolio content
|       |-- hooks/            # Preload and motion hooks
|       `-- lib/              # Shared helpers
|-- backend/                  # FastAPI backend from earlier project iterations
|-- .github/workflows/        # GitHub Pages deployment workflow
`-- README.md
```

## Run Locally

```bash
cd frontend
npm install
npm start
```

The app will run at:

```text
http://localhost:3000
```

## Build

```bash
cd frontend
npm run build
```

For GitHub Pages, the workflow builds with:

```bash
PUBLIC_URL=/ npm run build
```

## Deployment

This repository deploys the frontend automatically with GitHub Actions.

Deployment URL:

```text
https://mansicodes.dev/
```

The workflow lives at:

```text
.github/workflows/deploy-pages.yml
```

Every push to `main` triggers a new GitHub Pages deployment.

## Contact

- Email: mansip140904@gmail.com
- LinkedIn: https://www.linkedin.com/in/mansi-patel-695080219/
- GitHub: https://github.com/thesassyblogger
