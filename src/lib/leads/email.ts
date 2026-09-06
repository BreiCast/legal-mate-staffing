import type { Lead } from "../lead-schema";

export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
  bookingUrl?: string;
};

export function leadEmails(
  lead: Lead,
  receivedAt: string,
  config: EmailConfig,
) {
  const rows = {
    Reference: lead.submissionId,
    "Received (UTC)": receivedAt,
    Name: lead.name,
    Email: lead.email,
    Firm: lead.firm,
    Role: lead.role,
    "Number of hires": lead.hires || "Not specified",
    "Practice area": lead.practiceArea || "Not specified",
    Timeline: lead.timeline || "Not specified",
    Phone: lead.phone || "Not supplied",
    Notes: lead.message || "None supplied",
    "Landing page": lead.attribution.landingPage,
    "Referrer origin": lead.attribution.referrer,
    ...lead.attribution,
  };
  return [
    {
      from: config.from,
      to: [config.to],
      reply_to: lead.email,
      subject: `New staffing request: ${lead.role}`,
      text: `A prospect has requested legal staffing.\n\n${Object.entries(rows)
        .map(([key, value]) => `${key}: ${value || "Not supplied"}`)
        .join(
          "\n",
        )}\n\nAttribution and notes are supplied by the visitor. Do not treat them as verified information.`,
    },
    {
      from: config.from,
      to: [lead.email],
      reply_to: config.to,
      subject: "We received your staffing request | Legal Mate",
      // Do not echo untrusted names, notes, or URLs into an email to a third party.
      text: `Thank you for contacting Legal Mate Staffing.\n\nWe received your request. Our team will review your staffing needs and contact you at this email address to discuss the next step.\n\nYour reference: ${lead.submissionId}\n${config.bookingUrl ? `\nYou can also choose a time to talk: ${config.bookingUrl}\n` : ""}\nYou can reply directly to this email. Please do not send confidential case records or sensitive client information.\n\nLegal Mate Staffing LLC\n\nIf you did not request staffing information, you can disregard this email. You have not been added to a marketing list.`,
    },
  ];
}

export async function sendLeadEmails(
  lead: Lead,
  receivedAt: string,
  config: EmailConfig,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `staffing/${lead.submissionId}`,
      "x-batch-validation": "strict",
    },
    body: JSON.stringify(leadEmails(lead, receivedAt, config)),
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`email_provider_${response.status}`);
  const result = await response.json();
  if (
    !Array.isArray(result.data) ||
    result.data.length !== 2 ||
    !result.data.every(
      (item: { id?: unknown }) =>
        typeof item.id === "string" && item.id.length > 0,
    ) ||
    result.errors?.length
  ) {
    throw new Error("email_provider_incomplete_acceptance");
  }
  return result.data.map((item: { id: string }) => item.id) as string[];
}
