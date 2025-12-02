import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Payment Cancelled | BayanLab',
  description: 'Your payment was cancelled. No charges were made.',
};

export default function CheckoutCancelPage() {
  return (
    <div className="container py-12 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Cancelled</h1>
        <p className="mt-2 text-muted-foreground">
          Your payment was cancelled. No charges were made to your card.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/50 p-6 mb-8">
        <h2 className="font-semibold mb-2">Have questions?</h2>
        <p className="text-sm text-muted-foreground mb-4">
          If you have any questions about our pricing or what&apos;s included,
          we&apos;re happy to help. You can also try our free tier to explore
          the data before purchasing.
        </p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>&bull; Free tier includes stats, coverage, and preview data</li>
          <li>&bull; No API key required for free endpoints</li>
          <li>&bull; Full documentation available</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1">
          <Link href="/pricing">Back to Pricing</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href="/docs">View Documentation</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
