'use client';

import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
  labelledBy?: string;
  label?: string;
  children: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLDialogElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDialogElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDialogElement>;
};

/**
 * Accessible modal built on the native <dialog> element (showModal):
 * focus is contained, the rest of the page is inert, Esc closes, focus returns on close.
 * No dialog library needed – keeps the mobile JS bundle small.
 */
export function Modal({ open, onClose, className, labelledBy, label, children, ...handlers }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = '';
  }, [open]);

  useEffect(() => () => void (document.documentElement.style.overflow = ''), []);

  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      aria-label={label}
      onCancel={(e) => {
        e.preventDefault();
        onCloseRef.current();
      }}
      {...handlers}
    >
      {open && children}
    </dialog>
  );
}
