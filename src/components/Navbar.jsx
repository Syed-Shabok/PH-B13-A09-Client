"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Dropdown } from "@heroui/react";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import logo2 from "../../public/assets/logo2.png";
import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const publicLinks = [
    { label: "Home", path: "/" },
    { label: "Ideas", path: "/ideas" },
  ];

  const privateLinks = [
    { label: "Add Idea", path: "/add-idea" },
    { label: "My Ideas", path: "/my-ideas" },
    { label: "My Interactions", path: "/my-interactions" },
  ];

  const allLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (path) => pathname === path;

  const currentLogo = mounted && theme === "dark" ? logo2 : logo;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
      <header className="mx-auto flex h-18 container items-center justify-between px-5 xl:px-0">
        {/* Logo */}
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

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6">
          {allLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-[#249E94] font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#0C7779] dark:hover:text-[#3BC1A8]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Auth Area */}
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </div>
          ) : user ? (
            /* User Dropdown */
            <Dropdown>
              <Dropdown.Trigger>
                <div className="rounded-full border-2 border-[#249E94] overflow-hidden w-9 h-9 transition-transform hover:scale-105 cursor-pointer bg-[#249E94] flex items-center justify-center">
                  {user?.image ? (
                    <Image
                      referrerPolicy="no-referrer"
                      src={user.image}
                      alt={`${user?.name}'s avatar`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-black font-bold text-sm uppercase">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
              </Dropdown.Trigger>
              <Dropdown.Popover className="rounded-lg">
                <Dropdown.Menu>
                  <Dropdown.Section>
                    <Dropdown.Item
                      id="user-info"
                      textValue="User Info"
                      className="cursor-default opacity-100"
                    >
                      <div className="flex flex-col py-1">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="font-bold text-[#005461] dark:text-[#3BC1A8] text-sm">
                          {user?.email}
                        </p>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Section>
                  <Dropdown.Section>
                    <Dropdown.Item id="profile" textValue="Profile Management">
                      <Link href="/profile-management" className="block w-full">
                        Profile Management
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="logout"
                      textValue="Log Out"
                      className="text-red-500"
                      onAction={handleLogout}
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            /* Login / Register */
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-[#0C7779] hover:text-[#005461] transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-[#005461] text-white hover:bg-[#0C7779] transition-colors px-4 py-2 rounded-lg shadow-md"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <ul className="flex flex-col gap-1 p-4">
            {allLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "text-[#249E94] font-bold bg-[#249E94]/10"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {!user && (
              <>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <li>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg py-2 px-3 text-[#0C7779] dark:text-[#3BC1A8] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg py-2 px-3 font-bold text-[#005461] dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
