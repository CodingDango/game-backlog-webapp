import { Toaster } from "@/components/ui/sonner";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <Toaster />
      <div className="min-h-dvh flex justify-center lg:items-center py-12 px-8">
        <div className="max-w-100 w-full">{children}</div>
      </div>
    </div>
  );
}
