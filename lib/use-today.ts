'use client';

import { useSyncExternalStore } from 'react';
import { isoDay, sarajevoToday } from './time';

const noop = () => () => {};

/**
 * Today's date in Sarajevo (YYYY-MM-DD), or null during server render / hydration.
 * Keeps date-dependent UI out of the prerendered shell and avoids hydration mismatches.
 */
export function useToday(): string | null {
  return useSyncExternalStore(
    noop,
    () => isoDay(sarajevoToday()),
    () => null,
  );
}
