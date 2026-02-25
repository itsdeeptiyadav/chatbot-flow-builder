import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  console.log("Flow saved:", body);

  return NextResponse.json({ success: true });
}