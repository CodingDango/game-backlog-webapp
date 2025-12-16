'use client'

import { LogOutDialog } from "./LogOutDialog";
import { useAuth } from "./AuthProvider";

import Link from "next/link";

export default function AppNavbar() {
  const { session, logOut } = useAuth();

  return (
    <nav className="px-8 py-4 flex justify-center bg-card">
      <div className="max-w-5xl w-full">
        <div className="flex gap-8 justify-between items-center">
          <h1>Backlog</h1>
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
            <li>
              <span className="text-muted-foreground">{session?.user?.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
