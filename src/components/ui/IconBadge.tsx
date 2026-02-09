interface IconBadgeProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  hoverFlip?: boolean;
}

const sizeMap = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-12 w-12 rounded-xl",
  lg: "h-14 w-14 rounded-2xl",
} as const;

export function IconBadge({
  children,
  size = "md",
  hoverFlip = true,
}: IconBadgeProps) {
  const base = sizeMap[size];
  const hover = hoverFlip
    ? "group-hover:bg-[var(--brand-blue)] group-hover:text-white group-hover:shadow-md group-hover:shadow-[var(--brand-blue)]/25"
    : "";

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center bg-[var(--brand-blue)]/5 text-[var(--brand-blue)] transition-all duration-300 ${base} ${hover}`}
    >
      {children}
    </div>
  );
}
