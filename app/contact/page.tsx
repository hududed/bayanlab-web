import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Contact | BayanLab',
  description: 'Get in touch to request API access or ask questions about BayanLab data.',
};

export default function ContactPage() {
  return (
    <div className="container py-12 max-w-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-2 text-muted-foreground">
          Interested in API access? Have questions? Send us a message.
        </p>
      </div>

      <form
        action="https://formspree.io/f/mankbdyw"
        method="POST"
        className="space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company / App Name <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Your company or app name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your use case..."
            required
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Send Message
        </Button>
      </form>

      <div className="mt-12 rounded-lg border bg-muted/50 p-6">
        <h2 className="font-semibold mb-2">What to expect</h2>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>We typically respond within 1-2 business days</li>
          <li>API access is currently free for community apps</li>
          <li>We&apos;ll discuss your use case and data needs</li>
        </ul>
      </div>
    </div>
  );
}
