"use client";

import React, { useState } from "react";
import { Users, Lightbulb, Target, TrendingUp } from "lucide-react";

export default function LiveStats() {
  const [activeTab, setActiveTab] = useState("topCategories");

  const categories = [
    { name: "Sustainability", count: 48, growth: "+12%" },
    { name: "Health & MedTech", count: 34, growth: "+8%" },
    { name: "Artificial Intelligence", count: 72, growth: "+24%" },
    { name: "FinTech Automation", count: 21, growth: "+4%" },
  ];

  const topContributors = [
    { handle: "@dev_sprout", points: "4.8k", badge: "Core Architect" },
    { handle: "@alpha_founder", points: "4.1k", badge: "Serial Ideator" },
    { handle: "@lex_lens", points: "3.9k", badge: "Top Reviewer" },
    { handle: "@green_fleet", points: "3.2k", badge: "Sustainer" },
  ];

  return (
    <section className="py-16 px-4 bg-[var(--card-bg)] text-[var(--card-text)]">
      <div className="container mx-auto border-t border-[var(--card-border)] pt-5">
        {/* SECTION HEADER */}
        <div className="mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#249E94] font-bold block mb-2">
            // Platform Pulse
          </span>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Ecosystem Activity
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* BIG COUNTERS */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border border-[var(--card-border)] p-6 bg-[var(--card-bg-subtle)] font-mono">
              <div className="flex justify-between items-start mb-4">
                <Lightbulb className="w-6 h-6 text-[#249E94]" />
                <span className="text-[10px] bg-[#249E94]/10 text-[#249E94] px-2 py-0.5 font-bold">
                  LIVE
                </span>
              </div>
              <div className="text-4xl font-black text-[var(--card-text)] tracking-tight">
                1,248
              </div>
              <div className="text-xs text-[var(--card-text-muted)] uppercase tracking-wider mt-1">
                Vetted Ideas Submitted
              </div>
            </div>

            <div className="border border-[var(--card-border)] p-6 bg-[var(--card-bg-subtle)] font-mono">
              <div className="flex justify-between items-start mb-4">
                <Users className="w-6 h-6 text-[#0C7779]" />
                <span className="text-[10px] bg-[#0C7779]/10 text-[#0C7779] px-2 py-0.5 font-bold">
                  +184 Today
                </span>
              </div>
              <div className="text-4xl font-black text-[var(--card-text)] tracking-tight">
                8,941
              </div>
              <div className="text-xs text-[var(--card-text-muted)] uppercase tracking-wider mt-1">
                Active Collaborators
              </div>
            </div>
          </div>

          {/* TABBED INTERACTIVE CONTENT */}
          <div className="lg:col-span-2 border border-[var(--card-border)] flex flex-col">
            {/* TAB BUTTONS */}
            <div className="flex border-b border-[var(--card-border)] font-mono text-xs uppercase bg-[var(--card-bg-subtle)]">
              <button
                onClick={() => setActiveTab("topCategories")}
                className={`px-6 py-4 font-bold border-r border-[var(--card-border)] transition-colors ${
                  activeTab === "topCategories"
                    ? "bg-[var(--card-bg)] text-[#249E94] border-b-2 border-b-[#249E94]"
                    : "text-[var(--card-text-muted)] hover:text-[var(--card-text)]"
                }`}
              >
                Trending Fields
              </button>
              <button
                onClick={() => setActiveTab("contributors")}
                className={`px-6 py-4 font-bold border-r border-[var(--card-border)] transition-colors ${
                  activeTab === "contributors"
                    ? "bg-[var(--card-bg)] text-[#249E94] border-b-2 border-b-[#249E94]"
                    : "text-[var(--card-text-muted)] hover:text-[var(--card-text)]"
                }`}
              >
                Top Contributors
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-6 flex-1 bg-[var(--card-bg)]">
              {activeTab === "topCategories" ? (
                <div className="space-y-4">
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-[var(--card-border)]/50 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[var(--card-text-muted)]">
                          0{idx + 1}.
                        </span>
                        <span className="font-bold uppercase text-sm">
                          {cat.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 font-mono text-xs">
                        <span className="text-[var(--card-text-muted)]">
                          {cat.count} Ideas
                        </span>
                        <span className="text-[#249E94] font-bold flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" /> {cat.growth}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {topContributors.map((user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-[var(--card-border)]/50 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[var(--card-text-muted)]">
                          #{idx + 1}
                        </span>
                        <span className="font-mono font-bold text-sm text-[var(--card-text)]">
                          {user.handle}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-[var(--card-text-muted)]">
                          {user.badge}
                        </span>
                        <span className="font-bold text-[#0C7779]">
                          {user.points} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
