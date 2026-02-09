interface SectionHeadingProps {
  label: string;
  heading: string;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
}

export function SectionHeading({
  label,
  heading,
  as: Tag = "h2",
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
      <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-blue)]">
        {label}
      </p>
      <Tag className="mt-2 text-2xl font-bold text-[var(--brand-black)] sm:text-3xl lg:text-4xl">
        {heading}
      </Tag>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--brand-blue)] to-[var(--brand-red)] ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
