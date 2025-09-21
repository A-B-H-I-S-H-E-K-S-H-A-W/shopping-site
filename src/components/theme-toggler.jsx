"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider"; // or "next-themes"

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle light/dark only
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      <Sun className="h-5 w-5 transition-all dark:hidden" />
      <Moon className="h-5 w-5 transition-all hidden dark:block absolute" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
