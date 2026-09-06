import Link from "next/link";
import { resources } from "@/content/resources";
import { Arrow, PageIntro, Section } from "@/components/ui/Primitives";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Legal Staffing Resources",
  "Practical guides to defining legal support roles, interviewing candidates, and onboarding remote staff for your law firm.",
  "/resources",
);
export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Practical perspectives"
        title={
          <>
            Build the role.
            <br />
            <em>Build a better team.</em>
          </>
        }
        description="Guides for the decisions before and after a legal support hire. Specific questions, practical workflows, and clear expectations."
        breadcrumbs={[{ label: "Resources" }]}
      />
      <Section>
        <div className="resource-grid">
          {resources.map((resource) => (
            <Link
              className="resource-card"
              key={resource.slug}
              href={`/resources/${resource.slug}`}
            >
              <span className="small-label">{resource.category}</span>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <span className="text-link">
                Read the guide <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
