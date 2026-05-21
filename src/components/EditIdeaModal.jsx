"use client";
import { Dialog, Button, Input, TextArea, InputGroup } from "@heroui/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateIdea } from "@/lib/ideas/data";

const CATEGORIES = [
  "AI",
  "SaaS",
  "Sustainability",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Productivity",
  "Social Platform",
  "Cybersecurity",
  "Gaming",
];

const STATUSES = [
  "Concept",
  "Seeking Devs",
  "MVP Building",
  "Looking for Funding",
  "Completed",
];

const inputClass =
  "h-12 w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none rounded-none px-3 text-sm text-[var(--card-text)] placeholder:text-[var(--card-text-muted)]/40 font-mono transition-all";

const textareaClass =
  "w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none rounded-none px-3 py-2 text-sm text-[var(--card-text)] placeholder:text-[var(--card-text-muted)]/40 font-mono transition-all resize-none";

const labelClass =
  "text-xs font-bold uppercase tracking-wider text-[var(--card-text-muted)] font-mono";

const selectClass =
  "h-12 w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none rounded-none px-3 text-sm text-[var(--card-text)] font-mono transition-all";

export function EditIdeaModal({ idea, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: idea.title || "",
    category: idea.category || "",
    status: idea.status || "",
    shortDescription: idea.shortDescription || "",
    detailedDescription: idea.detailedDescription || "",
    imageUrl: idea.imageUrl || "",
    estimatedBudget: idea.estimatedBudget?.replace(/[$,]/g, "") || "",
    tags: Array.isArray(idea.tags) ? idea.tags.join(", ") : "",
    targetAudience: idea.targetAudience || "",
    problemStatement: idea.problemStatement || "",
    proposedSolution: idea.proposedSolution || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = {
        ...form,
        estimatedBudget: `$${Number(form.estimatedBudget).toLocaleString("en-US")}`,
        tags: form.tags.split(",").map((t) => t.trim()),
      };
      await updateIdea(idea._id, updatedData);
      toast.success("Idea updated successfully");
      onUpdated({ ...idea, ...updatedData });
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update idea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-bold font-mono uppercase tracking-wider text-[#249E94] border border-transparent hover:border-[#249E94]/30 hover:bg-[#249E94]/10 transition-all cursor-pointer"
      >
        <Pencil className="w-4 h-4" />
        Edit
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[var(--card-border)] bg-[var(--card-bg)] font-mono shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-[var(--card-border)] bg-[var(--card-bg)] z-10">
              <div>
                <span className="text-[10px] text-[#249E94] font-bold uppercase tracking-widest">
                  // EDIT_IDEA
                </span>
                <h2 className="text-lg font-black uppercase tracking-tight text-[var(--card-text)]">
                  Update Idea
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[var(--card-text-muted)] hover:text-[var(--card-text)] text-xl font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <label className={labelClass}>Idea Title</label>
                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Idea title"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div className="space-y-2">
                  <label className={labelClass}>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className={labelClass}>Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                    className={selectClass}
                  >
                    <option value="">Select Status</option>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className={labelClass}>Image URL</label>
                <Input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  type="url"
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Budget */}
                <div className="space-y-2">
                  <label className={labelClass}>Estimated Budget</label>
                  <Input
                    name="estimatedBudget"
                    value={form.estimatedBudget}
                    onChange={handleChange}
                    type="number"
                    min={0}
                    className={inputClass}
                    placeholder="50000"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className={labelClass}>Tags</label>
                  <Input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="AI, SaaS, Startup"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <label className={labelClass}>Short Description</label>
                <TextArea
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  required
                  rows={3}
                  className={textareaClass}
                  placeholder="Brief summary..."
                />
              </div>

              {/* Detailed Description */}
              <div className="space-y-2">
                <label className={labelClass}>Detailed Description</label>
                <TextArea
                  name="detailedDescription"
                  value={form.detailedDescription}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={textareaClass}
                  placeholder="Full details..."
                />
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <label className={labelClass}>Target Audience</label>
                <TextArea
                  name="targetAudience"
                  value={form.targetAudience}
                  onChange={handleChange}
                  rows={2}
                  className={textareaClass}
                  placeholder="Who is this for?"
                />
              </div>

              {/* Problem Statement */}
              <div className="space-y-2">
                <label className={labelClass}>Problem Statement</label>
                <TextArea
                  name="problemStatement"
                  value={form.problemStatement}
                  onChange={handleChange}
                  rows={3}
                  className={textareaClass}
                  placeholder="What problem does this solve?"
                />
              </div>

              {/* Proposed Solution */}
              <div className="space-y-2">
                <label className={labelClass}>Proposed Solution</label>
                <TextArea
                  name="proposedSolution"
                  value={form.proposedSolution}
                  onChange={handleChange}
                  rows={3}
                  className={textareaClass}
                  placeholder="How does it solve it?"
                />
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-2 sticky bottom-0 bg-[var(--card-bg)] pb-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 h-11 border border-[var(--card-border)] text-xs font-bold uppercase tracking-wider text-[var(--card-text)] hover:bg-[var(--card-border)]/20 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-11 bg-[#249E94] text-black text-xs font-black uppercase tracking-widest hover:bg-[#0C7779] hover:text-white transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
