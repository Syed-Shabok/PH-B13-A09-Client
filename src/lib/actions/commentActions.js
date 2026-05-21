"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const deleteCommentAction = async (commentId) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(`http://localhost:5000/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return await res.json();
};

export const updateCommentAction = async (commentId, text) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(`http://localhost:5000/comment/${commentId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to update comment");
  return await res.json();
};
