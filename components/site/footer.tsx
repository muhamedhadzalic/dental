import Link from 'next/link';
import { CalendarIcon } from '@/components/icons';
import { langPrefix, type Dictionary, type Lang } from '@/lib/i18n/dictionaries';
import { CLINIC } from '@/lib/site';
import { LogoMark } from './logo';

export function Footer({ t, lang }: { t: Dictionary; lang: Lang }) {
  // On phones the stacked columns are centred.
  const col = 'max-[760px]:items-center max-[760px]:text-center';
  const heading = 'text-sm font-bold tracking-[0.1em] text-white uppercase';
  return (
    <footer className="foot cv bg-primary pt-[72px] pb-10 text-mint-300">
      <div className="wrap flex flex-col gap-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-9">
          <div className={`flex flex-col gap-4 ${col}`}>
            <span className="flex items-center gap-3 text-white">
              <LogoMark />
              <span className="font-serif text-lg font-semibold tracking-[0.12em]">DENTAL PLAZA</span>
            </span>
            <p className="max-w-[280px] text-[15px] leading-[1.6]">{t.footLine}</p>
            <a href={CLINIC.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold">
              {CLINIC.instagramHandle}
            </a>
          </div>
          <div className={`flex flex-col gap-2.5 text-[15px] ${col}`}>
            <strong className={heading}>{t.nav4}</strong>
            <span>{CLINIC.address}</span>
            <a href={CLINIC.tel}>{CLINIC.phoneDisplay}</a>
            <span>{t.footMsg}</span>
          </div>
          <div className={`flex flex-col gap-2.5 text-[15px] ${col}`}>
            <strong className={heading}>{t.hoursLabel}</strong>
            <span>{t.footHours1}</span>
            <span>{t.footHours2}</span>
          </div>
          <nav aria-label={t.footerNav} className={`flex flex-col gap-2.5 text-[15px] ${col}`}>
            <strong className={heading}>{t.footLinks}</strong>
            <a href="#usluge">{t.nav1}</a>
            <a href="#tim">{t.nav2}</a>
            <a href="#faq">{t.faqEyebrow}</a>
            <a href="#top">{t.privacy}</a>
            <Link href={`${langPrefix(lang)}/admin`} className="inline-flex items-center gap-2 font-semibold !text-white">
              <CalendarIcon size={16} />
              Admin demo
            </Link>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/15 pt-6 text-sm max-[760px]:flex-col max-[760px]:items-center">
          <span>© 2026 Dental Plaza Sarajevo</span>
          <a href="#top">{t.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
