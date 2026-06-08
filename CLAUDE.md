# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # Start dev server (Next.js)
yarn build        # Production build
yarn lint         # ESLint on .ts/.tsx
yarn format       # Prettier write
yarn spotless     # lint --fix + format (combined)
```

No tests are configured (`test` script is a no-op).

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8001/api/v1` | Backend REST API |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | _(empty)_ | Google OAuth |
| `NEXT_PUBLIC_SITE_NAME` | `Bangladesh Navy` | Site metadata |
| `NEXT_PUBLIC_CURRENCY` / `NEXT_PUBLIC_CURRENCY_SYMBOL` | `BDT` / `৳` | Currency display |

## Architecture

### Stack

- **Next.js 16 App Router** + TypeScript
- **Tailwind CSS v4** — no `tailwind.config.ts`; config is in `postcss.config.mjs`
- **Redux Toolkit** for client state; **TanStack Query v5** for server state
- **shadcn/ui** components (Radix + CVA + tailwind-merge) live in [src/components/ui/](src/components/ui/)
- **React Hook Form + Yup** for all forms
- **Axios** with custom interceptors in [src/helpers/axios/axiosInstance.ts](src/helpers/axios/axiosInstance.ts)

### Route groups

| Group | Layout | Purpose |
|---|---|---|
| `(root)` | Header + Footer + CartDrawer | Public-facing pages (home, products, about, skill-dev, etc.) |
| `admin` | Sidebar + DashboardHeader | Admin dashboard (products, users, content management, career) |
| `auth` | Minimal | Login / signup |

### Data fetching hooks

All API calls go through three generic hooks in [src/hooks/](src/hooks/):

- `useGet<T>(endpoint, queryKey, params?, options?)` — wraps `useQuery`
- `usePost<T>(defaultEndpoint?, onSuccess?, invalidateKeys?)` — wraps `useMutation`
- `usePatch`, `useDelete` — similar patterns

The axios instance normalises every response to `{ data, meta }`, handles JWT refresh automatically on 401, and routes `/api/*` calls to the Next.js BFF routes instead of the external API.

### Redux slices

Located in [src/lib/redux/features/](src/lib/redux/features/):

| Slice | Responsibility |
|---|---|
| `auth` | `userInformation`, `loading`, `isLoginModalOpen` |
| `permission` | Role-derived permission map (`canAccessAdmin`, `canAddToCart`, etc.) |
| `cart` | Cart items (client-side) |
| `filter` | Product filter/search state synced to URL |
| `user`, `wishlist`, `organizer` | Supporting slices |

**Auth bootstrap**: [src/app/UserFetcher.tsx](src/app/UserFetcher.tsx) is a client component rendered in the root layout. It decodes the `accessToken` cookie, fetches `/user/:id`, and dispatches `setUserInformation` + `setPermissionsFromRole` to Redux on every page load.

### Roles & permissions

Four roles: `GUEST` → `USER` → `ADMIN` → `SUPER_ADMIN`. Role is decoded from the JWT and normalised in [src/lib/redux/features/permission/permissionSlice.ts](src/lib/redux/features/permission/permissionSlice.ts). Admins cannot add to cart; users cannot access admin routes.

### Path alias

`@/src/` resolves to `src/` (configured in `tsconfig.json`). All internal imports use this prefix.

### Static data

Some features still use static fixtures in [src/data/](src/data/) (e.g. `navyCategories.ts`, `homeData.ts`, `skillCourses.ts`, `navyProducts.ts`). These are placeholders until the backend endpoints are wired up.

### Next.js API routes (BFF)

[src/app/api/](src/app/api/) contains thin proxy routes for categories, brands, and dashboard stats. The axios interceptor detects `/api/*` URLs and rewrites them to `window.location.origin` so they hit these routes rather than the external backend.

### Header navigation

[src/components/layout/rootLayout/Header/](src/components/layout/rootLayout/Header/) contains the full nav implementation with scroll-reactive sticky behaviour, a `MarqueeNotice` ticker, and individual dropdown components (`AboutUsDropdown`, `ProductServiceDropdown`, `SkillDevDropdown`, `ContactDropdown`, `NoticesMarinersDropdown`).
