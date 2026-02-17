import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";

import AppFooter from "@/components/AppFooter";
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
          <div className="px-4 md:px-8 pt-16 pb-24 flex justify-center">
            <main className="max-w-6xl w-full relative">{children}</main>
          </div>
          <AppFooter />
        </div>
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  );
}
