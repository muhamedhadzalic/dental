import type { AppointmentSeed, BookingRequestSeed } from '@/lib/types';

/**
 * Admin demo week. `weekday` 0–4 = Monday–Friday of the current week,
 * `startMin` = minutes after midnight (600 = 10:00). Taken from the design's Admin frame.
 */
export const appointmentSeeds: AppointmentSeed[] = [
  { weekday: 0, doctorId: 'merima', startMin: 600, serviceId: 'pregled', patient: 'Amina Hodžić', status: 'confirmed' },
  { weekday: 0, doctorId: 'merima', startMin: 660, serviceId: 'plombe', patient: 'Kenan Mujić', status: 'confirmed' },
  { weekday: 0, doctorId: 'merima', startMin: 780, serviceId: 'ciscenje', patient: 'Lejla Begić', status: 'no_show' },
  { weekday: 0, doctorId: 'merima', startMin: 900, serviceId: 'fasete', patient: 'Sara Delić', status: 'confirmed' },
  { weekday: 0, doctorId: 'hase', startMin: 630, serviceId: 'kanal', patient: 'Adnan Kovač', status: 'confirmed' },
  { weekday: 0, doctorId: 'hase', startMin: 750, serviceId: 'ciscenje', patient: 'Merjem Softić', status: 'confirmed' },
  { weekday: 0, doctorId: 'hase', startMin: 960, serviceId: 'pregled', patient: 'Tarik Hadžić', status: 'confirmed' },
  { weekday: 0, doctorId: 'dino', startMin: 600, serviceId: 'fasete', patient: 'Emina Alić', status: 'confirmed' },
  { weekday: 0, doctorId: 'dino', startMin: 720, serviceId: 'krunice', patient: 'Haris Omerović', status: 'confirmed' },
  { weekday: 0, doctorId: 'dino', startMin: 870, serviceId: 'pregled', patient: 'Dženana Imamović', status: 'confirmed' },
  { weekday: 1, doctorId: 'merima', startMin: 630, serviceId: 'ciscenje', patient: 'Nedim Karić', status: 'confirmed' },
  { weekday: 1, doctorId: 'merima', startMin: 720, serviceId: 'pregled', patient: 'Ajla Selimović', status: 'confirmed' },
  { weekday: 1, doctorId: 'merima', startMin: 840, serviceId: 'izbjeljivanje', patient: 'Belma Šehić', status: 'confirmed' },
  { weekday: 1, doctorId: 'hase', startMin: 600, serviceId: 'plombe', patient: 'Edin Hasić', status: 'confirmed' },
  { weekday: 1, doctorId: 'hase', startMin: 690, serviceId: 'vadjenje', patient: 'Mirza Ćosić', status: 'no_show' },
  { weekday: 1, doctorId: 'hase', startMin: 900, serviceId: 'ciscenje', patient: 'Selma Zukić', status: 'confirmed' },
  { weekday: 1, doctorId: 'hase', startMin: 990, serviceId: 'pregled', patient: 'Faruk Bešlija', status: 'confirmed' },
  { weekday: 1, doctorId: 'dino', startMin: 660, serviceId: 'fasete', patient: 'Ilma Kurtović', status: 'confirmed' },
  { weekday: 1, doctorId: 'dino', startMin: 780, serviceId: 'kanal', patient: 'Damir Pašić', status: 'confirmed' },
  { weekday: 2, doctorId: 'merima', startMin: 600, serviceId: 'pregled', patient: 'Lamija Avdić', status: 'confirmed' },
  { weekday: 2, doctorId: 'merima', startMin: 690, serviceId: 'ciscenje', patient: 'Armin Bajrić', status: 'confirmed' },
  { weekday: 2, doctorId: 'merima', startMin: 900, serviceId: 'plombe', patient: 'Hana Mehić', status: 'confirmed' },
  { weekday: 2, doctorId: 'hase', startMin: 660, serviceId: 'hitni', patient: 'Jasmin Fazlić', status: 'confirmed' },
  { weekday: 2, doctorId: 'hase', startMin: 750, serviceId: 'kanal', patient: 'Una Smajić', status: 'confirmed' },
  { weekday: 2, doctorId: 'hase', startMin: 960, serviceId: 'ciscenje', patient: 'Vedad Halilović', status: 'no_show' },
  { weekday: 2, doctorId: 'dino', startMin: 600, serviceId: 'izbjeljivanje', patient: 'Naida Husić', status: 'confirmed' },
  { weekday: 2, doctorId: 'dino', startMin: 720, serviceId: 'fasete', patient: 'Ermin Ramić', status: 'confirmed' },
  { weekday: 2, doctorId: 'dino', startMin: 900, serviceId: 'pregled', patient: 'Aida Bećirović', status: 'confirmed' },
  { weekday: 3, doctorId: 'merima', startMin: 630, serviceId: 'ciscenje', patient: 'Asja Mušić', status: 'confirmed' },
  { weekday: 3, doctorId: 'merima', startMin: 750, serviceId: 'pregled', patient: 'Benjamin Topić', status: 'pending' },
  { weekday: 3, doctorId: 'merima', startMin: 930, serviceId: 'plombe', patient: 'Zerina Hrnjić', status: 'confirmed' },
  { weekday: 3, doctorId: 'hase', startMin: 600, serviceId: 'pregled', patient: 'Almir Džafić', status: 'confirmed' },
  { weekday: 3, doctorId: 'hase', startMin: 690, serviceId: 'ciscenje', patient: 'Melisa Kadić', status: 'pending' },
  { weekday: 3, doctorId: 'hase', startMin: 870, serviceId: 'krunice', patient: 'Samir Hodžić', status: 'confirmed' },
  { weekday: 3, doctorId: 'dino', startMin: 660, serviceId: 'fasete', patient: 'Dalila Mahmutović', status: 'confirmed' },
  { weekday: 3, doctorId: 'dino', startMin: 810, serviceId: 'pregled', patient: 'Eldar Salihović', status: 'pending' },
  { weekday: 3, doctorId: 'dino', startMin: 960, serviceId: 'ciscenje', patient: 'Iman Ibrišimović', status: 'confirmed' },
  { weekday: 4, doctorId: 'merima', startMin: 600, serviceId: 'izbjeljivanje', patient: 'Selma Hadžiomerović', status: 'pending' },
  { weekday: 4, doctorId: 'merima', startMin: 720, serviceId: 'ciscenje', patient: 'Adis Mešić', status: 'confirmed' },
  { weekday: 4, doctorId: 'hase', startMin: 630, serviceId: 'pregled', patient: 'Ena Bašić', status: 'confirmed' },
  { weekday: 4, doctorId: 'hase', startMin: 780, serviceId: 'plombe', patient: 'Kerim Jahić', status: 'pending' },
  { weekday: 4, doctorId: 'dino', startMin: 690, serviceId: 'fasete', patient: 'Ajna Hasanbegović', status: 'confirmed' },
  { weekday: 4, doctorId: 'dino', startMin: 900, serviceId: 'kanal', patient: 'Tarik Mehmedović', status: 'confirmed' },
];

/** Incoming website requests shown in the admin sidebar. */
export const requestSeeds: BookingRequestSeed[] = [
  { id: 'r1', patient: 'Lana Karahasan', phone: '+387 61 482 119', serviceId: 'pregled', doctorId: 'merima', weekday: 4, startMin: 900, minutesAgo: 12, urgent: false },
  { id: 'r2', patient: 'Muhamed Selimović', phone: '+387 62 307 554', serviceId: 'hitni', doctorId: 'hase', weekday: 3, startMin: 960, minutesAgo: 35, urgent: true },
  { id: 'r3', patient: 'Ajša Herić', phone: '+387 60 331 207', serviceId: 'fasete', doctorId: 'dino', weekday: 4, startMin: 600, minutesAgo: 60, urgent: false },
  { id: 'r4', patient: 'Dino Šabanović', phone: '+387 65 912 446', serviceId: 'ciscenje', doctorId: 'hase', weekday: 4, startMin: 960, minutesAgo: 120, urgent: false },
];
