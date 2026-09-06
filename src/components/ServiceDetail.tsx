import Link from "next/link";
import { roles, type Role } from "@/content/roles";
import { practiceAreas, type PracticeArea } from "@/content/practice-areas";
import {
  Arrow,
  ButtonLink,
  Check,
  PageIntro,
  Section,
} from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { BookingLink } from "@/components/BookingLink";

export function RoleDetail({ role }: { role: Role }) {
  return (
    <>
      <PageIntro
        eyebrow={`Remote bilingual ${role.plural.toLowerCase()}`}
        title={role.headline}
        description={role.introduction}
        breadcrumbs={[
          { label: "Legal staffing", href: "/legal-staffing" },
          { label: role.name },
        ]}
      />
      <Section>
        <div className="detail-grid">
          <div className="detail-content">
            <h2>What a {role.name.toLowerCase()} can support</h2>
            <p>
              The scope depends on your practice, the candidate’s experience,
              and your firm’s supervision. Start with a clear set of
              responsibilities:
            </p>
            <ul>
              {role.tasks.map((task) => (
                <li key={task}>
                  <Check />
                  {task}
                </li>
              ))}
            </ul>
            <h2>What we look for in the search</h2>
            <p>
              We translate the role into practical conversations and
              evaluations. Depending on your requirements, these can include:
            </p>
            <ul>
              {role.evaluation.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <h2>Make onboarding specific</h2>
            <p>{role.onboarding}</p>
            <h2>Confirm the details before you hire</h2>
            <p>
              Review language skills, coverage hours, relevant software
              experience, and the expected workload directly with each
              candidate. Your proposal should set out pricing, responsibilities,
              and placement support. Search timelines and availability depend on
              the brief.
            </p>
            <p>
              <Link href="/confidentiality">
                Read our approach to confidentiality and responsible access.
              </Link>
            </p>
          </div>
          <aside className="detail-aside">
            <p className="eyebrow">Let’s define your role</p>
            <h2>
              Find your next
              <br />
              <em>{role.name.toLowerCase()}.</em>
            </h2>
            <p>
              Tell us your practice area, working hours, and the
              responsibilities you want to delegate.
            </p>
            <ButtonLink
              href={`/request-candidates?role=${encodeURIComponent(role.name)}`}
              event="primary_cta_click"
              location={`role_${role.slug}`}
            >
              Request candidates
            </ButtonLink>
            <BookingLink location={`role_${role.slug}`} />
            <ul>
              {role.practiceAreas.map((slug) => {
                const area = practiceAreas.find((item) => item.slug === slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/practice-areas/${slug}`}>
                      {area.name} <Arrow />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Section>
      <CTA />
    </>
  );
}

export function PracticeAreaDetail({ area }: { area: PracticeArea }) {
  return (
    <>
      <PageIntro
        eyebrow={`Staffing for ${area.name.toLowerCase()} firms`}
        title={area.headline}
        description={area.introduction}
        breadcrumbs={[
          { label: "Legal staffing", href: "/legal-staffing" },
          { label: area.name },
        ]}
      />
      <Section>
        <div className="detail-grid">
          <div className="detail-content">
            <h2>Build support around your workflows</h2>
            {area.workflows.map((workflow) => (
              <article className="workflow-article" key={workflow.title}>
                <h3>{workflow.title}</h3>
                <p>{workflow.description}</p>
              </article>
            ))}
            <h2>What to define before the search</h2>
            <p>{area.considerations}</p>
            <h2>A clear scope and a supervised start</h2>
            <p>
              We discuss your workload, language requirements, coverage, and
              systems, then evaluate candidates against those needs. We confirm
              relevant experience individually; no example profile represents a
              guarantee of availability or qualifications.
            </p>
            <p>
              Your firm directs the work, provides approved procedures, and
              reviews anything requiring legal judgment. Read more about{" "}
              <Link href="/confidentiality">
                confidentiality and onboarding
              </Link>{" "}
              or our <Link href="/process">staffing process</Link>.
            </p>
          </div>
          <aside className="detail-aside">
            <p className="eyebrow">Build your support team</p>
            <h2>
              The role your
              <br />
              <em>practice needs.</em>
            </h2>
            <ul>
              {area.roleSlugs.map((slug) => {
                const role = roles.find((item) => item.slug === slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/roles/${slug}`}>
                      {role.plural}
                      <Arrow />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink
              href={`/request-candidates?practice=${encodeURIComponent(area.name)}`}
              event="primary_cta_click"
              location={`practice_${area.slug}`}
            >
              Discuss your staffing needs
            </ButtonLink>
            <BookingLink location={`practice_${area.slug}`} />
          </aside>
        </div>
      </Section>
      <CTA />
    </>
  );
}
