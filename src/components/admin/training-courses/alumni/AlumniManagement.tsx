"use client";

import { useState } from "react";
import { BookOpen, GraduationCap, Layers } from "lucide-react";
import { ICourse } from "@/src/components/courses/types";
import { IBatch } from "@/src/components/batches/types";
import AlumniMembersCard from "./AlumniMembersCard";
import BatchesCard from "./BatchesCard";
import CoursesCard from "./CoursesCard";

type ActiveTab = "courses" | "batches" | "members";

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "batches", label: "Batches", icon: Layers },
  { key: "members", label: "Alumni Members", icon: GraduationCap },
];

const AlumniManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("courses");
  const [filterCourseId, setFilterCourseId] = useState<string | undefined>();
  const [filterBatchId, setFilterBatchId] = useState<string | undefined>();

  const handleViewBatches = (course: ICourse) => {
    setFilterCourseId(course.id);
    setActiveTab("batches");
  };

  const handleViewMembers = (batch: IBatch) => {
    setFilterBatchId(batch.id);
    setActiveTab("members");
  };

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-xl bg-gray-100 p-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === key
                  ? "bg-white text-pBlue shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "courses" && (
        <CoursesCard onViewBatches={handleViewBatches} />
      )}
      {activeTab === "batches" && (
        <BatchesCard
          courseId={filterCourseId}
          onClearFilter={() => setFilterCourseId(undefined)}
          onViewMembers={handleViewMembers}
        />
      )}
      {activeTab === "members" && (
        <AlumniMembersCard
          batchId={filterBatchId}
          onClearFilter={() => setFilterBatchId(undefined)}
        />
      )}
    </div>
  );
};

export default AlumniManagement;
