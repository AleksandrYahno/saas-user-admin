# SaaS User Admin

React SPA that simulates a small SaaS admin panel for **user management**: Dashboard stats, Create User flow, and Users List with delete.

This project was built as a “dashboard-style” frontend assignment with an emphasis on:

- clean layout (sidebar + top bar + content)
- routing and lazy-loaded pages
- form validation UX
- scalable structure (UI kit, domain layer, store commands)
- quality gates (lint + tests + CI)

---

## Stack

- **UI**: React 19 + Vite 7 + TypeScript
- **Routing**: React Router 7 (lazy routes)
- **State**: Zustand + Immer
- **i18n**: i18next + react-i18next (single `common` namespace)
- **Testing**: Vitest + Testing Library + `@testing-library/jest-dom`
- **UI dev**: Storybook (React + Vite)
- **Quality**: ESLint (flat config, type-aware)
- **Bundle analysis**: `rollup-plugin-visualizer` (generates `dist/stats.html`)
- **Automation**: Husky pre-commit + GitHub Actions CI

---

## What is implemented

### Pages / routes

- **`/dashboard`**
  - 3 stat cards (static data for now): Total Users / Active Users / Pending Invitations
- **`/create-user`**
  - Create User form: full name, email, role, password, confirm password
  - client-side validation with field-level errors
  - on success: persist user and redirect to `/users`
- **`/users`**
  - users table: name + email, role, created at, delete action
  - delete shows a success snackbar
  - table area is scrollable (keeps page shell stable on short screens)

### UI / layout

- shared shell: **Sidebar + Header + Content**
- snackbars via **notistack** (`SnackbarProvider`)
- small **UIkit** components (Button, TextField, Select, StatCard)

---

## Architecture (designed for scaling)

### Key ideas

- **Pages are thin**: UI + event handlers only.
- **Business logic lives in hooks/VMs**:
  - `pages/**/vm/*` — page ViewModel hooks (draft state, validation, submit)
  - `pages/**/hooks/*` — page composition hooks (i18n + VM + mapping for UI)
- **Store is split by concerns**:
  - synchronous slice state in `usersSlice`
  - async side effects in `usersCommands` (with `onError` callback for UI)
- **Persistence is isolated**:
  - localStorage access goes through helpers under `helpers/localStorageConnector/*`

### Useful paths

- **Routing config**: `src/appRoutes.config.tsx`
- **App shell**: `src/components/appLayout/*`
- **Store**: `src/providers/appStoreProvider/appStoreStore/*`
- **UIkit**: `src/shared/UIkit/*`
- **i18n**: `src/i18n/*` + `src/locales/en/common.json`

---

## Bundle size, tree-shaking, and code splitting

### Why tree-shaking works here

- Vite builds with Rollup and targets **ESM** (`"type": "module"` + modern TS config).
- Pages are **lazy-loaded** via `React.lazy(...)`, so route chunks load on demand.

### Intentional chunking

`vite.config.ts` uses `manualChunks` to keep vendor code predictable:

- `react-vendor` (react + react-dom)
- `react-router`
- `i18n`
- `zustand` (zustand + immer)

### Bundle analysis

Generate a visual report:

```bash
npm run analyze
```

Open: `dist/stats.html`

**Recent build output (gzip):**

- `react-vendor`: ~60 kB gzip
- `react-router`: ~29 kB gzip
- `i18n`: ~16 kB gzip
- `zustand`: ~6 kB gzip
- `index` (app code): ~12 kB gzip

*(Numbers change as features grow; use `dist/stats.html` as the source of truth.)*

---

## Security / safety checks

- **No backend** and **no secrets** are stored in this repo.
- Users are stored locally (localStorage) for demo purposes only.
- `npm audit --audit-level=moderate` currently reports **0 vulnerabilities**.

---

## Getting started

### Prerequisites

- **Node.js 20.19+** (Vite 7 requirement)
- npm (comes with Node)

### Install & run

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run analyze` | Build + generate bundle report (`dist/stats.html`) |
| `npm run lint` | Run ESLint (max-warnings=0) |
| `npm run test` | Run Vitest test suite |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run storybook` | Run Storybook on port 6006 |
| `npm run build-storybook` | Build static Storybook |
| `npm run preview` | Preview production build |

---

## Quality gates (local + CI)

### Pre-commit (Husky)

Pre-commit hook runs:

- `npm run lint`
- `npm run test`

Hooks are installed via `prepare` during `npm install`.

### CI

GitHub Actions workflow: `.github/workflows/ci.yml`

- Node 20
- `npm ci`
- `npm run lint`
- `npm run test`

---

## License

Private / to be set.
