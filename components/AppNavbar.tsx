"use client";

import { LogOutDialog } from "./LogOutDialog";
import { useAuth } from "./AuthProvider";

import Link from "next/link";
import AppSearchInput from "./AppSearchInput";

export default function AppNavbar() {
  const { session, logOut } = useAuth();

  return (
    <nav className="px-8 py-3 flex justify-center border-b-accent border-b">
      <div className="max-w-7xl w-full">
        <div className="flex gap-8 justify-between items-center">
          <div className="flex gap-8 items-center flex-1">
            <Link className="font-medium shrink-0 block" href={"/"}>
              Backlog
            </Link>
            <div className="w-full max-w-xs">
              <AppSearchInput />
            </div>
          </div>

          <ul className="flex gap-8 items-center">
            <li>
              <Link href="/">Games</Link>
            </li>
            <li>
              <Link href="/library">Library</Link>
            </li>
            <li>
              <LogOutDialog handleLogOut={logOut} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
