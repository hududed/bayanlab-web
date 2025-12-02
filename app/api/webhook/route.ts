import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendPurchaseEmail } from '@/lib/email';
import Stripe from 'stripe';
import crypto from 'crypto';

// Disable body parsing - we need raw body for webhook verification
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('Checkout session completed:', {
        id: session.id,
        email: session.customer_email,
        metadata: session.metadata,
        amount: session.amount_total,
      });

      // Extract metadata
      const tier = session.metadata?.tier;
      const datasets = session.metadata?.datasets?.split(',') || [];
      const email = session.customer_email;

      if (!tier || !email || datasets.length === 0) {
        console.error('Missing required metadata in checkout session');
        break;
      }

      // TODO: Call BayanLab API to generate API key
      // For now, generate a placeholder key locally
      // In production, this would call:
      // POST https://api.bayanlab.com/internal/api-keys
      // {
      //   email,
      //   tier,
      //   datasets,
      //   stripe_session_id: session.id,
      //   stripe_customer_id: session.customer,
      // }

      // Generate a temporary API key (replace with backend call in production)
      const apiKey = `bl_${tier}_${crypto.randomBytes(24).toString('hex')}`;

      console.log('Purchase completed - API key generated:', {
        email,
        tier,
        datasets,
        apiKey: apiKey.slice(0, 20) + '...', // Log partial key only
        stripeSessionId: session.id,
        stripeCustomerId: session.customer,
      });

      // Send welcome email with API key
      try {
        await sendPurchaseEmail({
          to: email,
          tier,
          datasets,
          apiKey,
        });
      } catch (emailError) {
        console.error('Failed to send purchase email:', emailError);
        // Don't fail the webhook - the purchase still succeeded
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
