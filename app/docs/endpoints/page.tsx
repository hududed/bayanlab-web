import { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'API Endpoints | BayanLab',
  description: 'Complete API endpoint reference for BayanLab halal eateries, businesses, and events.',
};

export default function EndpointsPage() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Endpoints</h1>
        <p className="mt-2 text-muted-foreground">
          Complete reference for all available API endpoints.
        </p>
      </div>

      {/* Halal Eateries */}
      <section id="halal-eateries" className="space-y-6 scroll-mt-20">
        <div className="flex items-center gap-3">
          <Badge>GET</Badge>
          <h2 className="text-xl font-semibold">/v1/halal-eateries</h2>
        </div>
        <p className="text-muted-foreground">
          Returns halal restaurants, cafes, and food trucks for a given region.
        </p>

        <div className="space-y-4">
          <h3 className="font-medium">Parameters</h3>
          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code>region</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">State code (default: &quot;CO&quot;)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>city</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Filter by city name</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>cuisine</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Filter by cuisine style</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>halal_status</code></td>
                  <td className="p-3">string</td>
                  <td className="p-3">Filter by status: validated, likely_halal, unverified</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>favorites_only</code></td>
                  <td className="p-3">boolean</td>
                  <td className="p-3">Return only community favorites</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>limit</code></td>
                  <td className="p-3">integer</td>
                  <td className="p-3">Max results (1-500, default: 100)</td>
                </tr>
                <tr>
                  <td className="p-3"><code>offset</code></td>
                  <td className="p-3">integer</td>
                  <td className="p-3">Pagination offset</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Example</h3>
          <CodeBlock
            title="Request"
            code={`curl "https://api.bayanlab.com/v1/halal-eateries?region=CO&city=Denver&limit=10"`}
          />
          <CodeBlock
            title="Response"
            language="json"
            code={`{
  "version": "1.0",
  "region": "CO",
  "count": 15,
  "items": [
    {
      "eatery_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Afghan Kabob",
      "cuisine_style": "Afghan",
      "address": {
        "street": "2245 S Colorado Blvd",
        "city": "Denver",
        "state": "CO",
        "zip_code": "80222"
      },
      "phone": "(303) 759-2227",
      "google_rating": 4.6,
      "halal_status": "validated",
      "is_favorite": true,
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}`}
          />
        </div>
      </section>

      {/* Businesses */}
      <section id="businesses" className="space-y-6 scroll-mt-20">
        <div className="flex items-center gap-3">
          <Badge>GET</Badge>
          <h2 className="text-xl font-semibold">/v1/businesses/sync</h2>
          <Badge variant="secondary">API Key Required</Badge>
        </div>
        <p className="text-muted-foreground">
          Returns Muslim-owned businesses from the ProWasl directory.
        </p>

        <div className="space-y-4">
          <h3 className="font-medium">Parameters</h3>
          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Type</th>
                  <th className="p-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code>limit</code></td>
                  <td className="p-3">integer</td>
                  <td className="p-3">Max results (default: 100)</td>
                </tr>
                <tr>
                  <td className="p-3"><code>offset</code></td>
                  <td className="p-3">integer</td>
                  <td className="p-3">Pagination offset</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Example</h3>
          <CodeBlock
            title="Request"
            code={`curl -H "X-API-Key: your_api_key" \\
  "https://api.bayanlab.com/v1/businesses/sync"`}
          />
          <CodeBlock
            title="Response"
            language="json"
            code={`{
  "businesses": [
    {
      "business_id": "123e4567-e89b-12d3-a456-426614174000",
      "business_name": "Halal Mart",
      "business_industry": "Grocery",
      "business_city": "Denver",
      "business_state": "CO",
      "muslim_owned": true,
      "status": "approved"
    }
  ],
  "pagination": {
    "total": 7,
    "limit": 100,
    "offset": 0,
    "has_more": false
  }
}`}
          />
        </div>
      </section>

      {/* Events */}
      <section id="events" className="space-y-6 scroll-mt-20">
        <div className="flex items-center gap-3">
          <Badge>GET</Badge>
          <h2 className="text-xl font-semibold">/v1/events</h2>
          <Badge variant="outline">Coming Soon</Badge>
        </div>
        <p className="text-muted-foreground">
          Community events from masjid calendars and Islamic organizations.
        </p>
        <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
          <p>This endpoint is under development.</p>
          <p className="mt-1 text-sm">
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{' '}
            if you&apos;re interested in events data.
          </p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-8">
        <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Getting Started
        </Link>
        <Link href="/docs/attributes" className="text-sm text-muted-foreground hover:text-foreground">
          Attributes &rarr;
        </Link>
      </div>
    </div>
  );
}
