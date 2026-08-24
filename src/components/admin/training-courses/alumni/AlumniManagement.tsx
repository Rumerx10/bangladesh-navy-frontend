"use client";

import { useState } from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import AlumniMembersCard from "./AlumniMembersCard";
import CoursesCard from "./CoursesCard";

type ActiveTab = "members" | "courses";

const TABS: { key: ActiveTab; label: string; icon: React.ElementType }[] = [
  { key: "members", label: "Alumni Members", icon: GraduationCap },
  { key: "courses", label: "Courses", icon: BookOpen },
];

const AlumniManagement = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("members");

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

      {activeTab === "members" ? <AlumniMembersCard /> : <CoursesCard />}
    </div>
  );
};

export default AlumniManagement;
