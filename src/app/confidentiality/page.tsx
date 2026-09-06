import Link from "next/link";
import { PageIntro, Section } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Confidentiality & Responsible Onboarding",
  "Define confidentiality, supervision, access controls, and offboarding for remote legal support. A practical starting point for your firm’s onboarding process.",
  "/confidentiality",
);
export default function ConfidentialityPage() {
  return (
    <>
      <PageIntro
        eyebrow="Responsible legal support"
        title={
          <>
            Set the boundaries.
            <br />
            <em>Then build the relationship.</em>
          </>
        }
        description="Remote support should begin with clear expectations about information, access, and supervision. These are topics to define together before someone starts."
        breadcrumbs={[{ label: "Confidentiality" }]}
      />
      <Section>
        <div className="detail-grid">
          <div className="detail-content">
            <h2>Confidentiality expectations</h2>
            <p>
              Discuss the information the role will handle, the confidentiality
              terms in the staffing agreement, and whether your firm requires an
              NDA or additional documentation. Put approved communication
              channels and reporting responsibilities in writing.
            </p>
            <h2>Access appropriate to the role</h2>
            <p>
              Use individual accounts and grant access only to the systems and
              matters needed for the work. Your firm should define
              authentication requirements, approved devices, storage locations,
              and any restrictions on downloading or transferring information.
            </p>
            <h2>Attorney direction and review</h2>
            <p>
              Assign a supervisor, document the work that can be delegated, and
              make escalation straightforward. Staff should know when to pause
              and seek guidance. They do not independently provide U.S. legal
              advice unless legally authorized.
            </p>
            <h2>Handling sensitive information</h2>
            <p>
              Your firm determines the contractual, professional, and regulatory
              requirements that apply to its data and services. Confirm any
              required safeguards, training, and agreements before granting
              access. This page describes planning considerations; it is not a
              claim of certification or a substitute for your firm’s review.
            </p>
            <h2>Offboarding from the start</h2>
            <p>
              Identify who will revoke access, transfer task ownership, retrieve
              or remove firm data as appropriate, and document completion when a
              placement ends or responsibilities change.
            </p>
            <p>
              For data submitted through this website, see our{" "}
              <Link href="/privacy">privacy notice</Link>.
            </p>
          </div>
          <aside className="detail-aside">
            <h2>Before day one</h2>
            <ul>
              <li>Confirm the permitted scope of work.</li>
              <li>Agree on confidentiality terms.</li>
              <li>Name the supervisor and escalation contact.</li>
              <li>Set up individual accounts and permissions.</li>
              <li>Provide approved procedures and communication channels.</li>
              <li>Document an offboarding owner and checklist.</li>
            </ul>
          </aside>
        </div>
      </Section>
      <CTA />
    </>
  );
}
