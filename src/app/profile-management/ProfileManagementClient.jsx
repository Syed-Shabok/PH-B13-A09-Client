"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { User, Mail, Edit2, Check, Camera, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { BarLoader } from "react-spinners";

const inputClass =
  "h-12 w-full border border-[var(--card-border)] bg-[var(--card-bg-subtle)] hover:border-[#249E94]/50 focus:border-[#249E94] focus:outline-none rounded-none px-3 text-sm text-[var(--card-text)] placeholder:text-[var(--card-text-muted)]/40 font-mono transition-all";

const labelClass =
  "text-xs font-bold uppercase tracking-wider text-[var(--card-text-muted)] font-mono";

export default function ProfileManagementClient() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await authClient.updateUser({ name, image });
      toast.success("Profile updated successfully");
      setModalOpen(false);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col gap-3 items-center justify-center font-mono text-xs uppercase tracking-widest text-[var(--card-text-muted)] animate-pulse">
          <BarLoader color="#249E94" width={100} />
          <span>// Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16 font-mono">
      <div className="border-2 border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl">
        {/* HEADER - Safe Flex Wrap for Mobile */}
        <div className="border-b border-[var(--card-border)] p-6 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] text-[#249E94] font-bold uppercase tracking-widest block">
                // USER_PROFILE
              </span>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[var(--card-text)]">
                Profile Management
              </h1>
              <p className="text-xs text-[var(--card-text-muted)] uppercase tracking-wider">
                View and manage your account credentials
              </p>
            </div>

            {/* Edit Button - Responsive scaling */}
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#249E94] border border-[#249E94]/30 hover:bg-[#249E94]/10 transition-all cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* AVATAR SECTION - Stackable Layout on Mobile */}
        <div className="p-6 md:p-10 border-b border-[var(--card-border)] flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full border-2 border-[#249E94] overflow-hidden">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-[#249E94]/10 flex items-center justify-center">
                  <User className="w-10 h-10 text-[#249E94]" />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#249E94] flex items-center justify-center rounded-full sm:rounded-none">
              <Camera className="w-3.5 h-3.5 text-black" />
            </div>
          </div>

          <div className="space-y-1 w-full min-w-0">
            <h2 className="text-xl font-black uppercase tracking-tight text-[var(--card-text)] break-words">
              {user?.name}
            </h2>
            <p className="text-xs text-[var(--card-text-muted)] break-all">
              {user?.email}
            </p>
          </div>
        </div>

        {/* CREDENTIALS METADATA */}
        <div className="p-6 md:p-10 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--card-border)]/40 pb-2">
            <span className="text-xs uppercase tracking-widest text-[#249E94] font-bold">
              // ACCOUNT_CREDENTIALS
            </span>
            <span className="text-[10px] text-[var(--card-text-muted)] opacity-60">
              SEC_01
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Container */}
            <div className="space-y-2">
              <label className={labelClass}>Display Name</label>
              <div className="flex items-center gap-3 h-12 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] px-3 min-w-0">
                <User className="w-4 h-4 text-[#249E94] shrink-0" />
                <span className="text-sm text-[var(--card-text)] truncate">
                  {user?.name || "—"}
                </span>
              </div>
            </div>

            {/* Email Container */}
            <div className="space-y-2">
              <label className={labelClass}>Email Address</label>
              <div className="flex items-center gap-3 h-12 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] px-3 min-w-0">
                <Mail className="w-4 h-4 text-[#249E94] shrink-0" />
                <span className="text-sm text-[var(--card-text)] truncate">
                  {user?.email || "—"}
                </span>
              </div>
            </div>

            {/* User ID Container */}
            <div className="space-y-2 md:col-span-2">
              <label className={labelClass}>User ID</label>
              <div className="flex items-center gap-3 h-12 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] px-3 min-w-0">
                <Shield className="w-4 h-4 text-[#249E94] shrink-0" />
                <span className="text-xs text-[var(--card-text-muted)] tracking-wider break-all truncate">
                  {user?.id || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Read-only notice */}
          <p className="text-[11px] text-[var(--card-text-muted)] uppercase tracking-wider opacity-60 leading-relaxed">
            // Email address cannot be changed. Click Edit Profile to update
            your name or avatar.
          </p>
        </div>
      </div>

      {/* EDIT MODAL DIALOG */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop wrapper layer */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Dialog Container */}
          <div className="relative z-10 w-full max-w-md border-2 border-[var(--card-border)] bg-[var(--card-bg)] font-mono shadow-2xl my-auto">
            {/* Header elements */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--card-border)]">
              <div>
                <span className="text-[10px] text-[#249E94] font-bold uppercase tracking-widest block">
                  // EDIT_PROFILE
                </span>
                <h2 className="text-lg font-black uppercase tracking-tight text-[var(--card-text)]">
                  Update Profile
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[var(--card-text-muted)] hover:text-[var(--card-text)] text-xl font-bold px-2 cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Input Forms */}
            <div className="p-6 space-y-5 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {/* Avatar Preview block container */}
              <div className="flex justify-center pb-2">
                <div className="w-20 h-20 rounded-full border-2 border-[#249E94] overflow-hidden">
                  {image ? (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#249E94]/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-[#249E94]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Name Input Field - Replaced HeroUI with native HTML input */}
              <div className="space-y-2">
                <label className={labelClass}>Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              {/* Image URL Input Field - Replaced HeroUI with native HTML input */}
              <div className="space-y-2">
                <label className={labelClass}>Avatar Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className={inputClass}
                />
                <p className="text-[10px] text-[var(--card-text-muted)] uppercase tracking-widerDoc leading-normal">
                  // Paste a direct image URL. Preview updates live above.
                </p>
              </div>
            </div>

            {/* Interactive Footer Elements */}
            <div className="flex flex-col sm:flex-row gap-3 px-6 pb-6">
              <button
                onClick={() => setModalOpen(false)}
                className="order-2 sm:order-1 flex-1 h-11 border border-[var(--card-border)] text-xs font-bold uppercase tracking-wider text-[var(--card-text)] hover:bg-[var(--card-border)]/20 transition cursor-pointer py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="order-1 sm:order-2 flex-1 h-11 bg-[#249E94] text-black text-xs font-black uppercase tracking-widest hover:bg-[#0C7779] hover:text-white transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 py-2"
              >
                {loading ? (
                  <BarLoader color="#000" width={60} height={2} />
                ) : (
                  <>
                    <Check className=" w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
