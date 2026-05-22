"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  TextField,
  Input,
  Label,
  TextArea,
  InputGroup,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";

import {
  Lightbulb,
  Image as ImageIcon,
  DollarSign,
  Tags,
  Layers3,
  ShieldAlert,
  Users,
  FileText,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = [
  "AI",
  "SaaS",
  "Sustainability",
  "FinTech",
  "HealthTech",
  "EdTech",
  "Productivity",
  "Social Platform",
  "Cybersecurity",
  "Gaming",
];

const STATUSES = [
  "Concept",
  "Seeking Devs",
  "MVP Building",
  "Looking for Funding",
  "Completed",
];

// Shared class strings
const inputClass =
  "h-12 w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none rounded-none px-3 text-sm text-[var(--card-text)] placeholder:text-[var(--card-text-muted)]/40 font-mono transition-all";

const textareaClass =
  "w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none rounded-none px-3 py-2 text-sm text-[var(--card-text)] placeholder:text-[var(--card-text-muted)]/40 font-mono transition-all resize-none";

const prefixClass =
  "flex items-center border border-r-0 border-[var(--card-border)] bg-[var(--card-bg-subtle)] px-3 h-12";

const labelClass =
  "text-xs font-bold uppercase tracking-wider text-[var(--card-text-muted)] font-mono block shrink-0";

export default function CreateIdeaFormClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleCreateIdea = async (formData) => {
    setLoading(true);

    const newIdea = {
      title: formData.get("title"),
      category: formData.get("category"),
      shortDescription: formData.get("shortDescription"),
      detailedDescription: formData.get("detailedDescription"),
      imageUrl: formData.get("imageUrl"),

      // optional
      estimatedBudget: formData.get("estimatedBudget")
        ? `$${Number(formData.get("estimatedBudget")).toLocaleString("en-US")}`
        : "",

      targetAudience: formData.get("targetAudience"),
      problemStatement: formData.get("problemStatement"),
      proposedSolution: formData.get("proposedSolution"),
      status: formData.get("status"),

      //oprtional
      tags: formData.get("tags")
        ? formData
            .get("tags")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],

      createdAt: new Date(),

      author: {
        name: user?.name,
        authorEmail: user?.email,
      },

      upvotes: 0,
      comments: 0,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newIdea),
      });

      const data = await res.json();

      if (data?.insertedId || data?._id) {
        toast.success("Idea Created Successfully");
        router.push("/ideas");
      } else {
        toast.error("Failed to create idea");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
      <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl">
        {/* HEADER */}
        <div className="border-b border-[var(--card-border)] p-6 sm:p-8 md:p-10">
          <div className="space-y-3 text-center">
            <div className="mx-auto w-14 h-14 md:w-16 md:h-16 bg-[#249E94]/10 border border-[#249E94]/30 flex items-center justify-center">
              <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-[#249E94]" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight font-mono text-[var(--card-text)]">
              Create New Idea
            </h1>
            <p className="text-[var(--card-text-muted)] font-mono text-xs sm:text-sm uppercase tracking-wider">
              Publish your startup concept to the vault
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="p-4 sm:p-6 md:p-10">
          <form action={handleCreateIdea} className="space-y-8 md:space-y-10">
            {/* BASIC INFO */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--card-border)]/40 pb-2">
                <span className="text-xs uppercase tracking-widest text-[#249E94] font-bold font-mono">
                  // BASIC_INFORMATION
                </span>
                <span className="text-[10px] text-[var(--card-text-muted)] font-mono opacity-60">
                  SEC_01
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TITLE */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelClass}>Idea Title</label>
                  <Input
                    name="title"
                    required
                    minLength={5}
                    maxLength={100}
                    placeholder="Enter your startup idea title (min 5 characters)"
                    className={inputClass}
                  />
                </div>

                {/* CATEGORY */}
                <div className="space-y-2">
                  <label className={labelClass}>Category</label>
                  <Select name="category" required>
                    <SelectTrigger className="h-12 w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 text-sm text-[var(--card-text)] rounded-none font-mono transition-all px-3">
                      <SelectValue placeholder="Select Category" />
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover className="rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl">
                      <ListBox>
                        {CATEGORIES.map((category) => (
                          <ListBoxItem
                            key={category}
                            id={category}
                            className="font-mono text-xs rounded-none uppercase text-[var(--card-text)] data-[hover=true]:bg-[#249E94]/10 data-[hover=true]:text-[#249E94] px-3 py-2"
                          >
                            {category}
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                </div>

                {/* STATUS */}
                <div className="space-y-2">
                  <label className={labelClass}>Status</label>
                  <Select name="status" required>
                    <SelectTrigger className="h-12 w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 text-sm text-[var(--card-text)] rounded-none font-mono transition-all px-3">
                      <SelectValue placeholder="Select Status" />
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectPopover className="rounded-none border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl">
                      <ListBox>
                        {STATUSES.map((status) => (
                          <ListBoxItem
                            key={status}
                            id={status}
                            className="font-mono text-xs rounded-none uppercase text-[var(--card-text)] data-[hover=true]:bg-[#249E94]/10 data-[hover=true]:text-[#249E94] px-3 py-2"
                          >
                            {status}
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                </div>

                {/* IMAGE URL */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelClass}>Image URL</label>
                  <InputGroup className="w-full flex">
                    <InputGroup.Prefix className={prefixClass}>
                      <ImageIcon className="w-4 h-4 text-[#249E94]" />
                    </InputGroup.Prefix>
                    <Input
                      name="imageUrl"
                      required
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      className={inputClass}
                    />
                  </InputGroup>
                </div>
              </div>
            </div>

            {/* IDEA DETAILS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--card-border)]/40 pb-2">
                <span className="text-xs uppercase tracking-widest text-[#249E94] font-bold font-mono">
                  // IDEA_DETAILS
                </span>
                <span className="text-[10px] text-[var(--card-text-muted)] font-mono opacity-60">
                  SEC_02
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* BUDGET */}
                <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full">
                  <label className={`${labelClass} lg:w-36`}>
                    Estimated Budget
                  </label>
                  <InputGroup className="w-full flex">
                    <InputGroup.Prefix className={prefixClass}>
                      <DollarSign className="w-4 h-4 text-[#249E94]" />
                    </InputGroup.Prefix>
                    <Input
                      name="estimatedBudget"
                      type="number"
                      placeholder="e.g. 50000"
                      className={inputClass}
                    />
                  </InputGroup>
                </div>

                {/* TAGS */}
                <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full">
                  <label className={`${labelClass} lg:w-14`}>Tags</label>
                  <InputGroup className="w-full flex">
                    <InputGroup.Prefix className={prefixClass}>
                      <Tags className="w-4 h-4 text-[#249E94]" />
                    </InputGroup.Prefix>
                    <Input
                      name="tags"
                      placeholder="AI, SaaS, Startup (comma separated)"
                      className={inputClass}
                    />
                  </InputGroup>
                </div>

                {/* SHORT DESCRIPTION */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelClass}>Short Description</label>
                  <TextArea
                    name="shortDescription"
                    required
                    minLength={20}
                    maxLength={250}
                    placeholder="Briefly explain your concept (20 to 250 characters)"
                    rows={3}
                    className={textareaClass}
                  />
                </div>

                {/* DETAILED DESCRIPTION */}
                <div className="md:col-span-2 space-y-2">
                  <label className={labelClass}>Detailed Description</label>
                  <TextArea
                    name="detailedDescription"
                    required
                    minLength={50}
                    placeholder="Explain your architectural blueprint in full depth (minimum 50 characters)"
                    rows={6}
                    className={textareaClass}
                  />
                </div>
              </div>
            </div>

            {/* PROBLEM & SOLUTION */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--card-border)]/40 pb-2">
                <span className="text-xs uppercase tracking-widest text-[#249E94] font-bold font-mono">
                  // PROBLEM_AND_SOLUTION
                </span>
                <span className="text-[10px] text-[var(--card-text-muted)] font-mono opacity-60">
                  SEC_03
                </span>
              </div>

              <div className="space-y-6 w-full">
                {/* TARGET AUDIENCE */}
                <div className="space-y-2">
                  <label className={labelClass}>Target Audience</label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
                    <div className="flex items-center justify-center border border-[var(--card-border)] sm:border-r-0 bg-[var(--card-bg-subtle)] px-3 h-12 sm:h-auto">
                      <Users className="w-4 h-4 text-[#249E94] shrink-0" />
                    </div>
                    <TextArea
                      name="targetAudience"
                      required
                      minLength={10}
                      placeholder="Identify the target market demographics (minimum 10 characters)"
                      rows={3}
                      className={textareaClass}
                    />
                  </div>
                </div>

                {/* PROBLEM STATEMENT */}
                <div className="space-y-2">
                  <label className={labelClass}>Problem Statement</label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
                    <div className="flex items-center justify-center border border-[var(--card-border)] sm:border-r-0 bg-[var(--card-bg-subtle)] px-3 h-12 sm:h-auto">
                      <ShieldAlert className="w-4 h-4 text-[#249E94] shrink-0" />
                    </div>
                    <TextArea
                      name="problemStatement"
                      required
                      minLength={20}
                      placeholder="What real world systematic validation error are you solving? (min 20 characters)"
                      rows={3}
                      className={textareaClass}
                    />
                  </div>
                </div>

                {/* PROPOSED SOLUTION */}
                <div className="space-y-2">
                  <label className={labelClass}>Proposed Solution</label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-stretch">
                    <div className="flex items-center justify-center border border-[var(--card-border)] sm:border-r-0 bg-[var(--card-bg-subtle)] px-3 h-12 sm:h-auto">
                      <FileText className="w-4 h-4 text-[#249E94] shrink-0" />
                    </div>
                    <TextArea
                      name="proposedSolution"
                      required
                      minLength={20}
                      placeholder="Detail the technical logic executing this solution matrix (min 20 characters)"
                      rows={3}
                      className={textareaClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="button"
                variant="bordered"
                radius="none"
                onPress={() => router.push("/ideas")}
                className="flex-1 h-14 sm:h-12 font-bold uppercase tracking-wider font-mono border-[var(--card-border)] hover:bg-[var(--card-border)]/20 text-[var(--card-text)] text-base sm:text-sm transition-all order-2 sm:order-1 rounded-none w-full p-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
                radius="none"
                className="flex-1 h-14 sm:h-12 bg-[#249E94] text-black hover:bg-[#0C7779] hover:text-white font-black uppercase tracking-widest font-mono text-base sm:text-sm transition-all order-1 sm:order-2 rounded-none w-full p-2"
              >
                Publish Idea
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
