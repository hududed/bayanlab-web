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

      {/* Public Endpoints Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Public Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints are free to use and don&apos;t require an API key. Rate limited to 10 requests/minute.
          </p>
        </div>

        {/* Stats */}
        <div id="stats" className="space-y-6 scroll-mt-20 pl-4 border-l-2 border-muted">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">GET</Badge>
            <h3 className="text-lg font-semibold">/v1/stats</h3>
            <Badge variant="outline">Public</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns aggregate counts for all data categories across all regions.
          </p>
          <div className="space-y-4">
            <CodeBlock
              title="Request"
              code={`curl "https://api.bayanlab.com/v1/stats"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "masajid_count": 2626,
  "eateries_count": 2328,
  "markets_count": 225,
  "businesses_count": 1989,
  "events_count": 10647,
  "total_listings": 7168
}`}
            />
          </div>
        </div>

        {/* Coverage */}
        <div id="coverage" className="space-y-6 scroll-mt-20 pl-4 border-l-2 border-muted">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">GET</Badge>
            <h3 className="text-lg font-semibold">/v1/coverage</h3>
            <Badge variant="outline">Public</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns list of regions with per-region counts for each data category.
          </p>
          <div className="space-y-4">
            <CodeBlock
              title="Request"
              code={`curl "https://api.bayanlab.com/v1/coverage"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "regions": ["NY", "CA", "TX", "NJ", "PA", "FL", ...],
  "counts_by_region": {
    "NY": { "masajid": 375, "eateries": 124, "markets": 20, "businesses": 2 },
    "CA": { "masajid": 255, "eateries": 111, "markets": 23, "businesses": 0 },
    "TX": { "masajid": 225, "eateries": 111, "markets": 14, "businesses": 0 },
    ...
  }
}`}
            />
          </div>
        </div>

        {/* Preview */}
        <div id="preview" className="space-y-6 scroll-mt-20 pl-4 border-l-2 border-muted">
          <div className="flex items-center gap-3">
            <Badge variant="secondary">GET</Badge>
            <h3 className="text-lg font-semibold">/v1/preview</h3>
            <Badge variant="outline">Public</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns sample listings for a region. Only includes name and city (no contact info).
          </p>
          <div className="space-y-4">
            <h4 className="font-medium">Parameters</h4>
            <div className="rounded-lg border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">Name</th>
                    <th className="p-3 text-left font-medium">Type</th>
                    <th className="p-3 text-left font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3"><code>region</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">State code (required)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4">
            <CodeBlock
              title="Request"
              code={`curl "https://api.bayanlab.com/v1/preview?region=CO"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "region": "CO",
  "total_in_region": 168,
  "sample_size": 20,
  "samples": {
    "masajid": [
      { "name": "Al Mustafa Islamic Center", "city": "Aurora", "state": "CO", "category": "masjid" },
      ...
    ],
    "eateries": [
      { "name": "Afghan Cheesesteak Gyros", "city": "Thornton", "state": "CO", "category": "eatery" },
      ...
    ],
    "markets": [...],
    "businesses": [...]
  },
  "message": "Showing 20 of 168 listings. Get full data with API access."
}`}
            />
          </div>
        </div>
      </section>

      {/* Authenticated Endpoints Section */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Data Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints require an API key. Include <code className="text-xs bg-muted px-1 py-0.5 rounded">X-API-Key</code> header with your request.
          </p>
        </div>

        {/* Halal Eateries */}
        <section id="halal-eateries" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3">
            <Badge>GET</Badge>
            <h3 className="text-xl font-semibold">/v1/halal-eateries</h3>
            <Badge variant="destructive">API Key Required</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns halal restaurants, cafes, and food trucks for a given region.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium">Parameters</h4>
            <div className="rounded-lg border overflow-x-auto">
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
            <h4 className="font-medium">Example</h4>
            <CodeBlock
              title="Request"
              code={`curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.bayanlab.com/v1/halal-eateries?region=CO&city=Denver&limit=10"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "region": "CO",
  "access_tier": "full",
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

        {/* Halal Markets */}
        <section id="halal-markets" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3">
            <Badge>GET</Badge>
            <h3 className="text-xl font-semibold">/v1/halal-markets</h3>
            <Badge variant="destructive">API Key Required</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns halal grocery stores, butchers, and meat shops for a given region.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium">Parameters</h4>
            <div className="rounded-lg border overflow-x-auto">
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
                    <td className="p-3"><code>halal_status</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">Filter by status: validated, likely_halal, unverified</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>limit</code></td>
                    <td className="p-3">integer</td>
                    <td className="p-3">Max results (default: 100, max: 500)</td>
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
            <h4 className="font-medium">Example</h4>
            <CodeBlock
              title="Request"
              code={`curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.bayanlab.com/v1/halal-markets?region=CO"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "region": "CO",
  "access_tier": "full",
  "items": [
    {
      "market_id": "9312fb0a-2710-4b58-b4f4-8366ba262072",
      "name": "Fresh Market Community Kitchen",
      "category": "grocery",
      "address": {
        "street": "1500 West Littleton Boulevard",
        "city": "Littleton",
        "state": "CO",
        "zip_code": "80120"
      },
      "google_rating": 5.0,
      "halal_status": "validated",
      "has_butcher": false,
      "has_deli": false,
      "sells_turkey": true,
      "updated_at": "2025-11-23T00:06:12Z"
    }
  ]
}`}
            />
          </div>
        </section>

        {/* Masajid */}
        <section id="masajid" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3">
            <Badge>GET</Badge>
            <h3 className="text-xl font-semibold">/v1/masajid</h3>
            <Badge variant="destructive">API Key Required</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns mosques and Islamic centers for a given region.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium">Parameters</h4>
            <div className="rounded-lg border overflow-x-auto">
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
                    <td className="p-3"><code>limit</code></td>
                    <td className="p-3">integer</td>
                    <td className="p-3">Max results (default: 100, max: 500)</td>
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
            <h4 className="font-medium">Example</h4>
            <CodeBlock
              title="Request"
              code={`curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.bayanlab.com/v1/masajid?region=CO"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "region": "CO",
  "access_tier": "full",
  "items": [
    {
      "masjid_id": "701a1a4f-b33d-48f0-9fe7-3c2206081827",
      "name": "Colorado Islamic Center (Masjid Al-Salaam)",
      "address": {
        "street": "14201 East Evans Drive",
        "city": "Aurora",
        "state": "CO",
        "zip_code": "80013"
      },
      "languages": "English;Arabic",
      "has_womens_section": true,
      "has_parking": true,
      "offers_jumah": true,
      "offers_daily_prayers": true,
      "offers_quran_classes": true,
      "verification_status": "verified",
      "updated_at": "2025-11-23T22:13:58Z"
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
            <h3 className="text-xl font-semibold">/v1/businesses</h3>
            <Badge variant="destructive">API Key Required</Badge>
          </div>
          <p className="text-muted-foreground">
            Returns Muslim-owned businesses from the nationwide directory.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium">Parameters</h4>
            <div className="rounded-lg border overflow-x-auto">
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
                    <td className="p-3"><code>state</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">State code (e.g., &quot;CO&quot;, &quot;TX&quot;). Omit for all states.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>city</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">Filter by city name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>category</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">Filter by business category</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>limit</code></td>
                    <td className="p-3">integer</td>
                    <td className="p-3">Max results (default: 100, max: 500)</td>
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
            <h4 className="font-medium">Example</h4>
            <CodeBlock
              title="Request"
              code={`curl -H "X-API-Key: YOUR_API_KEY" \\
  "https://api.bayanlab.com/v1/businesses?state=TX&limit=10"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "total": 1472,
  "limit": 10,
  "offset": 0,
  "items": [
    {
      "business_id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "Example Business",
      "category": "service",
      "address": {
        "street": "123 Main St",
        "city": "Houston",
        "state": "TX",
        "zip_code": "77001"
      },
      "source": "community_sourced",
      "muslim_owned": true,
      "updated_at": "2024-11-19T04:21:44Z"
    }
  ]
}`}
            />
          </div>
        </section>

        {/* Events */}
        <section id="events" className="space-y-6 scroll-mt-20">
          <div className="flex items-center gap-3">
            <Badge>GET</Badge>
            <h3 className="text-xl font-semibold">/v1/events</h3>
            <Badge variant="destructive">API Key Required</Badge>
          </div>
          <p className="text-muted-foreground">
            Community events from masjid calendars and Islamic organizations.
          </p>

          <div className="space-y-4">
            <h4 className="font-medium">Parameters</h4>
            <div className="rounded-lg border overflow-x-auto">
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
                    <td className="p-3"><code>updated_since</code></td>
                    <td className="p-3">string</td>
                    <td className="p-3">ISO8601 datetime to filter events updated after</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3"><code>limit</code></td>
                    <td className="p-3">integer</td>
                    <td className="p-3">Max results (default: 100, max: 1000)</td>
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
            <h4 className="font-medium">Example</h4>
            <CodeBlock
              title="Request"
              code={`curl "https://api.bayanlab.com/v1/events?region=IL&limit=10"`}
            />
            <CodeBlock
              title="Response"
              language="json"
              code={`{
  "version": "1.0",
  "region": "IL",
  "items": [
    {
      "event_id": "001a7953-4766-4f75-8c36-5828f57b81e0",
      "title": "Monthly Family Event",
      "description": null,
      "start_time": "2025-01-18T18:15:00.000Z",
      "end_time": "2025-01-18T23:15:00.000Z",
      "all_day": false,
      "venue": {
        "name": "Islamic Center of Naperville",
        "address": {
          "street": "2844 W Ogden Ave",
          "city": "Naperville",
          "state": "IL",
          "zip": "60540"
        },
        "latitude": 41.7539,
        "longitude": -88.20183
      },
      "organizer": {
        "name": null,
        "contact": null
      },
      "source": "masjid_calendar",
      "region": "IL",
      "updated_at": "2025-12-27T17:32:24.874Z"
    }
  ]
}`}
            />
          </div>
        </section>
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
