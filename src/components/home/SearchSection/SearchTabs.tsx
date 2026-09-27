import { ISearchTab } from "@/src/components/types";

interface SearchTabsProps {
  tabs: ISearchTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

const SearchTabs = ({ tabs, activeTab, onTabChange }: SearchTabsProps) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-1 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === tab.id
              ? "bg-brand-navy text-white shadow-md"
              : "bg-light-dark text-secondary-foreground hover:bg-light-silver"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;
