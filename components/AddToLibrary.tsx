import { Plus } from "lucide-react";
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

export default function AddToLibrary() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'lg'} className="w-full flex justify-start py-6"><Plus/> Add to library</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Game Name</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-full" variant={"default"} onClick={() => alert('adding to library')}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
