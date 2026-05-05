import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { ServicesList } from "@/components/marketing/ServicesList";
import { ProcessRail } from "@/components/marketing/ProcessRail";
import { Bento } from "@/components/marketing/Bento";
import { FoundersBlock } from "@/components/marketing/FoundersBlock";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FaqList } from "@/components/marketing/FaqList";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesList />
      <ProcessRail />
      <Bento />
      <FoundersBlock />
      <CtaBand />
      <FaqList />
    </>
  );
}
