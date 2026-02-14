# Subsistant - AI Subscription Manager

A modern subscription management dashboard built with Next.js, featuring a clean dark-mode aesthetic with teal accents.

🌐 **Live Demo**: [https://imsoumyadeepdutta.github.io/Subsistant/](https://imsoumyadeepdutta.github.io/Subsistant/)

## Features

- 🎨 Modern dark-mode UI with teal accents
- 💱 Multi-currency support (USD and INR)
- 📊 Responsive 4-column grid layout for stats
- 🔄 Smooth transitions and animations
- 📱 Fully responsive design

## Getting Started

### Development

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying files in the `src/app` directory. The page auto-updates as you edit the file.

### Building for Production

To create a production build:

```bash
npm run build
```

This will generate a static export in the `out/` directory.

To test the production build locally:

```bash
npx serve out
```

## Deployment

This project uses a unified workflow for releases and deployment to GitHub Pages. Every push to the `master` branch triggers the pipeline.

### How it Works

1. **Version Check**: The workflow checks if the `version` in `package.json` has changed.
2. **Auto-Release**: If the version is new, it automatically creates a GitHub Release with a tag (e.g., `v1.0.1`).
3. **Build & Deploy**: The app is built as a static export and deployed to GitHub Pages.

### Setup Instructions

1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push your changes to the `master` branch.

### Manual Trigger

You can also manually trigger the "Release and Deploy" workflow from the **Actions** tab in your GitHub repository.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Language**: TypeScript

## Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## License

MIT

