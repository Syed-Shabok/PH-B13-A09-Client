"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-10 h-10 transition-all duration-300 ease-in-out ${
        isDark
          ? "text-[#3BC1A8] hover:bg-[#005461]/30 hover:text-[#3BC1A8]"
          : "text-[#0C7779] hover:bg-[#249E94]/10 hover:text-[#005461]"
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="size-5 transition-transform duration-500 rotate-0 scale-100" />
        ) : (
          <Sun className="size-5 transition-transform duration-500 rotate-0 scale-100" />
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
