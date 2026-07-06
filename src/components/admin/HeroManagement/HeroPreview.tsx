// src/modules/admin/hero-management/components/HeroPreview.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { IHeroManagement } from "./types";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, Image as ImageIcon, ChevronRight, Bell } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface HeroPreviewProps {
  data: IHeroManagement;
  onEdit: () => void;
}

const HeroPreview = ({ data, onEdit }: HeroPreviewProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setFailedImages((prev) => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (image: string | File, index: number) => {
    if (failedImages[index]) {
      return "/placeholder.svg";
    }
    if (typeof image === "string") {
      return image;
    }
    return URL.createObjectURL(image);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with gradient */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
              <Image
                src={"/icons/media.svg"}
                alt="hero preview"
                width={40}
                height={40}
                className="w-5"
              />
            </div>
            <div>
              <Paragraph className="font-semibold text-lg! text-pBlue">
                Hero Section Preview
              </Paragraph>
              <Paragraph className="text-sm! text-gray-500">
                Current hero content
              </Paragraph>
            </div>
          </div>
        </div>

        {/* Edit Button - Floating style */}
        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Hero
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-8 pt-10">
        {/* Images Grid */}
        {data.images && data.images.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Hero Images ({data.images.length})
              </Paragraph>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.images.map((image: string | File, index: number) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                >
                  <Image
                    src={getImageSrc(image, index)}
                    alt={`Hero image ${index + 1}`}
                    fill
                    className={cn(
                      "object-cover duration-700 ease-in-out group-hover:scale-105 transition-all",
                      loadedImages[index] ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <Paragraph className="text-base">{data.title}</Paragraph>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Slogan
            </Paragraph>
            <Paragraph className="text-base">{data.slogan}</Paragraph>
          </div>

          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Description
            </Paragraph>
            <Paragraph className="text-base leading-relaxed">{data.description}</Paragraph>
          </div>

          {/* Notices Section */}
          {data.notices && data.notices.length > 0 && (
            <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-pBlue" />
                <Paragraph className="font-semibold text-pBlue uppercase">
                  Notices ({data.notices.length})
                </Paragraph>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.notices.map((notice, index) => (
                  <span
                    key={index}
                    className={cn(
                      "px-3 py-1.5 rounded-full border text-sm font-medium",
                      notice.isActive
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-gray-100 text-gray-400 border-gray-200 line-through"
                    )}
                  >
                    {notice.message}
                    {!notice.isActive && " (Inactive)"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;