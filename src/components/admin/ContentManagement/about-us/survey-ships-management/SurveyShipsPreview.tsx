"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, Ship, ExternalLink } from "lucide-react";
import { ISurveyShipsManagement } from "./types";

interface SurveyShipsPreviewProps {
  data: ISurveyShipsManagement;
  onEdit: () => void;
}

const getImageSrc = (img: File | string): string => {
  if (img instanceof File) return URL.createObjectURL(img);
  return img || "/placeholder.svg";
};

const SurveyShipsPreview = ({ data, onEdit }: SurveyShipsPreviewProps) => {
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
              alt="survey ships"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Survey Ships Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              Current survey ships content
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Ships
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

        {/* Ships */}
        {data.surveyShips && data.surveyShips.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Ship className="w-5 h-5 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Survey Ships ({data.surveyShips.length})
              </Paragraph>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.surveyShips.map((ship, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                >
                  {/* Ship image */}
                  <div className="relative w-full h-44 bg-gray-200">
                    <Image
                      src={
                        failedImages[index]
                          ? "/placeholder.svg"
                          : getImageSrc(ship.image)
                      }
                      alt={ship.name}
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
                    <span
                      className={cn(
                        "absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full",
                        ship.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {ship.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <Paragraph className="font-semibold text-pBlue text-base">
                        {ship.name}
                      </Paragraph>
                      <span className="text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                        {ship.type}
                      </span>
                    </div>

                    <Paragraph className="text-sm leading-relaxed text-gray-600">
                      {ship.description}
                    </Paragraph>

                    {/* Basic info */}
                    <div className="grid grid-cols-2 gap-2">
                      {(
                        [
                          {
                            label: "Length",
                            value: ship.basicInformation.length,
                          },
                          { label: "Beam", value: ship.basicInformation.beam },
                          {
                            label: "Draft",
                            value: ship.basicInformation.draft,
                          },
                          { label: "Crew", value: ship.basicInformation.crew },
                        ] as const
                      ).map(({ label, value }) => (
                        <div
                          key={label}
                          className="bg-white rounded-lg p-2.5 border border-gray-100"
                        >
                          <p className="text-xs text-gray-500 uppercase">
                            {label}
                          </p>
                          <p className="text-sm font-medium text-pBlue">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Survey equipment */}
                    {ship.surveyEquipment &&
                      ship.surveyEquipment.length > 0 && (
                        <div>
                          <Paragraph className="font-semibold text-pBlue uppercase mb-2 text-xs!">
                            Survey Equipment
                          </Paragraph>
                          <ul className="space-y-1">
                            {ship.surveyEquipment.map((eq, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <span className="text-primary mt-1 shrink-0">
                                  •
                                </span>
                                <span>{eq}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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

export default SurveyShipsPreview;
