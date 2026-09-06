import { ButtonLink, PageIntro, Section } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 · Page not found"
        title={
          <>
            Let’s get you
            <br />
            <em>to the right place.</em>
          </>
        }
        description="This page may have moved, or the address may be incorrect."
      />
      <Section>
        <div className="button-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/legal-staffing" variant="secondary">
            Explore legal staffing
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
