"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="bg-paper py-32 sm:py-40">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Error</Eyebrow>
          <h1 className="mt-6 font-serif text-[40px] leading-[1.05] tracking-[-0.015em] text-ink sm:text-[56px]">
            Something went wrong
          </h1>
          <p className="mt-6 text-[16px] leading-[1.6] text-muted-strong">
            {error.message}
          </p>
          <Button
            type="button"
            onClick={() => reset()}
            size="lg"
            variant="primary"
            withArrow
            className="mt-10"
          >
            Try again
          </Button>
        </div>
      </Container>
    </section>
  );
}
