'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'bash', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-muted">
      {title && (
        <div className="border-b px-4 py-2 text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 h-8 px-2 text-xs"
          onClick={copyToClipboard}
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
