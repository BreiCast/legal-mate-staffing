import { site } from "@/content/siteContent";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  const { notFound } = site;
  return (
    <section className="bg-paper py-32 sm:py-40">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Error · 404</Eyebrow>
          <h1 className="mt-6 font-serif text-[40px] leading-[1.05] tracking-[-0.015em] text-ink sm:text-[56px] lg:text-[64px]">
            {notFound.title}
          </h1>
          <p className="mt-6 text-[17px] leading-[1.55] text-muted-strong sm:text-[18px]">
            {notFound.message}
          </p>
          <ButtonLink href="/" size="lg" variant="primary" withArrow className="mt-10">
            {notFound.backHome}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
