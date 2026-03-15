"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthFormData } from "@/types/types";

import AuthVerifyOTP from "@/components/auth/AuthOTPDialog";
import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();

  const [form, setForm] = useState<AuthFormData>({
    email: "",
    username: "",
  });

  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleSignUp = async (form: AuthFormData) => {
    setIsSendingOtp(true);

    const { error: usernameError, data: username } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", form.username)
      .single();

    if (username) {
      toast.error('Username already exists.');
      setIsSendingOtp(false)
      return;
    }

    const { error, data } = await supabase.auth.signInWithOtp({
      email: form.email,
      options: { shouldCreateUser: true, data: { username: form.username } },
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

  return (
    <div>
      <AuthForm
        setForm={setForm}
        handleSubmit={handleSignUp}
        isSubmitting={isSendingOtp}
        form={form}
        includeUser={true}
        headerText="Create an Account"
        spanText="Already have an account?"
        redirectText="Log in."
        redirectHref="/login"
        emailButtonText="Create Account"
      />

      <AuthVerifyOTP
        onOpenChange={setOpenOtpDialog}
        openDialog={openOtpDialog}
        handleVerify={handleOtpVerify}
        email={form.email}
        isVerifying={isVerifying}
      />
    </div>
  );
}
