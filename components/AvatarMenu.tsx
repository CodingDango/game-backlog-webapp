import { LogOutDialog } from "./LogOutDialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useState } from "react";
import Link from "next/link";

interface AvatarMenuProps {
  logOut: () => Promise<void>;
}

export default function AvatarMenu({ logOut }: AvatarMenuProps) {
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogOut = useCallback(async () => {
    setIsLoggingOut(true);
    await logOut();
    setIsLoggingOut(false);
  }, [logOut]);

  return (
    <>
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
            onClick={() => setOpenLogout((prev) => !prev)}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogOutDialog
        onLogOut={onLogOut}
        onOpenChange={setOpenLogout}
        open={openLogout}
        isLoggingOut={isLoggingOut}
      />
    </>
  );
}
