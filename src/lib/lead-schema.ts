import { z } from "zod";
import { roleOptions, hireOptions, timelineOptions } from "../content/roles";
import { practiceAreas } from "../content/practice-areas";

const line = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine(
      (value) => !/[\r\n\u0000-\u001f\u007f]/.test(value),
      "Please use a single line of text.",
    );
const optionalChoice = (choices: readonly string[]) =>
  z
    .string()
    .refine(
      (value) => !value || choices.includes(value),
      "Choose one of the available options.",
    )
    .default("");
const safeAttribution = z
  .object({
    landingPage: line(500).default(""),
    referrer: line(500).default(""),
    utm_source: line(150).default(""),
    utm_medium: line(150).default(""),
    utm_campaign: line(150).default(""),
    utm_term: line(150).default(""),
    utm_content: line(150).default(""),
  })
  .default({
    landingPage: "",
    referrer: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

export const leadSchema = z.object({
  name: line(100).min(2, "Please enter your name."),
  email: line(254)
    .email("Please enter a valid email address.")
    .transform((value) => value.toLowerCase()),
  firm: line(160).min(2, "Please enter your firm or company name."),
  role: z
    .string()
    .refine(
      (value) => roleOptions.includes(value as (typeof roleOptions)[number]),
      "Please choose a role.",
    ),
  hires: optionalChoice(hireOptions),
  practiceArea: optionalChoice([
    ...practiceAreas.map((area) => area.name),
    "Other / multiple practice areas",
  ]),
  timeline: optionalChoice(timelineOptions),
  phone: line(30)
    .refine(
      (value) => !value || /^\+?[\d\s().-]{7,30}$/.test(value),
      "Please enter a valid phone number.",
    )
    .default(""),
  message: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2,000 characters.")
    .refine(
      (value) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value),
      "Please remove unsupported characters.",
    )
    .default(""),
  website: z.string().max(200).default(""),
  submissionId: z.string().uuid("Please refresh the page and try again."),
  attribution: safeAttribution,
});

export type Lead = z.infer<typeof leadSchema>;
export type Attribution = Lead["attribution"];
export type LeadResult =
  | { ok: true; reference: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
