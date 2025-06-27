import { Input } from "@/ui/input";

import Image from "next/image";

export const Search = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <Image
          src="/icons/space.svg"
          alt="main-img"
          width={32}
          height={32}
          className="dark:invert"
        />
        <h1 className="text-3xl font-extralight">WooZoo</h1>
      </div>
      <Input
        className="mx-auto block w-full max-w-xl !rounded-2xl px-3 py-2 shadow-lg"
        placeholder="Search your content or enter a URL..."
      />
    </div>
  );
};
