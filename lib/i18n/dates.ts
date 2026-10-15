import type { Dictionary, Lang } from './dictionaries';

const cap = (s: string) => s.replace(/^./, (c) => c.toUpperCase());

/** "utorak, 20. oktobra" / "Tuesday, 20 October" (CalDate, read in UTC). */
export function longDate(d: Date, t: Dictionary, lang: Lang, capitalize = false) {
  const s =
    lang === 'en'
      ? `${t.dowLong[d.getUTCDay()]}, ${d.getUTCDate()} ${t.monGen[d.getUTCMonth()]}`
      : `${t.dowLong[d.getUTCDay()]}, ${d.getUTCDate()}. ${t.monGen[d.getUTCMonth()]}`;
  return capitalize ? cap(s) : s;
}

/** "Uto 20. okt" chip label */
export function shortDate(d: Date, t: Dictionary) {
  return `${t.dow[d.getUTCDay()]} ${d.getUTCDate()}. ${t.mon[d.getUTCMonth()]}`;
}

export function monthLabel(d: Date, t: Dictionary) {
  return `${t.monNom[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export { cap };
