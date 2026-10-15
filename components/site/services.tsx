import { BookButton } from '@/components/booking/book-button';
import { ArrowRightIcon, ClockIcon, FeatureIcon } from '@/components/icons';
import { allServices } from '@/lib/data';
import type { Dictionary } from '@/lib/i18n/dictionaries';

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="usluge" className="cv bg-white py-[104px]">
      <div className="wrap flex flex-col gap-12">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <span className="eyebrow">{t.servEyebrow}</span>
            <h2 className="h2">{t.servTitle}</h2>
            <p className="lead">{t.servSub}</p>
          </div>
          <BookButton className="btn btn-g">{t.book}</BookButton>
        </div>
        <div className="m-rail grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-5">
          {allServices.map((s) => {
            const [name, desc] = t.services[s.id];
            return (
              <article key={s.id} className="card card-h reveal flex flex-col gap-3.5 border border-ink/5 p-[26px]">
                <div className="flex items-start justify-between">
                  <span className="flex size-[52px] items-center justify-center rounded-2xl bg-mint">
                    <FeatureIcon name={s.id} size={28} />
                  </span>
                  <span className="flex items-center gap-1.5 pt-1.5 text-[13px] font-semibold text-muted">
                    <ClockIcon size={16} />
                    {s.durationMin} {t.min}
                  </span>
                </div>
                <h3 className="text-xl leading-[1.3] font-bold">{name}</h3>
                <p className="flex-1 text-[15px] leading-[1.6] text-muted">{desc}</p>
                <div className="flex items-center justify-between border-t border-line-soft pt-3.5">
                  <span className="text-[15px] text-ink">
                    {t.from} <strong>{s.priceFrom ?? t.pricePlaceholder}</strong> {t.currency}
                  </span>
                  <BookButton serviceId={s.id} className="tlink" aria-label={`${t.bookShort}: ${name}`}>
                    {t.bookShort}
                    <ArrowRightIcon size={18} />
                  </BookButton>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
