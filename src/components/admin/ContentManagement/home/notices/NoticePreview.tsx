"use client";

import Image from "next/image";
import { INoticeManagement } from "./types";
import { Button } from "@/src/components/ui/button";
import Paragraph from "@/src/components/shared/Paragraph";
import { Edit, ChevronRight, Bell, Check, Circle } from "lucide-react";

interface NoticePreviewProps {
  data: INoticeManagement;
  onEdit: () => void;
}

const NoticePreview = ({ data, onEdit }: NoticePreviewProps) => {
  const isActive = data.status === "ACTIVE";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="relative bg-linear-to-r from-primary/5 via-primary/10 to-transparent px-8 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 flex items-center justify-center rounded-xl border border-primary/20">
            <Image
              src="/icons/File.svg"
              alt="notices preview"
              width={40}
              height={40}
              className="w-5"
            />
          </div>
          <div>
            <Paragraph className="font-semibold text-lg! text-pBlue">
              Notices Preview
            </Paragraph>
            <Paragraph className="text-sm! text-gray-500">
              {data ? "1 notice configured" : "No notice configured"}
            </Paragraph>
          </div>
        </div>

        <Button
          onClick={onEdit}
          className="absolute -bottom-5 right-8 flex items-center gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-5 py-5 rounded-xl transition-all hover:scale-105"
        >
          <Edit className="w-4 h-4" />
          Edit Notices
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-8 pt-10">
        {!data ? (
          <div className="text-center py-8 text-gray-400">
            <Bell className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <Paragraph className="text-sm!">No notices added yet.</Paragraph>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
            {isActive ? (
              <Check className="w-4 h-4 text-green-500 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400 shrink-0" />
            )}
            <div className="flex-1">
              <Paragraph
                className={`text-sm! font-medium ${!isActive ? "line-through text-gray-400" : ""}`}
              >
                {data.name}
              </Paragraph>
              {data.description && (
                <Paragraph className="text-xs! text-gray-500 mt-1">
                  {data.description}
                </Paragraph>
              )}
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticePreview;
