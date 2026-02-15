import { ChangeEvent, FormEvent } from "react";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import AppButton from "./AppButton";

interface AuthEmailFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  emailButtonText: string;
  email: string;
}

export default function AuthEmailForm({
  onSubmit,
  onEmailChange,
  email,
  isSubmitting,
  emailButtonText,
}: AuthEmailFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <Input
        placeholder="example@gmail.com"
        name="email"
        type="email"
        required
        onChange={onEmailChange}
        value={email}
        className="py-6"
      />
      <AppButton className="py-6" type="submit" isLoading={isSubmitting}>
        {emailButtonText}
      </AppButton>
    </form>
  );
}
