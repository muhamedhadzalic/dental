import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

/** Stroke icon base matching the design (24×24, round caps). */
function Stroke({ size = 20, strokeWidth = 2, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const CalendarIcon = (p: P) => (
  <Stroke {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </Stroke>
);
export const CalendarPlusIcon = (p: P) => (
  <Stroke {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="3" />
    <path d="M8 3v4M16 3v4M3.5 10h17M12 13v4M10 15h4" />
  </Stroke>
);
export const PhoneIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Stroke>
);
export const WhatsAppIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
  </Stroke>
);
export const WhatsAppDetailIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-1 .9a4 4 0 0 1-1.8-1.8l.9-1-1-2z" />
  </Stroke>
);
export const ViberIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M12 3c5 0 8 2.5 8 7.5S17 18 12 18l-3 3v-3.4C5.6 16.5 4 14 4 10.5 4 5.5 7 3 12 3z" />
    <path d="M10 8.5c0 2.4 1.6 4 4 4" />
  </Stroke>
);
export const InstagramIcon = (p: P) => (
  <Stroke {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7v.01" />
  </Stroke>
);
export const MapIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z" />
    <path d="M9 4v13.5M15 6.5V20" />
  </Stroke>
);
export const ArrowRightIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);
export const ArrowUpRightIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Stroke>
);
export const ChevronLeftIcon = (p: P) => (
  <Stroke strokeWidth={2.2} {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Stroke>
);
export const ChevronRightIcon = (p: P) => (
  <Stroke strokeWidth={2.2} {...p}>
    <path d="M9 5l7 7-7 7" />
  </Stroke>
);
export const CloseIcon = (p: P) => (
  <Stroke strokeWidth={2.2} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);
export const MenuIcon = (p: P) => (
  <Stroke size={22} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);
export const CheckIcon = (p: P) => (
  <Stroke strokeWidth={2.6} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Stroke>
);
export const PlusIcon = (p: P) => (
  <Stroke strokeWidth={2.4} {...p}>
    <path d="M12 5v14M5 12h14" />
  </Stroke>
);
export const ClockIcon = (p: P) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Stroke>
);
export const InfoIcon = (p: P) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.5v.5" />
  </Stroke>
);
export const SwipeIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
  </Stroke>
);
export const ShieldIcon = (p: P) => (
  <Stroke {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" />
  </Stroke>
);

export const StarIcon = ({ size = 18, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#E8B98A" aria-hidden="true" focusable="false" {...rest}>
    <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
  </svg>
);

export function Stars({ size = 18 }: { size?: number }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} size={size} />
      ))}
    </>
  );
}

/* ---- Service / feature icons uploaded to the design (stroke #0F5257, 1.6) ---- */

const TOOTH =
  'M8 3.5c-2.5 0-4.3 1.9-4.3 4.5 0 1.9.7 3.3 1.2 5 .6 2.2.8 4.6 1.4 6.6.3 1 .8 1.6 1.4 1.6 1.1 0 1.4-1.6 1.7-3.3.3-1.6.7-2.9 2.6-2.9s2.3 1.3 2.6 2.9c.3 1.7.6 3.3 1.7 3.3.6 0 1.1-.6 1.4-1.6.6-2 .8-4.4 1.4-6.6.5-1.7 1.2-3.1 1.2-5 0-2.6-1.8-4.5-4.3-4.5-1.7 0-2.6.9-4 .9s-2.3-.9-4-.9z';

const featureIcons: Record<string, React.ReactNode> = {
  pregled: (
    <>
      <circle cx="15" cy="8.5" r="4.8" />
      <path d="M11.6 11.9 4 19.5" />
      <path d="M13 7a2.5 2.5 0 0 1 2-1" />
    </>
  ),
  plombe: (
    <>
      <path d={TOOTH} />
      <path d="M10 8.2c.7.6 3.3.6 4 0" />
    </>
  ),
  kanal: (
    <>
      <path d={TOOTH} />
      <path d="M10.4 9.5l.5 5.5M13.6 9.5l-.5 5.5" />
    </>
  ),
  ciscenje: (
    <>
      <path d="M12 3c3 4 5.5 6.8 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9.8 9 7 12 3z" />
      <path d="M9.3 13.3a2.7 2.7 0 0 0 2.7 2.7" />
    </>
  ),
  izbjeljivanje: (
    <>
      <g transform="translate(-1.5 1.2) scale(.92)">
        <path d={TOOTH} />
      </g>
      <path d="M19.5 1.8v4M17.5 3.8h4" />
    </>
  ),
  fasete: (
    <>
      <path d="M3.5 9.5c2.3 6.5 14.7 6.5 17 0" />
      <path d="M3.5 9.5h17" />
      <path d="M8 9.5v2.6M12 9.5v3.3M16 9.5v2.6" />
    </>
  ),
  krunice: (
    <>
      <path d="M4.5 17 3.3 7.8l4.9 3.7L12 4.8l3.8 6.7 4.9-3.7-1.2 9.2z" />
      <path d="M4.5 20.3h15" />
    </>
  ),
  vadjenje: (
    <>
      <g transform="translate(1 2.5) scale(.9)">
        <path d={TOOTH} />
      </g>
      <path d="M12 6.5V1.5M9.8 3.6 12 1.5l2.2 2.1" />
    </>
  ),
  hitni: (
    <>
      <circle cx="12" cy="13" r="7.8" />
      <path d="M12 9v4.2l2.7 1.8" />
      <path d="M5 3.5 2.6 5.8M19 3.5l2.4 2.3" />
    </>
  ),
  srce: <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  oprema: (
    <>
      <path d="M11 3.5l1.8 4.7 4.7 1.8-4.7 1.8L11 16.5l-1.8-4.7L4.5 10l4.7-1.8z" />
      <path d="M18 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
    </>
  ),
  sat: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  cijena: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
};

export function FeatureIcon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0F5257"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {featureIcons[name]}
    </svg>
  );
}
