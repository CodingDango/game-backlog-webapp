import { toast } from "sonner";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { Card } from "../ui/card";
import { AuthFormData } from "@/types/types";

import Link from "next/link";
import BrandLogo from "@/components/common/BrandLogo";
import AppButton from "@/components/common/AppButton";
import { Input } from "../ui/input";

interface AuthFormProps {
  setForm: Dispatch<SetStateAction<AuthFormData>>;
  handleSubmit: (form: AuthFormData) => void;
  form: AuthFormData;
  isSubmitting: boolean;
  headerText: string;
  spanText: string;
  redirectText: string;
  redirectHref: string;
  emailButtonText: string;
  includeUser?: boolean;
}

export default function AuthForm({
  setForm,
  handleSubmit,
  form,
  isSubmitting,
  headerText,
  spanText,
  redirectText,
  redirectHref,
  emailButtonText,
  includeUser,
}: AuthFormProps) {
  const supabase = createClient();

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
        <Card className="rounded-lg">
          <BrandLogo className="size-7" />
        </Card>
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

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(form);
        }}
      >
        {includeUser && (
          <Input
            placeholder="John Doe"
            name="username"
            type="text"
            required
            onChange={e =>
              setForm(prev => ({ ...prev, username: e.target.value }))
            }
            value={form.username}
            className="py-6"
          />
        )}

        <Input
          placeholder="example@gmail.com"
          name="email"
          type="email"
          required
          onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
          value={form.email}
          className="py-6"
        />

        <AppButton className="py-6" type="submit" isLoading={isSubmitting}>
          {emailButtonText}
        </AppButton>
      </form>

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
