"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Terminal, AlertTriangle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteCommentAlert({ commentId }) {
  const router = useRouter();

  const handleDeleteComment = async () => {
    const res = await fetch(`http://localhost:5000/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();

    console.log("Delete Data: ", data);

    router.refresh();
  };

  return (
    <AlertDialog>
      <Button className="inline-flex h-auto min-w-0 items-center gap-2 bg-transparent p-0 px-2 py-0.5 text-sm font-mono uppercase tracking-wider text-red-500/80 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 hover:text-red-500 rounded-none transition-all">
        <Trash2 className="w-3.5 h-3.5" />
        Delete_Comment
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] w-full border-2 border-red-500/50 bg-[var(--card-bg)] text-[var(--card-text)] rounded-none font-mono shadow-2xl relative">
            <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-[var(--card-text-muted)] hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 p-1 transition-all" />

            <AlertDialog.Header className="flex flex-col gap-1 pt-6 px-6 pb-4 border-b border-[var(--card-border)]/40 items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                // CRITICAL_SYS_OVERWRITE
              </span>
              <AlertDialog.Heading className="text-lg font-black uppercase tracking-tight mb-0">
                Delete your Comment?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="py-6 px-6">
              <div className="flex gap-3 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] p-4 text-xs leading-relaxed text-[var(--card-text-muted)] text-left w-full">
                <Terminal className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p>
                  Warning: This action will permanently remove the selected
                  comment from the discussion thread. This operation cannot be
                  undone.
                </p>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex justify-end gap-3 border-t border-[var(--card-border)]/40 bg-[var(--card-bg-subtle)] px-6 py-4">
              <Button
                className="h-10 rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] px-4 text-xs font-bold uppercase tracking-wider text-[var(--card-text)] transition hover:bg-[var(--card-border)]/20"
                slot="close"
                variant="tertiary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteComment}
                slot="close"
                variant="danger"
                className="h-10 rounded-none bg-red-600 px-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-red-700"
              >
                Delete Comment
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}

export default DeleteCommentAlert;
