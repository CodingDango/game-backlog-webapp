"use client";
import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const supabase = createClient();
  const router = useRouter();

  // TODO: Refactor to use useMutation
  const handleOtpRequest = async (e) => {
    e.preventDefault();

    // TODO: Add a loading spinner to `Send OTP` Button
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
      },
    });

    if (!error) {
      toast.success("OTP Sent");
    } else {
      toast.error(`Error, ${error}`);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email,
      token: otpValue,
      type: "email",
    });

    router.refresh();
    router.push("/");
  };

  return (
    <div className="min-h-dvh flex justify-center py-12 px-8">
      <div className="space-y-12">
        <form className="space-y-6" onSubmit={handleOtpRequest}>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="flex justify-between gap-6">
            <Button>Send OTP</Button>
            <Link
              target="_blank"
              href={"https://mail.google.com/mail/"}
              className="text-muted-foreground underline"
            >
              Mail Redirect
            </Link>
          </div>
        </form>

        <form className="space-y-6" onSubmit={handleOtpVerify}>
          <InputOTP
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
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          </InputOTP>
          <Button>Verify OTP</Button>
        </form>
      </div>
    </div>
  );
}
