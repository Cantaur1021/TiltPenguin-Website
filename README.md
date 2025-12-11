
# TiltPenguin Website

Main website for TiltPenguin, built with [Next.js](https://nextjs.org/) and [React](https://react.dev/).

## Features
- Modern, performant web app using Next.js App Router
- Custom UI components (see `components/` and `src/components/`)
- Blog, About, and Project sections
- Custom cursor and interactive UI
- Tailwind CSS for styling
- Sanity CMS integration (see `lib/sanity.client.ts`)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Main Next.js app directory (routing, pages, global styles)
- `src/components/` — Custom React components (UI, sections, etc.)
- `components/ui/` — Shared UI primitives (Button, Card, Badge)
- `lib/` — Utility libraries (Cloudinary, Sanity, queries)
- `public/` — Static assets (images, cursors)

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Lint code

## License

MIT
