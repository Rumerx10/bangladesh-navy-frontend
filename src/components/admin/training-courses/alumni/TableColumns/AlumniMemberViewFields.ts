import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IAlumniMember } from "@/src/components/alumni/types";

export const getAlumniMemberViewSections = (
  item: IAlumniMember,
  /** "Course — Batch" name; the list endpoint returns the batch id only. */
  batchName?: string
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Serial", value: item.serial },
      { label: "P. No", value: item.pNo },
      { label: "Rank & Name", value: item.rankAndName, fullWidth: true },
      { label: "Batch", value: batchName },
      { label: "Organization", value: item.organization },
      { label: "Remarks", value: item.remarks },
      { label: "Status", type: "status", value: item.status },
    ],
  },
  recordMetaSection(item),
];
