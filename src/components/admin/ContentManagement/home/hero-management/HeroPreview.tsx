"use client";

import Image from "next/image";
import { Edit } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { IHeroManagement } from "./types";

interface HeroPreviewProps {
  data: IHeroManagement;
  onEdit: () => void;
}

const HeroPreview = ({ data, onEdit }: HeroPreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="hero preview"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Hero Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              {data.titleEn || "No hero configured"}
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Hero
        </Button>
      </div>

      <div className="p-8 pt-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              English Title
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.titleEn || "—"}
            </Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              Bengali Title
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.titleBn || "—"}
            </Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              English Subtitle
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.subTitleEn || "—"}
            </Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              Bengali Subtitle
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.subTitleBn || "—"}
            </Paragraph>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
            English Description
          </Paragraph>
          <Paragraph className="text-sm! text-secondary-dark">
            {data.descriptionEn || "—"}
          </Paragraph>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
            Bengali Description
          </Paragraph>
          <Paragraph className="text-sm! text-secondary-dark">
            {data.descriptionBn || "—"}
          </Paragraph>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-2">
            Images
          </Paragraph>
          <div className="flex gap-3 flex-wrap">
            {data.imageUrls?.map((url, index) => (
              <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={url}
                  alt={`Hero image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Status:</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              data.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;