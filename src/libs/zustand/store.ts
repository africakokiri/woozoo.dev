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

interface RecentTaskStore {
  recentTasks: {
    task: string;
    description?: string;
    createdAt: Date;
    expiresAt: Date;
  }[];

  addRecentTask: (task: string, expiresAt: Date, description?: string) => void;
  deleteRecentTask: (task: string) => void;
}

export const useRecentTaskStore = create<RecentTaskStore>()(
  persist(
    (set) => ({
      recentTasks: [],

      addRecentTask: (task, expiresAt, description) =>
        set((state) => ({
          recentTasks: [
            ...state.recentTasks,
            {
              task,
              expiresAt,
              createdAt: new Date(),
              description
            }
          ]
        })),
      deleteRecentTask: (task) =>
        set((state) => ({
          recentTasks: [...state.recentTasks.filter((recentTask) => recentTask.task !== task)]
        }))
    }),
    {
      name: "recent-task",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
