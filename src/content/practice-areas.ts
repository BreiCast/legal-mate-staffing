export type PracticeArea = {
  slug: string;
  name: string;
  summary: string;
  headline: string;
  introduction: string;
  workflows: { title: string; description: string }[];
  considerations: string;
  roleSlugs: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "personal-injury",
    name: "Personal Injury",
    summary: "From the first call to a better-organized case file.",
    headline: "Support for the work behind every personal injury case.",
    introduction:
      "Personal injury matters demand steady client contact, treatment updates, and persistent records follow-up. Our founders’ experience in case management, medical records, and insurance coordination informs how we scope and screen these roles.",
    workflows: [
      {
        title: "Client communication",
        description:
          "Keep contact notes current, coordinate check-ins, and flag changes in treatment or client circumstances for attorney review.",
      },
      {
        title: "Records and bills",
        description:
          "Track authorizations, provider requests, missing date ranges, and follow-up status in a consistent system.",
      },
      {
        title: "An organized matter",
        description:
          "Maintain chronologies, supporting documentation, and task ownership so your legal team can review a complete file.",
      },
    ],
    considerations:
      "Define your case stages, the volume each person can reasonably manage, and which communications need attorney approval. Software familiarity and experience with your type of matters should be reviewed candidate by candidate.",
    roleSlugs: [
      "case-manager",
      "medical-records-specialist",
      "intake-specialist",
      "paralegal",
    ],
  },
  {
    slug: "immigration",
    name: "Immigration",
    summary: "Bilingual communication and careful document coordination.",
    headline: "More clarity for clients. More organization for your team.",
    introduction:
      "Immigration practices coordinate sensitive information, extensive documentation, and clients who may prefer Spanish. We scope support around your case types and the tasks your attorneys can appropriately delegate.",
    workflows: [
      {
        title: "Bilingual intake",
        description:
          "Gather preliminary information using approved questions, coordinate consultations, and capture a clear handoff for your team.",
      },
      {
        title: "Document collection",
        description:
          "Track client checklists, follow up on missing documents, and maintain organized files for attorney review.",
      },
      {
        title: "Client coordination",
        description:
          "Schedule appointments and relay attorney-approved status updates in the client’s preferred language.",
      },
    ],
    considerations:
      "Tell us the case types, terminology, software, and experience your role requires. Your firm reviews all forms and submissions, provides legal advice, and retains responsibility for deadlines and eligibility decisions.",
    roleSlugs: [
      "intake-specialist",
      "paralegal",
      "legal-assistant",
      "receptionist",
    ],
  },
  {
    slug: "family-law",
    name: "Family Law",
    summary: "Thoughtful client service when the details are personal.",
    headline: "Careful support for sensitive matters.",
    introduction:
      "Family law clients need calm communication and reliable follow-through. A well-defined remote support role can help your team organize documents and appointments while respecting the sensitivity of each matter.",
    workflows: [
      {
        title: "Sensitive first conversations",
        description:
          "Follow your intake process, collect information thoughtfully, and direct legal questions to the appropriate attorney.",
      },
      {
        title: "Document organization",
        description:
          "Maintain client checklists and organize correspondence and financial documents with appropriate access restrictions.",
      },
      {
        title: "Scheduling and updates",
        description:
          "Coordinate meetings, maintain clear task notes, and communicate firm-approved next steps.",
      },
    ],
    considerations:
      "Set procedures for identity verification, restricted communications, urgent issues, and attorney review. Match candidates to the emotional demands and specific duties of the role.",
    roleSlugs: [
      "case-manager",
      "legal-assistant",
      "intake-specialist",
      "paralegal",
    ],
  },
  {
    slug: "civil-litigation",
    name: "Civil Litigation",
    summary: "Organized documents, coordinated calendars, clear handoffs.",
    headline: "Keep the support work in step with the litigation.",
    introduction:
      "Civil litigation brings a steady flow of documents, correspondence, and scheduling needs. Scope remote support around repeatable workflows, with attorneys directing strategy, approving work, and overseeing deadlines.",
    workflows: [
      {
        title: "Matter organization",
        description:
          "Maintain indexed documents, chronologies, correspondence, and task status using your firm’s conventions.",
      },
      {
        title: "Preparation support",
        description:
          "Assemble materials and assist with formatting and drafting from instructions for attorney review.",
      },
      {
        title: "Calendar coordination",
        description:
          "Coordinate meetings and reminders within the deadline-management and review system established by your firm.",
      },
    ],
    considerations:
      "Specify the jurisdiction, matter types, document volume, and required software experience. Final deadline calculations, filings, legal judgments, and work product remain subject to your firm’s review and authorization.",
    roleSlugs: ["paralegal", "legal-assistant", "case-manager"],
  },
  {
    slug: "collections",
    name: "Collections",
    summary: "Consistent account follow-up and clear records of every contact.",
    headline: "Structured support for collections and legal recovery.",
    introduction:
      "Collections operations depend on accurate records and consistent communication. We scope support roles around your approved procedures, supervision, and the requirements applicable to your organization.",
    workflows: [
      {
        title: "Account administration",
        description:
          "Organize account documentation, reconcile information, and flag discrepancies for the responsible team member.",
      },
      {
        title: "Approved communications",
        description:
          "Follow organization-approved scripts and contact procedures, with clear boundaries and escalation rules.",
      },
      {
        title: "Status tracking",
        description:
          "Record contact history, coordinate follow-ups, and prepare administrative reports for review.",
      },
    ],
    considerations:
      "Your organization determines applicable communication restrictions, required training, permissions, and supervision before assigning work. Candidate experience and the permitted scope must be evaluated for the specific role.",
    roleSlugs: ["legal-assistant", "intake-specialist", "receptionist"],
  },
];
