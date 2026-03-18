import { ConfirmationBox } from "../dialogs/ConfirmationBox";

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
import { Dialog, DialogContent } from "../ui/dialog";
import Link from "next/link";

interface AvatarMenuProps {
  logOut: () => Promise<void>;
  username: string;
}

export default function AvatarMenu({ logOut, username }: AvatarMenuProps) {
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
            <Link href={`/users/${username}`}>Profile</Link>
          </DropdownMenuItem>
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

      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent className="max-w-32 w-full">
          <ConfirmationBox
            onAccept={onLogOut}
            isLoading={isLoggingOut}
            title="Logout Confirmation"
            description="Are you sure you want to log out?"
            buttonText="Log out"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
