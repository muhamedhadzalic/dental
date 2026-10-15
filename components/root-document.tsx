import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { BookingProvider } from '@/components/booking/booking-provider';
import { I18nProvider } from '@/lib/i18n';
import { getDictionary, type Lang } from '@/lib/i18n/dictionaries';
import '@/app/globals.css';

/*
 * Same fonts as the design (Google Fonts, SIL OFL), self-hosted as variable woff2 files
 * subset to the characters this site uses (Latin + Latin-1 + č ć đ š ž + punctuation).
 * One small preloaded file per family keeps text rendering off the critical path on mobile.
 */
const jakarta = localFont({
  src: '../app/fonts/PlusJakartaSans-var-bs.woff2',
  variable: '--font-jakarta',
  weight: '200 800',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
});

// Bodoni Moda is only used for the uppercase wordmark and doctor initials – subset to A–Z.
const bodoni = localFont({
  src: '../app/fonts/BodoniModa-var-caps.woff2',
  variable: '--font-bodoni',
  weight: '400 900',
  display: 'swap',
  fallback: ['Didot', 'Georgia', 'serif'],
});

export function buildMetadata(lang: Lang): Metadata {
  const t = getDictionary(lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    // Demo: keep this preview out of search engines.
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

export const viewport: Viewport = {
  themeColor: '#0F5257',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export function RootDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${jakarta.variable} ${bodoni.variable}`}>
      <body>
        <I18nProvider lang={lang} dict={getDictionary(lang)}>
          <BookingProvider>{children}</BookingProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
