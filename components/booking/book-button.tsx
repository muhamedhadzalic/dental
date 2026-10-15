'use client';

import type { DoctorId, ServiceId } from '@/lib/types';
import { useBooking } from './booking-provider';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'> & {
  serviceId?: ServiceId;
  doctor?: DoctorId;
};

/** Small client island: opens the booking modal, optionally with a service or doctor preselected. */
export function BookButton({ serviceId, doctor, children, ...rest }: Props) {
  const { openBooking } = useBooking();
  return (
    <button type="button" onClick={() => openBooking({ serviceId, doctor })} {...rest}>
      {children}
    </button>
  );
}
