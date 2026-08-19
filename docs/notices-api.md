# Notices to Mariners — API contract

Backend contract the frontend is already written against. Until these routes
exist the UI falls back to fixtures (see [Going live](#going-live)).

Base URL: `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8001/api/v1`).
All responses are normalised by the axios interceptor to `{ data, meta }`.

---

## Enums

| Field    | Values                                              |
| -------- | --------------------------------------------------- |
| `type`   | `PERMANENT`, `TEMPORARY`, `PRELIMINARY`, `GUN_FIRE` |
| `status` | `ACTIVE`, `INACTIVE`                                |

`ALL` is a **UI-only** filter value — never store or send it.

## Entity

```ts
interface INotice {
  id: string;
  noticeNumber: string; // "NM 21/2026" — unique
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  type: NoticeType;
  pdfUrl: string | null; // absolute URL, null when nothing is attached
  publishedAt: string; // ISO 8601
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
```

Mirrored in [`src/components/notices/types/index.ts`](../src/components/notices/types/index.ts) — keep the two in sync.

---

## Endpoints

### `GET /notices`

List notices, newest first.

| Query param | Type                   | Notes                                      |
| ----------- | ---------------------- | ------------------------------------------ |
| `type`      | `NoticeType`           | Optional. Omit for all types.              |
| `status`    | `ACTIVE` \| `INACTIVE` | Optional. Public page shows `ACTIVE` only. |
| `search`    | `string`               | Optional. Matches title (en/bn) + number.  |
| `page`      | `number`               | Optional, 1-based.                         |
| `limit`     | `number`               | Optional.                                  |

> The frontend currently sends none of these — it fetches the full list and
> filters in the browser so demo data and API data behave identically. Adding
> them server-side is backwards-compatible; see [Going live](#going-live).

```jsonc
// 200
{
  "data": [/* INotice[] */],
  "meta": {
    "totalItems": 21,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 3,
    "currentPage": 1,
  },
}
```

### `GET /notices/:id`

```jsonc
// 200 → { "data": INotice }
// 404 → { "statusCode": 404, "message": "Notice not found" }
```

### `POST /notices`

`Content-Type: multipart/form-data` (the PDF rides along with the fields).

| Field           | Type   | Required | Notes                            |
| --------------- | ------ | -------- | -------------------------------- |
| `noticeNumber`  | string | ✅       | Unique, max 50 chars             |
| `titleEn`       | string | ✅       | Max 250 chars                    |
| `titleBn`       | string | –        | Max 250 chars                    |
| `descriptionEn` | string | –        |                                  |
| `descriptionBn` | string | –        |                                  |
| `type`          | enum   | ✅       |                                  |
| `publishedAt`   | date   | ✅       | `yyyy-MM-dd` from the date input |
| `status`        | enum   | –        | Defaults to `ACTIVE`             |
| `pdf`           | file   | –        | `application/pdf` only, max 10MB |

```jsonc
// 201 → { "data": INotice }
// 400 → { "statusCode": 400, "message": "Validation failed",
//         "errorMessages": [{ "path": "noticeNumber", "message": "..." }] }
// 409 → duplicate noticeNumber
```

### `PATCH /notices/:id`

Same `multipart/form-data` shape as `POST`, **all fields optional** — send only
what changed.

Two attachment rules the frontend relies on:

| Payload               | Expected behaviour                          |
| --------------------- | ------------------------------------------- |
| `pdf` file present    | Replace the stored PDF (delete the old one) |
| `removePdf: "true"`   | Delete the stored PDF, set `pdfUrl` to null |
| Neither field present | Leave the existing attachment untouched     |

```jsonc
// 200 → { "data": INotice }   // the full updated entity
// 404 → { "statusCode": 404, "message": "Notice not found" }
```

### `DELETE /notices/:id`

Hard delete. Must also remove the attached PDF from storage.

```jsonc
// 200 → { "data": { "id": "..." } }
// 404 → { "statusCode": 404, "message": "Notice not found" }
```

---

## Frontend wiring

| Concern         | Location                                                           |
| --------------- | ------------------------------------------------------------------ |
| Endpoint + key  | `src/components/notices/useNotices.ts` (`NOTICES_ENDPOINT`)        |
| Types / enums   | `src/components/notices/types/index.ts`                            |
| Public page     | `src/app/(root)/important-notice/notices/page.tsx`                 |
| Admin page      | `src/app/admin/(content-management)/notices/page.tsx`              |
| Create / update | `src/components/admin/notices/Form/CreateUpdateNotice.tsx`         |
| Delete          | `src/components/admin/notices/NoticesManagement.tsx` (`useDelete`) |
| Validation      | `src/components/admin/notices/Schema/noticeSchema.ts`              |

Mutations invalidate the `["notices"]` query key, so the list refreshes itself
after every create/update/delete.

---

## Going live

1. Delete `src/components/notices/data/demoNotices.ts`.
2. In `src/components/notices/useNotices.ts`, remove the `DEMO_NOTICES` import
   and the block between the `─── DEMO DATA ───` markers, then use `apiNotices`
   in the `notices` memo.

That's the whole migration — every component already reads through `useNotices`.

**Optional, once the backend filters server-side:** pass `type` / `search` /
`page` / `limit` into the `useGet` call in `useNotices`, drop the client-side
`filterNotices` call in `NoticesManagement.tsx`, and read `data.meta.totalItems`
for the pagination total.
