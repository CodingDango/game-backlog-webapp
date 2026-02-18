"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthVerifyOTP from "@/components/AuthOTPDialog";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleEmailLogin = async (email: string) => {
    setIsSendingOtp(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: false },
    });

    setIsSendingOtp(false);

    if (!error) {
      setOpenOtpDialog(true);
    } else {
      toast.error(error.message);
    }
  };

  const handleOtpVerify = async (otpValue: string) => {
    setIsVerifying(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otpValue,
      type: "email",
    });

    setIsVerifying(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div>
      <AuthForm
        setEmail={setEmail}
        email={email}
        handleEmailSubmit={handleEmailLogin}
        isEmailSubmitting={isSendingOtp}
        headerText="Log in to Game Backlog"
        spanText="Don't have an account?"
        redirectText="Sign up."
        redirectHref="/sign-up"
        emailButtonText="Log In"
      />

      <AuthVerifyOTP
        onOpenChange={setOpenOtpDialog}
        openDialog={openOtpDialog}
        handleVerify={handleOtpVerify}
        email={email}
        isVerifying={isVerifying}
      />
    </div>
  );
}