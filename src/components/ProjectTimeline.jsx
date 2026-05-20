"use client";

import React from "react";
import { Lightbulb, Code, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ProjectTimeline() {
  const steps = [
    {
      status: "Ideation",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "border-gray-400 text-gray-500",
      activeColor: "bg-gray-500",
      description:
        "Submit rough architectural concepts, problem scopes, and initial hardware/SaaS targets.",
    },
    {
      status: "Seeking Devs",
      icon: <Code className="w-5 h-5" />,
      color: "border-[#0C7779] text-[#0C7779]",
      activeColor: "bg-[#0C7779]",
      description:
        "Assemble a functional team. Open-source or restricted co-founding pathways begin here.",
    },
    {
      status: "Prototype / Validating",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "border-[#249E94] text-[#249E94]",
      activeColor: "bg-[#249E94]",
      description:
        "Build MVP sandboxes, deploy beta routes/extensions, and process community analytics feedback.",
    },
    {
      status: "Ready for Launch",
      icon: <Rocket className="w-5 h-5" />,
      color: "border-amber-500 text-amber-500",
      activeColor: "bg-amber-500",
      description:
        "Abstract ideas graduate into standard corporate entities, micro-funds, or live app listings.",
    },
  ];

  return (
    <section className="py-16 px-4 border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--card-text)]">
      <div className="container mx-auto border-t pt-5">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#249E94] font-bold block mb-2">
              // Technical Pipeline
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              How Ideas Materialize
            </h2>
          </div>
          <Link href="/add-idea">
            <Button className="h-11 bg-[#249E94] text-white font-bold font-mono text-xs rounded-none hover:bg-[#0C7779] transition">
              SUBMIT AN IDEA <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* TIMELINE TRACK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-[var(--card-border)] p-6 bg-[var(--card-bg-subtle)] flex flex-col justify-center  group hover:border-[#249E94]/40 transition-all duration-300 h-70"
            >
              <div>
                {/* TOP STRIP */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[var(--card-text-muted)]">
                    PHASE_0{idx + 1}
                  </span>
                  <div className={`p-2 border-2 ${step.color} rounded-none`}>
                    {step.icon}
                  </div>
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-black uppercase tracking-wide mb-3 group-hover:text-[#249E94] transition-colors">
                  {step.status}
                </h3>

                {/* BODY TEXT */}
                <p className="text-xs text-[var(--card-text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* DECORATIVE HOVER INDICATOR */}
              <div className="mt-6 pt-4 border-t border-[var(--card-border)]/40 flex justify-end">
                <span className="w-2 h-2 bg-[var(--card-border)] group-hover:bg-[#249E94] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
