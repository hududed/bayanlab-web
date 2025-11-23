import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchEateries, fetchMarkets, fetchPublicBusinesses } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Colorado Directory | BayanLab',
  description: 'Sample directory of halal eateries, markets, and Muslim-owned businesses in Colorado.',
};

// Static totals - demo endpoint only returns sample data
const TOTALS = {
  eateries: 65,
  markets: 13,
  businesses: 7,
};

function HalalStatusBadge({ status }: { status: string }) {
  const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
    validated: 'default',
    likely_halal: 'secondary',
    unverified: 'outline',
  };
  const labels: Record<string, string> = {
    validated: 'Validated',
    likely_halal: 'Likely Halal',
    unverified: 'Unverified',
  };
  return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
}

async function getData() {
  const [eateries, markets, businesses] = await Promise.all([
    fetchEateries({ limit: 5 }).then(r => r.items).catch(() => []),
    fetchMarkets({ limit: 5 }).then(r => r.items).catch(() => []),
    fetchPublicBusinesses({ limit: 5 }).then(r => r.items).catch(() => []),
  ]);
  return { eateries, markets, businesses };
}

export default async function ColoradoDirectoryPage() {
  const { eateries, markets, businesses } = await getData();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Directory</span>
          <span>/</span>
          <span>Colorado</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Colorado Directory
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sample data from our Colorado dataset. Get API access for the full data.
        </p>
      </div>

      <Tabs defaultValue="eateries" className="space-y-6">
        <TabsList>
          <TabsTrigger value="eateries">Eateries ({TOTALS.eateries})</TabsTrigger>
          <TabsTrigger value="markets">Markets ({TOTALS.markets})</TabsTrigger>
          <TabsTrigger value="businesses">Businesses ({TOTALS.businesses})</TabsTrigger>
        </TabsList>

        {/* Eateries Tab */}
        <TabsContent value="eateries" className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Showing {eateries.length} of {TOTALS.eateries} halal restaurants, cafes, and food trucks.
          </p>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Cuisine</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eateries.length > 0 ? (
                  eateries.map((item) => (
                    <TableRow key={item.eatery_id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.cuisine_style || '—'}</TableCell>
                      <TableCell>{item.address.city}</TableCell>
                      <TableCell>
                        {item.google_rating ? `${item.google_rating} ★` : '—'}
                      </TableCell>
                      <TableCell>
                        <HalalStatusBadge status={item.halal_status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Unable to load sample data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            + {TOTALS.eateries - eateries.length} more eateries available with API access
          </p>
        </TabsContent>

        {/* Markets Tab */}
        <TabsContent value="markets" className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Showing {markets.length} of {TOTALS.markets} halal grocery stores, butchers, and meat shops.
          </p>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {markets.length > 0 ? (
                  markets.map((item) => (
                    <TableRow key={item.market_id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category || 'Market'}</TableCell>
                      <TableCell>{item.address.city}</TableCell>
                      <TableCell>
                        {item.google_rating ? `${item.google_rating} ★` : '—'}
                      </TableCell>
                      <TableCell>
                        <HalalStatusBadge status={item.halal_status} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Unable to load sample data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            + {TOTALS.markets - markets.length} more markets available with API access
          </p>
        </TabsContent>

        {/* Businesses Tab */}
        <TabsContent value="businesses" className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Showing {businesses.length} of {TOTALS.businesses} verified Muslim-owned businesses.
          </p>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.length > 0 ? (
                  businesses.map((item) => (
                    <TableRow key={item.business_id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category || '—'}</TableCell>
                      <TableCell>{item.address.city}</TableCell>
                      <TableCell>—</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      Unable to load sample data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground">
            + {TOTALS.businesses - businesses.length} more businesses available with API access
          </p>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex items-center justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/docs">View API Docs</Link>
        </Button>
        <Button asChild>
          <Link href="/contact">Get Full Access</Link>
        </Button>
      </div>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
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
