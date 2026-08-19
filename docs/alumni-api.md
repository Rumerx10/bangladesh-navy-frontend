# Alumni — API contract

Backend contract the frontend is already written against. Until these routes
exist the UI falls back to fixtures (see [Going live](#going-live)).

Base URL: `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8001/api/v1`).
All responses are normalised by the axios interceptor to `{ data, meta }`.

The model mirrors the institute's "LIST OF ALL BASIC HYDRO COURSE" document: a
**course** ("Basic Hydro") has many **batches** ("1st Basic Hydro", 08 Mar 1997 →
07 Aug 1997), and each batch has a **roster** of participants.

---

## Enums

| Field    | Values               |
| -------- | -------------------- |
| `status` | `ACTIVE`, `INACTIVE` |

`ALL` is a **UI-only** course filter value — never store or send it.

## Entities

```ts
interface IAlumniCourse {
  id: string;
  nameEn: string; // "Basic Hydro"
  nameBn?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

interface IAlumniMember {
  id?: string;
  serial: number; // "Ser" — 1-based, unique within a batch
  pNo?: string; // "790"
  rankName: string; // "Cdre A K M Mostak Sherafullah, (H1), psc, BN"
  organization?: string; // "BN"
  remarks?: string; // "Present Rank", "Rtd", …
}

interface IAlumniBatch {
  id: string;
  batchNo: number; // 1, 2, 3 … rendered as "1st", "2nd"
  titleEn: string; // "1st Basic Hydro"
  titleBn?: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  descriptionEn?: string;
  status: "ACTIVE" | "INACTIVE";
  alumniCourseId?: string; // on write
  alumniCourse?: IAlumniCourse; // populated on read
  members: IAlumniMember[];
  createdAt: string;
  updatedAt: string;
}
```

Mirrored in [`src/components/alumni/types/index.ts`](../src/components/alumni/types/index.ts) — keep the two in sync.

---

## Endpoints

### `GET /alumni-batches`

List batches **with their full roster embedded**. The public page and the admin
table both read this one response.

| Query param | Type                   | Notes                                              |
| ----------- | ---------------------- | -------------------------------------------------- |
| `courseId`  | `string`               | Optional. Omit for all courses.                    |
| `status`    | `ACTIVE` \| `INACTIVE` | Optional. Public page shows `ACTIVE` only.         |
| `search`    | `string`               | Optional. Matches batch title, member name, P. No. |
| `page`      | `number`               | Optional, 1-based.                                 |
| `limit`     | `number`               | Optional.                                          |

> The frontend currently sends none of these — it fetches the full list and
> filters in the browser so demo data and API data behave identically. Adding
> them server-side is backwards-compatible; see [Going live](#going-live).

```jsonc
// 200
{
  "data": [/* IAlumniBatch[] */],
  "meta": {
    "totalItems": 21,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 3,
    "currentPage": 1,
  },
}
```

### `GET /alumni-batches/:id`

```jsonc
// 200 → { "data": IAlumniBatch }
// 404 → { "statusCode": 404, "message": "Alumni batch not found" }
```

### `POST /alumni-batches`

`Content-Type: application/json` — no file upload.

| Field            | Type     | Required | Notes                                 |
| ---------------- | -------- | -------- | ------------------------------------- |
| `alumniCourseId` | string   | ✅       | Must reference an existing course     |
| `batchNo`        | number   | ✅       | Positive integer                      |
| `titleEn`        | string   | ✅       | Max 200 chars                         |
| `titleBn`        | string   | –        | Max 200 chars, omitted when blank     |
| `startDate`      | date     | ✅       | `yyyy-MM-dd` from the date input      |
| `endDate`        | date     | ✅       | `yyyy-MM-dd`, on or after `startDate` |
| `descriptionEn`  | string   | –        | Omitted when blank                    |
| `status`         | enum     | –        | Defaults to `ACTIVE`                  |
| `members`        | object[] | ✅       | At least one entry                    |

Each `members[]` entry:

| Field          | Type   | Required | Notes                           |
| -------------- | ------ | -------- | ------------------------------- |
| `serial`       | number | ✅       | Derived from row order, 1-based |
| `pNo`          | string | –        | Max 20 chars, may be `""`       |
| `rankName`     | string | ✅       | Max 250 chars                   |
| `organization` | string | –        | Max 100 chars, may be `""`      |
| `remarks`      | string | –        | Max 150 chars, may be `""`      |

```jsonc
// 201 → { "data": IAlumniBatch }
// 400 → { "statusCode": 400, "message": "Validation failed",
//         "errorMessages": [{ "path": "batchNo", "message": "..." }] }
// 409 → duplicate batchNo within the same course
```

### `PATCH /alumni-batches/:id`

Same JSON shape as `POST`. The frontend sends the **whole** batch, including the
full `members` array.

> **The roster is replaced wholesale.** Delete rows that are no longer present
> and re-create from the payload — this is what lets a cleared `remarks` or
> `pNo` actually clear. Optional top-level strings (`titleBn`, `descriptionEn`)
> are _omitted_ when blank rather than sent as `""`, so they cannot currently be
> cleared through the UI; accept `null` for those if clearing matters.

```jsonc
// 200 → { "data": IAlumniBatch }   // the full updated entity
// 404 → { "statusCode": 404, "message": "Alumni batch not found" }
```

### `DELETE /alumni-batches/:id`

Hard delete. Must also remove the batch's roster entries.

```jsonc
// 200 → { "data": { "id": "..." } }
```

### `GET /alumni-courses`

Paginated list for the admin "Courses" tab. Accepts `search`, `page`, `limit`.

### `GET /alumni-courses/list`

Unpaginated `IAlumniCourse[]` — powers the public filter pills and the course
dropdown in the batch form.

### `POST /alumni-courses` · `PATCH /alumni-courses/:id` · `DELETE /alumni-courses/:id`

| Field    | Type   | Required | Notes                             |
| -------- | ------ | -------- | --------------------------------- |
| `nameEn` | string | ✅       | Max 150 chars                     |
| `nameBn` | string | –        | Max 150 chars, omitted when blank |
| `status` | enum   | –        | Defaults to `ACTIVE`              |

Deleting a course should not cascade-delete its batches — the UI warns that they
lose their grouping.

---

## Frontend wiring

| Concern            | Location                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| Endpoints + keys   | `src/components/alumni/useAlumni.ts`                                            |
| Types              | `src/components/alumni/types/index.ts`                                          |
| Formatting helpers | `src/components/alumni/utils.ts`                                                |
| Public page        | `src/app/(root)/training-courses/alumni/page.tsx`                               |
| Public UI          | `src/components/alumni/AlumniDirectory.tsx`                                     |
| Admin page         | `src/app/admin/(training)/training-courses/alumni/page.tsx`                     |
| Admin UI           | `src/components/admin/training-courses/alumni/AlumniManagement.tsx`             |
| Batch form         | `src/components/admin/training-courses/alumni/Form/CreateUpdateAlumniBatch.tsx` |
| Roster editor      | `src/components/admin/training-courses/alumni/Form/AlumniMemberField.tsx`       |
| Validation         | `src/components/admin/training-courses/alumni/Schema/`                          |

Mutations invalidate `["alumni-batches"]` / `["alumni-courses"]`, so both the
list and the public page refresh after every create/update/delete.

---

## Going live

1. Delete `src/components/alumni/data/demoAlumni.ts`.
2. In `src/components/alumni/useAlumni.ts`, remove the `DEMO_*` imports and the
   two blocks between the `─── DEMO DATA ───` markers, then use `apiBatches` /
   `apiCourses` directly.

That's the whole migration — every component already reads through `useAlumni`.

**Optional, once the backend filters server-side:** pass `courseId` / `search` /
`page` / `limit` into the `useGet` call in `useAlumniBatches`, drop the
client-side `filterAlumniBatches` call in `AlumniManagement.tsx`, and read
`data.meta.totalItems` for the pagination total.
