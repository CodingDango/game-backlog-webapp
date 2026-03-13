"use client";

import StatCard from "@/components/dashboard/StatCard";
import UserChart from "@/components/dashboard/UserChart";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Gamepad2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { user_id } = useParams<{ user_id: string }>();

  return (
    <div className="flex flex-col gap-12">
      <header className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-semibold">Username</h1>
          <p className="text-muted-foreground">Joined on Dec 22, 2015</p>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Games" value="24" Icon={Gamepad2} />
        <StatCard title="Currently Playing" value="2" Icon={Gamepad2} />
        <StatCard title="Completed Games" value="16" Icon={Gamepad2} />
        <StatCard title="Played Games" value="6" Icon={Gamepad2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-3">
          <UserChart/>
        </div>
      </div>
    </div>
  );
}
