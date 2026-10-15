import { BookingModalLazy } from '@/components/booking/booking-modal-lazy';
import { AnchorFix } from '@/components/site/anchor-fix';
import { Contact } from '@/components/site/contact';
import { Faq } from '@/components/site/faq';
import { Footer } from '@/components/site/footer';
import { Gallery } from '@/components/site/gallery';
import { Header } from '@/components/site/header';
import { Hero, TrustBar } from '@/components/site/hero';
import { HollywoodSmile } from '@/components/site/hollywood-smile';
import { Nervous } from '@/components/site/nervous';
import { Reviews } from '@/components/site/reviews';
import { Services } from '@/components/site/services';
import { StickyBar } from '@/components/site/sticky-bar';
import { Team } from '@/components/site/team';
import { getDictionary, type Lang } from '@/lib/i18n/dictionaries';

/** Public website (desktop + mobile). Static sections render on the server; interactive parts are client islands. */
export function HomePage({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  return (
    <div className="page min-h-full bg-white" id="top">
      <div className="bg-ink px-4 py-1.5 text-center text-[12px] font-semibold tracking-[0.04em] text-mint-300">{t.demoBanner}</div>
      <Header />
      <main>
        <Hero t={t} />
        <TrustBar t={t} />
        <Services t={t} />
        <HollywoodSmile t={t} />
        <Nervous t={t} />
        <Team t={t} />
        <Reviews t={t} />
        <Gallery />
        <Faq />
        <Contact t={t} />
      </main>
      <Footer t={t} lang={lang} />
      <StickyBar t={t} />
      <BookingModalLazy />
      <AnchorFix />
    </div>
  );
}
