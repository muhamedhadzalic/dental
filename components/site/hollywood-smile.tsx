import Image, { type StaticImageData } from 'next/image';
import { BookButton } from '@/components/booking/book-button';
import { CheckIcon } from '@/components/icons';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import couple from '@/public/images/couple.jpg';
import patient1 from '@/public/images/patient-1.jpg';
import patient2 from '@/public/images/patient-2.jpg';
import smiles from '@/public/images/smiles.jpg';
import { BeforeAfter } from './before-after';
import { ConsentLabel } from './consent-label';

function Result({ src, alt, pos, label }: { src: StaticImageData; alt: string; pos?: string; label: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-card">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 520px) 100vw, (max-width: 980px) 50vw, 280px"
        className="consent-blur object-cover"
        style={{ objectPosition: pos }}
      />
      <ConsentLabel label={label} small />
    </div>
  );
}

export function HollywoodSmile({ t }: { t: Dictionary }) {
  return (
    <section className="cv bg-sand py-[104px]">
      <div className="wrap flex flex-col gap-16">
        <div className="split">
          <div className="reveal flex flex-col gap-[22px]">
            <span className="eyebrow">{t.hsEyebrow}</span>
            <h2 className="h2">{t.hsTitle}</h2>
            <p className="lead">{t.hsText}</p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {t.hsBullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-base font-medium">
                  <span aria-hidden="true" className="flex size-7 flex-none items-center justify-center rounded-full bg-mint text-primary">
                    <CheckIcon size={16} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-1.5">
              <BookButton serviceId="fasete" className="btn btn-p">
                {t.hsCta}
              </BookButton>
            </div>
          </div>
          <BeforeAfter />
        </div>
        <div className="reveal flex flex-col gap-5">
          <h3 className="text-[22px] font-bold">{t.resultsTitle}</h3>
          <div className="m-rail m-rail-photos grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
            <Result src={patient1} alt={t.altPatient} pos="50% 30%" label={t.consentLabel} />
            <Result src={patient2} alt={t.altPatient} pos="50% 30%" label={t.consentLabel} />
            <Result src={smiles} alt={t.altSmiles} label={t.consentLabel} />
            <Result src={couple} alt={t.altCouple} pos="50% 40%" label={t.consentLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
