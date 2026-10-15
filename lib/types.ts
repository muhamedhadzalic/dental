export type ServiceId =
  | 'pregled'
  | 'plombe'
  | 'kanal'
  | 'ciscenje'
  | 'izbjeljivanje'
  | 'fasete'
  | 'krunice'
  | 'vadjenje'
  | 'hitni';

export type DoctorId = 'merima' | 'hase' | 'dino';
/** 'any' = first available doctor */
export type DoctorChoice = DoctorId | 'any';

export type Service = {
  id: ServiceId;
  durationMin: number;
  /** Starting price in KM; null until the clinic provides real prices. */
  priceFrom: number | null;
};

export type Doctor = {
  id: DoctorId;
  name: string;
  initials: string;
  title: string | null;
  bio: string | null;
};

export type Slot = {
  /** Minutes after midnight, Europe/Sarajevo. */
  startMin: number;
  /** Doctors free for the full service duration at this start time. */
  freeDoctorIds: DoctorId[];
};

export type DayAvailability = {
  /** YYYY-MM-DD, Europe/Sarajevo calendar day */
  date: string;
  closed: boolean;
  slots: Slot[];
};

export type AppointmentStatus = 'confirmed' | 'pending' | 'no_show';

export type AppointmentSeed = {
  weekday: number;
  doctorId: DoctorId;
  startMin: number;
  serviceId: ServiceId;
  patient: string;
  status: AppointmentStatus;
};

export type Appointment = {
  id: string;
  date: string;
  doctorId: DoctorId;
  startMin: number;
  serviceId: ServiceId;
  patient: string;
  status: AppointmentStatus;
};

export type BookingRequestSeed = {
  id: string;
  patient: string;
  phone: string;
  serviceId: ServiceId;
  doctorId: DoctorId;
  weekday: number;
  startMin: number;
  minutesAgo: number;
  urgent: boolean;
};

export type BookingRequest = {
  id: string;
  patient: string;
  phone: string;
  email?: string;
  note?: string;
  serviceId: ServiceId;
  doctorId: DoctorId;
  date: string;
  startMin: number;
  /** epoch ms when the request was made */
  createdAt: number;
  urgent: boolean;
};

export type BookingInput = {
  serviceId: ServiceId;
  doctor: DoctorChoice;
  date: string;
  startMin: number;
  name: string;
  phone: string;
  email: string;
  note: string;
  urgent: boolean;
  consent: boolean;
};
