import { BookButton } from '@/components/booking/book-button';
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { CLINIC } from '@/lib/site';

/** Mobile-only bottom action bar (≤760px). The page reserves its height via `.page` padding. */
export function StickyBar({ t }: { t: Dictionary }) {
  return (
    <nav
      aria-label={t.quickActions}
      className="sticky-bar fixed inset-x-0 bottom-0 z-[60] grid-cols-[1.2fr_1fr_1fr] gap-2 border-t border-ink/[0.08] bg-white/[0.96] px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,82,87,.08)] backdrop-blur-md"
    >
      <BookButton className="btn btn-p !min-h-[52px] !px-3 !text-[15px]">
        <CalendarIcon size={18} />
        {t.barBook}
      </BookButton>
      <a className="btn btn-g !min-h-[52px] !gap-1.5 !px-1.5 !text-[15px]" href={CLINIC.tel}>
        <PhoneIcon size={18} />
        {t.barCall}
      </a>
      <a className="btn btn-g !min-h-[52px] !gap-1.5 !px-1.5 !text-[15px]" href={CLINIC.whatsapp} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon size={18} />
        WhatsApp
      </a>
    </nav>
  );
}
