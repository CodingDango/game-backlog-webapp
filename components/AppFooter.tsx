import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-8 py-8 flex border-t border-t-accent justify-center">
      <div className="max-w-6xl w-full">
        <div className="flex w-full justify-between items-center flex-col sm:flex-row gap-4">
          <div className="flex gap-4 items-center">
            <Link href="/">
              <BrandLogo className="opacity-50 size-5" />
            </Link>
            <span className="text-muted-foreground text-xs">
              © {year} Game Backlog
            </span>
          </div>
          <span className="text-muted-foreground text-xs">
            Game data provided by
            <a
              className="underline ml-1"
              href="https://api.rawg.io/docs/"
              target="_blank"
            >
              RAWG
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
