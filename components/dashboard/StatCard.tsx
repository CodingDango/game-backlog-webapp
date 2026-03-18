import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface StatCardProps {
  title: string;
  value: number;
  Icon: React.ComponentType<{ className?: string }>;
}

export default function StatCard({ title, value, Icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between gap-4">
        <CardTitle>{title}</CardTitle>
        <span className="text-muted-foreground"><Icon/></span>
      </CardHeader>
      <div className="text-3xl sm:text-4xl font-semibold">{value}</div>
    </Card>
  );
}
