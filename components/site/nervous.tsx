import Image from 'next/image';
import { BookButton } from '@/components/booking/book-button';
import { FeatureIcon } from '@/components/icons';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { CLINIC } from '@/lib/site';
import team from '@/public/images/team.jpg';

export function Nervous({ t }: { t: Dictionary }) {
  return (
    <section id="nervozni" className="cv bg-white py-[104px]">
      <div className="wrap split nervous-grid !items-start">
        <div className="reveal relative pr-7 pb-7 max-[980px]:order-1 max-[980px]:my-1">
          <div aria-hidden="true" className="absolute right-0 bottom-0 h-[70%] w-[70%] rounded-xl3 bg-sand" />
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-xl3">
            <Image
              src={team}
              alt={t.altTeam}
              fill
              sizes="(max-width: 980px) calc(100vw - 68px), 540px"
              placeholder="blur"
              className="object-cover object-[50%_45%]"
            />
          </div>
          <div className="absolute right-14 bottom-12 left-5 flex items-center gap-3.5 rounded-[20px] bg-white/95 px-5 py-[18px] shadow-[0_16px_36px_rgba(15,82,87,.16)]">
            <span className="flex size-11 flex-none items-center justify-center rounded-full bg-mint">
              <FeatureIcon name="srce" size={24} />
            </span>
            <p className="text-[15px] leading-[1.45] font-semibold">{t.fearFloat}</p>
          </div>
        </div>
        {/* On phones this column dissolves (.m-contents) so the photo sits right below the title. */}
        <div className="m-contents flex flex-col gap-[22px]">
          <span className="eyebrow reveal">{t.fearEyebrow}</span>
          <h2 className="h2 reveal">{t.fearTitle}</h2>
          <p className="lead reveal max-[980px]:order-2">{t.fearText}</p>
          <ol className="mt-2.5 mb-0 flex list-none flex-col p-0 max-[980px]:order-2">
            {t.fearSteps.map((st, i) => (
              <li key={st.title} className="reveal grid grid-cols-[48px_1fr] gap-[18px]">
                <div className="flex flex-col items-center">
                  <span className="flex size-12 flex-none items-center justify-center rounded-full bg-primary text-[17px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`min-h-6 w-0.5 flex-1 ${i === t.fearSteps.length - 1 ? 'bg-transparent' : 'bg-mint'}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5 pt-2.5 pb-7">
                  <strong className="text-lg">{st.title}</strong>
                  <span className="text-base leading-[1.6] text-muted">{st.text}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="reveal flex flex-wrap gap-2.5 max-[980px]:order-2">
            <span className="chip">{t.fearChip1}</span>
            <span className="chip">{t.fearChip2}</span>
            <span className="chip">{t.fearChip3}</span>
          </div>
          <div className="reveal flex flex-wrap gap-3 pt-2 max-[980px]:order-2">
            <BookButton serviceId="pregled" className="btn btn-p">
              {t.fearCta}
            </BookButton>
            <a className="btn btn-g max-w-full !whitespace-normal text-center" href={CLINIC.tel}>
              {t.fearCall}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
