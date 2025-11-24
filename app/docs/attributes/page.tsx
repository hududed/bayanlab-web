import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Attribute Reference | BayanLab',
  description: 'Detailed field documentation for BayanLab API data models.',
};

export default function AttributesPage() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attribute Reference</h1>
        <p className="mt-2 text-muted-foreground">
          Detailed field descriptions for all data models.
        </p>
      </div>

      {/* Eatery Attributes */}
      <section id="eatery" className="space-y-6 scroll-mt-20">
        <h2 className="text-xl font-semibold">Halal Eatery</h2>
        <p className="text-muted-foreground">
          Fields returned by the <code className="rounded bg-muted px-1">/v1/halal-eateries</code> endpoint.
        </p>

        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Attribute</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Required</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code>eatery_id</code></td>
                <td className="p-3">UUID</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Unique identifier</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>name</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Business name</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>cuisine_style</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Type of cuisine (e.g., &quot;Pakistani&quot;, &quot;Mediterranean&quot;)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.street</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Street address</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.city</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">City name</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.state</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">State code (e.g., &quot;CO&quot;)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.zip_code</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">ZIP code</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>latitude</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">GPS latitude (-90 to 90)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>longitude</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">GPS longitude (-180 to 180)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>phone</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Contact phone number</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>website</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Website URL</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>hours_raw</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Operating hours (unparsed)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>google_rating</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">Google Maps rating (1.0-5.0)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>halal_status</code></td>
                <td className="p-3">enum</td>
                <td className="p-3">Yes</td>
                <td className="p-3">See values below</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>is_favorite</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Community favorite flag</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>is_food_truck</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Mobile vendor flag</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>is_carry_out_only</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">No dine-in flag</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>is_cafe_bakery</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Cafe/bakery flag</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>has_many_locations</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Chain restaurant flag</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>source</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Data source (colorado_halal, zabihah, osm)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>google_place_id</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Google Places ID for deduplication</td>
              </tr>
              <tr>
                <td className="p-3"><code>updated_at</code></td>
                <td className="p-3">ISO8601</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Last update timestamp</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Halal Status Values</h3>
          <div className="rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Value</th>
                  <th className="p-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3"><code>validated</code></td>
                  <td className="p-3">Confirmed halal by community directory or certifier</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3"><code>likely_halal</code></td>
                  <td className="p-3">AI-identified as likely halal, not yet confirmed</td>
                </tr>
                <tr>
                  <td className="p-3"><code>unverified</code></td>
                  <td className="p-3">Listed but halal status not verified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Market Attributes */}
      <section id="market" className="space-y-6 scroll-mt-20">
        <h2 className="text-xl font-semibold">Halal Market</h2>
        <p className="text-muted-foreground">
          Fields returned by the <code className="rounded bg-muted px-1">/v1/halal-markets</code> endpoint.
        </p>

        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Attribute</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Required</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code>market_id</code></td>
                <td className="p-3">UUID</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Unique identifier</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>name</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Business name</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>category</code></td>
                <td className="p-3">enum</td>
                <td className="p-3">No</td>
                <td className="p-3">Market type: grocery, butcher, wholesale</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.street</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Street address</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.city</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">City name</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.state</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">State code (e.g., &quot;CO&quot;)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.zip_code</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">ZIP code</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>latitude</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">GPS latitude</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>longitude</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">GPS longitude</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>phone</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Contact phone (full access only)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>website</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Website URL (full access only)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>hours_raw</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Operating hours (full access only)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>google_rating</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">Google Maps rating (1.0-5.0)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>halal_status</code></td>
                <td className="p-3">enum</td>
                <td className="p-3">Yes</td>
                <td className="p-3">validated, likely_halal, or unverified</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>has_butcher</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">In-house butcher counter</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>has_deli</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Prepared foods/deli counter</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>sells_turkey</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Sells halal turkey (seasonal)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>source</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Data source</td>
              </tr>
              <tr>
                <td className="p-3"><code>updated_at</code></td>
                <td className="p-3">ISO8601</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Last update timestamp</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Business Attributes */}
      <section id="business" className="space-y-6 scroll-mt-20">
        <h2 className="text-xl font-semibold">Muslim-Owned Business</h2>
        <p className="text-muted-foreground">
          Fields returned by the <code className="rounded bg-muted px-1">/v1/businesses</code> endpoint.
        </p>

        <div className="rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Attribute</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Required</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3"><code>business_id</code></td>
                <td className="p-3">UUID</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Unique identifier</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>name</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Business name</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>category</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Industry category</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>description</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Business description</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.street</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Street address</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.city</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">City name</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.state</code></td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">State code (e.g., &quot;CO&quot;)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>address.zip_code</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">ZIP code</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>latitude</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">GPS latitude</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>longitude</code></td>
                <td className="p-3">decimal</td>
                <td className="p-3">No</td>
                <td className="p-3">GPS longitude</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>phone</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Contact phone (full access only)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>whatsapp</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">WhatsApp number (full access only)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>website</code></td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">Website URL (full access only)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3"><code>muslim_owned</code></td>
                <td className="p-3">boolean</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Muslim ownership flag</td>
              </tr>
              <tr>
                <td className="p-3"><code>updated_at</code></td>
                <td className="p-3">ISO8601</td>
                <td className="p-3">Yes</td>
                <td className="p-3">Last update timestamp</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-8">
        <Link href="/docs/endpoints" className="text-sm text-muted-foreground hover:text-foreground">
          &larr; Endpoints
        </Link>
        <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
          Get API Access &rarr;
        </Link>
      </div>
    </div>
  );
}
