import type { HTMLAttributes } from "react";

type Spacing = "tight" | "default" | "loose";
type Tone = "paper" | "surface" | "ink";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: Spacing;
  tone?: Tone;
  bleed?: boolean;
}

const spacingMap: Record<Spacing, string> = {
  tight: "py-14 sm:py-16",
  default: "py-20 sm:py-28",
  loose: "py-28 sm:py-36",
};

const toneMap: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-paper",
};

export function Section({
  spacing = "default",
  tone = "paper",
  bleed = false,
  className = "",
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={`relative ${spacingMap[spacing]} ${toneMap[tone]} ${
        bleed ? "" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}
