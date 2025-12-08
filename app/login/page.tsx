"use client";
import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const { session } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  console.log('session of auth', session);

  const handleOtpRequest = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
      },
    });
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    debugger

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email,
      token: otpValue,
      type: "email",
    });

    router.refresh();
    router.push('/');
  };

  return (
    <div className="space-y-8">
      <form className="space-y-2" onSubmit={handleOtpRequest}>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button>Send OTP</Button>
      </form>

      <form className="space-y-2" onSubmit={handleOtpVerify}>
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
  );
}
