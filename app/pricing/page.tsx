import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchStats } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Pricing | BayanLab',
  description: 'One-time data licenses for halal eateries, markets, masajid, and Muslim-owned business data.',
};

const checkIcon = (
  <svg className="h-4 w-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default async function PricingPage() {
  const stats = await fetchStats().catch(() => null);

  const datasets = [
    { name: 'Masajid', count: stats?.masajid_count ?? 2600, description: 'Mosques and Islamic centers' },
    { name: 'Halal Eateries', count: stats?.eateries_count ?? 950, description: 'Restaurants, cafes, food trucks' },
    { name: 'Halal Markets', count: stats?.markets_count ?? 210, description: 'Grocery stores, butchers' },
    { name: 'Businesses', count: stats?.businesses_count ?? 30, description: 'Muslim-owned businesses' },
  ];

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Simple, One-Time Pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Purchase data licenses for the datasets you need. No subscriptions, no recurring fees.
          Get 1 year of updates included.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-16">
        {/* Free Tier */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Free</CardTitle>
            <CardDescription>For exploration and evaluation</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                {checkIcon}
                <span>Aggregate statistics (counts only)</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>Coverage by region</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>Preview samples (name + city)</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>No API key required</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/docs">View Docs</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Developer Tier */}
        <Card className="flex flex-col border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Developer</CardTitle>
              <Badge>Popular</Badge>
            </div>
            <CardDescription>Single dataset access</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                {checkIcon}
                <span><strong>1 dataset</strong> of your choice</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>Full data access (all fields)</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>1 year of updates</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>API key for authentication</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/checkout?tier=developer">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Complete Tier */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Complete</CardTitle>
              <Badge variant="secondary">Best Value</Badge>
            </div>
            <CardDescription>All datasets included</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$249</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                {checkIcon}
                <span><strong>All 4 datasets</strong> included</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>Full data access (all fields)</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>1 year of updates</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>API key for authentication</span>
              </li>
              <li className="flex gap-2">
                {checkIcon}
                <span>Priority email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/checkout?tier=complete">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Available Datasets */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Available Datasets</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {datasets.map((dataset) => (
            <Card key={dataset.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{dataset.name}</CardTitle>
                <CardDescription className="text-xs">{dataset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{dataset.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">records</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="rounded-lg border bg-muted/50 p-8 max-w-3xl mx-auto mb-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
          <p className="text-muted-foreground mb-6">
            Need bulk exports, custom SLAs, or white-label solutions? Let&apos;s talk.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Why one-time pricing instead of subscriptions?</h3>
            <p className="text-sm text-muted-foreground">
              Our datasets are small but high-value. A subscription model would allow someone to download
              all data in one API call and cancel. One-time pricing ensures fair value for quality data.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What&apos;s included in &quot;1 year of updates&quot;?</h3>
            <p className="text-sm text-muted-foreground">
              Your API key remains active for 1 year after purchase. During this time, you&apos;ll
              automatically receive any new records, updates to existing records, and API improvements.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What happens after 1 year?</h3>
            <p className="text-sm text-muted-foreground">
              You keep the data you&apos;ve downloaded. To continue receiving updates, you can renew at
              a discounted rate. We&apos;ll reach out before your access expires.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I upgrade from Developer to Complete?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If you start with a single dataset and later need more, you can upgrade to Complete.
              We&apos;ll credit your original purchase toward the upgrade.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">What fields are included in full access?</h3>
            <p className="text-sm text-muted-foreground">
              Full access includes all fields: name, full address, coordinates, phone, website, hours,
              ratings, and category-specific attributes. See the{' '}
              <Link href="/docs/attributes" className="text-primary hover:underline">
                attribute reference
              </Link>{' '}
              for complete details.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
