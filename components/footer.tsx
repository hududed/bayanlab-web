import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BayanLab. Trusted Halal & Muslim Community Data.
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:underline">
            API
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
