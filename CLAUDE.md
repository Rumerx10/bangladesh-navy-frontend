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

No tests are configured (`test` script is a no-op). Husky + lint-staged runs ESLint --fix + Prettier automatically on every commit.

CI (GitHub Actions): PRs to `main` run `yarn spotless` + `yarn build` and deploy a Vercel preview ([.github/workflows/preview.yml](.github/workflows/preview.yml)); pushes to `main` run the release pipeline ([.github/workflows/release.yml](.github/workflows/release.yml)). A change must build cleanly to pass CI.

## Environment variables

| Variable                                               | Default                        | Purpose          |
| ------------------------------------------------------ | ------------------------------ | ---------------- |
| `NEXT_PUBLIC_API_BASE_URL`                             | `http://localhost:8001/api/v1` | Backend REST API |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`                         | _(empty)_                      | Google OAuth     |
| `NEXT_PUBLIC_SITE_NAME`                                | `Bangladesh Navy`              | Site metadata    |
| `NEXT_PUBLIC_CURRENCY` / `NEXT_PUBLIC_CURRENCY_SYMBOL` | `BDT` / `৳`                    | Currency display |

[src/config/siteConfig.ts](src/config/siteConfig.ts) reads a few more `NEXT_PUBLIC_*` vars (site description, address, phones, email), all with defaults.

## Architecture

### Stack

- **Next.js 16 App Router** + TypeScript
- **Tailwind CSS v4** — no `tailwind.config.ts`; config is in `postcss.config.mjs`
- **Redux Toolkit** for client state; **TanStack Query v5** for server state
- **shadcn/ui** components (Radix + CVA + tailwind-merge) live in [src/components/ui/](src/components/ui/)
- **React Hook Form + Yup** for all forms
- **Axios** with custom interceptors in [src/helpers/axios/axiosInstance.ts](src/helpers/axios/axiosInstance.ts)
- **TipTap** rich text editor via [src/components/shared/text-editor/TextEditor.tsx](src/components/shared/text-editor/TextEditor.tsx)
- **Recharts** for admin dashboard charts; **`@tanstack/react-table`** for admin data tables
- **Swiper** for carousels; **Framer Motion** for animations
- **jsPDF + jspdf-autotable** for PDF export in admin reports
- **DOMPurify** (via [src/utils/sanitize.ts](src/utils/sanitize.ts)) to sanitize TipTap HTML before rendering
- **react-toastify** for all toast notifications (not shadcn toast)
- **`@imgly/background-removal`** for client-side image background removal in the admin image uploader

### Path alias

`@/src/` resolves to `src/` (configured in `tsconfig.json`). All internal imports use this prefix — e.g. `@/src/components/...`, `@/src/hooks/...`.

### Route groups

| Group    | Layout                                                  | Purpose                                                      |
| -------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| `(root)` | Header + Footer + CartDrawer (via `CartDrawerProvider`) | Public-facing pages (home, products, about, skill-dev, etc.) |
| `admin`  | Sidebar + DashboardHeader                               | Admin dashboard                                              |
| `auth`   | Minimal                                                 | Login / signup                                               |

The `admin` route itself is flat but its pages are organized in sub-groups: `(categories)`, `(users)`, `(career)` (career listings + applicant list), and `(content-management)` — which holds products, notices, banner-poster, media-gallery, `about-us/` (gallery, history, mission-vision, survey-ships), and `home/` (biography, hero-management, partner). Components for each live under [src/components/admin/](src/components/admin/) in matching subdirectories.

### Route guards (proxy.ts pattern)

There is no global `middleware.ts`. Instead, each protected directory has a `proxy.ts` file that exports HTTP method handlers (`GET`, `POST`, `PATCH`, etc.) which decode the JWT from cookies and redirect unauthorized requests:

- [src/app/admin/proxy.ts](src/app/admin/proxy.ts) — redirects unauthenticated users to `/auth/login?redirect=<path>`, and non-admins to `/`
- [src/app/auth/proxy.ts](src/app/auth/proxy.ts) — redirects already-authenticated users away from login/signup (admins → `/admin`, users → `/`)

### Auth token storage

- `accessToken` — JS-readable cookie (set by client via `js-cookie`)
- `refreshToken` — JS-readable cookie
- `role` and `userId` — **httpOnly** cookies set via server actions in [src/actions/cookiesAction.ts](src/actions/cookiesAction.ts)

The `UserFetcher` component listens to a custom `auth-token-updated` window event to re-sync the token after login. Dispatch this event when programmatically updating `accessToken`.

### Data fetching hooks

All API calls go through three generic hooks in [src/hooks/](src/hooks/):

- `useGet<T>(endpoint, queryKey, params?, options?)` — wraps `useQuery`. Query key is extended with filtered param values for automatic cache invalidation.
- `usePost<T>(defaultEndpoint?, onSuccess?, invalidateKeys?)` — wraps `useMutation`. Accepts either `PostArg { endpoint, data, config }` or raw data.
- `usePatch`, `useDelete` — similar patterns

The axios instance normalises every response to `{ data, meta }`, handles JWT refresh automatically on 401 `jwt expired`, and rewrites `/api/*` URLs to `window.location.origin/api/*` so they hit Next.js BFF routes.

### Redux

Located in [src/lib/redux/features/](src/lib/redux/features/):

| Slice                           | Responsibility                                                       |
| ------------------------------- | -------------------------------------------------------------------- |
| `auth`                          | `userInformation`, `loading`, `isLoginModalOpen`                     |
| `permission`                    | Role-derived permission map (`canAccessAdmin`, `canAddToCart`, etc.) |
| `cart`                          | Cart items (client-side)                                             |
| `filter`                        | Product filter/search state synced to URL                            |
| `user`, `organizer`             | Supporting slices                                                    |

Always use the typed hooks from [src/lib/redux/hooks.ts](src/lib/redux/hooks.ts): `useAppDispatch()` and `useAppSelector`.

**Auth bootstrap**: [src/app/UserFetcher.tsx](src/app/UserFetcher.tsx) is a client component rendered in the root layout. It decodes the `accessToken` cookie, fetches `/user/:id`, and dispatches `setUserInformation` + `setPermissionsFromRole` to Redux on every page load.

### Roles & permissions

Four roles: `GUEST` → `USER` → `ADMIN` → `SUPER_ADMIN`. Role is decoded from the JWT and normalised in [src/lib/redux/features/permission/permissionSlice.ts](src/lib/redux/features/permission/permissionSlice.ts). Admins cannot add to cart; users cannot access admin routes.

### Form pattern

All form pages use React Hook Form with `FormProvider`. Reusable controlled fields live in [src/components/shared/FromController/](src/components/shared/FromController/) (note: directory is named `FromController`, not `FormController`). These components call `useFormContext()` internally and must be rendered inside a `FormProvider`. Use `ControlledInputField`, `ControlledSelectField`, `ControlledTextEditorField`, etc.

### Shared utility components

- **`SectionTitle`** ([src/components/SectionTitle.tsx](src/components/SectionTitle.tsx)) — reusable section heading with title + description; use this instead of inline headings.
- **`InternetStatus`** ([src/components/InternetStatus.tsx](src/components/InternetStatus.tsx)) — renders an offline banner; included in the `(root)` layout.
- **`Partners`** ([src/components/Partners.tsx](src/components/Partners.tsx)) — marquee partner logos pulled from `public/partners/`.

### Static data

Some features still use static fixtures in [src/data/](src/data/) (e.g. `navyCategories.ts`, `homeData.ts`, `skillCourses.ts`, `navyProducts.ts`). These are placeholders until the backend endpoints are wired up.

### Next.js API routes (BFF)

[src/app/api/](src/app/api/) contains thin proxy routes for categories, brands, and dashboard stats. The axios interceptor detects `/api/*` URLs and rewrites them to `window.location.origin` so they hit these routes rather than the external backend.

### Header navigation

[src/components/layout/rootLayout/Header/](src/components/layout/rootLayout/Header/) contains the full nav implementation with scroll-reactive sticky behaviour, a `MarqueeNotice` ticker, and individual dropdown components (`AboutUsDropdown`, `ProductServiceDropdown`, `SkillDevDropdown`, `ContactDropdown`, `NoticesMarinersDropdown`).
