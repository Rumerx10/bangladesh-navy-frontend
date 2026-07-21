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
- **Recharts** for admin dashboard charts; custom `DataTable` (not `@tanstack/react-table` directly) for admin data tables
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

The `admin` route itself is flat but its pages are organized in sub-groups: `(categories)`, `(users)`, `(career)` (career listings + applicant list), and `(content-management)` — which holds products, notices, banner-poster, media-gallery, `about-us/` (gallery, history, mission-vision, survey-ships), and `home/` (biography, hero-management, notice-management, partner). Components for each live under [src/components/admin/](src/components/admin/) in matching subdirectories.

Every admin management feature follows a consistent file layout inside its subdirectory:

```
FeatureManagement.tsx         # list/index page — renders DataTable
FeaturePreview.tsx            # read-only detail/preview view
Form/
  FeatureForm.tsx             # inner field layout (used by Create and Update)
  CreateUpdateFeature.tsx     # top-level form wrapper; handles usePost/usePatch, reset, and navigation
  *Field.tsx                  # reusable sub-field components for complex form sections (array fields, etc.)
TableColumns/
  FeatureColumns.tsx          # ColumnDef<T>[] for DataTable
Skeleton/
  FeaturePreviewSkeleton.tsx  # loading state for the preview component
```

### Route guards (proxy.ts pattern)

There is no global `middleware.ts`. Instead, each protected directory has a `proxy.ts` file that exports all HTTP method handlers (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) — each delegates to a single auth check function that decodes the JWT from the `accessToken` cookie and redirects unauthorized requests:

- [src/app/admin/proxy.ts](src/app/admin/proxy.ts) — redirects unauthenticated users to `/auth/login?redirect=<path>`, and non-admins to `/`
- [src/app/auth/proxy.ts](src/app/auth/proxy.ts) — redirects already-authenticated users away from login/signup (admins → `/admin`, users → `/`)

### Auth token storage

- `accessToken` — JS-readable cookie (set by client via `js-cookie`)
- `refreshToken` — JS-readable cookie
- `role` and `userId` — **httpOnly** cookies set via server actions in [src/actions/cookiesAction.ts](src/actions/cookiesAction.ts)

The `UserFetcher` component listens to a custom `auth-token-updated` window event to re-sync the token after login. Dispatch this event when programmatically updating `accessToken`.

### Data fetching hooks

All API calls go through generic hooks in [src/hooks/](src/hooks/):

- `useGet<T>(endpoint, queryKey, params?, options?)` — wraps `useQuery`. Query key is extended with filtered param values for automatic cache invalidation.
- `usePost<T>(defaultEndpoint?, onSuccess?, invalidateKeys?)` — wraps `useMutation`. Accepts either `PostArg { endpoint, data, config }` or raw data.
- `usePatch<T>(onSuccess?, invalidateKeys?, defaultEndpoint?)` — wraps `useMutation`. Accepts `{ url, data, config? }` or raw data (uses `defaultEndpoint` as fallback URL).
- `useDelete<T>(onSuccess?, invalidateKeys?)` — wraps `useMutation`. Accepts `{ url: string }`.

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

Use `isAdminRole(role)` from [src/utils/UserRoleEnum.ts](src/utils/UserRoleEnum.ts) to test admin access. Both `ADMIN` and `SUPER_ADMIN` pass this check.

### Form pattern

All form pages use React Hook Form with `FormProvider`. Reusable controlled fields live in [src/components/shared/FromController/](src/components/shared/FromController/) (note: directory is named `FromController`, not `FormController`). These components call `useFormContext()` internally and must be rendered inside a `FormProvider`. Available fields:

- `ControlledInputField`, `ControlledTextareaField`, `ControlledSelectField`, `ControlledMultiSelectField`
- `ControlledTextEditorField` — wraps TipTap
- `ControlledDatePicker`, `ControlledTimeField`, `ControlledTimePickerField`
- `ControlledCheckField`, `ControlledCheckboxField`, `ControlledSwitchField`, `ControlledToggleField`
- `ControlledComboboxSelect`
- `FileUploadController` — single image/file input with preview and background-removal support
- `MultipleImageFileInput` — multi-image upload

For edit forms, use `getChangedFields(newData, initialData)` from [src/utils/getChangedFields.ts](src/utils/getChangedFields.ts) to send only modified fields in PATCH requests.

**Validation schemas** are co-located with their feature component — either as `schema/FeatureSchema.ts` (e.g. `src/components/contact-us/schema/ContactSchema.ts`) or as `featureValidationSchema.tsx` alongside the form component. Schemas export both the Yup schema object and the inferred TypeScript type (`yup.InferType<typeof schema>`).

**Contact-us sub-pages** (`(root)/contact-us/query-suggestion`, `/contact-us/hydrographic-note`, `/contact-us/information`) reuse the shared `ContactForm` component with a `defaultType` prop to tag submissions (e.g. `<ContactForm defaultType="hydrographic-note" />`). All contact submissions go to the `/contact-support` endpoint.

### Admin data table

Admin list pages use the custom `DataTable` component from [src/components/ui/data-table.tsx](src/components/ui/data-table.tsx) (this is the project's own table implementation, not `@tanstack/react-table` directly). Define columns with the local `ColumnDef<T>` type exported from that file. The table integrates pagination, search, status filter, and a create button internally.

For delete confirmations, use `DeleteConfirmDialog` from [src/components/shared/DeleteConfirmDialog.tsx](src/components/shared/DeleteConfirmDialog.tsx) — a pre-wired `AlertDialog` with `isOpen`, `onClose`, `onConfirm`, and optional label/style props.

### Shared utility components

- **`SectionTitle`** ([src/components/SectionTitle.tsx](src/components/SectionTitle.tsx)) — reusable section heading with title + description; use this instead of inline headings.
- **`InternetStatus`** ([src/components/InternetStatus.tsx](src/components/InternetStatus.tsx)) — renders an offline banner; included in the `(root)` layout.
- **`Partners`** ([src/components/Partners.tsx](src/components/Partners.tsx)) — marquee partner logos pulled from `public/partners/`.
- **`AdminBackButton`** ([src/components/shared/AdminBackButton/](src/components/shared/AdminBackButton/)) — back navigation for admin detail/edit pages.
- **`DynamicBreadcrumb`** — breadcrumb component for admin pages.

### Shared types

Key types live in [src/components/shared/types/common.ts](src/components/shared/types/common.ts):

- `IGenericErrorResponse` — error shape returned by all mutation hooks (`{ statusCode, message, errorMessages, errors? }`)
- `StatusType` enum — `COMPLETED`, `PENDING`, `CANCELLED`, `ACTIVE`, `INACTIVE`, `IN_PROGRESS`, `VERIFIED`, `UNVERIFIED`
- `ITableProps<T>` — prop interface for custom table pages
- `ISelectOption` — `{ label, value }` for select fields

### Static data

Some features still use static fixtures in [src/data/](src/data/) (e.g. `navyCategories.ts`, `homeData.ts`, `skillCourses.ts`, `navyProducts.ts`). These are placeholders until the backend endpoints are wired up.

### Next.js API routes (BFF)

[src/app/api/](src/app/api/) contains thin proxy routes for categories, brands, and dashboard stats. The axios interceptor detects `/api/*` URLs and rewrites them to `window.location.origin` so they hit these routes rather than the external backend.

### Header navigation

[src/components/layout/rootLayout/Header/](src/components/layout/rootLayout/Header/) contains the full nav implementation with scroll-reactive sticky behaviour, a `MarqueeNotice` ticker, and individual dropdown components (`AboutUsDropdown`, `ProductServiceDropdown`, `SkillDevDropdown`, `ContactDropdown`, `NoticesMarinersDropdown`).
