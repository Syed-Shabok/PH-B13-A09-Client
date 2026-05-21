"use client";
import { GoTrash } from "react-icons/go";
import { AlertTriangle, Terminal } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteIdea } from "@/lib/ideas/data";

export function DeleteIdeaAlert({ ideaId, onDeleted }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteIdea(ideaId);
      toast.success("Idea deleted successfully");
      onDeleted(ideaId);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete idea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-bold font-mono uppercase tracking-wider text-red-500 border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer"
      >
        <GoTrash className="w-4 h-4" />
        Delete
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
          <div className="relative z-10 sm:max-w-[420px] w-full border-2 border-red-500/50 bg-[var(--card-bg)] text-[var(--card-text)] rounded-none font-mono shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[var(--card-text-muted)] hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 p-1 transition-all cursor-pointer text-lg font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex flex-col gap-1 pt-6 px-6 pb-4 border-b border-[var(--card-border)]/40 items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                // CRITICAL_SYS_OVERWRITE
              </span>
              <h2 className="text-lg font-black uppercase tracking-tight mt-1">
                Delete This Idea?
              </h2>
            </div>

            {/* Body */}
            <div className="py-6 px-6 text-sm text-[var(--card-text-muted)] leading-relaxed">
              <div className="flex gap-3 bg-[var(--card-bg-subtle)] border border-[var(--card-border)] p-3 text-xs w-full text-left">
                <Terminal className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p>
                  Warning: This operation is permanent. This idea and all
                  associated data will be scrubbed from the vault immediately.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[var(--card-bg-subtle)] border-t border-[var(--card-border)]/40 p-4 gap-3 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="h-9 rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-bold uppercase tracking-wider text-[var(--card-text)] hover:bg-[var(--card-border)]/20 transition px-4 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="h-9 rounded-none bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition px-4 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete Idea"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
