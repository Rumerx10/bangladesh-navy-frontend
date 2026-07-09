"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, Images } from "lucide-react";
import { IGalleryManagement } from "./types";

interface GalleryPreviewProps {
  data: IGalleryManagement;
  onEdit: () => void;
}

const getImageSrc = (img: File | string): string => {
  if (img instanceof File) return URL.createObjectURL(img);
  return img || "/placeholder.svg";
};

const GalleryPreview = ({ data, onEdit }: GalleryPreviewProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-6 sm:px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="gallery"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Gallery Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              Current gallery content
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Gallery
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

        {/* Categories */}
        {data.categories && data.categories.length > 0 && (
          <div>
            <Paragraph className="font-semibold text-pBlue uppercase mb-3">
              Categories
            </Paragraph>
            <div className="flex flex-wrap gap-2">
              {data.categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Items */}
        {data.galleryItems && data.galleryItems.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Images className="w-5 h-5 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Gallery Items ({data.galleryItems.length})
              </Paragraph>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                >
                  <div className="relative w-full aspect-square bg-gray-200">
                    <Image
                      src={
                        failedImages[index]
                          ? "/placeholder.svg"
                          : getImageSrc(item.image)
                      }
                      alt={item.title}
                      fill
                      className={cn(
                        "object-cover duration-700 ease-in-out",
                        loadedImages[index] ? "opacity-100" : "opacity-0"
                      )}
                      onLoad={() =>
                        setLoadedImages((prev) => ({ ...prev, [index]: true }))
                      }
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [index]: true }))
                      }
                    />
                  </div>
                  <div className="p-3">
                    <Paragraph className="text-sm font-medium text-pBlue truncate">
                      {item.title}
                    </Paragraph>
                    <span className="text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPreview;
