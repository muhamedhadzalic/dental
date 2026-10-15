'use client';

import { useEffect } from 'react';

/**
 * Below-the-fold sections use `content-visibility: auto` (fast first load on phones). Until they have been
 * rendered once, their height is only an estimate, which would make in-page links (#usluge, #kontakt…) land
 * off-target. On an in-page link click we briefly render everything so the browser scrolls to the real
 * position; afterwards `contain-intrinsic-size: auto` remembers the real sizes.
 */
export function AnchorFix() {
  useEffect(() => {
    const root = document.documentElement;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;
      root.classList.add('cv-off');
      void root.offsetHeight; // force layout with real section heights before the browser scrolls
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove('cv-off'), 1500);
    };
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      clearTimeout(timer);
    };
  }, []);
  return null;
}
