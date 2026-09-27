// The organogram shape is shared with the public chart, which renders from
// the same `/organogram` rows — see `src/utils/organogram.ts`. Re-exported
// here so the admin feature keeps its local import path.
export type {
  IOrganogramNode,
  IOrganogramListItem,
  OrganogramTreeItem,
} from "@/src/utils/organogram";
