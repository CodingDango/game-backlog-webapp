import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/auth/AuthProvider";

import AppFooter from "@/components/layout/AppFooter";
import QueryProvider from "@/components/common/QueryProvider";
import AppNavbar from "@/components/layout/AppNavbar";
import { createClient } from "@/lib/supabase/client";

interface Props {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: Props) {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession();

  return (
    <QueryProvider>
      <AuthProvider providedSession={data.session}>
        <div className="w-full min-h-dvh h-full flex flex-col">
          <AppNavbar />
          <div className="px-4 md:px-8 pt-8 md:pt-16 lg:pt-20 pb-32 lg:pb-48 flex justify-center flex-1">
            <main className="max-w-6xl w-full relative">{children}</main>
          </div>
        </div>
        <AppFooter />
        <Toaster />
      </AuthProvider>
    </QueryProvider>
  );
}
