"use client";

import { NextIntlClientProvider } from 'next-intl';
import { AudioProvider } from '@/contexts/AudioContext';
import { XPProvider } from '@/contexts/XPContext';
import { ManualThemeProvider } from '@/contexts/ThemContext';

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
            {children}
          </XPProvider>
        </AudioProvider>
      </NextIntlClientProvider>
    </ManualThemeProvider>
  );
}