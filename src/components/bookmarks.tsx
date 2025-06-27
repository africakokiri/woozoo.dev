"use client";

import { useBookmarkStore } from "@/libs/zustand/store";
import { getOpenGraph } from "@/server/getOpenGraph";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Modal } from "@/ui/modal";

import { ExternalLink, PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Bookmarks = () => {
  const [url, setUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { bookmarks, addBookmark, deleteBookmark } = useBookmarkStore();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const openGraph = await getOpenGraph(url);

    setErrorMessage("");

    // ERROR
    if (openGraph instanceof Error) {
      setErrorMessage("Invalid URL.");

      return;
    }

    // Exist URL
    if (bookmarks.filter((bookmark) => bookmark.url === url).length > 0) {
      console.log(url);
      console.log(bookmarks);
      setErrorMessage("URL already exist.");

      return;
    }

    if (
      openGraph !== null &&
      typeof openGraph === "object" &&
      "title" in openGraph &&
      typeof openGraph.title === "string" &&
      !(openGraph instanceof Error)
    ) {
      addBookmark(openGraph.title, url, openGraph.favicons[0]);
    }

    setUrl("");
    setOpenModal(false);
  };

  return (
    <div className="w-1/3 space-y-4">
      <div className="bg-element space-y-4 rounded-3xl border p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold">
            <ExternalLink />
            Bookmarks
          </h2>

          <Modal
            trigger={
              <Button
                variant="ghost"
                size="icon"
              >
                <PlusIcon />
              </Button>
            }
            className="bg-element w-full max-w-xl !rounded-3xl border p-6 shadow-lg"
            title="Add Bookmark"
            description={errorMessage}
            open={openModal}
            onOpenChange={setOpenModal}
          >
            <form onSubmit={handleOnSubmit}>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full !rounded-2xl border px-3 py-2"
                placeholder="URL"
                autoFocus
              />

              <Button
                className="sr-only"
                type="submit"
              >
                submit
              </Button>
            </form>
          </Modal>
        </div>
      </div>

      {bookmarks.length > 0 && (
        <div className="space-y-4">
          {bookmarks.map(({ title, url, faviconUrl }, i) => {
            return (
              <Link
                href={url}
                target="_blank"
                key={`${title}-${url}-${i}`}
                className="bg-element flex items-center justify-between gap-2 rounded-3xl border px-6
py-3 shadow-lg hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={faviconUrl}
                    alt="favicon"
                    className="h-6 w-6"
                  />
                  <h3 className="line-clamp-1 font-semibold">{title}</h3>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-400"
                  onClick={(e) => {
                    e.preventDefault();

                    deleteBookmark(url);
                  }}
                >
                  <XIcon />
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
