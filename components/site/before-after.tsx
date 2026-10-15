'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { InfoIcon, SwipeIcon } from '@/components/icons';
import { useI18n } from '@/lib/i18n';
import after from '@/public/images/after.jpg';
import before from '@/public/images/before.jpg';
import { ConsentLabel } from './consent-label';

/** Before/after comparison: drag with mouse or touch anywhere on the image, or use the keyboard on the handle. */
export function BeforeAfter() {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((x: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100))));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey || e.key === 'PageUp' || e.key === 'PageDown' ? 10 : 2;
    let n = pos;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'PageDown') n = pos - step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'PageUp') n = pos + step;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = 100;
    else return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, n)));
  };

  return (
    <figure className="reveal m-0 flex flex-col gap-3">
      <div
        ref={boxRef}
        className="relative aspect-[814/468] cursor-ew-resize touch-pan-y overflow-hidden rounded-xl2 bg-ink shadow-[0_24px_50px_rgba(15,82,87,.16)] select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image src={after} alt={t.altAfter} fill sizes="(max-width: 980px) 100vw, 568px" className="consent-blur object-cover" draggable={false} />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={t.altBefore} fill sizes="(max-width: 980px) 100vw, 568px" className="consent-blur object-cover" draggable={false} />
        </div>
        <span className="absolute top-4 left-4 z-[2] rounded-full bg-ink/70 px-3 py-1.5 text-[13px] font-bold tracking-[0.04em] text-white">
          {t.before}
        </span>
        <span className="absolute top-4 right-4 z-[2] rounded-full bg-white/[0.92] px-3 py-1.5 text-[13px] font-bold tracking-[0.04em] text-primary">
          {t.after}
        </span>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 z-[3] -ml-[1.5px] w-[3px] bg-white" style={{ left: `${pos}%` }} />
        <div
          role="slider"
          tabIndex={0}
          aria-label={t.baAria}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pos}
          aria-valuetext={`${pos}%`}
          onKeyDown={onKey}
          className="absolute top-1/2 z-[3] -mt-6 -ml-6 flex size-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_6px_18px_rgba(0,0,0,.25)] focus-visible:!rounded-full focus-visible:outline-white"
          style={{ left: `${pos}%` }}
        >
          <SwipeIcon size={22} strokeWidth={2.4} />
        </div>
        <ConsentLabel label={t.consentLabel} />
      </div>
      <figcaption className="flex items-center gap-2 text-sm text-muted">
        <InfoIcon size={16} />
        {t.baCaption}
      </figcaption>
    </figure>
  );
}
