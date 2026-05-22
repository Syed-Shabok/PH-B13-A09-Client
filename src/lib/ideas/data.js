"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const createIdeaAction = async (ideaData) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ideaData),
  });

  if (!res.ok) throw new Error("Failed to create idea");
  return await res.json();
};

export const fetchTrendingIdeas = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/trending`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch trending ideas");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching trending ideas:", error);
    throw error;
  }
};

export const fetchAllIdeas = async (searchTerm = "", category = "") => {
  try {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    if (category) {
      params.set("category", category);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?${params.toString()}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch ideas");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching all ideas:", error);
    throw error;
  }
};

export const fetchIdeaById = async (id, token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,
      {
        cache: "no-store",
        headers: { authorization: `Bearer ${token}` },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch idea");
    }
    const idea = await res.json();
    return idea;
  } catch (error) {
    console.error("Error fetching idea by ID:", error);
    throw error;
  }
};

export const fetchIdeasByUser = async (email) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${email}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch user ideas");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteIdea = async (id) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete idea");
  return await res.json();
};

export const updateIdea = async (id, updatedData) => {
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update idea");
  return await res.json();
};

export const fetchCommentsByUser = async (userId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/user/${userId}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch user comments");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
