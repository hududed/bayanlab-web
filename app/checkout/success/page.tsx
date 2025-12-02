import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Purchase Complete | BayanLab',
  description: 'Thank you for your purchase. Your API key is on its way.',
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="container py-12 max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Successful!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your purchase. Your API key is being generated.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What happens next?</CardTitle>
          <CardDescription>Your API key will be delivered shortly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <p className="font-medium">Check your email</p>
              <p className="text-sm text-muted-foreground">
                Your API key will be sent to the email address you provided during checkout.
                Check your inbox (and spam folder) within the next few minutes.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <p className="font-medium">Read the documentation</p>
              <p className="text-sm text-muted-foreground">
                Review our API documentation to understand how to authenticate and make requests.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <p className="font-medium">Start building</p>
              <p className="text-sm text-muted-foreground">
                Use your API key to access the data endpoints. Your key is valid for 1 year.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>Make your first API request</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            <code>{`curl -H "X-API-Key: YOUR_API_KEY" \\
  https://api.bayanlab.com/v1/masajid?region=CA`}</code>
          </pre>
          <p className="text-sm text-muted-foreground mt-3">
            Replace <code className="bg-muted px-1 rounded">YOUR_API_KEY</code> with the key from your email.
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1">
          <Link href="/docs">View API Documentation</Link>
        </Button>
        <Button variant="outline" asChild className="flex-1">
          <Link href="/docs/endpoints">Explore Endpoints</Link>
        </Button>
      </div>

      {/* Support */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Didn&apos;t receive your API key? Check your spam folder or{' '}
          <Link href="/contact" className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
        {session_id && (
          <p className="mt-2">
            Reference: <code className="bg-muted px-1 rounded text-xs">{session_id}</code>
          </p>
        )}
      </div>
    </div>
  );
}
