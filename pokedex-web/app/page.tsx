import Image from 'next/image';
import LanguageSwitcher from '@/features/i18n/components/language-switcher';
import { getTranslations } from 'next-intl/server';
import { getQueryClient } from '@/shared/lib/query-client';
import { prefetchPokemonList } from '@/features/pokemon/api/prefetch';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { PokemonList } from '@/features/pokemon/components/pokemon-list';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

export default async function Home() {
  const t = await getTranslations('Index');
  const queryClient = getQueryClient();

  await prefetchPokemonList(queryClient, 20);

  return (
    <div className="flex min-h-screen flex-col items-center p-8 font-sans bg-background">
      <header className="flex w-full max-w-5xl items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
          <h1 className="text-2xl font-bold">{t('title')}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {/* Theme switcher logic needs to be client-side. I'll use a placeholder for now or better, create the component. */}
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full max-w-5xl space-y-8">
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-bold">{t('welcome')}</h2>
          <p className="text-xl text-muted-foreground">{t('description')}</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-bold mb-2">{t('features.search')}</h3>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-bold mb-2">{t('features.details')}</h3>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-bold mb-2">{t('features.compare')}</h3>
          </div>
        </section>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <PokemonList />
        </HydrationBoundary>
      </main>
    </div>
  );
}
