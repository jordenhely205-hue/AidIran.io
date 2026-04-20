import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Donation from "@/models/Donation";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await connectToDatabase();
  
  const seedTotal = 1200000;
  const seedDonors = 15000;

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
    
    const finalTotal = (totalRaised[0]?.total || 0) + seedTotal;
    const finalDonors = donorCount + seedDonors;

    const recentDonations = await Donation.find({ status: "completed" })
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({
      totalRaised: finalTotal,
      donorCount: finalDonors,
      recentDonations
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
