"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { fetchCommentsByUser } from "@/lib/ideas/data";
import {
  deleteCommentAction,
  updateCommentAction,
} from "@/lib/actions/commentActions";
import { Input, Button } from "@heroui/react";
import Link from "next/link";
import { format } from "date-fns";
import {
  MessageSquare,
  Calendar,
  Edit2,
  X,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { GoTrash } from "react-icons/go";
import { AlertTriangle, Terminal } from "lucide-react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

const inputClass =
  "flex-1 border border-[var(--card-border)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none transition-colors text-sm text-[var(--card-text)] bg-[var(--card-bg-subtle)] h-12 px-3 rounded-none font-mono";

export default function MyInteractionsClient() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetchCommentsByUser(user.id)
      .then(setComments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDeleted = (deletedId) => {
    setComments((prev) => prev.filter((c) => c._id !== deletedId));
  };

  const handleUpdated = (updatedId, newText) => {
    setComments((prev) =>
      prev.map((c) => (c._id === updatedId ? { ...c, text: newText } : c)),
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center font-mono text-xs uppercase tracking-widest text-[var(--card-text-muted)] animate-pulse">
          <BarLoader color="#249E94" />
          // Loading interactions...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-[85vh]">
      {/* Page Header */}
      <div className="border-b border-[var(--card-border)] pb-8 mb-10">
        <span className="text-[10px] text-[#249E94] font-bold uppercase tracking-widest font-mono">
          // MY_INTERACTIONS
        </span>
        <h1 className="text-4xl font-black uppercase tracking-tight font-mono text-[var(--card-text)] mt-1">
          My Comments
        </h1>
        <p className="text-[var(--card-text-muted)] font-mono text-sm mt-2">
          {comments.length} comment{comments.length !== 1 ? "s" : ""} posted
        </p>
      </div>

      {/* Empty State */}
      {comments.length === 0 && (
        <div className="border-2 border-dashed border-[var(--card-border)] p-16 text-center">
          <MessageSquare className="w-10 h-10 text-[var(--card-text-muted)] mx-auto mb-4 opacity-40" />
          <p className="font-mono text-sm text-[var(--card-text-muted)] uppercase tracking-wider">
            No comments posted yet.
          </p>
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#249E94] text-black font-bold font-mono text-xs uppercase tracking-widest hover:bg-[#0C7779] hover:text-white transition"
          >
            Explore Ideas
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentRow
            key={comment._id}
            comment={comment}
            onDeleted={handleDeleted}
            onUpdated={handleUpdated}
          />
        ))}
      </div>
    </div>
  );
}

function CommentRow({ comment, onDeleted, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleUpdate = async () => {
    if (!text.trim()) return;
    setEditLoading(true);
    try {
      await updateCommentAction(comment._id, text);
      toast.success("Comment updated");
      onUpdated(comment._id, text);
      setIsEditing(false);
    } catch {
      toast.error("Failed to update comment");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteCommentAction(comment._id);
      toast.success("Comment deleted");
      onDeleted(comment._id);
      setDeleteOpen(false);
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[#249E94]/40 transition-all">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--card-border)]/40 bg-[var(--card-bg-subtle)]">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--card-text-muted)]">
            <MessageSquare className="w-3.5 h-3.5 text-[#249E94]" />
            {comment.ideaTitle ? (
              <Link
                href={`/ideas/${comment.ideaId}`}
                className="hover:text-[#249E94] transition-colors flex items-center gap-1"
              >
                {comment.ideaTitle}
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            ) : (
              <Link
                href={`/ideas/${comment.ideaId}`}
                className="hover:text-[#249E94] transition-colors flex items-center gap-1"
              >
                View Idea
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            )}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--card-text-muted)]">
            <Calendar className="w-3 h-3" />
            {comment.commentTime
              ? format(new Date(comment.commentTime), "MMM dd, yyyy")
              : "—"}
          </div>
        </div>

        {/* Comment Body */}
        <div className="px-5 py-4 font-mono">
          {!isEditing ? (
            <p className="text-sm text-[var(--card-text)] leading-relaxed whitespace-pre-wrap break-words">
              {comment.text}
            </p>
          ) : (
            <div className="space-y-3">
              <div className="text-[11px] uppercase text-[#249E94] font-bold tracking-wider border-b border-[var(--card-border)]/40 pb-2">
                // EDIT_COMMENT
              </div>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={inputClass}
                />
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setText(comment.text);
                    }}
                    className="h-12 w-12 border border-[var(--card-border)] text-[var(--card-text-muted)] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition flex items-center justify-center cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={editLoading}
                    className="h-12 px-5 bg-[#249E94] text-black font-black text-xs uppercase tracking-wider hover:bg-[#0C7779] hover:text-white transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-2 px-5 py-3 border-t border-[var(--card-border)]/40">
            <Link
              href={`/ideas/${comment.ideaId}`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--card-text-muted)] hover:text-[var(--card-text)] border border-transparent hover:border-[var(--card-border)] hover:bg-[var(--card-bg-subtle)] px-3 py-1.5 transition-all font-bold font-mono cursor-pointer"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              View
            </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#249E94]/80 hover:text-[#249E94] border border-transparent hover:border-[#249E94]/30 hover:bg-[#249E94]/5 px-3 py-1.5 transition-all font-bold font-mono cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-red-500/80 hover:text-red-500 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 px-3 py-1.5 transition-all font-bold font-mono cursor-pointer"
            >
              <GoTrash className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteOpen(false)}
          />
          <div className="relative z-10 sm:max-w-[420px] w-full border-2 border-red-500/50 bg-[var(--card-bg)] text-[var(--card-text)] rounded-none font-mono shadow-2xl">
            <button
              onClick={() => setDeleteOpen(false)}
              className="absolute top-4 right-4 text-[var(--card-text-muted)] hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 p-1 transition-all cursor-pointer text-lg font-bold"
            >
              ✕
            </button>
            <div className="flex flex-col gap-1 pt-6 px-6 pb-4 border-b border-[var(--card-border)]/40 items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                // CRITICAL_SYS_OVERWRITE
              </span>
              <h2 className="text-lg font-black uppercase tracking-tight mt-1">
                Delete This Comment?
              </h2>
            </div>
            <div className="py-6 px-6 text-sm text-[var(--card-text-muted)] leading-relaxed">
              <div className="flex gap-3 bg-[var(--card-bg-subtle)] border border-[var(--card-border)] p-3 text-xs">
                <Terminal className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p>
                  Warning: This action will permanently remove this comment from
                  the discussion thread. This cannot be undone.
                </p>
              </div>
            </div>
            <div className="bg-[var(--card-bg-subtle)] border-t border-[var(--card-border)]/40 p-4 flex justify-end gap-3">
              <button
                onClick={() => setDeleteOpen(false)}
                className="h-9 border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-bold uppercase tracking-wider text-[var(--card-text)] hover:bg-[var(--card-border)]/20 transition px-4 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="h-9 bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition px-4 disabled:opacity-50 cursor-pointer"
              >
                {deleteLoading ? "Deleting..." : "Delete Comment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
