import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = await cookies();
  let locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  // Validate locale and fallback to 'en' if invalid
  const validLocales = ['en', 'bn'];
  if (!validLocales.includes(locale)) {
    locale = 'en';
  }

  try {
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  } catch (error) {
    // Fallback to English if locale file doesn't exist
    return {
      locale: 'en',
      messages: (await import(`../../messages/en.json`)).default,
    };
  }
});
