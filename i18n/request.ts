import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }): Promise<{ locale: string; messages: Record<string, string> }> => {
  // Wait for the locale to be available
  let locale = await requestLocale || 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});