import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface BookmarkStore {
  bookmarks: {
    title: string;
    url: string;
    faviconUrl: string;
  }[];

  addBookmark: (title: string, url: string, faviconUrl: string) => void;
  deleteBookmark: (url: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarks: [],

      addBookmark: (title, url, faviconUrl) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks,
            {
              title,
              url,
              faviconUrl
            }
          ]
        })),
      deleteBookmark: (url) =>
        set((state) => ({
          bookmarks: [...state.bookmarks.filter((bookmark) => bookmark.url !== url)]
        }))
    }),
    {
      name: "bookmark",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
