'use client';

import Image, { type StaticImageData } from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/icons';
import { useI18n } from '@/lib/i18n';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { Modal } from '@/components/ui/modal';
import chair from '@/public/images/chair-screen.jpg';
import exterior from '@/public/images/exterior.jpg';
import reception from '@/public/images/reception.jpg';
import team from '@/public/images/team.jpg';
import room from '@/public/images/treatment-room.jpg';

type GalleryKey = keyof Dictionary['gallery'];
const ITEMS: { key: GalleryKey; src: StaticImageData; ratio: string; pos: string }[] = [
  { key: 'reception', src: reception, ratio: '4 / 5', pos: '50% 40%' },
  { key: 'room', src: room, ratio: '4 / 4.2', pos: '50% 55%' },
  { key: 'exterior', src: exterior, ratio: '16 / 10', pos: '50% 50%' },
  { key: 'chair', src: chair, ratio: '4 / 5', pos: '50% 35%' },
  { key: 'team', src: team, ratio: '4 / 4.6', pos: '50% 40%' },
];

export function Gallery() {
  const { t } = useI18n();
  const [index, setIndex] = useState(-1);
  const n = ITEMS.length;
  const open = index >= 0;
  const go = (d: number) => setIndex((i) => (i + d + n) % n);
  const touchX = useRef<number | null>(null);
  const item = open ? ITEMS[index] : null;

  return (
    <section id="galerija" className="cv bg-sand py-[104px]">
      <div className="wrap flex flex-col gap-10">
        <div className="reveal flex max-w-[640px] flex-col gap-3.5">
          <span className="eyebrow">{t.galEyebrow}</span>
          <h2 className="h2">{t.galTitle}</h2>
          <p className="lead">{t.galSub}</p>
        </div>
        <div className="masonry">
          {ITEMS.map((g, i) => (
            <button
              key={g.key}
              type="button"
              className="gimg reveal"
              onClick={() => setIndex(i)}
              aria-label={t.galEnlarge + t.gallery[g.key]}
            >
              <span className="relative block w-full" style={{ aspectRatio: g.ratio }}>
                <Image
                  src={g.src}
                  alt={t.gallery[g.key]}
                  fill
                  sizes="(max-width: 760px) 50vw, (max-width: 980px) 50vw, 390px"
                  className="object-cover"
                  style={{ objectPosition: g.pos }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setIndex(-1)}
        label={t.galEyebrow}
        className="lightbox"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className="flex w-full max-w-[1000px] items-center justify-between px-2 text-white">
          <span className="text-[15px] font-semibold" aria-live="polite">
            {index + 1} / {n}
          </span>
          <button type="button" className="iconbtn !bg-white/[0.14] !text-white hover:!bg-white/25" onClick={() => setIndex(-1)} aria-label={t.close}>
            <CloseIcon />
          </button>
        </div>
        {item && (
          <div key={item.key} className="stepin relative min-h-0 w-full max-w-[1000px] flex-1">
            <Image src={item.src} alt={t.gallery[item.key]} fill sizes="(max-width: 1048px) 100vw, 1000px" className="rounded-[18px] object-contain" />
          </div>
        )}
        <div className="flex gap-3">
          <button type="button" className="iconbtn !size-[52px] !bg-white/[0.14] !text-white hover:!bg-white/25" onClick={() => go(-1)} aria-label={t.prev}>
            <ChevronLeftIcon size={22} />
          </button>
          <button type="button" className="iconbtn !size-[52px] !bg-white/[0.14] !text-white hover:!bg-white/25" onClick={() => go(1)} aria-label={t.next}>
            <ChevronRightIcon size={22} />
          </button>
        </div>
      </Modal>
    </section>
  );
}
