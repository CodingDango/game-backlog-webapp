import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  handleLogOut: () => void;
}

export function LogOutDialog({ handleLogOut }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'}>Log Out</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Logout Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant={'default'} onClick={handleLogOut}>Log Out</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
