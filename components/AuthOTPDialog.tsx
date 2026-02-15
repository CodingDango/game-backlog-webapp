import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";

interface AuthVerifyOTPProps {
  openDialog: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  handleVerify: (otpValue: string) => void;
}

export default function AuthVerifyOTP({
  onOpenChange,
  handleVerify,
  openDialog,
  email,
}: AuthVerifyOTPProps) {
  const [otpValue, setOtpValue] = useState("");

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-10 max-w-96!">
        <DialogHeader>
          <DialogTitle className="text-start!">Verification</DialogTitle>
          <DialogDescription className="line-clamp-1 break-all">
            Enter the code sent to {email}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(otpValue);
          }}
        >
          <InputOTP
            className="justify-between w-full"
            maxLength={8}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
            required
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          </InputOTP>
          <Button className="w-full">Verify OTP</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
