"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowUpRight, MessageSquare, ThumbsUp, Calendar } from "lucide-react";
import Link from "next/link";

const IdeaCard = ({ idea }) => {
  const {
    _id,
    imageUrl,
    title,
    category,
    date,
    shortDescription,
    upvotes,
    comments,
    status,
  } = idea || {};

  return (
    <div className="flex flex-col overflow-hidden bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--card-text)] transition-all duration-300 hover:border-[#249E94]/50 group">
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-700 dark:text-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#249E94]" />
            {category}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1">
        <div className="p-6 space-y-4 flex-1">
          {/* DATE */}
          <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[var(--card-text-muted)]">
            <Calendar className="w-3 h-3" />
            {date}
          </div>

          {/* TITLE */}
          <h3 className="text-xl font-black uppercase leading-snug group-hover:text-[#249E94] transition-colors">
            {title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-sm text-[var(--card-text-muted)] line-clamp-3 leading-relaxed">
            {shortDescription}
          </p>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-[var(--card-border)]">
          {/* STATS */}
          <div className="p-4 bg-[var(--card-bg-subtle)] flex items-center justify-between border-b border-[var(--card-border)] font-mono text-xs text-[var(--card-text-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-[#249E94]" />
                {upvotes}
              </span>

              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0C7779]" />
                {comments}
              </span>
            </div>

            <span className="text-[10px] font-bold uppercase px-2 py-1 bg-[#249E94]/10 text-[#249E94] border border-[#249E94]/20">
              {status}
            </span>
          </div>

          {/* BUTTON */}
          <div className="p-4 bg-[var(--card-bg)]">
            <Link href={`/ideas/${_id}`} className="block">
              <Button className="w-full h-11 bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold text-xs rounded-none hover:opacity-90 transition">
                View Details
                <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
