# Ankit Bhardwaj Portfolio

A Next.js portfolio for Ankit Bhardwaj, focused on full-stack engineering, AI integrations, research work, credentials, resume access, live coding metrics, and an interactive SYSTEM_ALPHA terminal.

## Features

- App Router pages for home, projects, experience, publications, credentials, about, contact, links, and resume.
- Centralized portfolio content in `lib/site-data.js`.
- Interactive project archive with filtering, pagination, and modal previews.
- Resume preview/download workflow backed by files in `public/resume`.
- Contact CTA with Gmail SMTP notifications and visitor auto-replies.
- Floating SYSTEM_ALPHA terminal powered by the Gemini API.
- Live GitHub and LeetCode metrics with local fallback values.
- Light/dark theme toggle with persisted preference.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Iconify React
- Nodemailer
- Google Generative AI SDK
- Vercel Analytics

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example` and fill the required values:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

`GMAIL_USER` and `GMAIL_PASS` are required for contact-form email delivery. Use a Gmail App Password for `GMAIL_PASS`.

`NOTIFY_RECIPIENT` is optional. When omitted, owner notifications go to `GMAIL_USER`.

`GOOGLE_API_KEY` is required for the SYSTEM_ALPHA terminal chat API.

`NEXT_PUBLIC_SITE_URL` is used for metadata generation.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

The app is ready for Vercel deployment. Configure the same environment variables in the Vercel project settings before enabling the contact form and terminal in production.

## Content Updates

Most portfolio data lives in `lib/site-data.js`. Resume assets live in `public/resume`, and project images live in `public/projects`.
