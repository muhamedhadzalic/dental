/**
 * Calendar helpers pinned to the clinic's timezone (Europe/Sarajevo).
 *
 * A "CalDate" is a Date at 00:00 UTC that represents a calendar day in Sarajevo.
 * Always read it with getUTC* so the visitor's own timezone never shifts the day.
 */
export const CLINIC_TZ = 'Europe/Sarajevo';
export const OPEN_MIN = 10 * 60; // 10:00
export const CLOSE_MIN = 18 * 60; // 18:00
export const SLOT_STEP_MIN = 30;

export type CalDate = Date;

/** Today's calendar date in Sarajevo. Call only on the client / at request time. */
export function sarajevoToday(now: Date = new Date()): CalDate {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return new Date(Date.UTC(get('year'), get('month') - 1, get('day')));
}

/** ISO key (YYYY-MM-DD) for a CalDate. */
export function isoDay(d: CalDate) {
  return d.toISOString().slice(0, 10);
}

export function fromIsoDay(iso: string): CalDate {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function addDays(d: CalDate, n: number): CalDate {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + n));
}

export function isWeekend(d: CalDate) {
  const dow = d.getUTCDay();
  return dow === 0 || dow === 6;
}

/** Monday of the week containing d (Sunday belongs to the week before). */
export function mondayOf(d: CalDate): CalDate {
  const dow = d.getUTCDay() || 7;
  return addDays(d, -(dow - 1));
}

const pad = (n: number) => (n < 10 ? '0' + n : '' + n);

/** Minutes after midnight → "HH:MM". */
export function hm(minutes: number) {
  return pad(Math.floor(minutes / 60)) + ':' + pad(minutes % 60);
}

/** Google Calendar compact local timestamp, e.g. 20261020T103000. */
export function gcalStamp(d: CalDate, minutes: number) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(Math.floor(minutes / 60)) +
    pad(minutes % 60) +
    '00'
  );
}
