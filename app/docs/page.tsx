import { Metadata } from 'next';
import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';

export const metadata: Metadata = {
  title: 'API Documentation | BayanLab',
  description: 'Getting started with the BayanLab API. Access halal eateries, Muslim-owned businesses, and community events data.',
};

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-muted-foreground">
          Access trusted halal and Muslim community data through our REST API.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Base URL</h2>
        <CodeBlock code="https://api.bayanlab.com" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Authentication</h2>
        <p className="text-muted-foreground">
          Public endpoints (sample data) require no authentication. Full data access requires an API key.
        </p>
        <div className="rounded-lg border p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Endpoint Type</th>
                <th className="pb-2 text-left font-medium">Auth Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Public (sample data)</td>
                <td className="py-2">None</td>
              </tr>
              <tr>
                <td className="py-2">Full data access</td>
                <td className="py-2">
                  <code className="rounded bg-muted px-1">X-API-Key</code> header
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground">
          Need an API key? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to get access.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Example</h2>
        <p className="text-muted-foreground">
          Fetch halal eateries in Colorado:
        </p>
        <CodeBlock
          title="Request"
          code={`curl "https://api.bayanlab.com/v1/halal-eateries?region=CO"`}
        />
        <CodeBlock
          title="Response"
          language="json"
          code={`{
  "version": "1.0",
  "region": "CO",
  "count": 65,
  "items": [
    {
      "eatery_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Syrian Jasmine",
      "cuisine_style": "Syrian & Middle Eastern",
      "address": {
        "city": "Aurora",
        "state": "CO"
      },
      "google_rating": 4.8,
      "halal_status": "validated"
    }
  ]
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Rate Limits</h2>
        <p className="text-muted-foreground">
          API requests are rate limited to ensure fair usage:
        </p>
        <div className="rounded-lg border p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Tier</th>
                <th className="pb-2 text-left font-medium">Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Public (no API key)</td>
                <td className="py-2">10 requests/minute</td>
              </tr>
              <tr>
                <td className="py-2">Authenticated</td>
                <td className="py-2">100 requests/minute</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Next Steps</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/docs/endpoints"
            className="rounded-lg border p-4 hover:bg-muted/50"
          >
            <h3 className="font-medium">Endpoints Reference</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Full API endpoint documentation with parameters and examples.
            </p>
          </Link>
          <Link
            href="/docs/attributes"
            className="rounded-lg border p-4 hover:bg-muted/50"
          >
            <h3 className="font-medium">Attribute Reference</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Detailed field descriptions and data types.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
