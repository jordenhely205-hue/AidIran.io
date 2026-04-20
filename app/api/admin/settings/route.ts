import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await connectToDatabase();
  
  const defaultSettings = {
    usdtAddress: "0xPlaceholderUSDT",
    btcAddress: "bc1qPlaceholderBTC",
    ethAddress: "0xPlaceholderETH"
  };

  if (!db) return NextResponse.json({ ...defaultSettings, mode: "mock" });

  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(defaultSettings);
  }

  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await connectToDatabase();
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });

  const data = await req.json();
  const settings = await Settings.findOneAndUpdate({}, data, { upsert: true, new: true });
  return NextResponse.json(settings);
}
