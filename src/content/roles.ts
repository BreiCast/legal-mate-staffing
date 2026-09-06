export type Role = {
  slug: string;
  name: string;
  plural: string;
  summary: string;
  headline: string;
  introduction: string;
  tasks: string[];
  evaluation: string[];
  onboarding: string;
  practiceAreas: string[];
};

export const roles: Role[] = [
  {
    slug: "case-manager",
    name: "Case Manager",
    plural: "Case Managers",
    summary:
      "Keep clients informed, treatment tracked, and your matters moving.",
    headline: "A steady hand for every stage of a case.",
    introduction:
      "When your caseload grows, client updates and follow-ups can consume the day. A remote case manager helps organize the work around each matter, with your attorneys setting priorities and directing legal decisions.",
    tasks: [
      "Client communication and case-status updates",
      "Medical treatment tracking and provider follow-up",
      "Coordination of records, bills, and insurance correspondence",
      "Matter organization, task tracking, and escalation",
    ],
    evaluation: [
      "A clear, empathetic client update in English and Spanish",
      "A practical exercise organizing an active matter",
      "Judgment about when to escalate an issue to an attorney",
      "Relevant practice-area and case-management software experience",
    ],
    onboarding:
      "Assign a supervising attorney or team lead, define escalation rules, and share your case stages, task templates, and client communication standards. Begin with a manageable group of matters and review work together.",
    practiceAreas: ["personal-injury", "family-law", "civil-litigation"],
  },
  {
    slug: "paralegal",
    name: "Paralegal",
    plural: "Paralegals",
    summary:
      "Give your attorneys organized files and carefully prepared support.",
    headline: "More preparation. More room for your attorneys to focus.",
    introduction:
      "A remote paralegal supports the preparation behind a matter: organizing documents, assembling information, and drafting at an attorney’s direction. Define the jurisdiction, practice area, and level of supervision before starting your search.",
    tasks: [
      "Document organization and preparation of case chronologies",
      "Drafting assistance using attorney-approved templates",
      "Discovery organization and supporting research",
      "Deadline tracking and preparation for attorney review",
    ],
    evaluation: [
      "Attention to detail in a document review exercise",
      "Writing quality and ability to follow drafting instructions",
      "Relevant practice-area experience",
      "Understanding of supervision and confidentiality boundaries",
    ],
    onboarding:
      "Provide approved templates, a deadline review process, and clear review ownership. Your firm verifies all legal work and determines which duties may be delegated under applicable rules.",
    practiceAreas: [
      "personal-injury",
      "immigration",
      "family-law",
      "civil-litigation",
    ],
  },
  {
    slug: "intake-specialist",
    name: "Intake Specialist",
    plural: "Intake Specialists",
    summary:
      "Make the first conversation feel like the start of a relationship.",
    headline: "A thoughtful first point of contact for your firm.",
    introduction:
      "New inquiries need a clear next step. A bilingual intake specialist gathers information, follows your qualification criteria, and coordinates consultations, so potential clients receive a consistent first experience.",
    tasks: [
      "English and Spanish inbound calls and inquiry follow-up",
      "Fact gathering using your firm’s approved intake questions",
      "Consultation scheduling and reminder coordination",
      "Accurate CRM notes and handoffs to the legal team",
    ],
    evaluation: [
      "A simulated intake conversation in both languages",
      "Accuracy and completeness of call notes",
      "Sensitivity when discussing difficult circumstances",
      "Following qualification and escalation instructions",
    ],
    onboarding:
      "Share call scripts, qualification criteria, conflict-check procedures, and scheduling access. Specify who decides whether to accept a matter. Intake staff should never promise an outcome or offer independent legal advice.",
    practiceAreas: [
      "personal-injury",
      "immigration",
      "family-law",
      "civil-litigation",
      "collections",
    ],
  },
  {
    slug: "legal-assistant",
    name: "Legal Assistant",
    plural: "Legal Assistants",
    summary: "Bring order to calendars, documents, and the details in between.",
    headline: "The daily details, handled with care.",
    introduction:
      "A legal assistant supports the administrative work that keeps a firm organized. Build the role around the repeatable tasks your team needs help with, from calendars and correspondence to maintaining complete matter files.",
    tasks: [
      "Calendar coordination and appointment scheduling",
      "Document formatting, filing, and matter updates",
      "Client correspondence using approved instructions",
      "Administrative follow-up and team coordination",
    ],
    evaluation: [
      "Accuracy in a calendar and document organization exercise",
      "Professional written English and Spanish",
      "Ability to prioritize competing administrative requests",
      "Comfort with the tools used in your daily workflow",
    ],
    onboarding:
      "Document naming conventions, calendar permissions, communication templates, and task ownership. Set a regular check-in with the person responsible for reviewing the assistant’s work.",
    practiceAreas: [
      "personal-injury",
      "immigration",
      "family-law",
      "civil-litigation",
      "collections",
    ],
  },
  {
    slug: "medical-records-specialist",
    name: "Medical Records Specialist",
    plural: "Medical Records Specialists",
    summary:
      "Stay on top of requests, missing records, and provider follow-ups.",
    headline: "Keep the records moving with the case.",
    introduction:
      "Records and bills require consistent follow-through. A medical records specialist tracks requests, coordinates with providers, and organizes incoming documents according to your firm’s procedures.",
    tasks: [
      "Records and billing requests under firm-approved authorization",
      "Provider follow-up and request-status tracking",
      "Identification of missing documents and date ranges",
      "Organization of records and bills for the legal team",
    ],
    evaluation: [
      "A records-request tracking and reconciliation exercise",
      "Care with dates, names, and incomplete information",
      "Professional provider communication",
      "Ability to follow restricted-access and escalation procedures",
    ],
    onboarding:
      "Define authorization requirements, permitted communication channels, access permissions, and a tracking system. Your firm determines the privacy obligations and safeguards appropriate to the information involved.",
    practiceAreas: ["personal-injury", "civil-litigation"],
  },
  {
    slug: "receptionist",
    name: "Receptionist",
    plural: "Receptionists",
    summary: "A welcoming, bilingual voice for the people calling your firm.",
    headline: "A professional welcome. A clear next step.",
    introduction:
      "A remote receptionist helps callers reach the right person, captures accurate messages, and coordinates appointments. Agree on coverage hours and the call-routing process before onboarding.",
    tasks: [
      "English and Spanish call answering and routing",
      "Accurate message taking and urgent-call escalation",
      "Appointment coordination and confirmations",
      "Routine client service following your firm’s guidance",
    ],
    evaluation: [
      "Bilingual phone presence and listening skills",
      "Accurate message capture during a sample call",
      "Handling sensitive or frustrated callers professionally",
      "Consistent use of routing and escalation instructions",
    ],
    onboarding:
      "Provide an up-to-date directory, approved greetings, escalation contacts, and a coverage schedule. Define what information may be shared and how callers should be identified.",
    practiceAreas: [
      "personal-injury",
      "immigration",
      "family-law",
      "civil-litigation",
      "collections",
    ],
  },
];

export const roleOptions = [
  ...roles.map((role) => role.name),
  "Client Service Specialist",
  "Collections / Operations Support",
  "Help me define the role",
] as const;
export const hireOptions = ["1", "2–3", "4–6", "7+", "Not sure yet"] as const;
export const timelineOptions = [
  "As soon as practical",
  "Within a month",
  "Within 2–3 months",
  "Exploring options",
] as const;
