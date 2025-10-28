import '../globals.css'
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from './providers';

const locales = ['en', 'fr', 'ar'];

export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head />
      <body className="antialiased" suppressHydrationWarning>
        <Providers messages={messages} locale={locale}>
          {children}
        </Providers>
      </body>
    </html>
  );
}