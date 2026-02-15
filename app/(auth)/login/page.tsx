"use client";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import AuthEmailForm from "@/components/AuthEmailForm";
import AuthVerifyOTP from "@/components/AuthOTPDialog";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("babyyodaman2.0@gmail.com");
  const [openOtpDialog, setOpenOtpDialog] = useState(true);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const handleEmailLogin = async (e:  FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const handleGithubLogin = async (e:  FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.info("Coming soon");
  };

  const handleOtpVerify = async (otpValue: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otpValue,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="max-w-96 w-full flex flex-col gap-8 ">
      <div className="flex justify-center">
        <BrandLogo />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-center text-3xl font-semibold">
          Log in to Backlog
        </h1>
        <span className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href={"/sign-up"} className="text-foreground font-semibold">
            Sign up.
          </Link>
        </span>
      </div>

      <AuthEmailForm
        onSubmit={handleEmailLogin}
        onEmailChange={(e) => setEmail(e.target.value)}
        isSubmitting={isSendingOtp}
        email={email}
      />

      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 place-items-center">
        <div className="h-px bg-accent w-full"></div>
        <div className="text-sm text-muted-foreground">or</div>
        <div className="h-px bg-accent w-full"></div>
      </div>

      <form className="flex w-full" onSubmit={handleGithubLogin}>
        <Button
          variant={"outline"}
          className="py-6 flex gap-4 w-full"
          type="submit"
        >
          <FaGithub className="size-6" /> Continue with GitHub
        </Button>
      </form>

      <AuthVerifyOTP
        onOpenChange={setOpenOtpDialog}
        openDialog={openOtpDialog}
        email={email}
        handleVerify={handleOtpVerify}
      />
    </div>
  );
}