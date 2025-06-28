import { Bookmarks } from "@/components/bookmarks";
import { Header } from "@/components/header";
import { RecentTasks } from "@/components/recent-tasks";

export default function page() {
  return (
    <div className="space-y-12">
      <Header />

      <div className="flex gap-8">
        <Bookmarks />
        <RecentTasks />
      </div>
    </div>
  );
}
