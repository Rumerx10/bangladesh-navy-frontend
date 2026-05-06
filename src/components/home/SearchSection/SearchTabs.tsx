import { ISearchTab } from "@/src/components/home/types";

interface SearchTabsProps {
  tabs: ISearchTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function SearchTabs({ tabs, activeTab, onTabChange }: SearchTabsProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-1 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === tab.id
              ? "bg-[#001836] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
