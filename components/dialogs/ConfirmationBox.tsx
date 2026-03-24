import { Button } from "@/components/ui/button";
import AppButton from "../common/AppButton";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  onAccept: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  title: string;
  buttonText: string;
  description: string;
}

export function ConfirmationBox({
  onAccept,
  onCancel,
  isLoading = false,
  title,
  buttonText,
  description,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-3">
        <AppButton
          variant={"default"}
          onClick={onAccept}
          isLoading={isLoading}
          loadingText="Removing"
        >
          {buttonText}
        </AppButton>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
