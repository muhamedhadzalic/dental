import Image from 'next/image';
import { BookButton } from '@/components/booking/book-button';
import { InstagramIcon, MapIcon, PhoneIcon, ViberIcon, WhatsAppIcon } from '@/components/icons';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { CLINIC } from '@/lib/site';
import { Hours } from './hours';
import exterior from '@/public/images/exterior.jpg';

function MapIllustration() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
      <rect width="600" height="400" fill="#EAF3EF" />
      <path d="M-20 300 C140 260 260 330 620 230" stroke="#CDEBE3" strokeWidth="46" fill="none" />
      <path d="M-20 300 C140 260 260 330 620 230" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="14 12" fill="none" opacity=".8" />
      <path d="M120 -20 L230 420" stroke="#FFFFFF" strokeWidth="22" />
      <path d="M-20 120 L620 70" stroke="#FFFFFF" strokeWidth="16" />
      <path d="M420 -20 L380 420" stroke="#FFFFFF" strokeWidth="14" />
      <path d="M-20 200 L620 170" stroke="#FFFFFF" strokeWidth="9" />
      <rect x="250" y="95" width="110" height="60" rx="8" fill="#DCEBE5" />
      <rect x="440" y="100" width="120" height="58" rx="8" fill="#DCEBE5" />
      <rect x="20" y="140" width="80" height="50" rx="8" fill="#DCEBE5" />
      <rect x="245" y="190" width="120" height="70" rx="8" fill="#DCEBE5" />
      <rect x="440" y="180" width="110" height="40" rx="8" fill="#DCEBE5" />
      <rect x="30" y="20" width="80" height="80" rx="8" fill="#DCEBE5" />
    </svg>
  );
}

export function Contact({ t }: { t: Dictionary }) {
  return (
    <section id="kontakt" className="cv bg-sand py-[104px]">
      <div className="wrap flex flex-col gap-10">
        <div className="reveal flex max-w-[640px] flex-col gap-3.5">
          <span className="eyebrow">{t.conEyebrow}</span>
          <h2 className="h2">{t.conTitle}</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-6">
          <div className="card reveal flex min-h-[460px] flex-col overflow-hidden">
            <div className="relative min-h-[300px] flex-1 overflow-hidden bg-mint-100">
              <MapIllustration />
              <div className="absolute top-[46%] left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center gap-1.5">
                <span className="rounded-xl bg-white px-3 py-2 text-[13px] font-bold whitespace-nowrap shadow-[0_8px_20px_rgba(15,82,87,.18)]">
                  Dental Plaza · Paromlinska 27
                </span>
                <svg width="44" height="54" viewBox="0 0 44 54" aria-hidden="true">
                  <path d="M22 52s18-17.4 18-30A18 18 0 0 0 4 22c0 12.6 18 30 18 30z" fill="#0F5257" />
                  <circle cx="22" cy="22" r="7" fill="#FFFFFF" />
                </svg>
              </div>
              <a className="btn btn-p btn-s absolute bottom-5 left-5" href={CLINIC.maps} target="_blank" rel="noopener noreferrer">
                <MapIcon size={18} />
                {t.openMaps}
              </a>
            </div>
            <div className="grid grid-cols-[132px_1fr] items-center gap-4 p-[18px] max-[400px]:grid-cols-[96px_1fr]">
              <div className="relative h-[92px] w-full overflow-hidden rounded-[14px]">
                <Image src={exterior} alt={t.altExterior} fill sizes="132px" className="object-cover object-[50%_45%]" />
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-[17px]">{CLINIC.address}</strong>
                <span className="text-sm leading-normal text-muted">{t.exteriorCap}</span>
              </div>
            </div>
          </div>
          <div className="card reveal flex flex-col gap-[26px] p-8 max-[400px]:p-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-muted">{t.phoneLabel}</span>
              <a href={CLINIC.tel} className="text-[28px] font-bold tracking-[-0.01em] no-underline">
                {CLINIC.phoneDisplay}
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-muted">{t.hoursLabel}</span>
              <Hours />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <a className="btn btn-p btn-s" href={CLINIC.tel}>
                <PhoneIcon size={18} />
                {t.callShort}
              </a>
              <a className="btn btn-g btn-s" href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} />
                WhatsApp
              </a>
              <a className="btn btn-g btn-s" href={CLINIC.viber}>
                <ViberIcon size={18} />
                Viber
              </a>
              <a className="btn btn-g btn-s" href={CLINIC.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={18} />
                Instagram
              </a>
            </div>
            <BookButton className="btn btn-p w-full">{t.book}</BookButton>
          </div>
        </div>
      </div>
    </section>
  );
}
