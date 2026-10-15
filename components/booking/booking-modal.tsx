'use client';

import { useEffect, useRef } from 'react';
import { allDoctors, allServices, doctorById } from '@/lib/data';
import { useI18n } from '@/lib/i18n';
import { longDate, monthLabel, shortDate } from '@/lib/i18n/dates';
import { CLINIC } from '@/lib/site';
import { fromIsoDay, gcalStamp, hm } from '@/lib/time';
import type { DoctorChoice, Slot } from '@/lib/types';
import {
  ArrowRightIcon,
  CalendarPlusIcon,
  CheckIcon,
  ChevronLeftIcon,
  CloseIcon,
  FeatureIcon,
  PhoneIcon,
} from '@/components/icons';
import { Modal } from '@/components/ui/modal';
import { durationOf, useBooking, validate, type FieldKey } from './booking-provider';

export function BookingModal() {
  const { state, closeBooking, back, next, submit } = useBooking();
  const { t } = useI18n();
  const { step } = state;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new step's heading (and scroll to top) whenever the step changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    bodyRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const slot = currentSlot(state.availability, state.date, state.time);
  const canNext =
    step === 1 ? !!state.serviceId : step === 2 ? !!state.doctor : step === 3 ? !!(slot && slot.freeDoctorIds.length) : true;

  const chips: string[] = [];
  if (state.serviceId && step > 1) chips.push(t.services[state.serviceId][0]);
  if (state.doctor && step > 2) chips.push(state.doctor === 'any' ? t.anyDoc : doctorById(state.doctor).name);
  if (state.date && state.time != null && step > 3) chips.push(shortDate(fromIsoDay(state.date), t) + ' · ' + hm(state.time));

  const onSubmit = async () => {
    const ok = await submit();
    if (!ok) {
      // focus the first invalid field
      const v = validate(state.form);
      const order: [FieldKey, string][] = [
        ['name', 'bk-name'],
        ['phone', 'bk-phone'],
        ['email', 'bk-email'],
        ['consent', 'bk-consent'],
      ];
      const first = order.find(([k]) => v[k]);
      if (first) document.getElementById(first[1])?.focus();
    }
  };

  return (
    <Modal open={state.open} onClose={closeBooking} className="modal modal-in" labelledBy="bk-title">
          {/* header */}
          <div className="flex flex-none flex-col gap-3.5 px-[22px] pt-[18px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                {step > 1 && step < 5 && (
                  <button type="button" className="iconbtn" onClick={back} aria-label={t.backAria}>
                    <ChevronLeftIcon />
                  </button>
                )}
                <span id="bk-title" className="text-[17px] font-bold">
                  {t.bTitle}
                </span>
              </div>
              <button type="button" className="iconbtn" onClick={closeBooking} aria-label={t.close}>
                <CloseIcon />
              </button>
            </div>
            {step <= 4 && (
              <div className="flex flex-col gap-2.5 border-b border-line-soft pb-4">
                <div className="flex justify-between text-[13px] font-semibold text-muted">
                  <span>
                    {t.stepOf} {step}/4
                  </span>
                  <span className="text-primary">{t.stepNames[step - 1]}</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={4}
                  aria-valuenow={step}
                  aria-label={`${t.stepOf} ${step}/4`}
                  className="grid grid-cols-4 gap-1.5"
                >
                  {[1, 2, 3, 4].map((k) => (
                    <span
                      key={k}
                      className={`h-1.5 rounded-full transition-colors duration-200 ${k <= step ? 'bg-primary' : 'bg-line-faq'}`}
                    />
                  ))}
                </div>
                {chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-mint bg-mint-50 px-2.5 py-1 text-[13px] font-semibold text-primary"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* body */}
          <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto p-[22px]">
            {step === 1 && <StepService headingRef={headingRef} />}
            {step === 2 && <StepDoctor headingRef={headingRef} />}
            {step === 3 && <StepTime headingRef={headingRef} />}
            {step === 4 && <StepDetails headingRef={headingRef} />}
            {step === 5 && <StepConfirmed headingRef={headingRef} />}
            {step === 6 && <StepCancelled headingRef={headingRef} />}
          </div>

          {/* footer */}
          {step <= 4 && (
            <div className="flex flex-none items-center justify-between gap-3 border-t border-line-soft bg-white px-[22px] pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
              <span className="text-sm text-muted">{canNext && step < 4 ? '' : t.hints[step - 1]}</span>
              {step === 4 ? (
                <button type="button" className="btn btn-p" onClick={onSubmit}>
                  {t.submit}
                </button>
              ) : (
                <button type="button" className="btn btn-p" onClick={() => void next()} disabled={!canNext}>
                  {t.nextBtn}
                  <ArrowRightIcon size={18} />
                </button>
              )}
            </div>
          )}
        </Modal>
  );
}

function currentSlot(availability: ReturnType<typeof useBooking>['state']['availability'], date: string | null, time: number | null) {
  if (!availability || !date || time == null) return undefined;
  return availability.find((d) => d.date === date)?.slots.find((s) => s.startMin === time);
}

type StepProps = { headingRef: React.RefObject<HTMLHeadingElement | null> };

function StepHeading({ headingRef, children }: StepProps & { children: React.ReactNode }) {
  return (
    <h2 ref={headingRef} tabIndex={-1} className="text-[26px] font-bold tracking-[-0.01em] focus:outline-none">
      {children}
    </h2>
  );
}

function CheckDot({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-6 flex-none items-center justify-center rounded-full border-2 text-white ${
        on ? 'border-primary bg-primary' : 'border-line bg-white'
      }`}
    >
      <CheckIcon size={14} strokeWidth={3} />
    </span>
  );
}

function StepService({ headingRef }: StepProps) {
  const { state, pickService } = useBooking();
  const { t } = useI18n();
  return (
    <div className="stepin flex flex-col gap-[18px]">
      <StepHeading headingRef={headingRef}>{t.q1}</StepHeading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-2.5">
        {allServices.map((s) => {
          const on = state.serviceId === s.id;
          return (
            <button key={s.id} type="button" className="opt" aria-pressed={on} onClick={() => pickService(s.id)}>
              <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-mint">
                <FeatureIcon name={s.id} size={24} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <strong className="text-base">{t.services[s.id][0]}</strong>
                <span className="text-sm text-muted">
                  {s.durationMin} {t.min} · {t.from} {s.priceFrom ?? t.pricePlaceholder} {t.currency}
                </span>
              </span>
              <CheckDot on={on} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDoctor({ headingRef }: StepProps) {
  const { state, pickDoctor } = useBooking();
  const { t } = useI18n();
  const options: { id: DoctorChoice; name: string; sub: string; ini: string }[] = [
    { id: 'any', name: t.anyDoc, sub: t.anyDocSub, ini: '✱' },
    ...allDoctors.map((d) => ({ id: d.id, name: d.name, sub: d.title ?? t.docTitle, ini: d.initials })),
  ];
  return (
    <div className="stepin flex flex-col gap-[18px]">
      <StepHeading headingRef={headingRef}>{t.q2}</StepHeading>
      <div className="flex flex-col gap-2.5">
        {options.map((d) => {
          const on = state.doctor === d.id;
          return (
            <button key={d.id} type="button" className="opt" aria-pressed={on} onClick={() => pickDoctor(d.id)}>
              <span
                aria-hidden="true"
                className={`flex size-[52px] flex-none items-center justify-center rounded-full font-serif text-xl font-semibold text-primary ${
                  d.id === 'any' ? 'bg-stone' : 'bg-mint'
                }`}
              >
                {d.ini}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <strong className="text-[17px]">{d.name}</strong>
                <span className="text-sm text-muted">{d.sub}</span>
              </span>
              <CheckDot on={on} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTime({ headingRef }: StepProps) {
  const { state, pickDate, pickTime } = useBooking();
  const { t, lang } = useI18n();
  const days = state.availability ?? [];
  const selIdx = days.findIndex((d) => d.date === state.date);
  const selDay = selIdx >= 0 ? days[selIdx] : null;
  const anyFree = !!selDay && selDay.slots.some((s) => s.freeDoctorIds.length);
  const nearest = selDay && !anyFree ? days.slice(selIdx + 1).find((d) => !d.closed && d.slots.some((s) => s.freeDoctorIds.length)) : undefined;
  const monthDate = fromIsoDay(selDay?.date ?? days[0]?.date ?? state.windowStart ?? '2026-01-01');

  const slotBtn = (s: Slot) => {
    const taken = s.freeDoctorIds.length === 0;
    const on = state.time === s.startMin && !taken;
    return (
      <button
        key={s.startMin}
        type="button"
        className="slot"
        disabled={taken}
        aria-pressed={on}
        aria-label={`${hm(s.startMin)} – ${taken ? t.taken : t.free}`}
        onClick={() => pickTime(s.startMin)}
      >
        {hm(s.startMin)}
      </button>
    );
  };
  const am = anyFree ? selDay!.slots.filter((s) => s.startMin < 720) : [];
  const pm = anyFree ? selDay!.slots.filter((s) => s.startMin >= 720) : [];

  return (
    <div className="stepin flex flex-col gap-5">
      <StepHeading headingRef={headingRef}>{t.q3}</StepHeading>
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-semibold text-muted">{monthLabel(monthDate, t)}</span>
        <div role="listbox" aria-label={t.datePick} className="flex snap-x snap-proximity gap-2 overflow-x-auto px-0.5 pt-0.5 pb-2.5">
          {days.map((d) => {
            const date = fromIsoDay(d.date);
            const on = state.date === d.date;
            return (
              <button
                key={d.date}
                type="button"
                role="option"
                aria-selected={on}
                className="day snap-start"
                disabled={d.closed}
                aria-label={longDate(date, t, lang) + (d.closed ? ' – ' + t.closed : '')}
                onClick={() => pickDate(d.date)}
              >
                <span className="text-xs font-semibold tracking-[0.04em] uppercase opacity-85">{t.dow[date.getUTCDay()]}</span>
                <span className="text-[22px] leading-[1.1] font-bold">{date.getUTCDate()}</span>
                <span className="text-[11px] font-semibold opacity-80">{d.closed ? t.closed : t.mon[date.getUTCMonth()]}</span>
              </button>
            );
          })}
        </div>
      </div>
      {selDay && (
        <div className="flex flex-col gap-4">
          {!anyFree && (
            <div className="stepin flex flex-col items-start gap-3.5 rounded-[18px] bg-sand p-[22px]">
              <span className="flex size-11 items-center justify-center rounded-full bg-white">
                <FeatureIcon name="sat" />
              </span>
              <p className="text-base leading-[1.55] font-semibold" role="status">
                {t.noSlotsA} {nearest ? longDate(fromIsoDay(nearest.date), t, lang) : '—'}
              </p>
              {nearest && (
                <button type="button" className="btn btn-g btn-s" onClick={() => pickDate(nearest.date)}>
                  {t.showNearest}
                </button>
              )}
            </div>
          )}
          {am.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-muted">{t.morning}</span>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(86px,1fr))] gap-2">{am.map(slotBtn)}</div>
            </div>
          )}
          {pm.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold text-muted">{t.afternoon}</span>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(86px,1fr))] gap-2">{pm.map(slotBtn)}</div>
            </div>
          )}
          {anyFree && (
            <div className="flex flex-wrap gap-[18px] text-[13px] text-muted">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3.5 rounded border-[1.5px] border-line-slot" />
                {t.legendFree}
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3.5 rounded bg-stone" />
                {t.legendTaken}
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3.5 rounded bg-primary" />
                {t.legendSel}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StepDetails({ headingRef }: StepProps) {
  const { state, setField, touch } = useBooking();
  const { t } = useI18n();
  const f = state.form;
  const v = validate(f);
  const show = (k: FieldKey) => v[k] && (state.tried || !!state.touched[k]);
  const showConsent = v.consent && state.tried;

  return (
    <div className="stepin flex flex-col gap-[18px]">
      <StepHeading headingRef={headingRef}>{t.q4}</StepHeading>
      <div className="field">
        <label htmlFor="bk-name">{t.fName}</label>
        <input
          id="bk-name"
          className="inp"
          type="text"
          autoComplete="name"
          value={f.name}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => touch('name')}
          aria-invalid={show('name')}
          aria-describedby={show('name') ? 'bk-name-err' : undefined}
        />
        {show('name') && (
          <span id="bk-name-err" className="err" role="alert">
            {t.eName}
          </span>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        <div className="field">
          <label htmlFor="bk-phone">{t.fPhone}</label>
          <input
            id="bk-phone"
            className="inp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={f.phone}
            onChange={(e) => setField('phone', e.target.value)}
            onBlur={() => touch('phone')}
            aria-invalid={show('phone')}
            aria-describedby={show('phone') ? 'bk-phone-err' : undefined}
          />
          {show('phone') && (
            <span id="bk-phone-err" className="err" role="alert">
              {t.ePhone}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="bk-email">{t.fEmail}</label>
          <input
            id="bk-email"
            className="inp"
            type="email"
            autoComplete="email"
            value={f.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => touch('email')}
            aria-invalid={show('email')}
            aria-describedby={show('email') ? 'bk-email-err' : undefined}
          />
          {show('email') && (
            <span id="bk-email-err" className="err" role="alert">
              {t.eEmail}
            </span>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="bk-note">{t.fNote}</label>
        <textarea
          id="bk-note"
          className="inp"
          placeholder={t.fNotePh}
          value={f.note}
          onChange={(e) => setField('note', e.target.value)}
        />
      </div>
      <label className="check" htmlFor="bk-urgent">
        <input id="bk-urgent" type="checkbox" checked={f.urgent} onChange={() => setField('urgent', !f.urgent)} />
        <span className="font-semibold">{t.fUrgent}</span>
      </label>
      {f.urgent && (
        <div
          role="status"
          ref={(el) => el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })}
          className="stepin flex flex-col gap-3 rounded-[18px] border border-warn-line bg-warn-50 p-[18px]"
        >
          <div className="flex items-start gap-3">
            <span className="flex size-10 flex-none items-center justify-center rounded-full bg-white">
              <FeatureIcon name="hitni" size={22} />
            </span>
            <p className="text-[15px] leading-[1.55]">{t.urgentNote}</p>
          </div>
          <a className="btn btn-p btn-s self-start" href={CLINIC.tel}>
            <PhoneIcon size={18} />
            {t.urgentCall}
          </a>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="check" htmlFor="bk-consent">
          <input
            id="bk-consent"
            type="checkbox"
            checked={f.consent}
            onChange={() => setField('consent', !f.consent)}
            aria-invalid={showConsent}
            aria-describedby={showConsent ? 'bk-consent-err' : undefined}
          />
          <span>
            {t.fConsent} <a href="#top">{t.privacy}</a>
          </span>
        </label>
        {showConsent && (
          <span id="bk-consent-err" className="err" role="alert">
            {t.eConsent}
          </span>
        )}
      </div>
    </div>
  );
}

function StepConfirmed({ headingRef }: StepProps) {
  const { state, closeBooking, changeBooking, cancelBooking } = useBooking();
  const { t, lang } = useI18n();
  if (!state.serviceId || !state.date || state.time == null) return null;
  const dur = durationOf(state.serviceId);
  const d = fromIsoDay(state.date);
  const end = state.time + dur;
  const svcName = t.services[state.serviceId][0];
  const assigned = state.assignedDoctor ? doctorById(state.assignedDoctor) : null;
  const firstName = state.form.name.trim().split(/\s+/)[0] || '';

  // Opening Google Calendar is a user-initiated link; it contains only service, time and address – no personal data.
  const calUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('Dental Plaza – ' + svcName) +
    '&dates=' +
    gcalStamp(d, state.time) +
    '/' +
    gcalStamp(d, end) +
    '&ctz=Europe/Sarajevo&location=' +
    encodeURIComponent('Dental Plaza, ' + CLINIC.address) +
    '&details=' +
    encodeURIComponent(CLINIC.phoneDisplay);

  const rows = [
    { k: t.rService, v: svcName },
    {
      k: t.rDoctor,
      v: assigned ? assigned.name + (state.doctor === 'any' ? ' (' + t.firstFree + ')' : '') : t.anyDoc,
    },
    { k: t.rDate, v: longDate(d, t, lang, true) },
    { k: t.rTime, v: `${hm(state.time)} – ${hm(end)} (${dur} ${t.min})` },
    { k: t.rAddr, v: CLINIC.addressShort },
  ];

  return (
    <div className="stepin flex flex-col items-center gap-[22px] pt-2 pb-3 text-center">
      <span className="flex size-[84px] items-center justify-center rounded-full bg-mint text-primary shadow-[0_0_0_12px_#F1FAF7]">
        <CheckIcon size={40} strokeWidth={2.4} />
      </span>
      <div className="flex max-w-[460px] flex-col gap-2.5">
        <h2 ref={headingRef} tabIndex={-1} className="text-[28px] font-bold tracking-[-0.01em] focus:outline-none">
          {t.okTitle}
        </h2>
        <p className="lead !text-[17px]">
          {t.okThanksA} {firstName}! {t.okSms}
        </p>
      </div>
      <div className="w-full max-w-[480px] rounded-card bg-sand px-5 py-2 text-left">
        {rows.map((r) => (
          <div key={r.k} className="flex justify-between gap-4 border-b border-line-warm py-[13px] text-[15px]">
            <span className="text-muted">{r.k}</span>
            <strong className="text-right">{r.v}</strong>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 py-[13px] text-[15px]">
          <span className="text-muted">{t.rStatus}</span>
          <span className="rounded-full bg-pending-50 px-2.5 py-0.5 text-[13px] font-bold text-pending-ink">{t.rPending}</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        <a className="btn btn-p btn-s" href={calUrl} target="_blank" rel="noopener noreferrer">
          <CalendarPlusIcon size={18} />
          {t.addCal}
        </a>
        <button type="button" className="btn btn-g btn-s" onClick={closeBooking}>
          {t.done}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-[22px]">
        <button type="button" className="tlink" onClick={changeBooking}>
          {t.change}
        </button>
        <button type="button" className="tlink !text-danger" onClick={cancelBooking}>
          {t.cancel}
        </button>
      </div>
    </div>
  );
}

function StepCancelled({ headingRef }: StepProps) {
  const { restart } = useBooking();
  const { t } = useI18n();
  return (
    <div className="stepin flex flex-col items-center gap-[18px] py-10 text-center">
      <span className="flex size-[72px] items-center justify-center rounded-full bg-stone text-muted">
        <CloseIcon size={32} />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold focus:outline-none">
        {t.cancelledTitle}
      </h2>
      <p className="lead max-w-[400px] !text-base">{t.cancelledText}</p>
      <button type="button" className="btn btn-p btn-s" onClick={restart}>
        {t.newBooking}
      </button>
    </div>
  );
}
