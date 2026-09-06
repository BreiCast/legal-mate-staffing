import Link from "next/link";
import { notFound } from "next/navigation";
import { resources } from "@/content/resources";
import { PageIntro, Section } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();
  return pageMetadata(
    resource.title,
    resource.description,
    `/resources/${slug}`,
  );
}
export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = resources.find((item) => item.slug === slug);
  if (!resource) notFound();
  return (
    <>
      <PageIntro
        eyebrow={resource.category}
        title={resource.title}
        description={resource.description}
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: resource.title },
        ]}
      />
      <Section>
        <article className="prose">
          {resource.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <h2>Turn the brief into a search</h2>
          <p>
            Explore the{" "}
            <Link href={`/roles/${resource.relatedRole}`}>
              responsibilities and evaluation criteria for this role
            </Link>
            , or{" "}
            <Link href="/request-candidates">tell us what your firm needs</Link>
            .
          </p>
        </article>
      </Section>
      <CTA />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Resources", path: "/resources" },
          { name: resource.title, path: `/resources/${slug}` },
        ])}
      />
    </>
  );
}
