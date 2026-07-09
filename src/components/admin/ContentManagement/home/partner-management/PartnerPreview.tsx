"use client";

import Image from "next/image";
import { useState } from "react";
import { IPartnerManagement } from "./types";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, Users } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PartnerPreviewProps {
  data: IPartnerManagement;
  onEdit: () => void;
}

const PartnerPreview = ({ data, onEdit }: PartnerPreviewProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const getImageSrc = (image: string | File, index: number): string => {
    if (failedImages[index]) return "/placeholder.svg";
    if (typeof image === "string") return image;
    return URL.createObjectURL(image);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
              <Image
                src="/icons/media.svg"
                alt="partner preview"
                width={40}
                height={40}
                className="w-5"
              />
            </div>
            <div>
              <Paragraph className="font-semibold text-lg! text-pBlue">
                Partner Section Preview
              </Paragraph>
              <Paragraph className="text-sm! text-gray-500">
                Current partner content
              </Paragraph>
            </div>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Partners
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <Paragraph className="text-base">{data.title}</Paragraph>
          </div>

          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Description
            </Paragraph>
            <Paragraph className="text-base leading-relaxed">
              {data.description}
            </Paragraph>
          </div>
        </div>

        {data.partners && data.partners.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Partners ({data.partners.length})
              </Paragraph>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.partners.map((partner, index) => (
                <div
                  key={index}
                  className={cn(
                    "group relative rounded-xl overflow-hidden border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-md p-4 flex flex-col items-center gap-3 bg-gray-50",
                    !partner.isActive && "opacity-50"
                  )}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <Image
                      src={getImageSrc(partner.image, index)}
                      alt={partner.name || `Partner ${index + 1}`}
                      fill
                      className={cn(
                        "object-contain duration-700 ease-in-out",
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
                  <Paragraph className="text-sm font-medium text-center text-pBlue">
                    {partner.name}
                  </Paragraph>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full border font-medium",
                      partner.isActive
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-gray-100 text-gray-400 border-gray-200"
                    )}
                  >
                    {partner.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerPreview;
