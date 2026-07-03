// Portfolio content for Mansi Patel — neutral editorial theme
export const AVATARS = {
  hero: "/avatars/hero.png",
  coding: "/avatars/coding.png",
  present: "/avatars/present.png",
  wave: "/avatars/wave.png",
};

export const PROFILE = {
  name: "Mansi Patel",
  first: "MANSI",
  last: "PATEL",
  title: "Full Stack Cloud Engineer",
  location: "Regina, Canada",
  origin: "Mumbai, India",
  email: "mansip140904@gmail.com",
  phone: "(306) 351-3048",
  linkedin: "https://www.linkedin.com/in/mansi-patel-695080219/",
  github: "https://github.com/thesassyblogger",
  summary:
    "I architect scalable, cloud-native systems and craft interfaces with a designer's eye — turning complex infrastructure into products that feel effortless.",
  keywords: ["FULL-STACK", "CLOUD / DEVOPS", "MERN", "DESIGN-MINDED"],
};

export const SKILL_GROUPS = [
  {
    label: "Cloud & DevOps",
    tag: "// infrastructure",
    items: ["AWS (EKS, ECR, EC2, IAM)", "Terraform / IaC", "Docker", "Kubernetes", "Helm", "ArgoCD", "Jenkins", "Prometheus", "Grafana"],
  },
  {
    label: "Backend",
    tag: "// server-side",
    items: ["Node.js", "Express", "Spring Boot", "GraphQL", "REST APIs", "Microservices", "MongoDB", "MySQL"],
  },
  {
    label: "Frontend & 3D",
    tag: "// client-side",
    items: ["React", "Redux", "TypeScript", "Three.js / WebGL", "Tailwind", "Framer Motion", "HTML5 / CSS3"],
  },
  {
    label: "Languages & Tools",
    tag: "// toolkit",
    items: ["JavaScript (ES6+)", "Java", "Python", "C/C++", "Git / GitHub", "Postman", "Jira", "Figma", "SonarQube", "Trivy"],
  },
];

export const EXPERIENCE = [
  {
    role: "Full Stack Engineer",
    company: "Pqxel Inc.",
    period: "May 2025 — Jun 2026",
    location: "Regina, SK · Remote",
    points: [
      "Engineered end-to-end web platforms using React, Node.js, Express, and MongoDB.",
      "Architected reusable front-end components, responsive UI, and API-driven features for enterprise products.",
      "Spearheaded Agile workflows in Jira, performing code reviews, debugging, and version-control best practices.",
    ],
  },
  {
    role: "Service Support Intern",
    company: "University of Regina",
    period: "May 2024 — Dec 2024",
    location: "Regina, SK · On-site",
    points: [
      "Optimized mission-critical IT infrastructure for live events, resolving complex networking and hardware bottlenecks.",
      "Modernized ticketing and networking systems (Wi-Fi / POS) for seamless university-scale event operations.",
    ],
  },
];

// Projects for the rotating cylinder gallery
export const PROJECTS = [
  {
    name: "Mango",
    year: "Web",
    kind: "Live Website",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    desc: "A polished, responsive marketing website with clean layout, smooth interactions and a bold brand identity.",
    link: "https://thesassyblogger.github.io/Mango/",
    live: true,
    image: "/projects/mango.jpg",
    hue: "#BF5537",
  },
  {
    name: "Sunflower",
    year: "Web",
    kind: "Live Website",
    stack: ["HTML", "CSS", "JavaScript"],
    desc: "A bright, elegant landing experience focused on typography, spacing and a warm, inviting aesthetic.",
    link: "https://thesassyblogger.github.io/sunflower/",
    live: true,
    image: "/projects/sunflower.jpg",
    hue: "#C9922E",
  },
  {
    name: "Real-Time Chat App",
    year: "2024",
    kind: "Full-Stack",
    stack: ["Node.js", "Express", "Socket.IO", "GCP"],
    desc: "Real-time group chat with Socket.IO, deployed to Google Cloud App Engine with IAM, Artifact Registry and Cloud Build.",
    link: "https://github.com/thesassyblogger/webst",
    live: false,
    image: "/projects/chat.jpg",
    hue: "#35594E",
  },
  {
    name: "Cloud Vendor / Task Manager",
    year: "2025",
    kind: "MERN · Full-Stack",
    stack: ["MERN", "JWT", "Recharts", "ExcelJS"],
    desc: "A role-based task management engine with JWT auth and analytics that turn raw data into actionable business intelligence.",
    link: "https://github.com/thesassyblogger/Mern-Task-Manager",
    live: false,
    image: "/projects/task.jpg",
    hue: "#4A5A7A",
  },
  {
    name: "Production AWS DevOps",
    year: "2025",
    kind: "DevOps · CI/CD",
    stack: ["AWS", "Docker", "CI/CD", "Node"],
    desc: "A production-grade Node app with an automated CI/CD pipeline — from commit to containerized, production-ready deployment.",
    link: "https://github.com/thesassyblogger/node-todo-cicd",
    live: false,
    image: "/projects/aws.jpg",
    hue: "#7A4A5A",
  },
  {
    name: "DevOps Pipeline (SaaS)",
    year: "2025",
    kind: "GitOps · IaC",
    stack: ["Terraform", "EKS", "SonarQube", "Trivy"],
    desc: "An automated GitOps pipeline provisioning VPCs, IAM and EKS with security quality gates and Prometheus/Grafana observability.",
    link: "https://github.com/thesassyblogger/DevopsProject2",
    live: false,
    hue: "#3E6B57",
  },
];

export const CERTS = [
  "Technical Support Fundamentals — Google",
  "Artificial Intelligence (AI) — Programming Hub",
  "HTML, CSS & JavaScript — IBM",
  "Introduction to Cloud Computing — IBM",
  "Git & GitHub — IBM",
];

export const NAV = ["Home", "About", "Skills", "Work", "Projects", "Contact"];
