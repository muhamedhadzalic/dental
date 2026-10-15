'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useBooking } from '@/components/booking/booking-provider';
import { ChevronLeftIcon, CloseIcon } from '@/components/icons';
import { allDoctors, getBookingRequests, getWeekAppointments, serviceById } from '@/lib/data';
import { fmt, useI18n } from '@/lib/i18n';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { fromIsoDay, hm } from '@/lib/time';
import type { Appointment, AppointmentStatus, BookingRequest } from '@/lib/types';
import { useToday } from '@/lib/use-today';

const PX_PER_HOUR = 64;
const GRID_TOP = 8;

const apptStyle: Record<AppointmentStatus, { bg: string; fg: string; border: string; strike: boolean }> = {
  confirmed: { bg: '#0F5257', fg: '#FFFFFF', border: '1.5px solid #0F5257', strike: false },
  pending: { bg: '#FCEBD5', fg: '#5C3A10', border: '1.5px dashed #C9873D', strike: false },
  no_show: { bg: '#E4E2DE', fg: '#4A5456', border: '1.5px solid #D2CFC9', strike: true },
};
const chipStyle: Record<AppointmentStatus, string> = {
  confirmed: 'bg-mint text-primary',
  pending: 'bg-pending text-pending-ink',
  no_show: 'bg-noshow text-noshow-ink',
};

function statusLabel(s: AppointmentStatus, a: Dictionary['admin']) {
  return s === 'confirmed' ? a.legendConfirmed : s === 'pending' ? a.legendPending : a.legendNoShow;
}

export function AdminCalendar() {
  const { t, lang } = useI18n();
  const a = t.admin;
  const today = useToday();
  const { submitted, removeSubmitted } = useBooking();

  const [weekDates, setWeekDates] = useState<string[]>([]);
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [reqs, setReqs] = useState<BookingRequest[]>([]);
  const [now, setNow] = useState(0);
  const [day, setDay] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  // Load the mock week once we know "today" (client only).
  useEffect(() => {
    if (!today) return;
    let alive = true;
    const ts = Date.now();
    Promise.all([getWeekAppointments(today), getBookingRequests(today, ts)]).then(([week, requests]) => {
      if (!alive) return;
      setWeekDates(week.weekDates);
      setAppts(week.appointments);
      setReqs(requests);
      setNow(ts);
      const dow = fromIsoDay(today).getUTCDay();
      setDay(dow >= 1 && dow <= 5 ? dow - 1 : 0);
    });
    return () => {
      alive = false;
    };
  }, [today]);

  // Requests made on the public site in this session (local state only) appear on top.
  const allReqs = useMemo(() => [...submitted, ...reqs], [submitted, reqs]);

  const fmtDate = (iso: string) => {
    const d = fromIsoDay(iso);
    return d.getUTCDate() + '. ' + t.mon[d.getUTCMonth()];
  };
  const dowOf = (iso: string) => {
    const d = fromIsoDay(iso).getUTCDay();
    return d >= 1 && d <= 5 ? a.dowFull[d - 1] : t.dowLong[d];
  };
  const svcLabel = (id: Appointment['serviceId']) => a.svc[id];
  const docName = (id: string) => allDoctors.find((d) => d.id === id)!.name;
  const ago = (ms: number) => {
    const m = Math.max(0, Math.round((now - ms) / 60000));
    if (m < 1) return a.justNow;
    return m < 60 ? fmt(a.agoMin, { n: m }) : fmt(a.agoHour, { n: Math.round(m / 60) });
  };

  const dayDate = weekDates[day];
  const todays = appts.filter((x) => x.date === dayDate);
  const total = appts.length;
  const confirmed = appts.filter((x) => x.status === 'confirmed').length;
  const pending = appts.filter((x) => x.status === 'pending').length;
  const noShow = appts.filter((x) => x.status === 'no_show').length;
  const counts = new Map<string, number>();
  appts.forEach((x) => counts.set(x.serviceId, (counts.get(x.serviceId) ?? 0) + 1));
  const top = [...counts.entries()].sort((x, y) => y[1] - x[1])[0];
  const selA = appts.find((x) => x.id === sel);

  const setStatus = (status: AppointmentStatus) =>
    setAppts((list) => list.map((x) => (x.id === sel ? { ...x, status } : x)));

  const confirmReq = (r: BookingRequest) => {
    const id = 'req-' + r.id;
    setAppts((list) => [
      ...list,
      { id, date: r.date, doctorId: r.doctorId, startMin: r.startMin, serviceId: r.serviceId, patient: r.patient, status: 'confirmed' },
    ]);
    dropReq(r);
    const idx = weekDates.indexOf(r.date);
    if (idx >= 0) {
      setDay(idx);
      setSel(id);
    }
    setToast(fmt(a.toastOk, { name: r.patient }));
  };
  const rejectReq = (r: BookingRequest) => {
    dropReq(r);
    setToast(a.toastNo);
  };
  const dropReq = (r: BookingRequest) => {
    if (submitted.some((s) => s.id === r.id)) removeSubmitted(r.id);
    else setReqs((list) => list.filter((x) => x.id !== r.id));
  };

  const hours = Array.from({ length: 9 }, (_, i) => 10 + i);

  return (
    <div className="flex min-h-screen flex-col bg-sand">
      <div className="bg-ink px-4 py-1.5 text-center text-[12px] font-semibold tracking-[0.04em] text-mint-300">{t.demoBanner}</div>
      <header className="border-b border-line-warm bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-7 py-3.5 max-[760px]:px-4">
          <div className="flex items-center gap-3.5">
            <span className="font-serif text-lg font-semibold tracking-[0.12em] text-primary">DENTAL PLAZA</span>
            <span className="rounded-full bg-mint px-2.5 py-[5px] text-xs font-bold tracking-[0.08em] text-primary uppercase">{a.badge}</span>
          </div>
          <nav aria-label="Admin" className="flex flex-wrap gap-1.5">
            <span aria-current="page" className="rounded-[10px] bg-mint-50 px-3.5 py-2.5 text-sm font-bold text-primary">
              {a.navCalendar}
            </span>
            <span className="rounded-[10px] px-3.5 py-2.5 text-sm font-semibold text-muted">{a.navPatients}</span>
            <span className="rounded-[10px] px-3.5 py-2.5 text-sm font-semibold text-muted">{a.navSettings}</span>
          </nav>
          <div className="flex items-center gap-3">
            <Link className="ab ab-g" href={lang === 'en' ? '/en' : '/'}>
              <ChevronLeftIcon size={16} strokeWidth={2} />
              {a.back}
            </Link>
            <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              DP
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-7 pt-6 pb-10 max-[760px]:px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[28px] font-bold tracking-[-0.01em]">{a.heading}</h1>
            <span className="min-h-[1.5em] text-[15px] text-muted">
              {weekDates.length > 0 &&
                fmt(a.week, {
                  from: fmtDate(weekDates[0]),
                  to: fmtDate(weekDates[4]),
                  year: fromIsoDay(weekDates[4]).getUTCFullYear(),
                })}
            </span>
          </div>
          <div className="flex flex-wrap gap-3.5 text-[13px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-3.5 rounded bg-primary" />
              {a.legendConfirmed}
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-3.5 rounded border-[1.5px] border-dashed border-pending-line bg-pending" />
              {a.legendPending}
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-3.5 rounded bg-noshow" />
              {a.legendNoShow}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
          <div className="panel flex flex-col gap-2 p-5">
            <span className="text-sm font-semibold text-muted">{a.statWeek}</span>
            <span className="text-[34px] font-bold tracking-[-0.02em]">{total}</span>
            <span className="text-[13px] text-muted">{fmt(a.statWeekSub, { c: confirmed, p: pending })}</span>
          </div>
          <div className="panel flex flex-col gap-2 p-5">
            <span className="text-sm font-semibold text-muted">{a.statTop}</span>
            <span className="text-[22px] leading-[1.25] font-bold">
              {top ? svcLabel(top[0] as Appointment['serviceId']).replace(a.topSuffix, '') : '—'}
            </span>
            <span className="text-[13px] text-muted">{fmt(a.statTopSub, { n: top?.[1] ?? 0 })}</span>
          </div>
          <div className="panel flex flex-col gap-2 p-5">
            <span className="text-sm font-semibold text-muted">{a.statNoShow}</span>
            <span className="text-[34px] font-bold tracking-[-0.02em]">
              {total ? Math.round((noShow / total) * 1000) / 10 : 0} %
            </span>
            <span className="text-[13px] text-muted">{fmt(a.statNoShowSub, { n: noShow })}</span>
          </div>
          <div className="panel flex flex-col gap-2 !bg-primary p-5 text-white">
            <span className="text-sm font-semibold text-mint">{a.statReq}</span>
            <span className="text-[34px] font-bold tracking-[-0.02em]">{allReqs.length}</span>
            <span className="text-[13px] text-mint">{a.statReqSub}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-start gap-5">
          <section className="panel min-w-0 flex-[999_1_640px] p-4" aria-label={a.calendar}>
            <div role="tablist" aria-label={a.weekdays} className="flex gap-1.5 overflow-x-auto border-b border-line-grid pb-3">
              {weekDates.map((iso, k) => {
                const on = day === k;
                return (
                  <button
                    key={iso}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className="tab min-w-[120px]"
                    onClick={() => {
                      setDay(k);
                      setSel(null);
                    }}
                  >
                    <span className="text-[13px] font-semibold text-muted">{a.dowFull[k]}</span>
                    <span className={`text-base font-bold ${on ? 'text-primary' : 'text-ink'}`}>
                      {fmtDate(iso)}{' '}
                      <span className="text-xs font-semibold text-muted">
                        · {appts.filter((x) => x.date === iso).length} {a.apptCount}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="overflow-x-auto" role="tabpanel">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[64px_repeat(3,minmax(0,1fr))] pt-3 pb-2">
                  <span />
                  {allDoctors.map((d) => (
                    <div key={d.id} className="flex items-center gap-2.5 px-2">
                      <span aria-hidden="true" className="flex size-[34px] items-center justify-center rounded-full bg-mint font-serif text-sm font-semibold text-primary">
                        {d.initials}
                      </span>
                      <span className="flex flex-col">
                        <strong className="text-sm">{d.name}</strong>
                        <span className="text-xs text-muted">
                          {todays.filter((x) => x.doctorId === d.id).length} {a.apptCount}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="relative grid grid-cols-[64px_repeat(3,minmax(0,1fr))]">
                  <div className="relative h-[528px]">
                    {hours.map((h) => (
                      <span
                        key={h}
                        className="absolute right-2.5 -translate-y-1/2 text-xs font-semibold text-muted"
                        style={{ top: GRID_TOP + (h - 10) * PX_PER_HOUR }}
                      >
                        {h}:00
                      </span>
                    ))}
                  </div>
                  {allDoctors.map((d) => (
                    <div
                      key={d.id}
                      className="relative h-[528px] border-l border-line-grid"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to bottom, #F0ECE5 0, #F0ECE5 1px, transparent 1px, transparent 64px)',
                        backgroundPosition: '0 8px',
                      }}
                    >
                      {todays
                        .filter((x) => x.doctorId === d.id)
                        .map((x) => {
                          const dur = serviceById(x.serviceId).durationMin;
                          const s = apptStyle[x.status];
                          return (
                            <button
                              key={x.id}
                              type="button"
                              className="appt"
                              onClick={() => setSel(x.id)}
                              aria-label={`${hm(x.startMin)}, ${x.patient}, ${svcLabel(x.serviceId)}, ${statusLabel(x.status, a)}`}
                              aria-pressed={sel === x.id}
                              style={{
                                top: GRID_TOP + ((x.startMin - 600) / 60) * PX_PER_HOUR,
                                height: (dur / 60) * PX_PER_HOUR - 4,
                                background: s.bg,
                                color: s.fg,
                                border: s.border,
                                boxShadow: sel === x.id ? '0 0 0 3px #1B2A2C' : undefined,
                              }}
                            >
                              <strong className="text-xs" style={{ textDecoration: s.strike ? 'line-through' : undefined }}>
                                {hm(x.startMin)} · {x.patient}
                              </strong>
                              <span className="opacity-90">{svcLabel(x.serviceId)}</span>
                            </button>
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
            {selA && (
              <section className="panel flex flex-col gap-3.5 p-5" aria-label={a.details}>
                <div className="flex items-center justify-between">
                  <h2 className="text-[17px] font-bold">{a.details}</h2>
                  <button type="button" className="ab ab-g !min-h-11 !w-11 !p-0" onClick={() => setSel(null)} aria-label={a.closeDetails}>
                    <CloseIcon size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-1">
                  <strong className="text-lg">{selA.patient}</strong>
                  <span className="text-sm text-muted">
                    {svcLabel(selA.serviceId)} · {docName(selA.doctorId)}
                  </span>
                  <span className="text-sm text-muted">
                    {dowOf(selA.date)}, {fmtDate(selA.date)} · {hm(selA.startMin)} –{' '}
                    {hm(selA.startMin + serviceById(selA.serviceId).durationMin)}
                  </span>
                </div>
                <span className={`self-start rounded-full px-2.5 py-1 text-xs font-bold ${chipStyle[selA.status]}`} role="status">
                  {statusLabel(selA.status, a)}
                </span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="ab ab-p" onClick={() => setStatus('confirmed')}>
                    {a.confirm}
                  </button>
                  <button type="button" className="ab ab-g" onClick={() => setStatus('no_show')}>
                    {a.markNoShow}
                  </button>
                </div>
              </section>
            )}

            <section className="panel flex flex-col gap-3.5 p-5" aria-label={a.requests}>
              <div className="flex items-center justify-between">
                <h2 className="text-[17px] font-bold">{a.requests}</h2>
                <span className="rounded-full bg-pending px-2.5 py-[3px] text-[13px] font-bold text-pending-ink">{allReqs.length}</span>
              </div>
              {allReqs.length === 0 && weekDates.length > 0 && (
                <p className="py-[18px] text-center text-sm text-muted">{a.allDone}</p>
              )}
              {allReqs.map((r) => (
                <article key={r.id} className="flex flex-col gap-2.5 rounded-2xl border border-line-warm p-3.5">
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <strong className="text-[15px]">{r.patient}</strong>
                      <span className="text-[13px] text-muted">{r.phone}</span>
                    </div>
                    <span className="text-xs whitespace-nowrap text-muted">{ago(r.createdAt)}</span>
                  </div>
                  <div className="text-sm leading-normal">
                    <div>
                      <strong>{svcLabel(r.serviceId)}</strong> · {docName(r.doctorId)}
                    </div>
                    <div className="text-muted">
                      {dowOf(r.date)}, {fmtDate(r.date)} {a.at} {hm(r.startMin)}
                    </div>
                  </div>
                  {r.urgent && (
                    <span className="self-start rounded-full bg-danger-50 px-2.5 py-[3px] text-xs font-bold text-danger">{a.urgent}</span>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="ab ab-p" onClick={() => confirmReq(r)}>
                      {a.confirm}
                    </button>
                    <button type="button" className="ab ab-d" onClick={() => rejectReq(r)}>
                      {a.reject}
                    </button>
                  </div>
                </article>
              ))}
              {toast && (
                <p role="status" className="rounded-[10px] bg-mint-50 px-3 py-2.5 text-[13px] font-semibold text-primary">
                  {toast}
                </p>
              )}
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
