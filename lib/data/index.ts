/**
 * Data-access layer. Every UI read/write goes through these functions.
 * Today they resolve mock data in memory; to add a backend, replace the bodies
 * with fetch() calls (or server actions) and keep the signatures.
 *
 * Nothing in here sends data over the network.
 */
import { appointmentSeeds, requestSeeds } from '@/lib/mock/appointments';
import { doctors } from '@/lib/mock/doctors';
import { services } from '@/lib/mock/services';
import {
  addDays,
  CLOSE_MIN,
  fromIsoDay,
  isoDay,
  isWeekend,
  mondayOf,
  OPEN_MIN,
  SLOT_STEP_MIN,
} from '@/lib/time';
import type {
  Appointment,
  BookingInput,
  BookingRequest,
  DayAvailability,
  Doctor,
  DoctorChoice,
  DoctorId,
  Service,
  ServiceId,
  Slot,
} from '@/lib/types';

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getDoctors(): Promise<Doctor[]> {
  return doctors;
}

// Synchronous lookups for already-loaded catalog data.
export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
export const doctorById = (id: DoctorId) => doctors.find((d) => d.id === id)!;
export const allServices = services;
export const allDoctors = doctors;

/** Deterministic pseudo-random 0–99 so the same slots always look taken. */
function hash(a: number, b: number, c: number) {
  let h = (a * 374761393 + b * 668265263 + c * 2246822519) >>> 0;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  h = (h ^ (h >>> 16)) >>> 0;
  return h % 100;
}

/** Second working day in the window is fully booked, to demo the "no slots" state. */
const FULL_WORKDAY_INDEX = 2;

function slotsForDay(day: Date, doctorChoice: DoctorChoice, durationMin: number, full: boolean): Slot[] {
  const pool: DoctorId[] = doctorChoice === 'any' ? doctors.map((d) => d.id) : [doctorChoice];
  const out: Slot[] = [];
  for (let m = OPEN_MIN; m + durationMin <= CLOSE_MIN; m += SLOT_STEP_MIN) {
    const free: DoctorId[] = [];
    if (!full && !isWeekend(day)) {
      pool.forEach((id) => {
        const k = doctors.findIndex((d) => d.id === id);
        if (hash(day.getUTCDate() + day.getUTCMonth() * 31, k + 1, m) >= 45) free.push(id);
      });
    }
    out.push({ startMin: m, freeDoctorIds: free });
  }
  return out;
}

/**
 * Bookable days from `fromDate` (inclusive) for `days` days, with 30-minute slots
 * Mon–Fri 10:00–18:00 (Europe/Sarajevo). A slot is offered only when the whole
 * service duration fits before closing. Weekends are returned as closed.
 */
export async function getAvailableSlots(params: {
  serviceId: ServiceId;
  doctor: DoctorChoice;
  fromDate: string;
  days: number;
}): Promise<DayAvailability[]> {
  const { durationMin } = serviceById(params.serviceId);
  const start = fromIsoDay(params.fromDate);
  let workday = 0;
  return Array.from({ length: params.days }, (_, i) => {
    const day = addDays(start, i);
    const closed = isWeekend(day);
    if (!closed) workday++;
    return {
      date: isoDay(day),
      closed,
      slots: closed ? [] : slotsForDay(day, params.doctor, durationMin, workday === FULL_WORKDAY_INDEX),
    };
  });
}

/**
 * Demo only: validates and "accepts" a booking request locally.
 * It never leaves the browser – swap for a POST to the real API later.
 */
export async function submitBookingRequest(input: BookingInput, assignedDoctor: DoctorId): Promise<BookingRequest> {
  return {
    id: 'web-' + input.date + '-' + input.startMin + '-' + assignedDoctor,
    patient: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim() || undefined,
    note: input.note.trim() || undefined,
    serviceId: input.serviceId,
    doctorId: assignedDoctor,
    date: input.date,
    startMin: input.startMin,
    createdAt: Date.now(),
    urgent: input.urgent,
  };
}

/** Admin: the Mon–Fri week containing `today`, with mock appointments. */
export async function getWeekAppointments(today: string): Promise<{ weekDates: string[]; appointments: Appointment[] }> {
  const monday = mondayOf(fromIsoDay(today));
  const weekDates = [0, 1, 2, 3, 4].map((k) => isoDay(addDays(monday, k)));
  const appointments = appointmentSeeds.map((a, i) => ({
    id: 'a' + i,
    date: weekDates[a.weekday],
    doctorId: a.doctorId,
    startMin: a.startMin,
    serviceId: a.serviceId,
    patient: a.patient,
    status: a.status,
  }));
  return { weekDates, appointments };
}

/** Admin: open requests coming from the website. */
export async function getBookingRequests(today: string, now: number): Promise<BookingRequest[]> {
  const monday = mondayOf(fromIsoDay(today));
  return requestSeeds.map((r) => ({
    id: r.id,
    patient: r.patient,
    phone: r.phone,
    serviceId: r.serviceId,
    doctorId: r.doctorId,
    date: isoDay(addDays(monday, r.weekday)),
    startMin: r.startMin,
    createdAt: now - r.minutesAgo * 60_000,
    urgent: r.urgent,
  }));
}
