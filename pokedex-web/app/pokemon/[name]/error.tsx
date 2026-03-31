'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-4xl font-bold text-destructive">Pokemon Error!</h2>
        <p className="text-muted-foreground">{error.message || 'The Pokedex couldn\'t retrieve this entry.'}</p>
        <div className="flex gap-4 justify-center">
            <Button onClick={reset} variant="default">
                Try again
            </Button>
            <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
            </Button>
        </div>
      </div>
    </div>
  );
}
