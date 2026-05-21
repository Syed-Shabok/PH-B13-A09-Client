import { Terminal, AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { deleteCommentAction } from "@/lib/actions/commentActions";

export function DeleteCommentAlert({ commentId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteComment = async () => {
    setLoading(true);
    try {
      await deleteCommentAction(commentId); // no token needed
      toast.success("Comment deleted");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-auto min-w-0 items-center gap-2 bg-transparent px-2 py-0.5 text-sm font-mono uppercase tracking-wider text-red-500/80 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-500 transition-all cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
        Delete_Comment
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 sm:max-w-[420px] w-full border-2 border-red-500/50 bg-[var(--card-bg)] text-[var(--card-text)] rounded-none font-mono shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[var(--card-text-muted)] hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 p-1 transition-all cursor-pointer text-lg font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex flex-col gap-1 pt-6 px-6 pb-4 border-b border-[var(--card-border)]/40 items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                // CRITICAL_SYS_OVERWRITE
              </span>
              <h2 className="text-lg font-black uppercase tracking-tight mb-0">
                Delete your Comment?
              </h2>
            </div>

            {/* Body */}
            <div className="py-6 px-6">
              <div className="flex gap-3 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-4 text-xs leading-relaxed text-[var(--card-text-muted)] text-left w-full">
                <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p>
                  Warning: This action will permanently remove the selected
                  comment from the discussion thread. This operation cannot be
                  undone.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-[var(--card-border)]/40 bg-[var(--card-bg-subtle)] px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                className="h-10 rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] px-4 text-xs font-bold uppercase tracking-wider text-[var(--card-text)] transition hover:bg-[var(--card-border)]/20 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteComment}
                disabled={loading}
                className="h-10 rounded-none bg-red-600 px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Deleting..." : "Delete Comment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteCommentAlert;
