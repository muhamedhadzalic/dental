'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Dictionary, Lang } from './dictionaries';

export { fmt, type Lang } from './dictionaries';

type I18nValue = { lang: Lang; t: Dictionary };
const I18nContext = createContext<I18nValue | null>(null);

/**
 * Provides the current language's dictionary to client components.
 * The dictionary is passed in from the server layout, so only one language ships to the browser.
 */
export function I18nProvider({ lang, dict, children }: { lang: Lang; dict: Dictionary; children: React.ReactNode }) {
  const value = useMemo(() => ({ lang, t: dict }), [lang, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
