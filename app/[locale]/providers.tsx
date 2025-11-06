"use client";

import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { AudioProvider } from '@/contexts/AudioContext';
import { XPProvider } from '@/contexts/XPContext';
import { ManualThemeProvider } from '@/contexts/ThemContext';
import Loading from '@/app/loading';

export function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: any;
  locale: string;
}) {
  return (
    <ManualThemeProvider>
      <NextIntlClientProvider 
        messages={messages} 
        locale={locale}
        timeZone="UTC"
      >
        <AudioProvider>
          <XPProvider>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </XPProvider>
        </AudioProvider>
      </NextIntlClientProvider>
    </ManualThemeProvider>
  );
}