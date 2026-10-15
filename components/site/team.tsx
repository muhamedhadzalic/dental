import { BookButton } from '@/components/booking/book-button';
import { allDoctors } from '@/lib/data';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { LogoMark } from './logo';

export function Team({ t }: { t: Dictionary }) {
  return (
    <section id="tim" className="cv bg-sand py-[104px]">
      <div className="wrap flex flex-col gap-12">
        <div className="reveal flex max-w-[640px] flex-col gap-3.5">
          <span className="eyebrow">{t.teamEyebrow}</span>
          <h2 className="h2">{t.teamTitle}</h2>
          <p className="lead">{t.teamSub}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {allDoctors.map((d) => (
            <article key={d.id} className="card reveal flex flex-col overflow-hidden">
              <div aria-hidden="true" className="relative flex aspect-[4/3.4] items-center justify-center overflow-hidden bg-mint">
                <LogoMark width={340} height={158} className="absolute -right-[60px] -bottom-2.5 text-primary/[0.08]" />
                <span className="relative flex size-[132px] items-center justify-center rounded-full bg-white font-serif text-5xl font-medium text-primary shadow-[0_14px_30px_rgba(15,82,87,.12)]">
                  {d.initials}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h3 className="text-[22px] font-bold">{d.name}</h3>
                <span className="text-[15px] font-semibold text-primary">{d.title ?? t.docTitle}</span>
                <p className="flex-1 text-[15px] leading-[1.6] text-muted">{d.bio ?? t.docBio}</p>
                <BookButton doctor={d.id} className="btn btn-g btn-s mt-3 self-start" aria-label={`${t.bookDoc}: ${d.name}`}>
                  {t.bookDoc}
                </BookButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
