// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { createClient } from "@sanity/client";

// // Initialize Stripe with your secret key
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-01-27.acacia",
// });

// // Initialize Sanity Client
// const client = createClient({
//   projectId: process.env.SANITY_PROJECT_ID!,
//   dataset: process.env.SANITY_DATASET!,
//   apiVersion: process.env.SANITY_API_VERSION!, // e.g. "2023-01-01"
//   token: process.env.SANITY_TOKEN,
//   useCdn: false,
// });

// export async function POST(req: NextRequest) {
//   // Retrieve the Stripe signature from headers
//   const sig = req.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;
//   try {
//     // Read the raw body as text
//     const body = await req.text();
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err: any) {
//     console.error("Webhook signature verification failed.", err);
//     return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   // Handle the event you care about – for example, payment succeeded
//   if (event.type === "payment_intent.succeeded") {
//     const paymentIntent = event.data.object as Stripe.PaymentIntent;

//     // Prepare transaction data to store in Sanity
//     const transactionData = {
//       _type: "stripeTransaction",
//       transactionId: paymentIntent.id,
//       // If you stored customer email in metadata, you could use:
//       customerEmail: paymentIntent.metadata.customer_email || "unknown@example.com",
//       amount: paymentIntent.amount / 100, // Convert cents to dollars if needed
//       currency: paymentIntent.currency.toUpperCase(),
//       status: paymentIntent.status,
//       createdAt: new Date(paymentIntent.created * 1000).toISOString(),
//     };

//     try {
//       await client.create(transactionData);
//       console.log("Transaction stored in Sanity:", transactionData);
//     } catch (error) {
//       console.error("Error storing transaction in Sanity:", error);
//       return new NextResponse("Error storing transaction", { status: 500 });
//     }
//   }

//   // Return a response to Stripe to acknowledge receipt
//   return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
// }


// app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@sanity/client";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia", // Ensure this is a valid version
});

// Initialize Sanity Client using createClient
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!, // e.g., "2023-01-01"
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Prepare transaction data to store in Sanity
    const transactionData = {
      _type: "stripeTransaction",
      transactionId: paymentIntent.id,
      customerEmail: paymentIntent.metadata.customer_email || "unknown@example.com",
      amount: paymentIntent.amount / 100, // converting cents to dollars if needed
      currency: paymentIntent.currency.toUpperCase(),
      status: paymentIntent.status,
      createdAt: new Date(paymentIntent.created * 1000).toISOString(),
    };

    try {
      await client.create(transactionData);
      console.log("Transaction stored in Sanity:", transactionData);
    } catch (error) {
      console.error("Error storing transaction in Sanity:", error);
      return new NextResponse("Error storing transaction", { status: 500 });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
