'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  {
    title: 'Getting Started',
    href: '/docs',
  },
  {
    title: 'Endpoints',
    href: '/docs/endpoints',
    items: [
      { title: 'Halal Eateries', href: '/docs/endpoints#halal-eateries' },
      { title: 'Businesses', href: '/docs/endpoints#businesses' },
      { title: 'Events', href: '/docs/endpoints#events' },
    ],
  },
  {
    title: 'Attributes',
    href: '/docs/attributes',
    items: [
      { title: 'Eatery Fields', href: '/docs/attributes#eatery' },
      { title: 'Business Fields', href: '/docs/attributes#business' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block w-64 shrink-0">
      <div className="sticky top-20 space-y-6">
        {navItems.map((section) => (
          <div key={section.href}>
            <Link
              href={section.href}
              className={cn(
                'block text-sm font-semibold',
                pathname === section.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {section.title}
            </Link>
            {section.items && (
              <ul className="mt-2 space-y-1 border-l pl-4">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-sm text-muted-foreground hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
