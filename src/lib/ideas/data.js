export const fetchTrendingIdeas = async () => {
  try {
    const res = await fetch("http://localhost:5000/ideas", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch ideas");
    }
    const ideas = await res.json();
    return ideas.slice(0, 6);
  } catch (error) {
    console.error("Error fetching trending ideas:", error);
    throw error;
  }
};

export const fetchAllIdeas = async () => {
  try {
    const res = await fetch("http://localhost:5000/ideas", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch ideas");
    }
    const ideas = await res.json();
    return ideas;
  } catch (error) {
    console.error("Error fetching all ideas:", error);
    throw error;
  }
};

export const fetchIdeaById = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/ideas/${id}`, {
      cache: "no-store",
    });
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
