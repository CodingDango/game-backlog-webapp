import { toast } from "sonner";
import { FormEvent, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import AuthEmailForm from "@/components/AuthEmailForm";
import AppButton from "@/components/AppButton";
interface AuthFormProps {
  setEmail: (email: string) => void;
  handleEmailSubmit: (email: string) => void;
  isEmailSubmitting: boolean;
  email: string;
  headerText: string;
  spanText: string;
  redirectText: string;
  redirectHref: string;
  emailButtonText: string;
}

export default function AuthForm({
  setEmail,
  handleEmailSubmit,
  email,
  isEmailSubmitting,
  headerText,
  spanText,
  redirectText,
  redirectHref,
  emailButtonText,
}: AuthFormProps) {
  const supabase = createClient();
  const router = useRouter();

  const [githubLoading, setGithubLoading] = useState(false);

  const handleGithubLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGithubLoading(true);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    setGithubLoading(false);

    if (error) {
      toast.error(`Could not sign in through github: ${error}`);
    }
  };

  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex justify-center">
        <BrandLogo />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-center text-3xl font-semibold">{headerText}</h1>
        <span className="text-sm text-muted-foreground">
          {spanText}{" "}
          <Link href={redirectHref} className="text-foreground font-semibold">
            {redirectText}
          </Link>
        </span>
      </div>

      <AuthEmailForm
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailSubmit(email);
        }}
        onEmailChange={(e) => setEmail(e.target.value)}
        isSubmitting={isEmailSubmitting}
        email={email}
        emailButtonText={emailButtonText}
      />

      <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 place-items-center">
        <div className="h-px bg-accent w-full"></div>
        <div className="text-sm text-muted-foreground">or</div>
        <div className="h-px bg-accent w-full"></div>
      </div>

      <form className="flex w-full" onSubmit={handleGithubLogin}>
        <AppButton
          variant={"outline"}
          className="py-6 flex gap-4 w-full"
          type="submit"
          isLoading={githubLoading}
        >
          <FaGithub className="size-6" /> Continue with GitHub
        </AppButton>
      </form>
    </div>
  );
}
