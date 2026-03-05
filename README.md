# saas-user-admin

React SPA for SaaS user and admin management.

## Stack

- React 19, Vite 7, TypeScript
- React Router 7, i18next (react-i18next)
- Zustand + Immer
- Vitest + @testing-library/react, Storybook (React + Vite)
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
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run storybook` | Run Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |
| `npm run preview` | Preview production build |

### Pre-commit (Husky)

Runs `npm run lint` and `npm run test` before each commit.

**If the hook didn’t run:** Hooks are installed when `prepare` runs (during `npm install`). After clone or after adding Husky, run:

```bash
npm install
```

If the hook still doesn’t run, reinstall and make the script executable:

```bash
npx husky
chmod +x .husky/pre-commit
```

Commit the `.husky/` folder (and the executable bit) so others get the same hook after `npm install`.

### CI

GitHub Actions workflow in `.github/workflows/ci.yml` runs `npm run lint` and `npm run test` on push and pull requests (Node 20).

## License

Private / to be set.
