"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Terminal, AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--card-bg)] text-[var(--card-text)] font-mono flex flex-col justify-between  border-[var(--card-border)] p-4 sm:p-8">
      {/* MAIN ERROR PANEL */}
      <div className="max-w-2xl mx-auto my-auto w-full border-2 border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 md:p-10 relative overflow-hidden shadow-sm">
        {/* Decorative Brutalist Block */}
        <div className="absolute top-0 right-0 bg-[#249E94] text-black font-black px-3 py-1 text-[10px] tracking-wider uppercase">
          Lost_In_Sandbox
        </div>

        <div className="space-y-6">
          {/* Huge Status Code */}
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-[var(--card-text)] select-none">
            404<span className="text-[#249E94]">.</span>
          </h1>

          {/* Terminal Readout */}
          <div className="border border-[var(--card-border)] bg-[var(--card-bg)] p-4 rounded-none space-y-2 text-xs md:text-sm text-[var(--card-text-muted)]">
            <p className="text-[#249E94] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> ideavault --status lookup
            </p>
            <p className="text-red-500 font-bold">
              &gt; Error: REQUESTED_PATH_NOT_FOUND
            </p>
            <p className="normal-case leading-relaxed">
              The route you are looking for does not exist or has been moved.
              Please check the URL and try again.
            </p>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-3 text-xs uppercase font-bold hover:text-[#249E94] hover:border-[#249E94]/50 transition group"
            >
              <ArrowLeft className="w-4 h-4 text-[var(--card-text-muted)] group-hover:text-[#249E94] transition" />
              Return to Previous Page
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-[var(--card-border)] bg-[#249E94] text-black px-5 py-3 text-xs uppercase font-black hover:bg-[#0C7779] hover:text-white hover:border-[#0C7779] transition text-center"
            >
              <Home className="w-4 h-4" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
