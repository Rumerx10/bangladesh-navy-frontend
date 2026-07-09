"use client";

import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Pencil, CalendarDays } from "lucide-react";
import Paragraph from "@/src/components/shared/Paragraph";
import { INoticesManagement } from "./types";

interface NoticesPreviewProps {
  data: INoticesManagement;
  onEdit: () => void;
}

const NoticesPreview = ({ data, onEdit }: NoticesPreviewProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border border-light-silver rounded-lg p-6 sm:p-8 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-pBlue">{data.title}</h2>
            <Paragraph className="text-gray-500 mt-1">
              {data.subTitle}
            </Paragraph>
          </div>
          <Button
            onClick={onEdit}
            className="shrink-0 cursor-pointer bg-primary hover:bg-primary/90 text-white"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Category chips */}
        {data.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {data.categories.map((cat, i) => (
              <span
                key={i}
                className="text-sm bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* News items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.news.map((item, i) => (
          <div
            key={i}
            className="border border-light-silver rounded-lg bg-white overflow-hidden"
          >
            {/* Image */}
            {item.image && (
              <div className="relative w-full h-44">
                <Image
                  src={typeof item.image === "string" ? item.image : ""}
                  alt={item.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <span className="absolute top-2 left-2 text-xs bg-primary text-white px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            )}

            <div className="p-4 space-y-2">
              {item.date && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
              <h3 className="font-semibold text-pBlue leading-snug">
                {item.title}
              </h3>
              <Paragraph className="text-gray-500 text-sm line-clamp-2">
                {item.shortDescription}
              </Paragraph>
              {item.description && (
                <Paragraph className="text-gray-400 text-sm line-clamp-3">
                  {item.description}
                </Paragraph>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticesPreview;
