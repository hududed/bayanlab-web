import { NextRequest, NextResponse } from 'next/server';
import { getStripe, DATASETS, TIERS, type TierId, type DatasetId } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tier, dataset, email } = body as {
      tier: TierId;
      dataset?: DatasetId;
      email?: string;
    };

    // Validate tier
    if (!tier || !TIERS[tier]) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be "developer" or "complete".' },
        { status: 400 }
      );
    }

    // For developer tier, dataset is required
    if (tier === 'developer') {
      if (!dataset || !DATASETS[dataset]) {
        return NextResponse.json(
          { error: 'Dataset required for developer tier.' },
          { status: 400 }
        );
      }
    }

    // Determine datasets for this purchase
    const datasets: DatasetId[] = tier === 'complete'
      ? ['masajid', 'eateries', 'markets', 'businesses']
      : [dataset as DatasetId];

    const tierInfo = TIERS[tier];
    const datasetNames = datasets.map(d => DATASETS[d].name).join(', ');

    // Create Stripe Checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `BayanLab ${tierInfo.name} License`,
              description: `Access to: ${datasetNames}. 1 year of updates included.`,
            },
            unit_amount: tierInfo.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier,
        datasets: datasets.join(','),
      },
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/cancel`,
      // Require billing address for fraud prevention
      billing_address_collection: 'required',
      // Add custom text about no refunds
      custom_text: {
        submit: {
          message: 'All sales are final. No refunds on data licenses.',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
