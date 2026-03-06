import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import BrandLogo from "../common/BrandLogo";

export default function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-8 py-8 flex border-t border-t-accent justify-center">
      <div className="max-w-6xl w-full flex justify-between items-center flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="bg-secondary rounded-lg p-2">
            <BrandLogo className="size-5 text-secondary-foreground" />
          </div>
          <p className="text-sm">© {year} Game Backlog</p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://rawg.io/"
            target="_blank"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Data provided by{" "}
            <span className="underline underline-offset-4">RAWG</span>
          </Link>

          <div className="h-1 w-1 rounded-full bg-muted-foreground" />

          <Link
            href="https://github.com/CodingDango/game-backlog-webapp"
            target="_blank"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <FaGithub className="size-5" />
            <span>Source Code</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
