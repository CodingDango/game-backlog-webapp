"use client";

import { LogOutDialog } from "./LogOutDialog";
import { useAuth } from "./AuthProvider";
import { Layers2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import AppSearch from "./AppSearch";
import { Button } from "./ui/button";

export default function AppNavbar() {
  const { session, logOut } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="px-8 py-3 flex justify-center border-b-accent border-b">
      <div className="max-w-6xl w-full">
        <div className="flex gap-8 justify-between items-center">
          <div className="flex gap-8 items-center flex-1">
            <Link className="font-semibold shrink-0 block" href={"/"}>
              <Layers2 />
            </Link>
            <div className="w-full max-w-3xs">
              <AppSearch />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/library"}>Library</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setOpen((prev) => !prev)}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <LogOutDialog onLogOut={logOut} open={open} onOpenChange={setOpen} />
        </div>
      </div>
    </nav>
  );
}
