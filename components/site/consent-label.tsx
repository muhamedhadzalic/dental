import { ShieldIcon } from '@/components/icons';

/** Overlay shown on blurred patient photos until real, documented consent exists. */
export function ConsentLabel({ label, small = false }: { label: string; small?: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[4] flex items-center gap-1.5 bg-gradient-to-t from-ink/70 to-transparent font-semibold text-white ${
        small ? 'px-3 pt-8 pb-3 text-xs' : 'px-4 pt-10 pb-4 text-[13px]'
      }`}
    >
      <ShieldIcon size={small ? 14 : 16} />
      {label}
    </span>
  );
}
