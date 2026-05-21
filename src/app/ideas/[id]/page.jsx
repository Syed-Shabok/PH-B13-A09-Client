import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchIdeaById } from "@/lib/ideas/data";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      return {
        title: "Idea Details | IdeaVault",
      };
    }

    const idea = await res.json();

    return {
      title: `${idea.title} | IdeaVault`,
      description: idea.shortDescription,
    };
  } catch (error) {
    return {
      title: "Idea Details | IdeaVault",
    };
  }
}

import {
  Terminal,
  ArrowLeft,
  Calendar,
  User,
  Layers,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  Lightbulb,
  DollarSign,
} from "lucide-react";
import CommentSection from "@/components/CommentSection";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({ headers: await headers() });

  // console.log(token);

  const idea = await fetchIdeaById(id, token);

  if (!idea) {
    notFound();
  }

  const dateString = idea.createdAt
    ? new Date(idea.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown Date";

  return (
    <section className="container mx-auto py-12 px-5 xl:px-0">
      {/* HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--card-border)] pb-4">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] px-4 py-3 text-base uppercase hover:text-[#249E94] hover:border-[#249E94]/50 transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>

        <div className="flex flex-wrap items-center gap-5 text-base text-[var(--card-text-muted)] font-mono">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0C7779]" />
            <span>By {idea.author?.name || "Anonymous"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0C7779]" />
            <span>{dateString}</span>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch gap-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden h-full flex flex-col">
            {/* IMAGE */}
            <div className="relative h-80 xl:h-100 w-full border-b border-[var(--card-border)] shrink-0">
              {idea.imageUrl ? (
                <Image
                  src={idea.imageUrl}
                  alt={idea.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-base text-[var(--card-text-muted)]">
                  No Image Available
                </div>
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* CATEGORY */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 dark:bg-black/90 px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 border border-gray-200/20 dark:border-gray-800/50 font-mono">
                  {idea.category || "General"}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 md:p-8 space-y-6 flex-1">
              <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-[var(--card-text)] font-mono">
                {idea.title}
              </h1>

              <p className="text-lg md:text-xl text-[var(--card-text-muted)] leading-relaxed">
                {idea.shortDescription ||
                  "No description available for this idea."}
              </p>
            </div>

            {/* STATS */}
            <div className="font-mono border-t border-[var(--card-border)] p-5 bg-[var(--card-bg-subtle)] flex flex-wrap items-center justify-between gap-4 text-base text-[var(--card-text-muted)] shrink-0">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-[#249E94]" />
                  <span>{idea.upvotes || 0} Points</span>
                </div>

                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0C7779]" />
                  <span>{idea.comments || 0} Comments</span>
                </div>
              </div>

              <span className="text-sm font-bold uppercase px-3 py-2 bg-[#249E94]/10 text-[#249E94] border border-[#249E94]/20">
                {idea.status || "Concept"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 space-y-6 h-full flex flex-col justify-between">
            <div className="space-y-6 flex-1 flex flex-col">
              <h2 className="text-xl font-bold uppercase border-b border-[var(--card-border)] pb-3 font-mono">
                Metadata
              </h2>

              {/* ESTIMATED COST INSERTION */}
              <div className="font-mono bg-[var(--card-bg)] p-4 border border-[var(--card-border)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-bold uppercase text-[var(--card-text-muted)]">
                  <DollarSign className="w-4 h-4 text-[#249E94]" />
                  <span>Est. Budget</span>
                </div>
                <span className="text-sm font-bold font-mono px-3 py-1.5 bg-[#249E94]/10 text-[#249E94] border border-[#249E94]/20 uppercase tracking-wider">
                  {idea.estimatedBudget || "TBD"}
                </span>
              </div>

              {/* TAGS */}
              {idea.tags?.length > 0 && (
                <div className="font-mono">
                  <h3 className="text-base font-bold uppercase mb-3 text-[var(--card-text-muted)]">
                    Tags
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm border border-[var(--card-border)] bg-[var(--card-bg)] px-3 py-1 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* DETAILS */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-base font-bold uppercase mb-3 text-[var(--card-text-muted)] font-mono">
                  Detailed Description
                </h3>

                <p className="text-justify leading-relaxed text-[var(--card-text)] bg-[var(--card-bg)] p-4 border border-[var(--card-border)] whitespace-pre-wrap text-sm md:text-base flex-1">
                  {idea.detailedDescription ||
                    "No detailed description available."}
                </p>
              </div>
            </div>

            {/* BUTTONS - Replaced HeroUI Button with Clean HTML Native Tag */}
            <div className="space-y-3 pt-4 shrink-0">
              <button className="flex items-center justify-center gap-2 bg-[#249E94] text-black w-full py-4 text-base font-bold uppercase hover:bg-[#0C7779] hover:text-white transition font-mono rounded-none cursor-pointer border border-[#249E94]">
                <ShieldCheck className="w-4 h-4" />
                Contact Creator
              </button>
            </div>
          </div>

          {/* NOTICE */}
          <div className="font-mono border border-dashed border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-5 flex gap-3 shrink-0">
            <Terminal className="w-5 h-5 text-[#249E94] shrink-0 mt-1" />

            <p className="text-sm md:text-base leading-relaxed text-[var(--card-text-muted)]">
              Collaboration requests will directly contact the original creator
              of this idea.
            </p>
          </div>
        </div>
      </div>

      {/* PROBLEM & SOLUTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {idea.problemStatement && (
          <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 group hover:border-red-500/30 transition-all duration-300">
            <h2 className="text-xl font-bold uppercase text-red-500 mb-4 flex items-center gap-2 font-mono">
              <Layers className="w-5 h-5" />
              Problem
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-[var(--card-text)]">
              {idea.problemStatement}
            </p>
          </div>
        )}

        {idea.proposedSolution && (
          <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 group hover:border-[#249E94]/30 transition-all duration-300">
            <h2 className="text-xl font-bold uppercase text-[#249E94] mb-4 flex items-center gap-2 font-mono">
              <Lightbulb className="w-5 h-5" />
              Solution
            </h2>

            <p className="text-sm md:text-base leading-relaxed text-[var(--card-text)]">
              {idea.proposedSolution}
            </p>
          </div>
        )}
      </div>

      {/* TARGET AUDIENCE */}
      {idea.targetAudience && (
        <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 mt-6 group hover:border-[#0C7779]/30 transition-all duration-300">
          <h2 className="text-xl font-bold uppercase text-[#0C7779] mb-4 flex items-center gap-2 font-mono">
            <User className="w-5 h-5" />
            Target Audience
          </h2>

          <p className="text-sm md:text-base leading-relaxed text-[var(--card-text)]">
            {idea.targetAudience}
          </p>
        </div>
      )}

      <div className="w-full">
        <CommentSection idea={idea} />
      </div>
    </section>
  );
};

export default IdeaDetailsPage;
