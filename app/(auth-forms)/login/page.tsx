"use client";

import { AuthFormData } from "@/types/types";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthVerifyOTP from "@/components/auth/AuthOTPDialog";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [form, setForm] = useState<AuthFormData>({
    email: "",
    username: "",
  });

  const [view, setView] = useState<"form" | "otp">("form");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleOtpVerify = async (otpValue: string) => {
    setIsVerifying(true);

    const { error } = await supabase.auth.verifyOtp({
      email: form.email,
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

  const handleLogin = async (form: AuthFormData) => {
    setIsSendingOtp(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: { shouldCreateUser: false },
    });

    setIsSendingOtp(false);

    if (!error) {
      setView("otp");
    } else {
      toast.error(error.message);
    }
  };

  return (
    <>
      {view === "form" && (
        <AuthForm
          setForm={setForm}
          handleSubmit={handleLogin}
          isSubmitting={isSendingOtp}
          form={form}
          headerText="Log in to Game Backlog"
          spanText="Don't have an account?"
          redirectText="Sign up."
          redirectHref="/sign-up"
          emailButtonText="Log In"
        />
      )}

      {view === "otp" && (
        <AuthVerifyOTP
          setView={setView}
          handleVerify={handleOtpVerify}
          email={form.email}
          isVerifying={isVerifying}
        />
      )}
    </>
  );
}
