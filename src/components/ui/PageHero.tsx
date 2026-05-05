import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";

interface PageHeroProps {
  label: string;
  heading: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  showImage?: boolean;
}

export function PageHero({
  label,
  heading,
  subtitle,
  imageSrc,
  imageAlt,
  showImage = false,
}: PageHeroProps) {
  return (
    <header
      className="border-b border-line bg-paper"
      aria-labelledby="page-hero-heading"
    >
      <Container>
        <div
          className={`grid gap-12 pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pt-28 ${
            showImage && imageSrc
              ? "lg:grid-cols-12 lg:items-end lg:gap-16"
              : ""
          }`}
        >
          <div
            className={
              showImage && imageSrc
                ? "lg:col-span-7"
                : "max-w-3xl"
            }
          >
            <Eyebrow>{label}</Eyebrow>
            <Heading
              as="h1"
              size="xl"
              id="page-hero-heading"
              className="mt-6"
            >
              {heading}
            </Heading>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-[17px] leading-[1.55] text-muted-strong sm:text-[18px]">
                {subtitle}
              </p>
            )}
          </div>

          {showImage && imageSrc && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface lg:col-span-5">
              <Image
                src={imageSrc}
                alt={imageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover grayscale-[0.15]"
              />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
