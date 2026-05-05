import Image from "next/image";
import { site } from "@/content/siteContent";

interface PageHeroProps {
  label: string;
  heading: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHero({ label, heading, imageSrc, imageAlt }: PageHeroProps) {
  const heroImageSrc = imageSrc || site.images.pageHero.src;
  const heroImageAlt = imageAlt || site.images.pageHero.alt;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--brand-blue)] via-[var(--brand-blue)]/90 to-[var(--brand-black)] px-4 py-20 sm:px-6 sm:py-28">
      <Image
        src={heroImageSrc}
        alt={heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20"
      />
      {/* Decorative blurred orbs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[var(--brand-red)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
          {label}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {heading}
        </h1>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-white/40 to-[var(--brand-red)]" />
      </div>
    </section>
  );
}
