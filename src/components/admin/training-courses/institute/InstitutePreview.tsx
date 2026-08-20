"use client";

import Image from "next/image";
import { BookOpen, ChevronRight, Edit, Eye, Target } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { IInstituteManagement } from "./types";

interface InstitutePreviewProps {
  data: IInstituteManagement;
  isUsingDefaults?: boolean;
  onEdit: () => void;
}

const InstitutePreview = ({
  data,
  isUsingDefaults = false,
  onEdit,
}: InstitutePreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-gray-100">
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
            <Paragraph className="text-sm! text-gray-500">
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
              Nothing has been saved yet — this is the default copy currently
              hardcoded on the public page. Edit and save to store it.
            </Paragraph>
          </div>
        )}

        {/* Basic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <Paragraph className="text-base">{data.title}</Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Sub Title
            </Paragraph>
            <Paragraph className="text-base">{data.subTitle}</Paragraph>
          </div>
        </div>

        {/* About */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-pBlue" />
            <Paragraph className="font-semibold text-pBlue uppercase">
              About
            </Paragraph>
          </div>
          <div className="space-y-3">
            {data.aboutParagraphs.map((text, index) => (
              <Paragraph
                key={index}
                className="text-sm leading-relaxed text-gray-600 text-justify"
              >
                {text}
              </Paragraph>
            ))}
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Vision
              </Paragraph>
            </div>
            <Paragraph className="font-medium text-pBlue mb-2">
              {data.visionTitle}
            </Paragraph>
            <Paragraph className="text-sm leading-relaxed text-gray-600">
              {data.visionDescription}
            </Paragraph>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Mission
              </Paragraph>
            </div>
            <Paragraph className="font-medium text-pBlue mb-2">
              {data.missionTitle}
            </Paragraph>
            <ul className="space-y-2">
              {data.missionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm leading-relaxed text-gray-600"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-liteBlue shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Training overview */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <Paragraph className="font-semibold text-pBlue uppercase mb-3">
            {data.trainingOverviewTitle}
          </Paragraph>
          <div className="space-y-3">
            {data.trainingOverviewParagraphs.map((text, index) => (
              <Paragraph
                key={index}
                className="text-sm leading-relaxed text-gray-600 text-justify"
              >
                {text}
              </Paragraph>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutePreview;
