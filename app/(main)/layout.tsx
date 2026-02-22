import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";

import AppFooter from "@/components/AppFooter";
import QueryProvider from "@/components/QueryProvider";
import AppNavbar from "@/components/AppNavbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="w-full min-h-dvh h-full flex flex-col">
          <AppNavbar />
          <div className="px-4 md:px-8 pt-16 pb-32 lg:pt-20 lg:pb-48 flex justify-center flex-1">
            <main className="max-w-6xl w-full relative">{children}</main>
          </div>
        </div>
        <AppFooter />
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  );
}
