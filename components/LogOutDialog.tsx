import { Button } from "@/components/ui/button";
import AppButton from "./AppButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  onLogOut: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  isLoggingOut: boolean;
}

export function LogOutDialog({
  onLogOut,
  open,
  onOpenChange,
  isLoggingOut,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <AppButton
            variant={"default"}
            onClick={onLogOut}
            isLoading={isLoggingOut}
            loadingText="Log Out"
          >
            Log Out
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
