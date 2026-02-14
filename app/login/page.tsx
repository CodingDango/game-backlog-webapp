"use client";
import { FormEvent, useState } from "react";

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

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type FormSubmitEvent = FormEvent<HTMLFormElement>;

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("babyyodaman2.0@gmail.com");
  const [openOtpDialog, setOpenOtpDialog] = useState(true);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // TODO: Refactor to use useMutation
  const handleEmailLogin = async (e: FormSubmitEvent) => {
    e.preventDefault();

    setIsSendingOtp(true);

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: { shouldCreateUser: false },
    });

    setIsSendingOtp(false);

    if (!error) {
      toast.success("OTP Sent");
      setOpenOtpDialog(true);
    } else {
      toast.error(error.message);
    }
  };

  const handleOtpVerify = async (e: FormSubmitEvent) => {
    e.preventDefault();

    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email: email,
      token: otpValue,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  const handleGithubLogin = async (e: FormSubmitEvent) => {
    e.preventDefault();
    toast.info("Coming soon");
  };

  return (
    <div className="min-h-dvh flex justify-center lg:items-center py-12 px-8">
      <div className="flex flex-col gap-8 max-w-96 w-full">
        <div className="flex justify-center">
          <Card className="rounded-xl">
            <Image
              src={"/brand-icon.svg"}
              width={20}
              height={20}
              alt="brand icon"
              className="scale-250"
            />
          </Card>
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

        <form className="flex flex-col gap-4" onSubmit={handleEmailLogin}>
          <Input
            placeholder="example@gmail.com"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="py-6"
          />
          <Button className="py-6" type="submit" disabled={isSendingOtp}>
            {isSendingOtp && <Spinner />}
            Log in with Email
          </Button>
        </form>

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

        <Dialog open={openOtpDialog} onOpenChange={setOpenOtpDialog}>
          <DialogContent className="flex flex-col items-center gap-10 max-w-96!">
            <DialogHeader>
              <DialogTitle className="text-center">Verification</DialogTitle>
              <DialogDescription className="line-clamp-1 break-all">
                Enter the code sent to {email} asdklwjdlkwdjwk j
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-10" onSubmit={handleOtpVerify}>
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
      </div>
    </div>
  );
}
