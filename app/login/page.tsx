"use client";
import { FormEvent, FormEventHandler, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";

type FormSubmitEvent = FormEvent<HTMLFormElement>;

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const [isOtpVerify, setIsOtpVerify] = useState(false);

  // TODO: Refactor to use useMutation
  const handleOtpRequest = async (e: FormSubmitEvent) => {
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

    setIsOtpVerify(true);
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

    router.refresh();
    router.push("/");
  };

  const handleGithubLogin = async (e: FormSubmitEvent) => {
    e.preventDefault();
    toast.info("Coming soon");
  };

  return (
    <div className="min-h-dvh flex justify-center items-center py-12 px-8">
      <div className="flex flex-col gap-8 w-80">
        <h1 className="text-center text-3xl font-semibold">
          Log in to Backlog
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleOtpRequest}>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="py-6"
          />
          <Button className="py-6" type="submit">
            Continue with Email
          </Button>
        </form>

        <div className="h-px bg-accent"></div>

        <form className="flex w-full" onSubmit={handleGithubLogin}>
          <Button
            variant={"outline"}
            className="py-6 flex gap-4 w-full"
            type="submit"
          >
            <FaGithub className="size-6" /> Continue with GitHub
          </Button>
        </form>
      </div>

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
  );
}
