'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { themes } from '@/lib/constants/theme-constants';
import { Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPokemonList } from '@/lib/api/pokemon';
import Link from 'next/link';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon-list'],
    queryFn: () => getPokemonList(20),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-8 font-sans bg-background">
      <header className="flex w-full max-w-5xl items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <h1 className="text-2xl font-bold">Pokedex</h1>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {mounted ? `Theme: ${theme}` : 'Change Theme'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            {mounted && (
              <div className="flex flex-col gap-1">
                <div className="px-2 py-1.5 text-sm font-semibold">
                  Select Theme
                </div>
                {themes.map((themeOption) => {
                  const isActive = theme === themeOption.value;

                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => setTheme(themeOption.value)}
                      className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${isActive ? 'bg-accent text-accent-foreground' : ''
                        }`}
                    >
                      <span className="flex-1 text-left">
                        {themeOption.name}
                      </span>
                      {isActive && <Check className="size-4" />}
                    </button>
                  );
                })}
              </div>
            )}
          </PopoverContent>
        </Popover>
      </header>

      <main className="w-full max-w-5xl">
        {isLoading && <div>Loading Pokemon...</div>}
        {isError && <div className="text-red-500">Error fetching Pokemon</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.results.map((pokemon) => (
            <Link
              href={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className="block"
            >
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow capitalize text-center">
                {pokemon.name}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
