import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  const db = await connectToDatabase();

  const defaultSettings = {
    usdtAddress: "0x32165498765432101234567890abcdef12345678",
    btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ethAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    targetGoal: 1000000
  };

  if (!db) {
    return NextResponse.json({ ...defaultSettings, mode: "mock" });
  }

  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return NextResponse.json({ ...defaultSettings, mode: "database-empty" });
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ ...defaultSettings, mode: "fallback" });
  }
}
