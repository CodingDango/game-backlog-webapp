import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState } from "react";
import AppButton from "../common/AppButton";
import { Card } from "../ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface AuthVerifyOTPProps {
  setView: (view: "form" | "otp") => void;
  handleVerify: (otpValue: string) => void;
  resendOtp: () => void;
  email: string;
  isResendingOtp?: boolean;
  isVerifying?: boolean;
}

export default function AuthVerifyOTP({
  setView,
  handleVerify,
  resendOtp,
  email,
  isResendingOtp = false,
  isVerifying = false,
}: AuthVerifyOTPProps) {
  const [otpValue, setOtpValue] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col gap-10 max-w-96 items-center w-full px-4! sm:px-6">
        <div className="text-center space-y-3 w-full">
          <h1 className="text-2xl sm:text-3xl font-medium">Verify OTP</h1>
          <div className="text-sm line-clamp-2 text-muted-foreground flex flex-col">
            <span>
              Sent a code to{" "}
              <span className="font-medium">
                {email || "example@gmail.com"}
              </span>
              .
            </span>
            <span className="text-muted-foreground">
              If you cannot find it, check your spam folder.
            </span>
          </div>
        </div>

        <form
          className="flex flex-col gap-8 items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(otpValue);
          }}
        >
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
            required
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPSeparator />

            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <span className="text-muted-foreground text-sm">
            Didn&apos;t receive code?{" "}
            <button
              className={cn(
                "text-primary font-semibold",
                isResendingOtp && "text-muted-foreground",
              )}
              onClick={resendOtp}
              disabled={isResendingOtp}
            >
              {isResendingOtp ? "Resending" : "Resend OTP"}
            </button>
          </span>

          <AppButton
            className="w-full"
            type="submit"
            disabled={isVerifying || isResendingOtp}
          >
            Verify OTP
          </AppButton>
        </form>
      </Card>
      <div className="flex justify-center items-center">
        <Button asChild variant={"ghost"} onClick={() => setView("form")}>
          <div className="flex gap-1 justify-center items-center text-muted-foreground">
            <ArrowLeft className="size-4" /> Back
          </div>
        </Button>
      </div>
    </div>
  );
}
