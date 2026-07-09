"use client";

import Image from "next/image";
import { useState } from "react";
import { IHistoryManagement } from "./types";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, Target, Clock } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface HistoryPreviewProps {
  data: IHistoryManagement;
  onEdit: () => void;
}

const HistoryPreview = ({ data, onEdit }: HistoryPreviewProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [loadedIcons, setLoadedIcons] = useState<Record<number, boolean>>({});
  const [failedIcons, setFailedIcons] = useState<Record<number, boolean>>({});

  const getImageSrc = (img: File | string): string => {
    if (img instanceof File) return URL.createObjectURL(img);
    return img || "/placeholder.svg";
  };

  const getIconSrc = (icon: File | string, index: number): string => {
    if (failedIcons[index]) return "/placeholder.svg";
    if (icon instanceof File) return URL.createObjectURL(icon);
    return icon || "/placeholder.svg";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/media.svg"
              alt="history preview"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              History Section Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              Current history content
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit History
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-8 pt-10 space-y-8">
        {/* Main image */}
        {data.image && (
          <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src={imageFailed ? "/placeholder.svg" : getImageSrc(data.image)}
              alt={data.title}
              fill
              className={cn(
                "object-cover duration-700 ease-in-out",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          </div>
        )}

        {/* Basic fields */}
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

          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Description
            </Paragraph>
            <Paragraph className="text-base leading-relaxed">
              {data.description}
            </Paragraph>
          </div>
        </div>

        {/* Key Milestones */}
        {data.keyMilestones && data.keyMilestones.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Key Milestones ({data.keyMilestones.length})
              </Paragraph>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.keyMilestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex gap-4"
                >
                  <div className="bg-primary/10 text-primary border border-primary/20 rounded-lg px-3 py-1 text-sm font-semibold h-fit shrink-0">
                    {milestone.year}
                  </div>
                  <Paragraph className="text-sm leading-relaxed">
                    {milestone.description}
                  </Paragraph>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Items */}
        {data.timelineItems && data.timelineItems.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Timeline ({data.timelineItems.length})
              </Paragraph>
            </div>
            <div className="space-y-4">
              {data.timelineItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    {item.icon && (
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0">
                        <Image
                          src={getIconSrc(item.icon, index)}
                          alt={item.title}
                          fill
                          className={cn(
                            "object-contain duration-700 ease-in-out",
                            loadedIcons[index] ? "opacity-100" : "opacity-0"
                          )}
                          onLoad={() =>
                            setLoadedIcons((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                          onError={() =>
                            setFailedIcons((prev) => ({
                              ...prev,
                              [index]: true,
                            }))
                          }
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <Paragraph className="font-semibold text-pBlue mb-2">
                        {item.title}
                      </Paragraph>
                      <Paragraph className="text-sm leading-relaxed mb-3">
                        {item.summary}
                      </Paragraph>

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="space-y-1 mb-3">
                          {item.highlights.map((h, hi) => (
                            <li
                              key={hi}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="text-primary mt-1 shrink-0">
                                •
                              </span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.note && (
                        <div className="border-l-2 border-primary/40 pl-3">
                          <Paragraph className="text-sm italic text-gray-600">
                            {item.note}
                          </Paragraph>
                        </div>
                      )}
                    </div>
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

export default HistoryPreview;
