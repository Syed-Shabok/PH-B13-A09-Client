"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowUp } from "lucide-react";

import logo from "../../public/assets/logo.png";
import logo2 from "../../public/assets/logo2.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLogo = mounted && theme === "dark" ? logo2 : logo;

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--card-text)] font-mono">
      {/* TOP DECORATIVE STATUS STRIP */}
      <div className="border-b border-[var(--card-border)] bg-[var(--card-bg-subtle)] px-5 py-3 text-[10px] uppercase tracking-widest text-[var(--card-text-muted)] flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#249E94] animate-pulse" />
          <span>Ecosystem Status: Operational</span>
        </div>
        <div>// Live Terminal Platform</div>
      </div>

      <div className="container mx-auto px-5 py-12">
        {/* Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Logo */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-[150px] h-10 relative flex items-center">
                <Image
                  src={currentLogo}
                  alt="Idea Vault Logo"
                  width={150}
                  height={40}
                  priority
                  className="object-contain transition-opacity duration-200"
                />
              </div>
            </Link>
            <p className="text-xs text-[var(--card-text-muted)] max-w-sm normal-case leading-relaxed">
              A platform to share, validate and collaborate on startup ideas
              with builders and innovators worldwide. Submit concepts, gather
              teams, and deploy tests.
            </p>
          </div>

          {/* Links Group 1 */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#249E94]">
              // Explore
            </h4>
            <div className="space-y-2">
              <Link
                href="/ideas"
                className="block text-[var(--card-text-muted)] hover:text-[var(--card-text)] transition flex items-center gap-1 group"
              >
                <span className="text-[#249E94]/0 group-hover:text-[#249E94] transition-all duration-150">
                  &gt;
                </span>{" "}
                Ideas
              </Link>
              <Link
                href="/add-idea"
                className="block text-[var(--card-text-muted)] hover:text-[var(--card-text)] transition flex items-center gap-1 group"
              >
                <span className="text-[#249E94]/0 group-hover:text-[#249E94] transition-all duration-150">
                  &gt;
                </span>{" "}
                Post Idea
              </Link>
            </div>
          </div>

          {/* Links Group 2 */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#0C7779]">
              // Internal
            </h4>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-[var(--card-text-muted)] hover:text-[var(--card-text)] transition flex items-center gap-1 group"
              >
                <span className="text-[#0C7779]/0 group-hover:text-[#0C7779] transition-all duration-150">
                  &gt;
                </span>{" "}
                About
              </Link>
              <Link
                href="/contact"
                className="block text-[var(--card-text-muted)] hover:text-[var(--card-text)] transition flex items-center gap-1 group"
              >
                <span className="text-[#0C7779]/0 group-hover:text-[#0C7779] transition-all duration-150">
                  &gt;
                </span>{" "}
                Contact
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="md:col-span-1 space-y-3">
            <h4 className="font-bold uppercase text-[10px] tracking-wider text-[var(--card-text-muted)] md:text-right">
              Social
            </h4>
            <div className="flex md:justify-end gap-3 text-lg">
              <a
                href="#"
                className="p-2 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] text-[var(--card-text-muted)] hover:text-[#249E94] hover:border-[#249E94]/40 transition rounded-none"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="p-2 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] text-[var(--card-text-muted)] hover:text-[#249E94] hover:border-[#249E94]/40 transition rounded-none"
              >
                <FaXTwitter />
              </a>
              <a
                href="#"
                className="p-2 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] text-[var(--card-text-muted)] hover:text-[#0C7779] hover:border-[#0C7779]/40 transition rounded-none"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--card-text-muted)]">
          <p>© {new Date().getFullYear()} IDEAVAULT. ALL RIGHTS RESERVED.</p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 border border-[var(--card-border)] px-3 py-1.5 bg-[var(--card-bg-subtle)] hover:text-[#249E94] hover:border-[#249E94]/40 transition uppercase font-bold text-[10px]"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
