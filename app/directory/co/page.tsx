import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchEateries } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Colorado Halal Eateries Directory | BayanLab',
  description: 'Sample directory of halal restaurants, cafes, and food trucks in Colorado. Get API access for the full dataset.',
};

// Static total - demo endpoint only returns sample data
const TOTAL_EATERIES = 65;

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

async function getSampleEateries() {
  try {
    const data = await fetchEateries({ limit: 5 });
    return data.items;
  } catch {
    return [];
  }
}

export default async function ColoradoDirectoryPage() {
  const eateries = await getSampleEateries();
  const sampleCount = eateries.length;

  return (
    <div className="container py-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/directory" className="hover:underline">Directory</Link>
          <span>/</span>
          <span>Colorado</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Colorado Halal Eateries
        </h1>
        <p className="mt-2 text-muted-foreground">
          Showing {sampleCount} of {TOTAL_EATERIES} verified halal restaurants, cafes, and food trucks in Colorado.
        </p>
      </div>

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
              eateries.map((eatery) => (
                <TableRow key={eatery.eatery_id}>
                  <TableCell className="font-medium">{eatery.name}</TableCell>
                  <TableCell>{eatery.cuisine_style || '—'}</TableCell>
                  <TableCell>{eatery.address.city}</TableCell>
                  <TableCell>
                    {eatery.google_rating ? `${eatery.google_rating} ★` : '—'}
                  </TableCell>
                  <TableCell>
                    <HalalStatusBadge status={eatery.halal_status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Unable to load sample data. Please try again later.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          + {TOTAL_EATERIES - sampleCount} more eateries available with API access
        </p>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/docs">View API Docs</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Get Full Access</Link>
          </Button>
        </div>
      </div>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h2 className="font-semibold mb-2">Available Data Fields</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Each eatery record includes the following attributes:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {[
            'name', 'cuisine_style', 'address', 'phone',
            'website', 'google_rating', 'halal_status', 'is_favorite',
            'is_food_truck', 'hours_raw', 'latitude', 'longitude',
          ].map((field) => (
            <code key={field} className="bg-background px-2 py-1 rounded text-xs">
              {field}
            </code>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <Link href="/docs/attributes" className="text-primary hover:underline">
            View full attribute reference →
          </Link>
        </p>
      </div>
    </div>
  );
}
