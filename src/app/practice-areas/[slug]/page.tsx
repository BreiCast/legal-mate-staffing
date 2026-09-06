import { notFound } from "next/navigation";
import { practiceAreas } from "@/content/practice-areas";
import { PracticeAreaDetail } from "@/components/ServiceDetail";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = practiceAreas.find((item) => item.slug === slug);
  if (!area) notFound();
  return pageMetadata(
    `Remote Staffing for ${area.name} Law Firms`,
    area.summary,
    `/practice-areas/${slug}`,
  );
}
export default async function PracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = practiceAreas.find((item) => item.slug === slug);
  if (!area) notFound();
  return (
    <>
      <PracticeAreaDetail area={area} />
      <StructuredData
        data={serviceSchema(
          `${area.name} Legal Staffing`,
          area.summary,
          `/practice-areas/${slug}`,
        )}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Legal staffing", path: "/legal-staffing" },
          { name: area.name, path: `/practice-areas/${slug}` },
        ])}
      />
    </>
  );
}
