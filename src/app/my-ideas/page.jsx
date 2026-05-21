"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { fetchIdeasByUser } from "@/lib/ideas/data";
import { EditIdeaModal } from "@/components/EditIdeaModal";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, DollarSign, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { DeleteIdeaAlert } from "@/components/DeleteIdeaAlert";
import { BarLoader } from "react-spinners";

export default function MyIdeasPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetchIdeasByUser(user.email)
      .then(setIdeas)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDeleted = (deletedId) => {
    setIdeas((prev) => prev.filter((idea) => idea._id !== deletedId));
  };

  const handleUpdated = (updatedIdea) => {
    setIdeas((prev) =>
      prev.map((idea) => (idea._id === updatedIdea._id ? updatedIdea : idea)),
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center font-mono text-xs uppercase tracking-widest text-[var(--card-text-muted)] animate-pulse">
          <BarLoader color="#249E94" />
          // Loading vault...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-16 min-h-[85vh]">
      {/* Page Header */}
      <div className="border-b border-[var(--card-border)] pb-8 mb-10">
        <span className="text-[10px] text-[#249E94] font-bold uppercase tracking-widest font-mono">
          // MY_VAULT
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight font-mono text-[var(--card-text)] mt-1">
          My Ideas
        </h1>
        <p className="text-[var(--card-text-muted)] font-mono text-sm mt-2">
          {ideas.length} idea{ideas.length !== 1 ? "s" : ""} submitted
        </p>
      </div>

      {/* Empty State */}
      {ideas.length === 0 && (
        <div className="border-2 border-dashed border-[var(--card-border)] p-16 text-center">
          <p className="font-mono text-sm text-[var(--card-text-muted)] uppercase tracking-wider">
            No ideas in your vault yet.
          </p>
          <Link
            href="/add-idea"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#249E94] text-black font-bold font-mono text-xs uppercase tracking-widest hover:bg-[#0C7779] hover:text-white transition"
          >
            Post Your First Idea
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Ideas List */}
      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="border border-[var(--card-border)] bg-[var(--card-bg)] flex flex-col sm:flex-row overflow-hidden group hover:border-[#249E94]/40 transition-all"
          >
            {/* Image */}
            {idea.imageUrl && (
              <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={idea.imageUrl}
                  alt={idea.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#249E94] font-mono">
                    {idea.category}
                  </span>
                  <h2 className="text-lg font-black uppercase tracking-tight text-[var(--card-text)] font-mono mt-0.5">
                    {idea.title}
                  </h2>
                </div>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-[#249E94]/10 text-[#249E94] border border-[#249E94]/20 font-mono shrink-0">
                  {idea.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--card-text-muted)] line-clamp-2 leading-relaxed">
                {idea.shortDescription}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--card-text-muted)] font-mono">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(new Date(idea.createdAt), "MMM dd, yyyy")}
                </span>
                {idea.estimatedBudget && (
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#249E94]" />
                    {idea.estimatedBudget}
                  </span>
                )}
                {idea.tags?.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    {idea.tags.slice(0, 3).join(", ")}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--card-border)]/40 mt-auto">
                <Link
                  href={`/ideas/${idea._id}`}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold font-mono uppercase tracking-wider text-[var(--card-text-muted)] border border-transparent hover:border-[var(--card-border)] hover:bg-[var(--card-bg-subtle)] transition-all"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  View
                </Link>
                <EditIdeaModal idea={idea} onUpdated={handleUpdated} />
                <DeleteIdeaAlert ideaId={idea._id} onDeleted={handleDeleted} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
