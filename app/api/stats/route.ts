import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function GET() {
  const db = await connectToDatabase();

  // Baseline/Seed data for disconnected/mock mode
  const seedTotal = 850400;
  const seedDonors = 15402;

  if (!db) {
    return NextResponse.json({
      totalRaised: seedTotal,
      donorCount: seedDonors,
      recentDonations: [],
      mode: "mock"
    });
  }

  try {
    const totalRaised = await Donation.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const donorCount = await Donation.countDocuments({ status: "completed" });
    
    const recentDonations = await Donation.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({
      totalRaised: (totalRaised[0]?.total || 0) + seedTotal,
      donorCount: donorCount + seedDonors,
      recentDonations,
      mode: "database"
    });
  } catch (error) {
    return NextResponse.json({
      totalRaised: seedTotal,
      donorCount: seedDonors,
      recentDonations: [],
      mode: "fallback"
    });
  }
}
