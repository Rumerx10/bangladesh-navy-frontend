import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface SortDropdownProps {
  value: string;
  onChange: (value: "relevance" | "price-asc" | "price-desc" | "newest") => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) =>
        onChange(val as "relevance" | "price-asc" | "price-desc" | "newest")
      }
    >
      <SelectTrigger className="w-[200px] bg-white border-gray-200 text-gray-700 font-medium h-10 rounded-lg focus:ring-[#003f71]/20">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-white border-gray-100 shadow-xl rounded-xl">
        <SelectItem value="relevance" className="cursor-pointer py-2.5">
          Sort: Relevance
        </SelectItem>
        <SelectItem value="price-asc" className="cursor-pointer py-2.5">
          Price: Low to High
        </SelectItem>
        <SelectItem value="price-desc" className="cursor-pointer py-2.5">
          Price: High to Low
        </SelectItem>
        <SelectItem value="newest" className="cursor-pointer py-2.5">
          Newest First
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
