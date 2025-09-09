import * as React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default function QuoteCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="w-[260px]">
      <CardTitle>{title}</CardTitle>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
