import { Hero } from '@/components/hero';
import { DataProductCard } from '@/components/data-product-card';

export default async function HomePage() {

  return (
    <div className="flex flex-col">
      <Hero />

      {/* Data Products Section */}
      <section className="container py-12 md:py-24">
        <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
          Data Products
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DataProductCard
            title="Halal Eateries"
            description="Restaurants, cafes, and food trucks."
            icon="🍽️"
            href="/directory/co"
          />
          <DataProductCard
            title="Halal Markets"
            description="Grocery stores, butchers, and halal meat shops."
            icon="🛒"
            href="/directory/co"
          />
          <DataProductCard
            title="Masajid"
            description="Mosques and Islamic centers."
            icon="🕌"
            href="/directory/co"
          />
          <DataProductCard
            title="Muslim-Owned Businesses"
            description="Verified businesses from ProWasl directory."
            icon="🏪"
            href="/directory/co"
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
            href="/directory/co"
            className="group rounded-lg border p-6 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Colorado</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Eateries, markets, masajid, and businesses
            </p>
            <p className="mt-4 text-sm font-medium text-primary group-hover:underline">
              View sample data →
            </p>
          </a>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          More regions coming soon. <a href="/contact" className="text-primary hover:underline">Contact us</a> to request coverage.
        </p>
      </section>
    </div>
  );
}
