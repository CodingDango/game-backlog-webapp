"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthVerifyOTP from "@/components/auth/AuthOTPDialog";
import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleEmailSignUp = async (email: string) => {
    setIsSendingOtp(true);

    const { error, data } = await supabase.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: true },
    });

    console.log(data)

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
        handleEmailSubmit={handleEmailSignUp}
        isEmailSubmitting={isSendingOtp}
        headerText="Create an Account"
        spanText="Already have an account?"
        redirectText="Log in."
        redirectHref="/login"
        emailButtonText='Create Account'
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
