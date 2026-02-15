import { ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

interface AuthEmailFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  isSubmitting: boolean;
}

export default function AuthEmailForm({
  onSubmit,
  onEmailChange,
  email,
  isSubmitting,
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
      <Button className="py-6" type="submit" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        Log in with Email
      </Button>
    </form>
  );
}