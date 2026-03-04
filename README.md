# saas-user-admin

React SPA for SaaS user and admin management.

## Stack

- React 19, Vite 7, TypeScript
- React Router 7, i18next (react-i18next)
- ESLint (flat, type-aware), rollup-plugin-visualizer

## Prerequisites

- Node.js 20+ (recommended for Vite 7 and React Router 7)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run analyze` | Build and generate bundle report (`dist/stats.html`) |
| `npm run lint` | Run ESLint (max-warnings=0) |
| `npm run preview` | Preview production build |

Pre-commit (Husky) runs `npm run lint` before each commit. After clone, run `npm install` so hooks are installed.

## License

Private / to be set.
