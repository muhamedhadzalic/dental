'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useBooking } from './booking-provider';

const load = () => import('./booking-modal').then((m) => m.BookingModal);
const BookingModal = dynamic(load, { ssr: false });

/**
 * The booking flow is only needed after a click, so its code is kept out of the initial bundle.
 * It is prefetched when the browser is idle so opening it still feels instant.
 */
export function BookingModalLazy() {
  const { state } = useBooking();
  const [everOpened, setEverOpened] = useState(false);
  if (state.open && !everOpened) setEverOpened(true);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void load());
    else setTimeout(() => void load(), 2000);
  }, []);

  return everOpened ? <BookingModal /> : null;
}
