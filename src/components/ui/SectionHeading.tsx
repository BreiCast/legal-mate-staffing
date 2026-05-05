import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

interface SectionHeadingProps {
  label: string;
  heading: string;
  as?: "h1" | "h2" | "h3";
  align?: "center" | "left";
  size?: "md" | "lg";
}

export function SectionHeading({
  label,
  heading,
  as = "h2",
  align = "center",
  size = "md",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : ""}>
      <Eyebrow className={isCenter ? "justify-center" : ""}>{label}</Eyebrow>
      <Heading as={as} size={size} className="mt-5">
        {heading}
      </Heading>
    </div>
  );
}
