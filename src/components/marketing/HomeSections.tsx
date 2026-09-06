import Image from "next/image";
import Link from "next/link";
import { roles } from "@/content/roles";
import { practiceAreas } from "@/content/practice-areas";
import {
  candidateProfiles,
  company,
  processSteps,
  testimonials,
  trustMetrics,
  verifiedSoftware,
} from "@/content/company";
import {
  Arrow,
  ButtonLink,
  Check,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import {
  CandidateCard,
  PracticeAreaCard,
  RoleCard,
  TestimonialCard,
  TrustMetric,
} from "@/components/Cards";
import { BookingLink } from "@/components/BookingLink";

export function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <Eyebrow>Legal expertise. Human connection.</Eyebrow>
            <h1>
              Legal staff who <br />
              already know <br />
              <em>your world.</em>
            </h1>
            <p className="hero-description">
              Bilingual LATAM talent for U.S. law firms. Case managers,
              paralegals, and intake specialists selected by people who have
              done the work.
            </p>
            <div className="button-row">
              <ButtonLink
                href="/request-candidates"
                event="primary_cta_click"
                location="hero"
              >
                Get my candidate shortlist
              </ButtonLink>
            </div>
            <div className="hero-secondary">
              <BookingLink location="hero" />
              <Link href="/legal-staffing" className="text-link">
                Explore legal roles <Arrow />
              </Link>
            </div>
            <div className="hero-notes">
              <span>
                <Check /> English / Spanish
              </span>
              <span>
                <Check /> U.S. business hours
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo">
              <Image
                src="/images/editorial-office.jpg"
                alt="A quiet office corridor with glass meeting rooms and natural light"
                fill
                preload
                sizes="(min-width: 1200px) 550px, (min-width: 900px) 48vw, 92vw"
              />
              <span className="photo-caption">
                Space for your firm to grow.
              </span>
            </div>
            <CandidateCard profile={candidateProfiles[0]} compact />
            <span className="hero-visual-note">
              The people behind your next chapter.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <Container>
        <p>
          Legal staffing.
          <br />
          <strong>With a legal perspective.</strong>
        </p>
        <span>Built by legal operators</span>
        <span>Bilingual LATAM talent</span>
        <span>Role-specific screening</span>
        <span>Ongoing placement support</span>
      </Container>
    </div>
  );
}

export function ValueSection() {
  return (
    <Section className="value-section">
      <div className="value-grid">
        <SectionHeading
          eyebrow="Your caseload grows. Your time doesn’t."
          title={
            <>
              Your attorneys need
              <br />
              room to <em>practice law.</em>
            </>
          }
        />
        <div className="value-copy">
          <p className="large-copy">
            The follow-ups. The intake calls. The records that still haven’t
            arrived.
          </p>
          <p>
            Important work fills the day before your attorneys get to the work
            only they can do. The right legal support gives every detail an
            owner.
          </p>
          <p>
            We help you build a dedicated remote team around your firm’s actual
            workflows, with bilingual professionals who understand what the work
            requires.
          </p>
          <Link className="text-link" href="/about">
            Why our experience matters <Arrow />
          </Link>
        </div>
      </div>
    </Section>
  );
}

export function RolesSection() {
  return (
    <Section className="roles-section" id="roles">
      <div className="section-heading-row">
        <SectionHeading
          eyebrow="The right people, in the right roles"
          title={
            <>
              Built around the work.
              <br />
              <em>And the people doing it.</em>
            </>
          }
        />
        <p className="section-sidecopy">
          From a client’s first call to a carefully organized case file. Find
          support for the work that keeps your firm moving.
        </p>
      </div>
      <div className="roles-grid">
        {roles.map((role, index) => (
          <RoleCard key={role.slug} role={role} index={index} />
        ))}
      </div>
      <p className="section-footnote">
        Need client service, collections, or administrative support?{" "}
        <Link href="/operations-staffing">
          Explore our operations offering <span aria-hidden="true">↗</span>
        </Link>
      </p>
    </Section>
  );
}

export function PracticeAreasSection() {
  return (
    <Section className="practice-section">
      <div className="practice-layout">
        <SectionHeading
          eyebrow="A role is only half the picture"
          title={
            <>
              Your practice.
              <br />
              <em>Your priorities.</em>
            </>
          }
          description="A personal injury case and an immigration matter need different kinds of follow-through. We shape each search around the work inside your firm."
        />
        <div className="practice-grid">
          {practiceAreas.map((area, index) => (
            <PracticeAreaCard
              key={area.slug}
              area={area}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

export function ProcessSection() {
  return (
    <Section className="process-section">
      <div className="section-heading-row">
        <SectionHeading
          eyebrow="A clear path to your next hire"
          title={
            <>
              You know the need.
              <br />
              <em>We help find the person.</em>
            </>
          }
        />
        <Link className="text-link" href="/process">
          See how we work <Arrow />
        </Link>
      </div>
      <div className="process-grid">
        {processSteps.map((step) => (
          <article className="process-step" key={step.number}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span className="step-detail">
              <Check />
              {step.detail}
            </span>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function FoundersSection({ full = false }: { full?: boolean }) {
  return (
    <Section className="founders-section">
      <div className="founders-layout">
        <div>
          <Eyebrow>The experience behind the search</Eyebrow>
          <h2>
            We understand
            <br />
            the work.
            <br />
            <em>We’ve done it.</em>
          </h2>
          <p className="founder-story">
            Legal Mate was built by people who have supported U.S. legal
            operations from the inside.
          </p>
          <p>
            We know that a strong hire does more than fill a seat. They keep
            clients informed, follow through on the details, and help the whole
            team work better.
          </p>
          {!full && (
            <ButtonLink href="/about" variant="text">
              Meet the people behind Legal Mate
            </ButtonLink>
          )}
        </div>
        <div className="founder-profiles">
          {company.founders.map((founder) => (
            <article className="founder-profile" key={founder.name}>
              <div className="founder-initials">
                {founder.portrait ? (
                  <Image
                    src={founder.portrait}
                    width={80}
                    height={80}
                    alt={founder.name}
                  />
                ) : (
                  <span aria-hidden="true">{founder.initials}</span>
                )}
              </div>
              <div>
                <p className="founder-title">{founder.title}</p>
                <h3>{founder.name}</h3>
                <p>{founder.biography}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function TalentSection() {
  return (
    <Section className="talent-section">
      <div className="section-heading-row">
        <SectionHeading
          eyebrow="Picture the right fit"
          title={
            <>
              Beyond the résumé.
              <br />
              <em>Into the day-to-day.</em>
            </>
          }
        />
        <div className="section-sidecopy">
          <p>
            See how a role becomes a candidate brief. These illustrative
            profiles show the kind of support you can request.
          </p>
          <Link className="text-link" href="/talent">
            Explore example profiles <Arrow />
          </Link>
        </div>
      </div>
      <div className="talent-grid">
        {candidateProfiles.map((profile) => (
          <CandidateCard key={profile.id} profile={profile} />
        ))}
      </div>
      <p className="section-footnote">
        Example candidate profiles. These are illustrations, not live candidates
        or promises of availability.
      </p>
      <BookingLink location="candidates" />
    </Section>
  );
}

export function WorkflowSection() {
  return (
    <Section className="workflow-section">
      <div className="workflow-layout">
        <div>
          <Eyebrow>Fits the way your firm works</Eyebrow>
          <h2>
            Your systems.
            <br />
            <em>A considered handoff.</em>
          </h2>
          <p>
            Tell us which tools your team uses. We review relevant software
            experience for each candidate and plan the onboarding your workflows
            need.
          </p>
        </div>
        <div className="workflow-checklist">
          <div>
            <span>01</span>
            <div>
              <h3>Define your working environment</h3>
              <p>
                Case management, intake, communication, and document systems.
              </p>
            </div>
          </div>
          <div>
            <span>02</span>
            <div>
              <h3>Assess the relevant experience</h3>
              <p>
                Review what each candidate has used and where training is
                needed.
              </p>
            </div>
          </div>
          <div>
            <span>03</span>
            <div>
              <h3>Make the first week purposeful</h3>
              <p>
                Clear access, documented procedures, and a named supervisor.
              </p>
            </div>
          </div>
        </div>
      </div>
      {verifiedSoftware.length > 0 && (
        <ul className="software-list">
          {verifiedSoftware
            .filter((tool) => tool.evidenceReference)
            .map((tool) => (
              <li key={tool.name}>{tool.name}</li>
            ))}
        </ul>
      )}
    </Section>
  );
}

export function EconomicsSection() {
  return (
    <Section className="economics-section">
      <div className="section-heading-row">
        <SectionHeading
          eyebrow="A practical hiring decision"
          title={
            <>
              Compare the whole role.
              <br />
              <em>Not just the hourly rate.</em>
            </>
          }
        />
        <p className="section-sidecopy">
          Scope, supervision, administration, and continuity all matter. We
          build a proposal around your needs, with terms you can review before
          deciding.
        </p>
      </div>
      <div
        className="comparison-scroll"
        tabIndex={0}
        role="region"
        aria-label="Staffing considerations comparison"
      >
        <table className="comparison-table">
          <caption className="sr-only">
            Questions to compare when choosing a staffing approach
          </caption>
          <thead>
            <tr>
              <th scope="col">What to account for</th>
              <th scope="col">Direct local hire</th>
              <th scope="col">Recruiting agency</th>
              <th scope="col">Legal Mate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Search & screening</th>
              <td>Your internal process</td>
              <td>Agency scope varies</td>
              <td>Role-specific search and evaluation</td>
            </tr>
            <tr>
              <th scope="row">Day-to-day direction</th>
              <td>Your firm</td>
              <td>Usually your firm after hiring</td>
              <td>Your firm, with placement follow-up</td>
            </tr>
            <tr>
              <th scope="row">Administration & overhead</th>
              <td>Budget employer obligations</td>
              <td>Confirm fees and employer obligations</td>
              <td>Review the full staffing proposal</td>
            </tr>
            <tr>
              <th scope="row">Timing & continuity</th>
              <td>Depends on your search and policies</td>
              <td>Depends on search and agency terms</td>
              <td>Confirm timeline and support in your agreement</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link
        className="text-link"
        href="/request-candidates"
        data-event="primary_cta_click"
        data-location="economics"
      >
        Talk through your staffing needs <Arrow />
      </Link>
    </Section>
  );
}

export function ConfidentialitySection() {
  return (
    <Section className="confidentiality-section">
      <div className="confidentiality-layout">
        <div className="shield-icon" aria-hidden="true">
          <svg
            width="40"
            height="44"
            viewBox="0 0 40 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M20 2 36 8v14c0 10-16 19-16 19S4 32 4 22V8L20 2Z" />
            <path d="m12 21 5 5 11-12" />
          </svg>
        </div>
        <div>
          <Eyebrow>Professional boundaries, from day one</Eyebrow>
          <h2>
            Care for the information
            <br />
            <em>your clients trust you with.</em>
          </h2>
          <p>
            We discuss confidentiality expectations and your firm’s access
            procedures as part of onboarding. Your team sets the permissions,
            supervision, and safeguards appropriate to the work.
          </p>
          <Link className="text-link" href="/confidentiality">
            Our approach to responsible onboarding <Arrow />
          </Link>
        </div>
        <ul className="check-list">
          <li>
            <Check />
            Confidentiality terms and NDAs where applicable
          </li>
          <li>
            <Check />
            Individual accounts and limited permissions
          </li>
          <li>
            <Check />
            Attorney supervision and clear escalation
          </li>
          <li>
            <Check />
            Planned access removal at offboarding
          </li>
        </ul>
      </div>
    </Section>
  );
}

export function VerifiedProof() {
  const approved = testimonials.filter(
    (item) => item.approved && item.permissionReference,
  );
  const metrics = trustMetrics.filter((item) => item.approved && item.source);
  if (!approved.length && !metrics.length) return null;
  return (
    <Section>
      <SectionHeading
        eyebrow="From the firms we support"
        title="Experience, in their words."
      />
      <div className="proof-grid">
        {approved.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
        {metrics.map((metric) => (
          <TrustMetric key={metric.label} metric={metric} />
        ))}
      </div>
    </Section>
  );
}
