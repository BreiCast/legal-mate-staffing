import Link from "next/link";
import type { Role } from "@/content/roles";
import type { PracticeArea } from "@/content/practice-areas";
import type {
  CandidateProfile,
  Testimonial,
  TrustMetric as Metric,
} from "@/content/company";
import { Arrow, Check } from "@/components/ui/Primitives";

export function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <Link className="role-card" href={`/roles/${role.slug}`}>
      <div className="card-topline">
        <span className="role-number">0{index + 1}</span>
        <Arrow diagonal />
      </div>
      <h3>{role.name}</h3>
      <p>{role.summary}</p>
      <ul>
        {role.tasks.slice(0, 2).map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
      <span className="card-link">
        Explore the role <Arrow />
      </span>
    </Link>
  );
}
export function PracticeAreaCard({
  area,
  featured = false,
}: {
  area: PracticeArea;
  featured?: boolean;
}) {
  return (
    <Link
      className={`practice-card ${featured ? "featured" : ""}`}
      href={`/practice-areas/${area.slug}`}
    >
      <div>
        {featured && (
          <span className="small-label">Built on hands-on experience</span>
        )}
        <h3>{area.name}</h3>
        <p>{area.summary}</p>
      </div>
      <Arrow diagonal />
    </Link>
  );
}
export function CandidateCard({
  profile,
  compact = false,
}: {
  profile: CandidateProfile;
  compact?: boolean;
}) {
  if (
    profile.kind === "approved" &&
    (!profile.approvedForPublication || !profile.approvalReference)
  )
    return null;
  return (
    <article className={`candidate-card ${compact ? "compact" : ""}`}>
      <div className="candidate-label">
        <span>
          {profile.kind === "example"
            ? "Example candidate profile"
            : "Candidate profile"}
        </span>
        <Arrow diagonal />
      </div>
      <div className="candidate-role">
        <div className="candidate-monogram" aria-hidden="true">
          {profile.role
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>
        <div>
          {compact ? (
            <p className="candidate-title">{profile.role}</p>
          ) : (
            <h3>{profile.role}</h3>
          )}
          <p>{profile.practice}</p>
        </div>
      </div>
      {!compact && <p className="candidate-summary">{profile.summary}</p>}
      <ul className="candidate-skills">
        {profile.skills.map((skill) => (
          <li key={skill}>
            <Check />
            {skill}
          </li>
        ))}
      </ul>
      <div className="candidate-meta">
        <span>{profile.languages}</span>
        <span>{compact ? "Remote · LATAM" : profile.schedule}</span>
      </div>
      <Link
        className="candidate-action"
        href={`/request-candidates?role=${encodeURIComponent(profile.role)}`}
        data-event="candidate_profile_interaction"
        data-profile={profile.id}
        data-location={compact ? "hero" : "talent"}
      >
        Request a profile like this <Arrow />
      </Link>
    </article>
  );
}
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (!testimonial.approved || !testimonial.permissionReference) return null;
  return (
    <figure className="testimonial">
      <blockquote>{testimonial.quote}</blockquote>
      <figcaption>
        {testimonial.name}
        <span>
          {testimonial.role} · {testimonial.firm}
        </span>
      </figcaption>
    </figure>
  );
}
export function TrustMetric({ metric }: { metric: Metric }) {
  if (!metric.approved || !metric.source) return null;
  return (
    <div className="trust-metric">
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
    </div>
  );
}
