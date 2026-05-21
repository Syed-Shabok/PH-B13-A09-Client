import { Button, Input, Form } from "@heroui/react";
import { MessageSquare, Send, User, Calendar, Terminal } from "lucide-react";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { DeleteCommentAlert } from "./DeleteCommentAlert";

const CommentSection = async ({ idea }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`http://localhost:5000/comment/${idea?._id}`, {
    cache: "no-store",
  });

  const comments = await res.json();

  const handleCommentSubmit = async (formData) => {
    "use server";

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const user = session?.user;

    const text = formData.get("commentText");

    if (!text || !text.trim()) return;

    const newComment = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      ideaId: idea?._id,
      ideaTitle: idea?.title,
      ideaImage: idea?.imageUrl,
      text,
      commentTime: new Date().toISOString(),
    };

    await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    revalidatePath(`/ideas/${idea._id}`);
  };

  return (
    <div className="mt-12 border-2 border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-8 relative">
      {/* SECTION HEADER */}
      <div className="flex flex-col mb-6">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#249E94] font-bold block mb-1">
          // Communication Stack
        </span>

        <h2 className="text-2xl font-black uppercase tracking-tight font-mono flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#249E94]" />
          Discussion Thread ({comments.length})
        </h2>
      </div>

      {/* INPUT FORM */}
      <Form
        action={handleCommentSubmit}
        className="flex flex-col gap-3 mb-8 w-full"
      >
        <div className="w-full flex flex-col gap-1.5 font-mono">
          <label className="text-sm font-bold uppercase text-[var(--card-text-muted)] flex items-center justify-between">
            <span>Share your thoughts</span>

            <span className="text-xs opacity-40">TXT_INPUT</span>
          </label>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <Input
              name="commentText"
              required
              placeholder="Write your Comment here"
              className="rounded-none border-[var(--card-border)] hover:border-[#249E94]/60 focus:border-[#249E94] transition-colors flex-1 border"
            />

            <Button
              type="submit"
              className="h-full min-h-11 bg-[#249E94] text-black font-bold font-mono text-sm rounded-none hover:bg-[#0C7779] hover:text-white transition uppercase tracking-wider shrink-0 sm:w-auto w-full"
            >
              Comment
              <Send className="w-3.5 h-3.5 ml-2 inline" />
            </Button>
          </div>
        </div>
      </Form>

      {/* COMMENTS FEED */}
      <div className="space-y-4 font-mono">
        {comments.length === 0 ? (
          <div className="border border-dashed border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-6 text-center text-base text-[var(--card-text-muted)] flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-[#249E94]" />
            No comments found. Thread is currently empty.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="border border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-4 flex flex-col gap-2 relative group hover:border-[#249E94]/30 transition-all duration-300"
            >
              {/* META INFO */}
              <div className="flex items-center justify-between text-xs text-[var(--card-text-muted)] border-b border-[var(--card-border)]/40 pb-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <User className="w-3.5 h-3.5 text-[#0C7779]" />

                  <span className="text-[var(--card-text)]">
                    {comment?.userId === user?.id
                      ? "You"
                      : comment?.userName || "Anonymous"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 opacity-80">
                  <Calendar className="w-3.5 h-3.5" />

                  <span>
                    {new Date(comment?.commentTime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>

              {/* MAIN CONTENT */}
              <div className="flex flex-wrap justify-between items-center gap-3">
                <p className="text-sm md:text-base text-[var(--card-text)] leading-relaxed whitespace-pre-wrap pl-1 pt-1">
                  {comment?.text}
                </p>

                {comment?.userId === user?.id && (
                  <DeleteCommentAlert commentId={comment?._id} />
                )}
              </div>

              {/* DECORATIVE TERMINAL ACCENT */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 bg-[#249E94] block" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
