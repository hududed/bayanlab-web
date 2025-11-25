import { DocsSidebar } from '@/components/docs-sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-12">
      <div className="flex gap-12">
        <DocsSidebar />
        <main className="flex-1 min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
