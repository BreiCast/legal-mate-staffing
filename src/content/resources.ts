export type Resource = {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: { title: string; paragraphs: string[] }[];
  relatedRole: string;
};
export const resources: Resource[] = [
  {
    slug: "onboard-remote-case-manager",
    title: "How to onboard a remote case manager",
    category: "Team operations",
    description:
      "A practical first-week framework: define ownership, map the case stages, set communication standards, and review the work together.",
    relatedRole: "case-manager",
    sections: [
      {
        title: "Start with a role map, not a login",
        paragraphs: [
          "Before the first day, write down which tasks the case manager owns, which they coordinate, and which need attorney approval. Client updates, treatment tracking, records requests, and task management may each involve different handoffs. Assign a supervisor who can resolve uncertainty.",
          "Choose a small, manageable group of matters for the initial handoff. A full caseload can make it difficult to see where the onboarding process is unclear. Expand the assignment after reviewing accuracy, communication, and follow-through.",
        ],
      },
      {
        title: "Walk through one real workflow",
        paragraphs: [
          "Use an appropriately accessible matter or a training example to show each case stage, your naming conventions, where to record an update, and how to assign the next task. Demonstrate how an unanswered provider request should be followed up and when an issue should be escalated.",
          "Provide approved templates and a short directory of the people responsible for intake, records, scheduling, and attorney decisions. A useful procedure tells the person what done looks like and who reviews it.",
        ],
      },
      {
        title: "Make communication explicit",
        paragraphs: [
          "Agree on coverage hours, internal response expectations, and the channel for urgent issues. Define the frequency and content of client updates. Review English and Spanish communication against your firm’s tone and instructions.",
          "A short daily check-in during the first week can surface missing permissions or unclear ownership. Review a sample of notes, open tasks, and follow-up records together. Give concrete feedback tied to the workflow, then document any changes.",
        ],
      },
      {
        title: "Review before expanding",
        paragraphs: [
          "At the end of the initial handoff, check whether tasks are recorded consistently, records requests have owners, and clients receive the agreed updates. Resolve process gaps before assigning more matters.",
          "Your firm remains responsible for legal decisions, deadline oversight, permissions, and supervision. Confirm confidentiality expectations and an offboarding plan before granting access to sensitive information.",
        ],
      },
    ],
  },
  {
    slug: "legal-intake-specialist-responsibilities",
    title: "What should a legal intake specialist handle?",
    category: "Defining the role",
    description:
      "Separate first-contact support from legal judgment, and build an intake role around clear information and a consistent handoff.",
    relatedRole: "intake-specialist",
    sections: [
      {
        title: "Give the first conversation a purpose",
        paragraphs: [
          "A useful intake process gathers the information your firm needs to decide the next step. The specialist should follow approved questions, capture accurate contact details, understand the caller’s preferred language, and explain the consultation process.",
          "Define the role by channel and coverage. Inbound phone calls, web inquiries, email follow-up, and appointment reminders require different routines. Be clear about which channels the person owns and when someone else takes over.",
        ],
      },
      {
        title: "Build a repeatable handoff",
        paragraphs: [
          "Create a note template that separates the caller’s statements from anything still unconfirmed. Decide where the notes live, who reviews them, and how urgent issues reach the right person. Include a process for duplicates, incomplete information, and missed calls.",
          "The specialist can coordinate consultations and communicate approved next steps. The firm should define who performs conflict checks, decides whether to accept a matter, and responds to requests for legal guidance.",
        ],
      },
      {
        title: "Evaluate a conversation, not just a résumé",
        paragraphs: [
          "Use a simulated intake call with fictional facts. Assess listening, empathy, accuracy, and ability to follow instructions in both English and Spanish if the role is bilingual. Ask the candidate to produce a written handoff after the call.",
          "Look for judgment about when to pause and ask for guidance. A confident answer is not useful if it promises a case outcome or crosses a boundary your firm has set.",
        ],
      },
      {
        title: "Review quality alongside volume",
        paragraphs: [
          "A call count alone does not tell you whether intake is working. Review the completeness of notes, accurate scheduling, appropriate escalation, and follow-through on open inquiries. Use your firm’s actual baseline before setting performance targets.",
        ],
      },
    ],
  },
  {
    slug: "remote-paralegal-vs-legal-assistant",
    title: "Remote paralegal or legal assistant: which role fits?",
    category: "Hiring decisions",
    description:
      "Start with the work you need to delegate. Compare document and case preparation with the administrative support that keeps a firm organized.",
    relatedRole: "legal-assistant",
    sections: [
      {
        title: "List the work before choosing the title",
        paragraphs: [
          "Write down the tasks taking time away from your attorneys and current staff. Calendar coordination, document formatting, routine correspondence, and matter updates often point toward a legal assistant role. More involved document preparation, research support, discovery organization, or drafting assistance may point toward a paralegal.",
          "Titles are used differently across organizations. Define the actual duties, the experience they require, and how the work will be supervised. Your firm determines the permitted scope under the rules applicable to its practice.",
        ],
      },
      {
        title: "Choose experience that matches the assignment",
        paragraphs: [
          "For a legal assistant, practical exercises might cover calendar coordination, file organization, and professional communication. For a paralegal, you may want a more detailed writing or document review exercise related to your practice area.",
          "Ask how candidates have handled similar work, which tools they used, and what review process they followed. Avoid assuming that a title or software name demonstrates proficiency in your specific workflow.",
        ],
      },
      {
        title: "Compare the full cost of the role",
        paragraphs: [
          "Compare proposals using the same duties, working hours, experience level, and support scope. Ask what the price includes, which administrative responsibilities remain with your firm, and how any changes in scope would be handled.",
          "Plan for supervision, training, system access, and time to review the work. A lower rate is not an informative comparison if the roles or responsibilities differ. Confirm fees and any replacement provisions in writing.",
        ],
      },
      {
        title: "When the role overlaps",
        paragraphs: [
          "Many firms need a mix of administrative and case-preparation support. Prioritize the recurring work and identify the tasks requiring more experience. A clear brief helps determine whether one appropriately experienced person fits or whether the responsibilities should be split.",
        ],
      },
    ],
  },
];
