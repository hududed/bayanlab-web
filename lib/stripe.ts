import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Dataset definitions
export const DATASETS = {
  masajid: {
    id: 'masajid',
    name: 'Masajid',
    description: 'Mosques and Islamic centers',
    endpoint: '/v1/masajid',
  },
  eateries: {
    id: 'eateries',
    name: 'Halal Eateries',
    description: 'Restaurants, cafes, food trucks',
    endpoint: '/v1/halal-eateries',
  },
  markets: {
    id: 'markets',
    name: 'Halal Markets',
    description: 'Grocery stores, butchers',
    endpoint: '/v1/halal-markets',
  },
  businesses: {
    id: 'businesses',
    name: 'Businesses',
    description: 'Muslim-owned businesses',
    endpoint: '/v1/businesses',
  },
} as const;

export type DatasetId = keyof typeof DATASETS;

// Tier definitions
export const TIERS = {
  developer: {
    id: 'developer',
    name: 'Developer',
    price: 9900, // cents
    priceDisplay: '$99',
    datasetCount: 1,
  },
  complete: {
    id: 'complete',
    name: 'Complete',
    price: 24900, // cents
    priceDisplay: '$249',
    datasetCount: 4,
  },
} as const;

export type TierId = keyof typeof TIERS;
