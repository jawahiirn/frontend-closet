'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { themes } from '@/lib/constants/theme-constants';
import { Check } from 'lucide-react';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("This should be caught by pre-commit hook");

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">{mounted ? `Theme: ${theme}` : 'Change Theme'}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            {mounted && (
              <div className="flex flex-col gap-1">
                <div className="px-2 py-1.5 text-sm font-semibold">Select Theme</div>
                {themes.map((themeOption) => {
                  const isActive = theme === themeOption.value;

                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => setTheme(themeOption.value)}
                      className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${isActive ? 'bg-accent text-accent-foreground' : ''
                        }`}>
                      <span className="flex-1 text-left">{themeOption.name}</span>
                      {isActive && <Check className="size-4" />}
                    </button>
                  );
                })}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </main>
    </div>
  );
}
