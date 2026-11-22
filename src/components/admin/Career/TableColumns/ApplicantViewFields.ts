import { ViewSection } from "@/src/components/shared/ViewDetailsModal/viewFields";
import { IApplicant } from "../types";

export const getApplicantViewSections = (item: IApplicant): ViewSection[] => [
  {
    title: "Applicant",
    fields: [
      { label: "Name", value: item.name },
      { label: "Job Title", value: item.jobTitle },
      { label: "Email", value: item.email },
      { label: "Phone", value: item.phone },
      { label: "Resume", type: "file", value: item.resumeUrl },
      { label: "Applied", type: "datetime", value: item.createdAt },
    ],
  },
];
