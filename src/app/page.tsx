import { Bookmarks } from "@/components/bookmarks";
import { Header } from "@/components/header";
import { RecentTasks } from "@/components/recent-tasks";
import { Search } from "@/components/search";

export default function page() {
  return (
    <>
      <Header />

      <div className="space-y-8">
        <Search />

        <div className="flex gap-8">
          <Bookmarks />
          <RecentTasks />
        </div>
      </div>
    </>
  );
}
