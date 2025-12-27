import { Hero } from '@/components/hero';
import { DataProductCard } from '@/components/data-product-card';
import { fetchStats } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Fetch stats from public endpoint (no auth required)
  const stats = await fetchStats().catch(() => null);

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Data Products Section */}
      <section className="container py-12 md:py-24">
        <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
          Data Products
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <DataProductCard
            title="Halal Eateries"
            description="Restaurants, cafes, and food trucks."
            icon="/eateries_icon.svg"
            href="/directory"
            count={stats?.eateries_count ?? 0}
          />
          <DataProductCard
            title="Halal Markets"
            description="Grocery stores, butchers, and halal meat shops."
            icon="/markets_icon.svg"
            href="/directory"
            count={stats?.markets_count ?? 0}
          />
          <DataProductCard
            title="Masajid"
            description="Mosques and Islamic centers."
            icon="/masajid_icon.svg"
            href="/directory"
            count={stats?.masajid_count ?? 0}
          />
          <DataProductCard
            title="Muslim-Owned Businesses"
            description="Verified businesses directory."
            icon="/businesses_icon.svg"
            href="/directory"
            count={stats?.businesses_count ?? 0}
          />
          <DataProductCard
            title="Community Events"
            description="Masjid events and community gatherings."
            icon="/calendar_icon.svg"
            href="/directory"
            count={stats?.events_count ?? 0}
          />
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-12 md:py-24">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            Built for community apps
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-semibold">Halal Finders</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Power your halal restaurant and grocery store locator with verified data
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-semibold">Business Directories</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                List Muslim-owned businesses with structured, searchable data
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="font-semibold">Your App?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Building for the Muslim community? Let&apos;s talk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Directory Section */}
      <section className="container py-12 md:py-24">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          Browse the Directory
        </h2>
        <p className="text-muted-foreground mb-8">
          Preview our data before integrating. See sample records and available fields.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/directory"
            className="group rounded-lg border p-6 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Nationwide Directory</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse by state, city, or category
            </p>
            <p className="mt-4 text-sm font-medium text-primary group-hover:underline">
              Explore data →
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
