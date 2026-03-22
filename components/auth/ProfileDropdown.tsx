import { ConfirmationBox } from "../dialogs/ConfirmationBox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCallback, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { UserProfile } from "@/types/types";

import UserAvatar from "../common/UserAvatar";
import Link from "next/link";

interface ProfileDropdownProps {
  logOut: () => Promise<void>;
  profile?: UserProfile;
}

export default function ProfileDropdown({
  logOut,
  profile,
}: ProfileDropdownProps) {
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
          <UserAvatar
            profile={profile}
            fallbackClass="text-sm"
            avatarClass="size-9"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/users/${profile?.username}`}>Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={"/library"}>Library</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/users/${profile?.username}/activity`}>Activity</Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenLogout((prev) => !prev)}
          >Log out</DropdownMenuItem>
          

          
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
