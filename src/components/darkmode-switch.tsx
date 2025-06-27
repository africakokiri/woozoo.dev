"use client";

import { Button } from "@/ui/button";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const DarkmodeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon
          strokeWidth={1.5}
          className="h-5 w-5"
        />
      ) : (
        <MoonIcon
          strokeWidth={1.5}
          className="h-5 w-5"
        />
      )}
    </Button>
  );
};
