"use client";

import Image from "next/image";
import { ChevronRight, Edit } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import CourseStatisticsManagement from "./course-statistics/CourseStatisticsManagement";
import { ICoursesManagement } from "./types";

interface CoursesPreviewProps {
  data: ICoursesManagement;
  isUsingDefaults?: boolean;
  onEdit: () => void;
}

const CoursesPreview = ({
  data,
  isUsingDefaults = false,
  onEdit,
}: CoursesPreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="courses"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Courses Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              Content shown on the public courses page
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Content
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6 sm:p-8 pt-10 space-y-4">
        {/* <Paragraph className="font-semibold text-pBlue uppercase">
          Course Statistics
        </Paragraph>
        <Paragraph className="text-sm! text-gray-500 -mt-3">
          Rows shown in the public Course Statistics table, backed by its own
          /course-statistics API — independent of Courses, Batches and Alumni
          Members.
        </Paragraph> */}

        {/* Live, editable rows — "Add Row" and each row's edit icon open the
            same input fields used by POST/PATCH /course-statistics. */}
        <CourseStatisticsManagement />
      </div>
    </div>
  );
};

export default CoursesPreview;
  