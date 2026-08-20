"use client";

import Image from "next/image";
import { ChevronRight, Edit } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { ICoursesManagement } from "./types";

interface CoursesPreviewProps {
  data: ICoursesManagement;
  isUsingDefaults?: boolean;
  onEdit: () => void;
}

const STAT_COLUMNS: {
  key: keyof ICoursesManagement["statistics"][number];
  label: string;
}[] = [
  { key: "course", label: "Course" },
  { key: "conducted", label: "Conducted" },
  { key: "duration", label: "Duration" },
  { key: "bn", label: "BN" },
  { key: "otherMaritimeOrg", label: "Other Maritime Org" },
  { key: "overseas", label: "Overseas" },
  { key: "totalTrainees", label: "Total Trainees" },
  { key: "remarks", label: "Remarks" },
];

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

      <div className="p-6 sm:p-8 pt-10 space-y-8">
        {isUsingDefaults && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <Paragraph className="text-sm! text-amber-800">
              Nothing has been saved yet — this is the default copy currently
              hardcoded on the public page. Edit and save to store it.
            </Paragraph>
          </div>
        )}

        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <Paragraph className="text-base mb-4">{data.title}</Paragraph>
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Introduction
            </Paragraph>
            <Paragraph className="text-sm leading-relaxed text-gray-600 text-justify">
              {data.introduction}
            </Paragraph>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Course Sequence
            </Paragraph>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              {data.courseSequence.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Course descriptions */}
        <div className="space-y-4">
          <Paragraph className="font-semibold text-pBlue uppercase">
            Course Descriptions
          </Paragraph>
          {data.sections.map((section, index) => (
            <div key={index} className="border-l-4 border-liteBlue pl-5">
              <Paragraph className="font-medium text-pBlue mb-1">
                {index + 1}. {section.title}
              </Paragraph>
              <Paragraph className="text-sm leading-relaxed text-gray-600 text-justify">
                {section.description}
              </Paragraph>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div>
          <Paragraph className="font-semibold text-pBlue uppercase mb-3">
            {data.statisticsTitle}
          </Paragraph>
          {data.statistics.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-liteBlue text-white">
                    {STAT_COLUMNS.map((column) => (
                      <th
                        key={column.key}
                        className="border border-liteBlue/40 px-3 py-3 text-left font-semibold whitespace-nowrap"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {data.statistics.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {STAT_COLUMNS.map((column) => (
                        <td
                          key={column.key}
                          className="border border-gray-200 px-3 py-3"
                        >
                          {row[column.key] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 py-8 text-center">
              <Paragraph className="text-sm! text-gray-500">
                No statistics rows yet.
              </Paragraph>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPreview;
