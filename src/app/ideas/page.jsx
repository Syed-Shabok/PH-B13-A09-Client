import CategoryFilter from "@/components/CategoryFilter";
import IdeaCard from "@/components/IdeaCard";
import SearchBar from "@/components/SearchBar";
import { fetchAllIdeas } from "@/lib/ideas/data";
import { Lightbulb, Database, Layers } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Ideas | IdeaVault",
};

const IdeasPage = async ({ searchParams }) => {
  const sParams = await searchParams;

  const ideas = await fetchAllIdeas(
    sParams?.search || "",
    sParams?.category || "",
  );

  return (
    <section className="container mx-auto py-12 px-5 xl:px-0 font-mono">
      {/* PIPELINE HEADER BLOCK */}
      <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 md:p-8 mb-10 relative overflow-hidden flex flex-col gap-6 md:gap-8">
        {/* TOP OVERLAY INDICATOR */}
        <div className="absolute top-0 right-0 bg-[#249E94] text-black font-black px-3 py-1 text-[10px] tracking-wider uppercase font-mono">
          Index_Active
        </div>

        {/* TOP ROW: BRANDING AND METRICS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight uppercase flex items-center gap-2 text-[var(--card-text)] font-mono">
              <Layers className="w-7 h-7 text-[#249E94]" />
              Idea Vault Pipeline
            </h1>
            <p className="text-xs text-[var(--card-text-muted)] max-w-xl normal-case leading-relaxed">
              Explore user-submitted startup ecosystem concepts, validation test
              scripts, and live architectural MVPs waiting for builders.
            </p>
          </div>

          {/* SYSTEM STATS METRIC BAR */}
          <div className="flex gap-4 border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-xs min-w-[200px] font-mono">
            <div className="space-y-1 w-full">
              <div className="text-[10px] text-[var(--card-text-muted)] uppercase tracking-wider">
                // Global Records
              </div>
              <div className="flex justify-between items-baseline font-bold">
                <span className="text-xl font-black text-[#249E94]">
                  {ideas?.length || 0}
                </span>
                <span className="text-[var(--card-text-muted)] text-[10px]">
                  Nodes Loaded
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BREAKING ROW LINE */}
        <div className="h-[1px] w-full bg-[var(--card-border)] border-none" />

        {/* BOTTOM ROW: INTEGRATED SEARCH BAR PIPELINE */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
          <CategoryFilter />
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* CORE GRID OR EMPTY STATE STATE */}
      {ideas && ideas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <IdeaCard idea={idea} />
            </div>
          ))}
        </div>
      ) : (
        /* FALLBACK EMPTY TERMINAL BLOCK */
        <div className="border-2 border-dashed border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-12 text-center space-y-4">
          <Database className="w-10 h-10 text-[var(--card-text-muted)] mx-auto opacity-60 animate-pulse" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-red-500 uppercase">
              &gt; System: No Active Concept Clusters Found
            </p>
            <p className="text-xs text-[var(--card-text-muted)] max-w-sm mx-auto normal-case">
              The pipeline array is currently empty. Be the primary node stack
              contributor and commit your asset sequence first.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/add-idea"
              className="inline-flex items-center gap-2 border border-[var(--card-border)] bg-[#249E94] text-black font-bold px-4 py-2 text-xs uppercase hover:bg-[#0C7779] hover:text-white transition"
            >
              <Lightbulb className="w-3.5 h-3.5" /> Initialize Idea Node
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default IdeasPage;
