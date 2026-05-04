<div align="center">
  <h1>Portfolio Blog</h1>

  <img src="https://github.com/user-attachments/assets/9663a991-f76a-49ee-bb19-ab58b1dd461a" alt="Cover Image" />

  <p><strong>A reusable portfolio that highlights not only the final product, but also the development journey.</strong></p>

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity CMS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/EmailJS-F15A24?style=for-the-badge&logo=minutemailer&logoColor=white" alt="EmailJS" />
  <img src="https://img.shields.io/badge/IntelliChat_AI-000000?style=for-the-badge&logo=openai&logoColor=white" alt="IntelliChat" />
  <img src="https://img.shields.io/badge/License-MIT-44CC11?style=for-the-badge" alt="License" />
</p>
</div>

## Table of Contents

- [System Architecture & Purpose](#system-architecture--purpose)
- [Core Features](#core-features)
- [Tech Stack & Services](#tech-stack--services)
- [Getting Started](#getting-started)
- [CMS Schema Mapping](#cms-schema-mapping)
- [EmailJS Template Configuration](#emailjs-template-configuration)
- [Customization & Reusability](#customization--reusability)
- [Contact & Collaboration](#contact--collaboration)

## System Architecture & Purpose

This repository operates as the frontend presentation layer for a Sanity-driven headless CMS architecture. It acts as an **Optional Module** system: components are completely agnostic and reliant on incoming data streams from Sanity or environment variables. If corresponding data or keys are omitted, the module safely unmounts without throwing runtime errors.

### The "Development-Blog" Concept
Moving beyond a static gallery, this portfolio operates as a chronological evidence log. It highlights the problem-solving processes and the development journey behind each project, not just the final product.

### UX Philosophy & Performance Integration
The design emphasizes minimal animations to maximize performance. Instead of heavy JavaScript transition libraries, it employs CSS-based minimal micro-interactions, coupled with lazy-loading and offset pagination. This ensures initial payloads remain minimal while delivering data precisely when the user needs it.

### Atomic & Organisms System Design
Components are highly decoupled, following Atomic Design principles. Small UI units (Atoms) compose into more complex widgets (Molecules) and layout sections (Organisms), maintaining strict separation of concerns and maximizing reusability.

## Core Features

- **Project Agnostic Architecture**: Components are strictly presentation layers. Data structures and content rules are governed by Sanity.
- **Conditional Rendering Logic Gates**: Every major component (Hero, Projects, Tech Stack, About, etc.) is wrapped in a logic gate. If the specific Sanity data is `null` or environment keys are missing, the component silently unmounts. This allows the application to remain stable even with incomplete CMS configurations.
- **System Security (Email Contact)**: Built with five robust layers of defense against spam and abuse:
  1. **reCAPTCHA v2**: Active bot blocking.
  2. **Honeypot**: Hidden fields for script trapping.
  3. **Client-side Cooldown**: Throttle controls for spam prevention.
  4. **Rate Limiting**: Strictly capped at 3 emails per day per client.
  5. **Input Sanitization**: Cross-Site Scripting (XSS) and injection protection.
- **Lazy-Load and Offset Pagination**: Implements scroll-triggered, offset-based pagination. This replaces immediate bulk-fetching with batched queries, vastly improving First Contentful Paint (FCP) and reducing unnecessary database reads.
- **Type Safety**: TypeScript acts as the single source of truth. Interfaces directly mirror Sanity GROQ query projections, ensuring end-to-end type safety.
- **Image Gallery & Lightbox**: Features a native lightbox for image arrays with optimized lazy-loaded assets. Safe handling protocols are in place for embedding external video links (e.g., YouTube), ensuring valid iframe construction.

## Tech Stack & Services

- **Frontend Core**: React, TypeScript, TailwindCSS, Vite
- **Headless CMS (Database & Backend)**: [Sanity](https://sanity.com) - The main data provider driving the entire portfolio structure.
- **Automated Agent**: [IntelliChat](https://intelli-chat-web.vercel.app) - An automated context-aware chatbot querying the site 24/7.
- **Communication**: [EmailJS](https://www.emailjs.com) for serverless email dispatch.
- **Security**: [Google ReCAPTCHA v2](https://www.google.com/recaptcha/admin) against spam and bots.
- **Deployment Platform**: [Vercel](https://vercel.com)

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dir/portfolio-blog-site/
```

### 2. Frontend Setup
Install the necessary dependencies:
```bash
npm install
```

### 3. Environment Setup
Safely configure your local environment by mapping the necessary keys. Reference the `.env.sample` file to see all required variables.
```bash
cp .env.sample .env.local
```
Fill in the `.env.local` file with your Sanity Project ID, Dataset, EmailJS credentials, and ReCAPTCHA keys. Ensure exact naming as specified in the sample to properly satisfy the logic gates.

### 4. Sanity CMS Setup
The backend schema must be deployed using the companion studio repository.
- **Studio Repo**: [portfolio-blog-studio](https://github.com/BenjiBenji20/portfolio-blog-studio.git)
- Clone the studio repo, build your own Sanity schema, and run:
```bash
npx sanity deploy
```

## CMS Schema Mapping

The following table illustrates how the Sanity document types map to and power the frontend React components:

| Sanity Schema (`_type`) | Frontend Component | Description |
|-------------------------|--------------------|-------------|
| `author`                | `Hero`, `About`    | Provides global identity, hero introduction, and detailed bio. |
| `project`               | `ProjectsGallery`  | Drives the main project showcase, case studies, and development logs. |
| `skill` / `techStack`   | `TechStack`        | Populates the technologies, tools, and proficiencies display. |
| `socialLink`            | `Footer`, `Hero`   | Renders dynamically generated external navigation links. |
| `siteSettings`          | `Global Layout`    | Controls branding (`site_name`), SEO metadata, and generic UI states. |

## EmailJS Template Configuration
To ensure your contact form looks professional and remains agnostic to the user's branding, use the provided HTML template in the EmailJS dashboard.
1. Dashboard Setup
- Template Location: `templates/template.html` (in the project root directory)
- EmailJS Template: EmailJS Dashboard > Email Templates > Create New Template.
- Variables: The template uses `{{site_name}}`, `{{name}}`, `{{email}}`, `{{subject}}`, and `{{message}}`.

## Customization & Reusability

This system is engineered for simple rebranding without touching the React source code.
By modifying the `siteSettings` document in Sanity (specifically changing the `site_name` and `author` data), the entire portfolio—including the UI branding, SEO meta tags, and the EmailJS template signature—will automatically rebrand itself.

## Contact & Collaboration

This project is open for collaboration, discussions, and optimizations. If you are interested in extending its features or identifying architectural improvements, feel free to reach out.

- **Email**: [your.email@example.com](mailto:your.email@example.com)
