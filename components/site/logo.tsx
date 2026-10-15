// Dental Plaza mark, traced in the Claude Design source (viewBox 0 0 222.8 103.7).
// Served once as /logo-mark.svg and tinted with CSS mask so it inherits `currentColor`.
export function LogoMark({ width = 64, height = 30, className }: { width?: number; height?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block flex-none bg-current [mask:url(/logo-mark.svg)_center/contain_no-repeat] ${className ?? ''}`}
      style={{ width, height }}
    />
  );
}
