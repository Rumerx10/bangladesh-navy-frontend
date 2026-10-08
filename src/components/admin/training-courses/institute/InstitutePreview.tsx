"use client";

import Image from "next/image";
import { BookOpen, ChevronRight, Edit, Eye, Target } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { IAboutInstitute } from "@/src/components/about-institute/types";

interface InstitutePreviewProps {
  data: IAboutInstitute;
  isUsingDefaults?: boolean;
  onEdit: () => void;
}

/** Bangla blocks only appear once a translation has actually been entered. */
const hasText = (value?: string | null) => !!value?.trim();

const InstitutePreview = ({
  data,
  isUsingDefaults = false,
  onEdit,
}: InstitutePreviewProps) => {
  const aboutParagraphsBn = data.aboutParagraphsBn ?? [];
  const missionPointsBn = data.missionPointsBn ?? [];
  const trainingOverviewParagraphsBn = data.trainingOverviewParagraphsBn ?? [];

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="institute"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              BN Hydrographic Institute
            </Paragraph>
            <Paragraph className="text-sm! text-secondary-foreground">
              Content shown on the public institute page
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

        {/* Basic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Sub Title
            </Paragraph>
            <Paragraph className="text-base">
              {data.subTitleEn?.trim() || "—"}
            </Paragraph>
            {hasText(data.subTitleBn) && (
              <Paragraph className="mt-2 text-sm! text-secondary-foreground">
                {data.subTitleBn}
              </Paragraph>
            )}
          </div>
        </div>

        {/* About */}
        <div className="bg-light rounded-xl p-5 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-pBlue" />
            <Paragraph className="font-semibold text-pBlue uppercase">
              About
            </Paragraph>
          </div>
          <div className="space-y-3">
            {data.aboutParagraphsEn.map((text, index) => (
              <Paragraph
                key={index}
                className="text-sm leading-relaxed text-secondary-foreground text-justify"
              >
                {text}
              </Paragraph>
            ))}
          </div>
          {aboutParagraphsBn.length > 0 && (
            <div className="mt-3 space-y-3 border-t border-dashed border-border pt-3">
              {aboutParagraphsBn.map((text, index) => (
                <Paragraph
                  key={index}
                  className="text-sm leading-relaxed text-secondary-foreground text-justify"
                >
                  {text}
                </Paragraph>
              ))}
            </div>
          )}
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-light rounded-xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Vision
              </Paragraph>
            </div>
            <Paragraph className="font-medium text-pBlue mb-2">
              {data.visionTitleEn}
            </Paragraph>
            <Paragraph className="text-sm leading-relaxed text-secondary-foreground text-justify">
              {data.visionDescriptionEn}
            </Paragraph>
            {(hasText(data.visionTitleBn) ||
              hasText(data.visionDescriptionBn)) && (
              <div className="mt-3 border-t border-dashed border-border pt-3">
                {hasText(data.visionTitleBn) && (
                  <Paragraph className="font-medium text-pBlue mb-1">
                    {data.visionTitleBn}
                  </Paragraph>
                )}
                {hasText(data.visionDescriptionBn) && (
                  <Paragraph className="text-sm leading-relaxed text-secondary-foreground text-justify">
                    {data.visionDescriptionBn}
                  </Paragraph>
                )}
              </div>
            )}
          </div>

          <div className="bg-light rounded-xl p-5 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Mission
              </Paragraph>
            </div>
            <Paragraph className="font-medium text-pBlue mb-2">
              {data.missionTitleEn}
            </Paragraph>
            <ul className="space-y-2">
              {data.missionPointsEn.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm leading-relaxed text-secondary-foreground"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            {(hasText(data.missionTitleBn) || missionPointsBn.length > 0) && (
              <div className="mt-3 border-t border-dashed border-border pt-3">
                {hasText(data.missionTitleBn) && (
                  <Paragraph className="font-medium text-pBlue mb-1">
                    {data.missionTitleBn}
                  </Paragraph>
                )}
                <ul className="space-y-2">
                  {missionPointsBn.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm leading-relaxed text-secondary-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Training overview */}
        <div className="bg-light rounded-xl p-5 border border-border">
          <Paragraph className="font-semibold text-pBlue uppercase mb-3">
            {data.trainingOverviewTitleEn}
          </Paragraph>
          <div className="space-y-3">
            {data.trainingOverviewParagraphsEn.map((text, index) => (
              <Paragraph
                key={index}
                className="text-sm leading-relaxed text-secondary-foreground text-justify"
              >
                {text}
              </Paragraph>
            ))}
          </div>
          {(hasText(data.trainingOverviewTitleBn) ||
            trainingOverviewParagraphsBn.length > 0) && (
            <div className="mt-3 border-t border-dashed border-border pt-3">
              {hasText(data.trainingOverviewTitleBn) && (
                <Paragraph className="font-medium text-pBlue mb-2">
                  {data.trainingOverviewTitleBn}
                </Paragraph>
              )}
              <div className="space-y-3">
                {trainingOverviewParagraphsBn.map((text, index) => (
                  <Paragraph
                    key={index}
                    className="text-sm leading-relaxed text-secondary-foreground text-justify"
                  >
                    {text}
                  </Paragraph>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstitutePreview;
