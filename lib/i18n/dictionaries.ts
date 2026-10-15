import { bs, type Dictionary } from './bs';
import { en } from './en';

export type Lang = 'bs' | 'en';
export const LANGS: Lang[] = ['bs', 'en'];
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { bs, en };

/** Server-safe dictionary lookup. BS is the default language (served at "/"), EN at "/en". */
export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Path prefix for a language: "" for BS, "/en" for EN. */
export const langPrefix = (lang: Lang) => (lang === 'bs' ? '' : '/en');

/** Replace {key} placeholders in a dictionary string. */
export function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));
}
