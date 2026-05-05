import type { HTMLAttributes } from "react";

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  number?: string;
}

export function Eyebrow({
  number,
  className = "",
  children,
  ...rest
}: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}
      {...rest}
    >
      {number && <span className="text-ink/60">{number}</span>}
      {number && <span aria-hidden className="h-px w-6 bg-line-strong" />}
      <span>{children}</span>
    </span>
  );
}
