import { NextResponse } from "next/server";
import Stripe from "stripe";

// Safe wrapper to prevent crash if key is missing during build/early setup
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16" as any, 
    })
  : null;

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured in .env.local yet." }, { status: 500 });
  }

  try {
    const { amount, currency, isAnonymous, campaignId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: "AidIran.io Relief Donation",
              description: campaignId ? `Directed to: ${campaignId}` : "General Emergency Support",
            },
            unit_amount: amount * 100, // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/campaigns/${campaignId || "general"}?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/campaigns/${campaignId || "general"}?canceled=true`,
      metadata: {
        isAnonymous: String(isAnonymous),
        campaignId: campaignId || "General",
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error Object:", JSON.stringify(err, null, 2));
    
    // Explicitly extract the error message for the frontend
    const errorMessage = err.message || "Failed to initialize payment session.";
    const errorType = err.type || "StripeError";
    const statusCode = err.statusCode || 500;

    return NextResponse.json(
      { 
        error: errorMessage, 
        type: errorType,
        source: "backend" 
      }, 
      { status: statusCode }
    );
  }
}
