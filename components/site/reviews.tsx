import { ArrowUpRightIcon, Stars, SwipeIcon } from '@/components/icons';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { CLINIC } from '@/lib/site';

/** Swipeable testimonials (native scroll-snap, no autoplay). */
export function Reviews({ t }: { t: Dictionary }) {
  return (
    <section className="cv bg-white py-[104px]">
      <div className="wrap flex flex-col gap-9">
        <div className="reveal flex flex-wrap items-end justify-between gap-5">
          <div className="flex flex-col gap-3.5">
            <span className="eyebrow">{t.revEyebrow}</span>
            <h2 className="h2" id="reviews-title">
              {t.revTitle}
            </h2>
          </div>
          <a className="tlink" href={CLINIC.google} target="_blank" rel="noopener noreferrer">
            {t.revAll}
            <ArrowUpRightIcon size={18} />
          </a>
        </div>
        <div className="snap" tabIndex={0} role="region" aria-labelledby="reviews-title">
          {t.reviewsList.map((r) => (
            <figure key={r.ini} className="card m-0 flex flex-col gap-[18px] border border-line-soft p-7 !shadow-none">
              <div className="flex items-center justify-between gap-2.5">
                <span role="img" aria-label="5/5" className="flex gap-0.5">
                  <Stars />
                </span>
                <span className="rounded-full bg-stone px-2.5 py-[5px] text-xs font-bold tracking-[0.06em] whitespace-nowrap text-muted uppercase">
                  {t.revExample}
                </span>
              </div>
              <blockquote className="m-0 flex-1 text-[17px] leading-[1.6]">{r.text}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-mint text-sm font-bold text-primary">
                  {r.ini}
                </span>
                <span className="flex flex-col gap-0.5">
                  <strong className="text-[15px]">{r.ini}</strong>
                  <span className="text-[13px] text-muted">{r.what}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="flex items-center gap-2 text-sm text-muted">
          <SwipeIcon size={18} />
          {t.swipe}
        </p>
      </div>
    </section>
  );
}
