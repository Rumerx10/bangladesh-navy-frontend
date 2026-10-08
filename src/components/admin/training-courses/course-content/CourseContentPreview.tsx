"use client";

import Image from "next/image";
import { BookOpen, ChevronRight, Edit, ListOrdered } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { ICourseInfo } from "@/src/components/course-info/types";

interface CourseContentPreviewProps {
  data: ICourseInfo;
  isUsingDefaults?: boolean;
  onEdit: () => void;
}

/** Bangla blocks only appear once a translation has actually been entered. */
const hasText = (value?: string | null) => !!value?.trim();

const CourseContentPreview = ({
  data,
  isUsingDefaults = false,
  onEdit,
}: CourseContentPreviewProps) => {
  const sequenceBn = data.courseSequenceBn ?? [];

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="course content"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Course Content
            </Paragraph>
            <Paragraph className="text-sm! text-secondary-foreground">
              Copy shown above the statistics table on the public courses page
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
              Nothing has been saved yet — this is the fallback copy the public
              page falls back to. Edit and save to store it.
            </Paragraph>
          </div>
        )}

        {/* Title & Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-light rounded-xl p-5 border border-border">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <Paragraph className="text-base">{data.titleEn}</Paragraph>
            {hasText(data.titleBn) && (
              <Paragraph className="mt-2 text-sm! text-secondary-foreground">
                {data.titleBn}
              </Paragraph>
            )}
          </div>
          <div className="bg-light rounded-xl p-5 border border-border">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Introduction
            </Paragraph>
            <Paragraph className="text-sm leading-relaxed text-secondary-foreground text-justify">
              {data.introductionEn}
            </Paragraph>
            {hasText(data.introductionBn) && (
              <Paragraph className="mt-3 text-sm leading-relaxed text-secondary-foreground text-justify">
                {data.introductionBn}
              </Paragraph>
            )}
          </div>
        </div>

        {/* Course Sequence */}
        <div className="bg-light rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <ListOrdered className="w-4 h-4 text-pBlue" />
            <Paragraph className="font-semibold text-pBlue uppercase">
              Course Sequence
            </Paragraph>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
              {data.courseSequenceEn.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
            {sequenceBn.length > 0 && (
              <ol className="list-decimal list-inside space-y-1 text-sm text-secondary-foreground">
                {sequenceBn.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Course Descriptions */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-pBlue" />
            <Paragraph className="font-semibold text-pBlue uppercase">
              Course Descriptions
            </Paragraph>
          </div>

          {data.sections.length === 0 ? (
            <div className="rounded-xl border border-dashed border-input bg-light py-10 text-center">
              <Paragraph className="text-sm! text-secondary-foreground">
                No course descriptions added yet.
              </Paragraph>
            </div>
          ) : (
            <div className="space-y-6">
              {data.sections.map((section, index) => (
                <div key={index} className="border-l-4 border-liteBlue pl-5">
                  <Paragraph className="font-bold text-pBlue mb-2">
                    {index + 1}. {section.titleEn}
                  </Paragraph>
                  <Paragraph className="text-sm leading-relaxed text-secondary-foreground text-justify">
                    {section.descriptionEn}
                  </Paragraph>

                  {(hasText(section.titleBn) ||
                    hasText(section.descriptionBn)) && (
                    <div className="mt-3 border-t border-dashed border-border pt-3">
                      {hasText(section.titleBn) && (
                        <Paragraph className="font-medium text-pBlue mb-1">
                          {section.titleBn}
                        </Paragraph>
                      )}
                      {hasText(section.descriptionBn) && (
                        <Paragraph className="text-sm leading-relaxed text-secondary-foreground text-justify">
                          {section.descriptionBn}
                        </Paragraph>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContentPreview;
