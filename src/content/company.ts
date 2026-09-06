// Source: existing company biographies and the approved redesign brief.
// Quantified results, individual tool proficiency, portraits, and client proof
// require separate approval; they are deliberately not inferred here.
export const company = {
  name: "Legal Mate Staffing",
  legalName: "Legal Mate Staffing LLC",
  description:
    "Vetted bilingual LATAM professionals for U.S. law firms. Case managers, paralegals, intake specialists, and legal support, selected by legal operators.",
  navigation: [
    { label: "Legal staffing", href: "/legal-staffing" },
    { label: "How it works", href: "/process" },
    { label: "Our story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  founders: [
    {
      name: "André Rodriguez Leones",
      initials: "AR",
      title: "Co-founder · Talent Development",
      biography:
        "André’s background spans case management, medical records, billing, and operational performance for U.S. law firms. He brings a practical understanding of the follow-through that a busy legal team needs.",
      portrait: null as string | null,
    },
    {
      name: "Henry Andrés Sánchez Martínez",
      initials: "HS",
      title: "Co-founder · Operations",
      biography:
        "Henry’s experience includes intake, investigation, drafting support, demand preparation, medical record analysis, and insurance coordination. That perspective shapes how Legal Mate understands a role before beginning a search.",
      portrait: null as string | null,
    },
  ],
};

export const processSteps = [
  {
    number: "01",
    title: "Tell us what your firm needs.",
    description:
      "We get specific about the role, your practice area, systems, schedule, and the work you want to hand over.",
    detail: "A clear role brief",
  },
  {
    number: "02",
    title: "Meet vetted candidates.",
    description:
      "We screen for relevant experience, communication, and role-specific skills. You meet the people who fit your brief.",
    detail: "A focused candidate shortlist",
  },
  {
    number: "03",
    title: "Choose your hire. Build your team.",
    description:
      "You make the decision. We coordinate the start and stay involved as your new team member settles into the work.",
    detail: "Onboarding and ongoing support",
  },
];

export const faqs = [
  {
    question: "What makes Legal Mate different from a general staffing agency?",
    answer:
      "Our founders have worked in legal operations supporting U.S. firms. That experience helps us understand the day-to-day responsibilities behind a job title and evaluate candidates against the work your team actually needs done.",
  },
  {
    question: "Will my team member speak English and Spanish?",
    answer:
      "Bilingual English and Spanish talent is central to our offering. We discuss the communication demands of your role and assess candidates accordingly. You can also evaluate language skills directly during your interviews.",
  },
  {
    question: "Can candidates work during our business hours?",
    answer:
      "We source remote talent in Latin America and align the search to your firm’s schedule. Your required time zone and coverage hours are confirmed for each candidate before a placement is agreed.",
  },
  {
    question: "How do you evaluate candidates?",
    answer:
      "The search starts with your role and workflows. Screening includes relevant experience, role-specific evaluations, and interviews. We discuss the scope of experience verification and any additional checks your firm requires during the search.",
  },
  {
    question: "What does staffing cost?",
    answer:
      "Pricing depends on the role, experience, schedule, and scope of support. Request a shortlist to begin a conversation about your requirements and receive a tailored proposal with clear terms. We do not publish a one-size-fits-all rate.",
  },
  {
    question: "How soon can someone start?",
    answer:
      "Timing depends on the role, candidate availability, your interview process, and onboarding needs. We discuss the expected search and start timeline with you after reviewing the brief.",
  },
  {
    question: "What happens after the placement?",
    answer:
      "We stay involved through follow-up and communication with your team. Support scope, performance expectations, and any replacement provisions are set out in your staffing agreement.",
  },
  {
    question: "Can remote staff provide legal advice?",
    answer:
      "Staff support your attorneys and firm workflows under appropriate supervision. They do not independently provide U.S. legal advice unless legally authorized. Your firm determines the permitted scope of work and retains responsibility for legal services.",
  },
];

export type CandidateProfile = {
  id: string;
  kind: "example" | "approved";
  role: string;
  practice: string;
  summary: string;
  skills: string[];
  languages: string;
  schedule: string;
  // Internal approval references must never contain personal information.
  approvalReference?: string;
  approvedForPublication?: boolean;
};

export const candidateProfiles: CandidateProfile[] = [
  {
    id: "example-case-manager",
    kind: "example",
    role: "Case Manager",
    practice: "Personal injury support",
    summary:
      "A profile shaped around client communication, treatment tracking, and an organized matter file.",
    skills: ["Client communication", "Records & bills", "Treatment tracking"],
    languages: "English / Spanish",
    schedule: "Matched to your firm’s hours",
  },
  {
    id: "example-intake",
    kind: "example",
    role: "Intake Specialist",
    practice: "Bilingual client intake",
    summary:
      "A profile focused on thoughtful first conversations, complete notes, and clear attorney handoffs.",
    skills: [
      "Bilingual intake",
      "Consultation scheduling",
      "CRM documentation",
    ],
    languages: "English / Spanish",
    schedule: "Coverage defined in your brief",
  },
  {
    id: "example-paralegal",
    kind: "example",
    role: "Paralegal",
    practice: "Attorney-directed support",
    summary:
      "A profile built around careful document preparation, matter organization, and attention to detail.",
    skills: ["Document preparation", "Matter organization", "Drafting support"],
    languages: "English / Spanish",
    schedule: "Matched to your firm’s hours",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  firm: string;
  role: string;
  approved: boolean;
  permissionReference: string;
};
export const testimonials: Testimonial[] = [];
export type TrustMetric = {
  value: string;
  label: string;
  source: string;
  approved: boolean;
};
export const trustMetrics: TrustMetric[] = [];
// Add only tools for which the company has approved evidence of candidate familiarity.
export const verifiedSoftware: { name: string; evidenceReference: string }[] =
  [];
