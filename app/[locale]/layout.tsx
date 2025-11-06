import '../globals.css'
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from './providers';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Abdellah Hadid',
  description: 'Your site description for SEO',
  
  // Favicons
  icons: {
    icon: [
      { url: 'favicon.jpg' },
    ],
    apple: [
      { url: 'favicon.png', type: 'image/jpg' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/jpg',
        url: '/favicon.jpg',
      },
    ],
  },
  
  // Open Graph (Social Media)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    title: 'Your Site Name',
    description: 'Your site description',
    siteName: 'Your Site Name',
    images: [
      {
        url: 'https://yoursite.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Your Site Preview',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Your Site Name',
    description: 'Your site description',
    images: ['https://yoursite.com/twitter-image.png'],
    creator: '@yourusername',
  },
  
  // PWA & Theme
  manifest: '/site.webmanifest',
  themeColor: '#2b2550',
  
  // Additional
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Your Name' }],
  keywords: ['keyword1', 'keyword2', 'keyword3'],
}

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