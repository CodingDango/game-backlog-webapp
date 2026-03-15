"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function AuthFormLayout({ children }: Props) {
  return (
    <div>
      <Toaster />
      <div className="min-h-dvh flex justify-center sm:items-center pt-32 sm:pb-24 sm:pt-12 px-4 sm:px-8 relative">
        <div className="absolute top-12 left-2 sm:left-8">
          <Button variant={"ghost"} className="text-muted-foreground" asChild>
            <Link href="/">
              <ChevronLeft />
              Home
            </Link>
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
