"use client";

import Image from "next/image";
import { Edit } from "lucide-react";
import { IBiographyManagement } from "./types";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";

interface BiographyPreviewProps {
  data: IBiographyManagement;
  onEdit: () => void;
}

const BiographyPreview = ({ data, onEdit }: BiographyPreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div>
          <Paragraph className="font-semibold text-lg! text-pBlue">
            Biography Preview
          </Paragraph>
          <Paragraph className="text-sm! text-gray-500">
            {data.nameEn || "No biography configured"}
          </Paragraph>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Biography
        </Button>
      </div>

      <div className="p-8 pt-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              English Name
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.nameEn || "—"}
            </Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              Bengali Name
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.nameBn || "—"}
            </Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              English Designation
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.designationEn || "—"}
            </Paragraph>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-1">
              Bengali Designation
            </Paragraph>
            <Paragraph className="text-sm! font-medium text-secondary-dark">
              {data.designationBn || "—"}
            </Paragraph>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <Paragraph className="text-xs! text-gray-500 uppercase tracking-wider mb-2">
            Profile Image
          </Paragraph>
          {data.imageUrl ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={data.imageUrl}
                alt={data.nameEn}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Paragraph className="text-sm! text-gray-400">
              No image uploaded
            </Paragraph>
          )}
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

export default BiographyPreview;
