import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchPreview, fetchCoverage } from '@/lib/api';

// State codes to names
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

// Revalidate every 5 minutes (ISR)
export const revalidate = 300;

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const stateName = STATE_NAMES[stateCode] || stateCode;

  return {
    title: `${stateName} Directory | BayanLab`,
    description: `Halal eateries, markets, masajid, and Muslim-owned businesses in ${stateName}.`,
  };
}

export default async function StateDirectoryPage({ params }: PageProps) {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const stateName = STATE_NAMES[stateCode];

  if (!stateName) {
    notFound();
  }

  // Fetch preview data and coverage counts from public endpoints
  const [preview, coverage] = await Promise.all([
    fetchPreview(stateCode).catch(() => null),
    fetchCoverage().catch(() => null),
  ]);

  // Get counts from coverage
  const counts = coverage?.counts_by_region[stateCode] ?? {
    masajid: 0,
    eateries: 0,
    markets: 0,
    businesses: 0,
    events: 0,
  };
  const totalCount = counts.masajid + counts.eateries + counts.markets + counts.businesses + counts.events;

  // Preview samples
  const samples = preview?.samples ?? {
    masajid: [],
    eateries: [],
    markets: [],
    businesses: [],
    events: [],
  };

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/directory" className="hover:underline">Directory</Link>
          <span>/</span>
          <span>{stateName}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
          {stateName} Directory
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          {totalCount.toLocaleString()} listings in {stateName}
        </p>
      </div>

      <Tabs defaultValue="masajid" className="space-y-6">
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-5 h-auto">
          <TabsTrigger value="masajid" className="text-xs md:text-sm">
            Masajid ({counts.masajid.toLocaleString()})
          </TabsTrigger>
          <TabsTrigger value="eateries" className="text-xs md:text-sm">
            Eateries ({counts.eateries.toLocaleString()})
          </TabsTrigger>
          <TabsTrigger value="markets" className="text-xs md:text-sm">
            Markets ({counts.markets.toLocaleString()})
          </TabsTrigger>
          <TabsTrigger value="businesses" className="text-xs md:text-sm">
            Businesses ({counts.businesses.toLocaleString()})
          </TabsTrigger>
          <TabsTrigger value="events" className="text-xs md:text-sm">
            Events ({counts.events.toLocaleString()})
          </TabsTrigger>
        </TabsList>

        {/* Masajid Tab */}
        <TabsContent value="masajid" className="space-y-6">
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.masajid.length > 0 ? (
                  samples.masajid.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                      No masajid found in {stateName}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {samples.masajid.length > 0 && counts.masajid > samples.masajid.length && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {samples.masajid.length} of {counts.masajid.toLocaleString()} masajid
            </p>
          )}
        </TabsContent>

        {/* Eateries Tab */}
        <TabsContent value="eateries" className="space-y-6">
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.eateries.length > 0 ? (
                  samples.eateries.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                      No eateries found in {stateName}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {samples.eateries.length > 0 && counts.eateries > samples.eateries.length && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {samples.eateries.length} of {counts.eateries.toLocaleString()} eateries
            </p>
          )}
        </TabsContent>

        {/* Markets Tab */}
        <TabsContent value="markets" className="space-y-6">
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.markets.length > 0 ? (
                  samples.markets.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                      No markets found in {stateName}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {samples.markets.length > 0 && counts.markets > samples.markets.length && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {samples.markets.length} of {counts.markets.toLocaleString()} markets
            </p>
          )}
        </TabsContent>

        {/* Businesses Tab */}
        <TabsContent value="businesses" className="space-y-6">
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.businesses.length > 0 ? (
                  samples.businesses.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                      No businesses found in {stateName}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {samples.businesses.length > 0 && counts.businesses > samples.businesses.length && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {samples.businesses.length} of {counts.businesses.toLocaleString()} businesses
            </p>
          )}
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {samples.events.length > 0 ? (
                  samples.events.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.city}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-muted-foreground py-8">
                      No upcoming events found in {stateName}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {samples.events.length > 0 && counts.events > samples.events.length && (
            <p className="text-sm text-muted-foreground text-center">
              Showing {samples.events.length} of {counts.events.toLocaleString()} upcoming events
            </p>
          )}
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h2 className="font-semibold mb-2">Get Full Access</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This preview shows names and cities only. Full API access includes phone numbers,
          addresses, coordinates, ratings, hours, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/contact">Request API Access</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs">View API Docs</Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 rounded-lg border p-6">
        <h2 className="font-semibold mb-2">Available Data Fields</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Each record includes attributes like name, address, coordinates, ratings, and more.
        </p>
        <p className="text-sm">
          <Link href="/docs/attributes" className="text-primary hover:underline">
            View full attribute reference →
          </Link>
        </p>
      </div>
    </div>
  );
}
