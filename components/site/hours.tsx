'use client';

import { useI18n } from '@/lib/i18n';
import { cap } from '@/lib/i18n/dates';
import { fromIsoDay } from '@/lib/time';
import { useToday } from '@/lib/use-today';

/** Weekly hours; today's row (Europe/Sarajevo) is highlighted after hydration. */
export function Hours() {
  const { t } = useI18n();
  const today = useToday();
  const todayDow = today ? fromIsoDay(today).getUTCDay() : -1;
  return (
    <div className="flex flex-col gap-1">
      {[1, 2, 3, 4, 5, 6, 0].map((dw) => {
        const open = dw >= 1 && dw <= 5;
        const isToday = dw === todayDow;
        return (
          <div
            key={dw}
            className={`flex items-center justify-between rounded-xl px-3 py-[9px] text-[15px] ${isToday ? 'bg-mint-50 font-bold' : 'font-medium'}`}
          >
            <span className="flex items-center gap-2.5">
              {cap(t.dowLong[dw])}
              {isToday && (
                <span className="rounded-full bg-primary px-2 py-[3px] text-[11px] font-bold tracking-[0.06em] text-white uppercase">
                  {t.today}
                </span>
              )}
            </span>
            <span className={open ? 'text-ink' : 'text-muted'}>{open ? '10:00 – 18:00' : t.closed}</span>
          </div>
        );
      })}
    </div>
  );
}
