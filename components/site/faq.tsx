'use client';

import { useState } from 'react';
import { PlusIcon, WhatsAppDetailIcon } from '@/components/icons';
import { useI18n } from '@/lib/i18n';
import { CLINIC } from '@/lib/site';

export function Faq() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faq" className="cv bg-white py-[104px]">
      <div className="wrap split !items-start">
        <div className="reveal flex flex-col gap-[18px]">
          <span className="eyebrow">{t.faqEyebrow}</span>
          <h2 className="h2">{t.faqTitle}</h2>
          <p className="lead">{t.faqSub}</p>
          <div className="flex flex-wrap gap-3 pt-1.5">
            <a className="btn btn-g" href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
              <WhatsAppDetailIcon />
              {t.askWa}
            </a>
          </div>
        </div>
        <div className="flex flex-col border-t border-line-faq">
          {t.faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q} className="border-b border-line-faq">
                <h3 className="m-0 text-[length:inherit]">
                  <button
                    type="button"
                    className="faq-q"
                    id={`faq-q-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpenIdx(open ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden="true"
                      className={`flex size-9 flex-none items-center justify-center rounded-full text-primary transition-[transform,background] duration-200 ${
                        open ? 'rotate-45 bg-mint' : 'bg-stone'
                      }`}
                    >
                      <PlusIcon size={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  hidden={!open}
                  className="stepin pr-14 pb-6 pl-1 text-base leading-[1.7] text-muted max-[760px]:pr-4"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
