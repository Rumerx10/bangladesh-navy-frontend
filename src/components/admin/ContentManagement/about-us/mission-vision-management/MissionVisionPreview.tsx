"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, Eye, Target } from "lucide-react";
import { IMissionVisionManagement } from "./types";

interface MissionVisionPreviewProps {
  data: IMissionVisionManagement;
  onEdit: () => void;
}

const MissionVisionPreview = ({ data, onEdit }: MissionVisionPreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="mission vision"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Mission &amp; Vision Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              Current mission &amp; vision content
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
              {data.vision.title}
            </Paragraph>
            <Paragraph className="text-sm leading-relaxed text-gray-600">
              {data.vision.description}
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
              {data.mission.title}
            </Paragraph>
            <Paragraph className="text-sm leading-relaxed text-gray-600">
              {data.mission.description}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVisionPreview;
