// src/app/api/devlogs/route.ts
import { sanityClient } from "@/lib/sanity.client";
import { allDevlogsQuery } from "@/lib/queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const devlogs = await sanityClient.fetch(allDevlogsQuery);
    return NextResponse.json(devlogs || []);
  } catch (error) {
    console.error("Error fetching devlogs:", error);
    return NextResponse.json([], { status: 500 });
  }
}
