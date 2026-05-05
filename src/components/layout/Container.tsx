import type { ElementType, HTMLAttributes } from "react";

type ContainerWidth = "default" | "wide" | "narrow";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: ContainerWidth;
}

const widthMap: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  as: Tag = "div",
  width = "default",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${widthMap[width]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
