import { notFound } from "next/navigation";
import { roles } from "@/content/roles";
import { RoleDetail } from "@/components/ServiceDetail";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();
  return pageMetadata(
    `Remote ${role.plural} for U.S. Law Firms`,
    role.summary,
    `/roles/${slug}`,
  );
}
export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = roles.find((item) => item.slug === slug);
  if (!role) notFound();
  return (
    <>
      <RoleDetail role={role} />
      <StructuredData
        data={serviceSchema(
          `Remote ${role.name} Staffing`,
          role.summary,
          `/roles/${slug}`,
        )}
      />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Legal staffing", path: "/legal-staffing" },
          { name: role.name, path: `/roles/${slug}` },
        ])}
      />
    </>
  );
}
