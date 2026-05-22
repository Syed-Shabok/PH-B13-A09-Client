"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  "All",
  "AI",
  "Cybersecurity",
  "Tech",
  "Education",
  "Finance",
  "FinTech",
  "Gaming",
  "Health",
  "HealthTech",
  "Productivity",
  "SaaS",
  "Social Platform",
  "Sustainability",
];

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "All";

  const handleCategoryChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;

    if (value === "All") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`/ideas?${params.toString()}`);
  };

  return (
    <div className="relative inline-block w-full md:w-72 font-mono shrink-0">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-sm font-bold uppercase tracking-wider text-[var(--card-text)] z-10">
        Filter By ({currentCategory})
      </div>

      <select
        value={currentCategory}
        onChange={handleCategoryChange}
        className="w-full h-14 border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] rounded-none outline-none transition-all appearance-none cursor-pointer text-transparent"
      >
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="text-[var(--card-text)] bg-[var(--card-bg)]"
          >
            {category}
          </option>
        ))}
      </select>

      {/* Chevron */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[var(--card-text-muted)] text-xs">
        ▼
      </div>
    </div>
  );
};

export default CategoryFilter;
