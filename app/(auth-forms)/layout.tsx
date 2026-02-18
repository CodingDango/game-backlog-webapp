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
      <div className="min-h-dvh flex justify-center items-center pb-24 pt-12 px-8 relative">
        <div className="absolute top-6 left-8 ">
          <Button variant={"ghost"} className="text-muted-foreground" asChild>
            <Link href="/">
              <ChevronLeft />
              Home
            </Link>
          </Button>
        </div>
        <div className="max-w-100 w-full">{children}</div>
      </div>
    </div>
  );
}
