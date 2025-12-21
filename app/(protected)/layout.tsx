import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import AppNavbar from "@/components/AppNavbar";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="w-full min-h-dvh flex flex-col">
          <AppNavbar />
          <div className="px-8 py-12 flex justify-center">
            <main className="max-w-7xl w-full">{children}</main>
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  );
}
