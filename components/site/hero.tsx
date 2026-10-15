import Image from 'next/image';
import { BookButton } from '@/components/booking/book-button';
import { CalendarIcon, FeatureIcon, PhoneIcon, Stars } from '@/components/icons';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { CLINIC } from '@/lib/site';
import reception from '@/public/images/reception.jpg';
import room from '@/public/images/treatment-room.jpg';

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="bg-white pt-14 pb-[72px] max-[760px]:pt-6 max-[760px]:pb-12">
      <div className="wrap hero-grid">
        {/* On phones this column dissolves (.m-contents) so the photo sits between the title and the subtext. */}
        <div className="m-contents flex flex-col gap-[26px]">
          <span className="eyebrow">{t.heroEyebrow}</span>
          <h1 className="text-[clamp(40px,5.2vw,68px)] leading-[1.04] font-bold tracking-[-0.03em] text-balance">
            {t.heroH1a} <span className="text-primary">{t.heroH1b}</span>
          </h1>
          <p className="lead max-w-[520px] max-[980px]:order-2">{t.heroSub}</p>
          <div className="flex flex-wrap gap-3 max-[980px]:order-2">
            <BookButton className="btn btn-p">
              <CalendarIcon />
              {t.book}
            </BookButton>
            <a className="btn btn-g" href={CLINIC.tel}>
              <PhoneIcon />
              {t.callUs}
            </a>
          </div>
          <a
            href={CLINIC.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 self-start justify-self-start rounded-full max-[980px]:order-2 bg-sand py-2.5 pr-4 pl-3 !text-ink no-underline"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              <Stars />
            </span>
            <span className="text-[15px]">
              <strong>{CLINIC.rating}</strong> · {t.reviews}
            </span>
          </a>
        </div>
        <div className="relative pb-7 pl-7 max-[980px]:order-1 max-[980px]:my-2">
          <div aria-hidden="true" className="absolute bottom-0 left-0 h-[78%] w-[72%] rounded-xl3 bg-mint" />
          <div className="relative aspect-[4/4.4] overflow-hidden rounded-xl3 shadow-hero">
            <Image
              src={reception}
              alt={t.altReception}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 980px) calc(100vw - 68px), 520px"
              placeholder="blur"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div className="hide-m absolute -right-[18px] bottom-1 w-[38%] overflow-hidden rounded-card border-[6px] border-white shadow-[0_20px_44px_rgba(15,82,87,.2)]">
            <div className="relative aspect-[4/4.6] w-full">
              <Image src={room} alt={t.altChair} fill sizes="(max-width: 980px) 38vw, 200px" className="object-cover object-[50%_60%]" />
            </div>
          </div>
          <div className="absolute top-6 left-11 flex items-center gap-2.5 rounded-full bg-white/[0.94] px-4 py-2.5 text-sm font-semibold text-primary shadow-float">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-green" />
            {t.heroFloat}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar({ t }: { t: Dictionary }) {
  return (
    <section aria-label={t.trustLabel} className="bg-sand py-9">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        {t.trust.map((tr) => (
          <div key={tr.title} className="flex items-start gap-3.5 py-1.5">
            <span className="flex size-12 flex-none items-center justify-center rounded-[14px] bg-white shadow-[0_6px_16px_rgba(15,82,87,.08)]">
              <FeatureIcon name={tr.icon} size={26} />
            </span>
            <div className="flex flex-col gap-1">
              <strong className="text-base">{tr.title}</strong>
              <span className="text-sm leading-normal text-muted">{tr.text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
