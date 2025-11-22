import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="container py-24 md:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Trusted Halal & Muslim Community Data
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Ground-truth data on halal eateries, Muslim-owned businesses, and community events.
          Built for apps serving the Muslim community.
        </p>
        <div className="flex gap-4 mt-4">
          <Button size="lg" asChild>
            <Link href="/explore">Explore Data</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">View API Docs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
