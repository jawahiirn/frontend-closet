'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Common');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-4xl font-bold text-destructive">{t('errorTitle')}</h2>
        <p className="text-muted-foreground">{error.message || 'An unexpected error occurred'}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
            {useTranslations('Details')('retry')}
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline">
            {t('goHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}
