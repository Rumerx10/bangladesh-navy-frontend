interface SortDropdownProps {
  value: string;
  onChange: (value: "relevance" | "price-asc" | "price-desc" | "newest") => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "relevance" | "price-asc" | "price-desc" | "newest")}
      className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:border-[#003f71] cursor-pointer"
    >
      <option value="relevance">Sort: Relevance</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="newest">Newest First</option>
    </select>
  );
}
