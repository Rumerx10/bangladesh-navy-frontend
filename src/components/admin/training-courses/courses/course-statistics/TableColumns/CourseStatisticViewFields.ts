import {
  recordMetaSection,
  ViewSection,
} from "@/src/components/shared/ViewDetailsModal/viewFields";
import { ICourseStatistic } from "@/src/components/course-statistics/types";

export const getCourseStatisticViewSections = (
  item: ICourseStatistic
): ViewSection[] => [
  {
    title: "General",
    fields: [
      { label: "Serial", value: item.serial },
      { label: "Course Name", value: item.courseName },
      { label: "Duration", value: item.duration },
      { label: "Courses Conducted", value: item.coursesConducted },
      { label: "Remarks", value: item.remarks },
      { label: "Status", type: "status", value: item.status },
    ],
  },
  {
    title: "Trainees",
    fields: [
      { label: "BN", value: item.bn },
      { label: "Other Maritime Org", value: item.otherMaritimeOrg },
      { label: "Overseas", value: item.overseas },
      { label: "Total Trainees", value: item.totalTrainees },
    ],
  },
  recordMetaSection(item),
];
