import { Bookmarks } from "@/components/bookmarks";
import { Header } from "@/components/header";
import { Search } from "@/components/search";

export default function page() {
  return (
    <>
      <Header />

      <div className="space-y-8">
        <Search />

        <div>
          <Bookmarks />
        </div>
      </div>
    </>
  );
}
