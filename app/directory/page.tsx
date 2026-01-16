import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { fetchStats, fetchCoverage } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Directory | BayanLab',
  description: 'Browse halal eateries, markets, masajid, and Muslim-owned businesses across the United States.',
};

// Revalidate every 5 minutes (ISR)
export const revalidate = 300;

// State code to full name mapping
const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia',
};

// Regions to exclude (not US states)
const EXCLUDED_REGIONS = ['UK', 'KZ', 'ON', 'US'];

export default async function DirectoryPage() {
  // Fetch stats and coverage from public endpoints
  const [stats, coverage] = await Promise.all([
    fetchStats().catch(() => null),
    fetchCoverage().catch(() => null),
  ]);

  // Build state list from coverage data, sorted by total listings
  const states = coverage
    ? Object.entries(coverage.counts_by_region)
        .filter(([code]) => !EXCLUDED_REGIONS.includes(code) && STATE_NAMES[code])
        .map(([code, counts]) => ({
          code,
          name: STATE_NAMES[code],
          total: counts.masajid + counts.eateries + counts.markets + counts.businesses,
          ...counts,
        }))
        .sort((a, b) => b.total - a.total)
    : [];

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Business Directory
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {(stats?.total_listings ?? 0).toLocaleString()} listings across the United States
        </p>
      </div>

      {/* Data Categories */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <Image src="/eateries_icon.svg" alt="" width={56} height={56} className="h-14 w-14 mb-2" />
              <CardTitle className="text-lg">Halal Eateries</CardTitle>
              <CardDescription>Restaurants, cafes, food trucks</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{(stats?.eateries_count ?? 0).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Image src="/markets_icon.svg" alt="" width={56} height={56} className="h-14 w-14 mb-2" />
              <CardTitle className="text-lg">Halal Markets</CardTitle>
              <CardDescription>Grocery stores, butchers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{(stats?.markets_count ?? 0).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Image src="/masajid_icon.svg" alt="" width={56} height={56} className="h-14 w-14 mb-2" />
              <CardTitle className="text-lg">Masajid</CardTitle>
              <CardDescription>Mosques, Islamic centers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{(stats?.masajid_count ?? 0).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Image src="/businesses_icon.svg" alt="" width={56} height={56} className="h-14 w-14 mb-2" />
              <CardTitle className="text-lg">Businesses</CardTitle>
              <CardDescription>Muslim-owned businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{(stats?.businesses_count ?? 0).toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Image src="/calendar_icon.svg" alt="" width={56} height={56} className="h-14 w-14 mb-2" />
              <CardTitle className="text-lg">Events</CardTitle>
              <CardDescription>Masjid events, gatherings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{(stats?.events_count ?? 0).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Browse by State */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Browse by State</h2>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {states.map((state) => (
            <Link
              key={state.code}
              href={`/directory/${state.code.toLowerCase()}`}
              className="group rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{state.name}</span>
                <Badge variant="outline">{state.code}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {state.total.toLocaleString()} listings
              </p>
            </Link>
          ))}
        </div>
        {states.length === 0 && (
          <p className="text-muted-foreground">Loading states...</p>
        )}
      </section>
    </div>
  );
}
