"use client";

import { Button, Form, Input, Textarea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateIdeaForm = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [loading, setLoading] = useState(false);

  const handleCreateIdea = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const formData = new FormData(form);

    const newIdea = {
      title: formData.get("title"),
      category: formData.get("category"),
      shortDescription: formData.get("shortDescription"),
      detailedDescription: formData.get("detailedDescription"),
      imageUrl: formData.get("imageUrl"),
      estimatedBudget: formData.get("estimatedBudget"),
      targetAudience: formData.get("targetAudience"),
      problemStatement: formData.get("problemStatement"),
      proposedSolution: formData.get("proposedSolution"),

      tags: formData
        .get("tags")
        .split(",")
        .map((tag) => tag.trim()),

      createdAt: new Date().toISOString(),

      author: {
        name: "Demo User",
        authorEmail: "demo@gmail.com",
      },

      upvotes: 0,
      comments: 0,
      status: "Concept",
    };

    const res = await fetch("http://localhost:5000/ideas", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newIdea),
    });

    const data = await res.json();

    console.log(data);

    setLoading(false);

    form.reset();

    router.push("/ideas");
  };

  return (
    <Form onSubmit={handleCreateIdea} className="space-y-6 w-full">
      {/* TITLE */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Idea Title
        </label>

        <Input
          name="title"
          required
          placeholder="Enter your idea title"
          className="w-full"
        />
      </div>

      {/* CATEGORY */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Category
        </label>

        <Input
          name="category"
          required
          placeholder="AI, SaaS, Sustainability..."
          className="w-full"
        />
      </div>

      {/* IMAGE URL */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Image URL
        </label>

        <Input
          name="imageUrl"
          required
          placeholder="https://example.com/image.jpg"
          className="w-full"
        />
      </div>

      {/* SHORT DESCRIPTION */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Short Description
        </label>

        <Textarea
          name="shortDescription"
          required
          placeholder="Briefly explain your idea"
          minRows={3}
        />
      </div>

      {/* DETAILED DESCRIPTION */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Detailed Description
        </label>

        <Textarea
          name="detailedDescription"
          required
          placeholder="Explain your idea in detail"
          minRows={6}
        />
      </div>

      {/* TAGS */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Tags
        </label>

        <Input name="tags" required placeholder="AI, SaaS, Startup" />

        <p className="text-xs mt-2 text-[var(--card-text-muted)]">
          Separate tags with commas
        </p>
      </div>

      {/* BUDGET */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Estimated Budget
        </label>

        <Input name="estimatedBudget" required placeholder="$10,000" />
      </div>

      {/* TARGET AUDIENCE */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Target Audience
        </label>

        <Textarea
          name="targetAudience"
          required
          placeholder="Who is this idea for?"
          minRows={3}
        />
      </div>

      {/* PROBLEM */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Problem Statement
        </label>

        <Textarea
          name="problemStatement"
          required
          placeholder="What problem does this solve?"
          minRows={4}
        />
      </div>

      {/* SOLUTION */}
      <div className="w-full">
        <label className="text-xs font-bold uppercase font-mono text-[var(--card-text-muted)] mb-2 block">
          Proposed Solution
        </label>

        <Textarea
          name="proposedSolution"
          required
          placeholder="How does your idea solve the problem?"
          minRows={4}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        isLoading={loading}
        className="w-full h-12 rounded-none bg-[#249E94] text-black font-black uppercase tracking-wider hover:bg-[#0C7779] hover:text-white transition-all font-mono"
      >
        Submit Idea
      </Button>
    </Form>
  );
};

export default CreateIdeaForm;
