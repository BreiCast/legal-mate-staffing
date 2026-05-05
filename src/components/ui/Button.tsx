import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
}

const baseClass =
  "group inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,border-color,color] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

const variantMap: Record<Variant, string> = {
  primary:
    "bg-ink text-paper border border-ink hover:bg-[#1f1f1f] hover:border-[#1f1f1f]",
  secondary:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-ink/[0.03]",
  ghost:
    "bg-transparent text-ink border border-transparent hover:bg-ink/[0.04] -mx-1 px-1",
  inverse:
    "bg-paper text-ink border border-paper hover:bg-paper/90 focus-visible:ring-paper focus-visible:ring-offset-ink",
};

const sizeMap: Record<Size, string> = {
  md: "h-11 px-5 text-[14px] rounded-md",
  lg: "h-12 px-6 text-[15px] rounded-md",
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-0.5"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  external = false,
  className = "",
  children,
  ...rest
}: LinkProps) {
  const cls = `${baseClass} ${variantMap[variant]} ${sizeMap[size]} ${
    variant === "ghost" ? "h-auto" : ""
  } ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        <span>{children}</span>
        {withArrow && <Arrow />}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      <span>{children}</span>
      {withArrow && <Arrow />}
    </Link>
  );
}

type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
  children,
  ...rest
}: NativeButtonProps) {
  return (
    <button
      className={`${baseClass} ${variantMap[variant]} ${sizeMap[size]} ${
        variant === "ghost" ? "h-auto" : ""
      } ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {withArrow && <Arrow />}
    </button>
  );
}
