'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { setLocaleCookie } from '@/i18n/locale';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('Index');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = async () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';

    startTransition(async () => {
      await setLocaleCookie(nextLocale);
      router.refresh();
    });
  };

  return (
    <Button onClick={toggleLanguage} variant="outline" size="sm" disabled={isPending}>
      {t('switchLanguage')} ({locale.toUpperCase()})
    </Button>
  );
}
