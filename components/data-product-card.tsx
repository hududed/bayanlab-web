import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DataProductCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  comingSoon?: boolean;
}

export function DataProductCard({
  title,
  description,
  icon,
  href,
  comingSoon = false,
}: DataProductCardProps) {
  return (
    <Card className="relative overflow-hidden transition-colors hover:bg-muted/50">
      <Link href={href} className="absolute inset-0 z-10">
        <span className="sr-only">View {title}</span>
      </Link>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="text-4xl">{icon}</span>
          {comingSoon && (
            <Badge variant="secondary">Coming Soon</Badge>
          )}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium text-primary">
          {comingSoon ? 'Learn more' : 'Explore'} &rarr;
        </p>
      </CardContent>
    </Card>
  );
}
