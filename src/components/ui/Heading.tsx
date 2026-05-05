import type { ElementType, HTMLAttributes } from "react";

type HeadingSize = "xl" | "lg" | "md" | "sm";
type HeadingTone = "ink" | "paper";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
  size?: HeadingSize;
  tone?: HeadingTone;
  font?: "serif" | "sans";
  balance?: boolean;
}

const sizeMap: Record<HeadingSize, string> = {
  xl: "text-[40px] leading-[1.05] sm:text-[56px] lg:text-[68px]",
  lg: "text-[32px] leading-[1.08] sm:text-[44px] lg:text-[52px]",
  md: "text-[26px] leading-[1.15] sm:text-[32px] lg:text-[36px]",
  sm: "text-[20px] leading-[1.25] sm:text-[22px]",
};

const toneMap: Record<HeadingTone, string> = {
  ink: "text-ink",
  paper: "text-paper",
};

export function Heading({
  as: Tag = "h2",
  size = "lg",
  tone = "ink",
  font = "serif",
  balance = true,
  className = "",
  children,
  ...rest
}: HeadingProps) {
  const fontClass =
    font === "serif"
      ? "font-serif font-normal tracking-[-0.01em]"
      : "font-sans font-semibold tracking-[-0.02em]";

  return (
    <Tag
      className={`${fontClass} ${sizeMap[size]} ${toneMap[tone]} ${
        balance ? "text-balance" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
