'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const DATASETS = [
  { id: 'masajid', name: 'Masajid', description: 'Mosques and Islamic centers' },
  { id: 'eateries', name: 'Halal Eateries', description: 'Restaurants, cafes, food trucks' },
  { id: 'markets', name: 'Halal Markets', description: 'Grocery stores, butchers' },
  { id: 'businesses', name: 'Businesses', description: 'Muslim-owned businesses' },
  { id: 'events', name: 'Masjid Events', description: 'Community calendar events' },
];

const TIERS = {
  developer: { name: 'Developer', price: '$99', datasetCount: 1 },
  complete: { name: 'Complete', price: '$249', datasetCount: 5 },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const tier = (searchParams.get('tier') as 'developer' | 'complete') || 'developer';

  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tierInfo = TIERS[tier] || TIERS.developer;
  const isComplete = tier === 'complete';

  const handleCheckout = async () => {
    // Validate
    if (!isComplete && !selectedDataset) {
      setError('Please select a dataset');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          dataset: isComplete ? undefined : selectedDataset,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/pricing" className="hover:underline">Pricing</Link>
          <span>/</span>
          <span>Checkout</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {tierInfo.name} License
        </h1>
        <p className="mt-2 text-muted-foreground">
          {tierInfo.price} one-time payment &middot; 1 year of updates included
        </p>
      </div>

      {/* Dataset Selection (Developer tier only) */}
      {!isComplete && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Select Your Dataset</h2>
          <div className="grid gap-3">
            {DATASETS.map((dataset) => (
              <Card
                key={dataset.id}
                className={`cursor-pointer transition-colors ${
                  selectedDataset === dataset.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-muted-foreground/50'
                }`}
                onClick={() => setSelectedDataset(dataset.id)}
              >
                <CardHeader className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedDataset === dataset.id
                          ? 'border-primary'
                          : 'border-muted-foreground/50'
                      }`}
                    >
                      {selectedDataset === dataset.id && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">{dataset.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {dataset.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Complete tier summary */}
      {isComplete && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Included Datasets</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {DATASETS.map((dataset) => (
                  <li key={dataset.id} className="flex items-center gap-2 text-sm">
                    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">{dataset.name}</span>
                    <span className="text-muted-foreground">- {dataset.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Email input */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Your Email</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Your API key will be sent to this email address.
        </p>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="max-w-md"
        />
      </section>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Checkout button */}
      <div className="space-y-4">
        <Button
          size="lg"
          className="w-full"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Continue to Payment (${tierInfo.price})`}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          All sales are final. No refunds on data licenses.
          <br />
          By purchasing, you agree to our terms of service.
        </p>
      </div>

      {/* Switch tier */}
      <div className="mt-8 text-center">
        {isComplete ? (
          <Link href="/checkout?tier=developer" className="text-sm text-muted-foreground hover:text-foreground">
            Need just one dataset? Switch to Developer ($99)
          </Link>
        ) : (
          <Link href="/checkout?tier=complete" className="text-sm text-muted-foreground hover:text-foreground">
            Need all datasets? Upgrade to Complete ($249)
          </Link>
        )}
      </div>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="container py-12 max-w-2xl">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-32 bg-muted rounded"></div>
        <div className="h-32 bg-muted rounded"></div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutForm />
    </Suspense>
  );
}
