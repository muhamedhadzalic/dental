import type { Service } from '@/lib/types';

/**
 * Services offered. Names/descriptions live in the i18n dictionaries (keyed by id).
 * priceFrom is null until the clinic provides real prices – the UI then shows "[cijena]".
 */
export const services: Service[] = [
  { id: 'pregled', durationMin: 30, priceFrom: null },
  { id: 'plombe', durationMin: 45, priceFrom: null },
  { id: 'kanal', durationMin: 60, priceFrom: null },
  { id: 'ciscenje', durationMin: 45, priceFrom: null },
  { id: 'izbjeljivanje', durationMin: 60, priceFrom: null },
  { id: 'fasete', durationMin: 60, priceFrom: null },
  { id: 'krunice', durationMin: 60, priceFrom: null },
  { id: 'vadjenje', durationMin: 45, priceFrom: null },
  { id: 'hitni', durationMin: 30, priceFrom: null },
];
