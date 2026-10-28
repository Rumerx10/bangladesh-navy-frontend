import { ChangeEvent, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearchDebounce = (
  delay: number = 300,
  initialValue: string = ""
) => {
  const [search, setSearch] = useState<string>(initialValue);
  const debouncedSearch = useDebounce(search, delay);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    search,
    debouncedSearch,
    handleSearchChange,
    setSearch,
  };
};
