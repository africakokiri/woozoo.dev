"use client";

import { DarkmodeSwitch } from "@/components/darkmode-switch";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export const Header = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="flex justify-between">
      <div className="flex flex-col items-center font-extralight">
        <p className="text-3xl">{format(now, "HH:mm")}</p>
        <p>{format(now, "M/dd (EE)")}</p>
      </div>

      <DarkmodeSwitch />
    </header>
  );
};
