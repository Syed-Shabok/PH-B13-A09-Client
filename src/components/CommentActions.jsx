"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Edit2, X, Check } from "lucide-react";
import { DeleteCommentAlert } from "./DeleteCommentAlert";

export default function CommentActions({ comment, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const router = useRouter();

  const handleUpdate = async () => {
    if (!text || !text.trim()) return;

    await fetch(`http://localhost:5000/comment/${comment._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setIsEditing(false);
    router.refresh();
  };

  return (
    <div className="flex-1 min-w-0 font-mono">
      {!isEditing ? (
        <div className="space-y-3">
          {/* COMMENT TEXT */}
          <p className="text-sm md:text-base text-[var(--card-text)] leading-relaxed whitespace-pre-wrap pl-1 pt-1 break-words">
            {comment.text}
          </p>

          {/* ACTIONS */}
          {isOwner && (
            <div className="flex items-center gap-2 pl-1 flex-wrap ">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 text-sm uppercase tracking-wider text-[#249E94]/80 hover:text-[#249E94] border border-transparent hover:border-[#249E94]/30 hover:bg-[#249E94]/5 px-3 py-1.5 transition-all font-bold"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit_Comment
              </button>

              <DeleteCommentAlert commentId={comment._id} />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full bg-[var(--card-bg)] border border-[#249E94]/30 p-4 mt-2 space-y-3.5">
          <div className="flex items-center justify-between text-[11px] uppercase text-[#249E94] font-bold tracking-wider border-b border-[var(--card-border)]/40 pb-2 mb-1">
            <span>// EDIT_YOUR_COMMENT</span>
            <span className="opacity-40">SYS_BUFFER</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 border-[var(--card-border)] hover:border-[#249E94]/50 focus:border-[#249E94] transition-colors text-sm text-[var(--card-text)] bg-[var(--card-bg-subtle)] h-12 px-3"
            />

            <div className="flex gap-2.5 shrink-0">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setText(comment.text);
                }}
                isIconOnly
                variant="bordered"
                radius="none"
                className="h-12 w-12 border-[var(--card-border)] text-[var(--card-text-muted)] hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30"
              >
                <X className="w-4.5 h-4.5" />
              </Button>

              <Button
                onClick={handleUpdate}
                className="h-12 bg-[#249E94] text-black font-black text-xs uppercase tracking-wider px-5 hover:bg-[#0C7779] hover:text-white transition-all flex items-center gap-2 rounded-none"
              >
                <Check className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
