"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current search value from URL
  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search")?.toString() || "";

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full font-mono flex flex-col sm:flex-row gap-2"
    >
      {/* INPUT INTERACTIVE BOUNDARY WRAPPER */}
      <div className="flex-1 flex items-stretch border-2 border-[var(--card-border)] bg-[var(--card-bg)] focus-within:border-[#249E94] transition-colors">
        {/* Terminal Query Header Prefix Indicator */}
        <div className="hidden xs:flex items-center justify-center bg-[var(--card-bg-subtle)] px-3 text-[10px] text-[var(--card-text-muted)] border-r-2 border-[var(--card-border)] uppercase tracking-wider select-none font-bold whitespace-nowrap">
          sys_query://
        </div>

        {/* Dynamic Inner Flex container keeps icon and input safely positioned together */}
        <div className="flex items-center flex-1 px-3 gap-2">
          <Search className="w-4 h-4 text-[var(--card-text-muted)] shrink-0" />

          <input
            name="search"
            type="text"
            defaultValue={currentSearch}
            placeholder="Search for ideas.."
            className="w-full bg-transparent h-13 text-sm text-[var(--card-text)] uppercase tracking-wide placeholder:text-[var(--card-text-muted)]/40 focus:outline-none rounded-none"
          />
        </div>
      </div>

      {/* RAW ACCENTED ACTION TRIGGER */}
      <button
        type="submit"
        className="h-14 px-8 bg-[#249E94]/10 text-[#249E94] border-2 border-[#249E94]/30 hover:bg-[#249E94] hover:text-black hover:border-[#249E94] text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer rounded-none shrink-0"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
