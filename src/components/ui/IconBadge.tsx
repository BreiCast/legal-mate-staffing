interface IconBadgeProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  hoverFlip?: boolean;
}

const sizeMap = {
  sm: "h-9 w-9 rounded-md",
  md: "h-10 w-10 rounded-md",
  lg: "h-11 w-11 rounded-md",
} as const;

export function IconBadge({
  children,
  size = "md",
  hoverFlip = true,
}: IconBadgeProps) {
  const base = sizeMap[size];
  const hover = hoverFlip
    ? "group-hover:border-ink group-hover:text-ink"
    : "";

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center border border-line bg-paper text-ink/70 transition-colors duration-200 ${base} ${hover}`}
    >
      {children}
    </div>
  );
}
