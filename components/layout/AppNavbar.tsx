"use client";

import { useAuth } from "../auth/AuthProvider";
import { Button } from "../ui/button";

import Link from "next/link";
import AppSearch from "../search/AppSearch";
import AvatarMenu from "../auth/AvatarMenu";
import BrandLogo from "../common/BrandLogo";

export default function AppNavbar() {
  const { session, logOut, userProfile } = useAuth();

  return (
    <nav className="px-4 md:px-8 py-3 flex justify-center border-b-accent border-b">
      <div className="max-w-6xl w-full">
        <div className="flex gap-8 justify-between items-center">
          <div className="flex gap-8 items-center flex-1">
            <Link className="font-semibold shrink-0 block" href={"/"}>
              <BrandLogo className="size-6 text-secondary-foreground" />
            </Link>
            <div className="w-full max-w-3xs">
              <AppSearch />
            </div>
          </div>

          {session && userProfile ? (
            <AvatarMenu logOut={logOut} username={userProfile.username} />
          ) : (
            <div className="flex gap-4">
              <Button variant={"outline"}>
                <Link href={"/sign-up"}>Sign Up</Link>
              </Button>
              <Button variant={"default"} asChild>
                <Link href={"/login"}>Log In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
