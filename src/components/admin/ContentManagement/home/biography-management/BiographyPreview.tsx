"use client";

import Image from "next/image";
import { IBiographyManagement } from "./types";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, User } from "lucide-react";

interface BiographyPreviewProps {
  data: IBiographyManagement;
  onEdit: () => void;
}

const BiographyPreview = ({ data, onEdit }: BiographyPreviewProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
              <Image
                src="/icons/media.svg"
                alt="biography preview"
                width={40}
                height={40}
                className="w-5"
              />
            </div>
            <div>
              <Paragraph className="font-semibold text-lg! text-pBlue">
                Biography Section Preview
              </Paragraph>
              <Paragraph className="text-sm! text-gray-500">
                Current biography content
              </Paragraph>
            </div>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Biography
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Title
            </Paragraph>
            <Paragraph className="text-base">{data.title}</Paragraph>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-pBlue" />
              <Paragraph className="font-semibold text-pBlue uppercase">
                Name
              </Paragraph>
            </div>
            <Paragraph className="text-base">{data.name}</Paragraph>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <Paragraph className="font-semibold text-pBlue uppercase mb-2">
              Designation
            </Paragraph>
            <Paragraph className="text-base">{data.designation}</Paragraph>
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
      </div>
    </div>
  );
};

export default BiographyPreview;
