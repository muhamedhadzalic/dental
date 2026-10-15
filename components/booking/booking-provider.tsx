'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getAvailableSlots, serviceById, submitBookingRequest } from '@/lib/data';
import { addDays, isoDay, sarajevoToday } from '@/lib/time';
import type { BookingRequest, DayAvailability, DoctorChoice, DoctorId, ServiceId } from '@/lib/types';

/** How many calendar days ahead patients can book (starting tomorrow). */
export const BOOKING_WINDOW_DAYS = 14;

export type BookingForm = {
  name: string;
  phone: string;
  email: string;
  note: string;
  urgent: boolean;
  consent: boolean;
};
export type FieldKey = 'name' | 'phone' | 'email' | 'consent';

/** 1–4 = steps, 5 = confirmation, 6 = cancelled */
export type Step = 1 | 2 | 3 | 4 | 5 | 6;

type State = {
  open: boolean;
  step: Step;
  serviceId: ServiceId | null;
  doctor: DoctorChoice | null;
  date: string | null;
  time: number | null;
  form: BookingForm;
  touched: Partial<Record<FieldKey, boolean>>;
  tried: boolean;
  /** first bookable day (tomorrow, Sarajevo) */
  windowStart: string | null;
  availability: DayAvailability[] | null;
  /** the doctor actually assigned when the request was submitted */
  assignedDoctor: DoctorId | null;
  lastRequestId: string | null;
};

const initialForm: BookingForm = { name: '', phone: '+387 ', email: '', note: '', urgent: false, consent: false };

const initialState: State = {
  open: false,
  step: 1,
  serviceId: null,
  doctor: null,
  date: null,
  time: null,
  form: initialForm,
  touched: {},
  tried: false,
  windowStart: null,
  availability: null,
  assignedDoctor: null,
  lastRequestId: null,
};

export function validate(f: BookingForm): Record<FieldKey, boolean> {
  const digits = f.phone.replace(/\D/g, '');
  const name = f.name.trim();
  return {
    name: name.split(/\s+/).filter(Boolean).length < 2 || name.length < 4,
    phone: digits.length < 11 || digits.length > 13,
    email: f.email.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()),
    consent: !f.consent,
  };
}

type Ctx = {
  state: State;
  /** Requests submitted in this browser session (shown in the admin demo). Never sent anywhere. */
  submitted: BookingRequest[];
  openBooking: (pre?: { serviceId?: ServiceId; doctor?: DoctorId }) => void;
  closeBooking: () => void;
  pickService: (id: ServiceId) => void;
  pickDoctor: (d: DoctorChoice) => void;
  pickDate: (iso: string) => void;
  pickTime: (min: number) => void;
  setField: <K extends keyof BookingForm>(k: K, v: BookingForm[K]) => void;
  touch: (k: FieldKey) => void;
  next: () => Promise<void>;
  back: () => void;
  submit: () => Promise<boolean>;
  changeBooking: () => void;
  cancelBooking: () => void;
  restart: () => void;
  removeSubmitted: (id: string) => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const [submitted, setSubmitted] = useState<BookingRequest[]>([]);
  const stateRef = useRef(state);
  useLayoutEffect(() => {
    stateRef.current = state;
  });

  const patch = useCallback((p: Partial<State> | ((s: State) => Partial<State>)) => {
    setState((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }));
  }, []);

  const loadAvailability = useCallback(async (serviceId: ServiceId, doctor: DoctorChoice, windowStart: string) => {
    return getAvailableSlots({ serviceId, doctor, fromDate: windowStart, days: BOOKING_WINDOW_DAYS });
  }, []);

  const openBooking = useCallback<Ctx['openBooking']>(
    (pre = {}) => {
      patch((s) => {
        const fresh = s.step >= 5;
        return {
          open: true,
          step: pre.serviceId ? 2 : 1,
          serviceId: pre.serviceId ?? (fresh ? null : s.serviceId),
          doctor: pre.doctor ?? (fresh ? null : s.doctor),
          date: fresh ? null : s.date,
          time: fresh ? null : s.time,
          tried: false,
          windowStart: isoDay(addDays(sarajevoToday(), 1)),
        };
      });
    },
    [patch],
  );

  const closeBooking = useCallback(() => {
    patch((s) =>
      s.step >= 5
        ? { open: false, step: 1, serviceId: null, doctor: null, date: null, time: null, tried: false, touched: {}, availability: null }
        : { open: false },
    );
  }, [patch]);

  const next = useCallback(async () => {
    const s = stateRef.current;
    if (s.step === 1 && s.serviceId) patch({ step: 2 });
    else if (s.step === 2 && s.serviceId && s.doctor && s.windowStart) {
      const availability = await loadAvailability(s.serviceId, s.doctor, s.windowStart);
      const current = availability.find((d) => d.date === s.date);
      const date =
        current && !current.closed
          ? current.date
          : (availability.find((d) => !d.closed && d.slots.some((x) => x.freeDoctorIds.length))?.date ?? null);
      patch({ step: 3, availability, date });
    } else if (s.step === 3 && s.time != null) patch({ step: 4 });
  }, [loadAvailability, patch]);

  const submit = useCallback(async () => {
    const s = stateRef.current;
    const v = validate(s.form);
    if (v.name || v.phone || v.email || v.consent) {
      patch({ tried: true });
      return false;
    }
    if (!s.serviceId || !s.doctor || !s.date || s.time == null) return false;
    const day = s.availability?.find((d) => d.date === s.date);
    const slot = day?.slots.find((x) => x.startMin === s.time);
    const assigned: DoctorId = s.doctor !== 'any' ? s.doctor : (slot?.freeDoctorIds[0] ?? 'merima');
    const request = await submitBookingRequest(
      { serviceId: s.serviceId, doctor: s.doctor, date: s.date, startMin: s.time, ...s.form },
      assigned,
    );
    setSubmitted((list) => [request, ...list.filter((r) => r.id !== s.lastRequestId && r.id !== request.id)]);
    patch({ step: 5, assignedDoctor: assigned, lastRequestId: request.id });
    return true;
  }, [patch]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      submitted,
      openBooking,
      closeBooking,
      pickService: (id) => patch({ serviceId: id, time: null }),
      pickDoctor: (d) => patch({ doctor: d, time: null }),
      pickDate: (iso) => patch({ date: iso, time: null }),
      pickTime: (min) => patch({ time: min }),
      setField: (k, v) => patch((s) => ({ form: { ...s.form, [k]: v } })),
      touch: (k) => patch((s) => ({ touched: { ...s.touched, [k]: true } })),
      next,
      back: () => patch((s) => ({ step: Math.max(1, s.step - 1) as Step })),
      submit,
      changeBooking: () => patch({ step: 3 }),
      cancelBooking: () => {
        const id = stateRef.current.lastRequestId;
        setSubmitted((list) => list.filter((r) => r.id !== id));
        patch({ step: 6, lastRequestId: null });
      },
      restart: () =>
        patch({ step: 1, serviceId: null, doctor: null, date: null, time: null, tried: false, touched: {}, availability: null }),
      removeSubmitted: (id) => setSubmitted((list) => list.filter((r) => r.id !== id)),
    }),
    [state, submitted, openBooking, closeBooking, next, submit, patch],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}

export const durationOf = (id: ServiceId | null) => (id ? serviceById(id).durationMin : 30);
