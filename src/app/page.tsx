import { HeroSection } from "@/components/HeroSection";
import { TrustedByStrip } from "@/components/TrustedByStrip";
import { ServicesSection } from "@/components/ServicesSection";
import { ResultsStrip } from "@/components/ResultsStrip";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { ProcessStepsSection } from "@/components/ProcessStepsSection";
import { FoundersSection } from "@/components/FoundersSection";
import { FAQSection } from "@/components/FAQSection";
import { ComplianceNote } from "@/components/ComplianceNote";
import { FinalCTASection } from "@/components/FinalCTASection";

export default function Home() {
  return (
    <>
      {/* 1. Hero — light bg */}
      <HeroSection />
      {/* 2. Trusted by strip — white with border */}
      <TrustedByStrip />
      {/* 3. Services — gray bg */}
      <ServicesSection />
      {/* 4. Results — white bg */}
      <ResultsStrip />
      {/* 5. Differentiators — gray bg */}
      <DifferentiatorsSection />
      {/* 6. Process — gray bg */}
      <ProcessStepsSection />
      {/* 7. Founders — gray bg */}
      <FoundersSection />
      {/* 8. FAQ — gray bg */}
      <FAQSection />
      {/* 9. Compliance — white bg */}
      <ComplianceNote />
      {/* 10. Final CTA — gradient card on white bg */}
      <FinalCTASection />
    </>
  );
}
