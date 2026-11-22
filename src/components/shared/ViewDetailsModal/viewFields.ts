import { ReactNode } from "react";

type Empty = null | undefined;

/**
 * One labelled value in `ViewDetailsModal`. `type` picks how the value is
 * rendered; it defaults to plain text. Empty values (null, undefined, "", [])
 * always render as "—", so builders can pass API fields straight through.
 */
export type ViewField = {
  label: string;
  /** Span both grid columns. Long text, rich text, images and lists always do. */
  fullWidth?: boolean;
} & (
  | { type?: "text"; value?: string | number | Empty }
  /** Multi-line plain text — line breaks are kept. */
  | { type: "longText"; value?: string | Empty }
  /** TipTap HTML — sanitized before it is rendered. */
  | { type: "html"; value?: string | Empty }
  | { type: "image"; value?: string | Empty }
  | { type: "gallery"; value?: string[] | Empty }
  | { type: "list"; value?: string[] | Empty }
  | { type: "keyValue"; value?: { key: string; value: string }[] | Empty }
  /** "ACTIVE" / "INACTIVE" (or any enum) shown as a badge. */
  | { type: "status"; value?: string | Empty }
  | { type: "link"; value?: string | Empty }
  /** A document URL (PDF, resume…) shown as an "Open file" button. */
  | { type: "file"; value?: string | Empty }
  | { type: "date" | "datetime"; value?: string | Empty }
  /** Escape hatch for anything the types above don't cover. */
  | { type: "custom"; value: ReactNode }
);

export interface ViewSection {
  title?: string;
  fields: ViewField[];
}

/** Created / last-updated timestamps — appended as the last section of every view. */
export const recordMetaSection = (item: {
  createdAt?: string | null;
  updatedAt?: string | null;
}): ViewSection => ({
  title: "Record",
  fields: [
    { label: "Created", type: "datetime", value: item.createdAt },
    { label: "Last Updated", type: "datetime", value: item.updatedAt },
  ],
});
