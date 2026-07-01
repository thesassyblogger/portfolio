// Portfolio content for Mansi Patel
export const AVATARS = {
  hero: "/avatars/hero.png",
  coding: "/avatars/coding.png",
  traveling: "/avatars/traveling.png",
  fashion: "/avatars/fashion.png",
  space: "/avatars/space.png",
  waving: "/avatars/waving.png",
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
    "Full Stack Cloud Engineer architecting scalable, cloud-native microservices and secure CI/CD pipelines. I build production-grade applications with MERN and Spring Boot, powered by Infrastructure as Code, containers, and a designer's eye for detail.",
};

export const SKILL_GROUPS = [
  {
    label: "Cloud & DevOps",
    tag: "// infrastructure",
    items: ["AWS (EKS, ECR, EC2, IAM)", "Terraform / IaC", "Docker", "Kubernetes", "Helm", "ArgoCD (GitOps)", "Jenkins", "Prometheus", "Grafana"],
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
      "Engineered end-to-end development of web-based platforms using React, Node.js, Express, and MongoDB.",
      "Architected reusable front-end components, responsive UI, and API-driven features aligned with enterprise product requirements.",
      "Spearheaded Agile workflows using Jira, performing code reviews, debugging, and version control best practices.",
    ],
  },
  {
    role: "Service Support Intern",
    company: "University of Regina",
    period: "May 2024 — Dec 2024",
    location: "Regina, SK · On-site",
    points: [
      "Optimized mission-critical IT infrastructure for live events, resolving complex networking and hardware bottlenecks.",
      "Modernized ticketing and networking systems (Wi-Fi / POS), ensuring seamless operational flow for university-scale events.",
    ],
  },
];

export const PROJECTS = [
  {
    name: "Production-Grade AWS DevOps Ecosystem",
    year: "2025",
    stack: ["Terraform", "EKS", "SonarQube", "Trivy", "Prometheus", "Grafana"],
    desc: "A fully automated GitOps pipeline provisioning VPCs, IAM roles and EKS clusters, with quality gates ensuring 100% of commits meet security standards before ECR deployment.",
    link: "https://github.com/thesassyblogger",
  },
  {
    name: "Enterprise SaaS Task Orchestrator",
    year: "2025",
    stack: ["MERN", "JWT", "CI/CD", "ExcelJS", "Recharts"],
    desc: "A role-based task management engine with JWT authentication and full CI/CD automation, featuring advanced analytics that transform raw data into actionable business intelligence.",
    link: "https://github.com/thesassyblogger/Mern-Task-Manager",
  },
  {
    name: "Real-Time Chat App on Google Cloud",
    year: "2024",
    stack: ["Node.js", "Socket.IO", "GCP App Engine", "Cloud Build"],
    desc: "Real-time group chat built with Node.js, Express and Socket.IO, deployed to GCP App Engine with IAM, Artifact Registry and Cloud Build.",
    link: "https://github.com/thesassyblogger",
  },
  {
    name: "Cloud Vendor Management API",
    year: "2025",
    stack: ["Spring Boot", "REST", "Postman", "Agile"],
    desc: "A REST CRUD backend for vendor entities built in Spring Boot, tested with Postman and delivered through Agile sprints in Jira with Epics and Stories.",
    link: "https://github.com/thesassyblogger",
  },
];

export const CERTS = [
  "Technical Support Fundamentals — Google",
  "Artificial Intelligence (AI) — Programming Hub",
  "HTML, CSS & JavaScript — IBM",
  "Introduction to Cloud Computing — IBM",
  "Git & GitHub — IBM",
];

export const NAV = ["Home", "About", "Skills", "Work", "Projects", "Cosmos", "Style", "Contact"];
