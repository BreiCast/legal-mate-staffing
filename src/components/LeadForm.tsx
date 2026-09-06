"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { roleOptions, hireOptions, timelineOptions } from "@/content/roles";
import { practiceAreas } from "@/content/practice-areas";
import { captureAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import type { LeadResult } from "@/lib/lead-schema";
import { contact } from "@/lib/config";
import { Arrow, Check } from "@/components/ui/Primitives";

export function LeadForm({
  initialRole = "",
  initialPractice = "",
}: {
  initialRole?: string;
  initialPractice?: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [reference, setReference] = useState("");
  const started = useRef(false);
  const requestIdentity = useRef({ id: "", fingerprint: "" });
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  function start() {
    if (!started.current) {
      started.current = true;
      trackEvent("form_started", { form: "candidate_request" });
    }
  }
  const errors = (name: string) =>
    fieldErrors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {fieldErrors[name][0]}
      </span>
    ) : null;
  const invalid = (name: string) => ({
    "aria-invalid": Boolean(fieldErrors[name]),
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    start();
    setStatus("sending");
    setError("");
    setFieldErrors({});
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...data, attribution: captureAttribution() };
    const fingerprint = JSON.stringify(payload);
    if (requestIdentity.current.fingerprint !== fingerprint)
      requestIdentity.current = { id: crypto.randomUUID(), fingerprint };
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submissionId: requestIdentity.current.id,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = (await response.json()) as LeadResult;
      if (!response.ok || result.ok !== true || !result.reference) {
        const failure =
          result.ok === false
            ? result
            : {
                error: "We couldn’t confirm receipt. Please try again.",
                fieldErrors: undefined,
              };
        setError(failure.error);
        setFieldErrors(failure.fieldErrors ?? {});
        setStatus("error");
        if (response.status === 409)
          requestIdentity.current = { id: "", fingerprint: "" };
        requestAnimationFrame(() => errorSummary.current?.focus());
        return;
      }
      setReference(result.reference);
      setStatus("success");
      trackEvent("form_submitted", { form: "candidate_request" });
      requestAnimationFrame(() => resultHeading.current?.focus());
    } catch {
      setError(
        "We couldn’t confirm receipt of your request. Your details are still here. Check your connection and try again.",
      );
      setStatus("error");
      requestAnimationFrame(() => errorSummary.current?.focus());
    }
  }
  if (status === "success")
    return (
      <div className="form-success">
        <div className="success-symbol">
          <Check />
        </div>
        <p className="eyebrow">Request received</p>
        <h2 tabIndex={-1} ref={resultHeading}>
          Your next hire
          <br />
          <em>starts here.</em>
        </h2>
        <p>
          Thank you. Our team will review your staffing needs and contact you to
          discuss the next step. A confirmation email is on its way.
        </p>
        <p className="reference">Reference: {reference}</p>
        {contact.bookingUrl && (
          <a
            className="button button-primary"
            href={contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-event="book_call_click"
            data-location="form_success"
          >
            Choose a time to talk <Arrow />
          </a>
        )}
        <Link className="text-link" href="/process">
          What happens next <Arrow />
        </Link>
      </div>
    );
  return (
    <form
      ref={formRef}
      method="post"
      action="/api/leads"
      onSubmit={submit}
      onFocus={start}
      className="lead-form"
      aria-label="Request legal candidates"
      aria-busy={status === "sending"}
    >
      <div className="form-heading">
        <p className="small-label">Let’s start with the essentials</p>
        <h2>Who does your firm need?</h2>
        <p>Four quick details. We’ll work out the rest together.</p>
      </div>
      {status === "error" && (
        <div
          ref={errorSummary}
          className="form-error"
          role="alert"
          tabIndex={-1}
        >
          <strong>Your request hasn’t been confirmed.</strong>
          <p>{error}</p>
          {Object.keys(fieldErrors).length > 0 && (
            <ul>
              {Object.entries(fieldErrors).map(([name, values]) => (
                <li key={name}>
                  <a href={`#field-${name}`}>{values[0]}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <fieldset disabled={status === "sending"}>
        <legend className="sr-only">
          Your contact details and requested role
        </legend>
        <div className="form-grid">
          <label htmlFor="field-name">
            Your name <span aria-hidden="true">*</span>
            <input
              id="field-name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Full name"
              {...invalid("name")}
            />
            {errors("name")}
          </label>
          <label htmlFor="field-email">
            Work email <span aria-hidden="true">*</span>
            <input
              id="field-email"
              name="email"
              autoComplete="email"
              type="email"
              required
              maxLength={254}
              placeholder="you@yourfirm.com"
              {...invalid("email")}
            />
            {errors("email")}
          </label>
          <label htmlFor="field-firm">
            Firm / company <span aria-hidden="true">*</span>
            <input
              id="field-firm"
              name="firm"
              autoComplete="organization"
              required
              minLength={2}
              maxLength={160}
              placeholder="Your firm’s name"
              {...invalid("firm")}
            />
            {errors("firm")}
          </label>
          <label htmlFor="field-role">
            What role do you need? <span aria-hidden="true">*</span>
            <select
              id="field-role"
              name="role"
              required
              defaultValue={
                roleOptions.includes(
                  initialRole as (typeof roleOptions)[number],
                )
                  ? initialRole
                  : ""
              }
              {...invalid("role")}
            >
              <option value="" disabled>
                Select a role
              </option>
              {roleOptions.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
            {errors("role")}
          </label>
        </div>
        <details
          className="optional-fields"
          open={
            Object.keys(fieldErrors).some((name) =>
              [
                "hires",
                "practiceArea",
                "timeline",
                "phone",
                "message",
              ].includes(name),
            ) || undefined
          }
        >
          <summary>
            Add a few details{" "}
            <span>
              Optional <span aria-hidden="true">+</span>
            </span>
          </summary>
          <div className="form-grid">
            <label htmlFor="field-hires">
              Number of hires
              <select id="field-hires" name="hires" {...invalid("hires")}>
                <option value="">Select</option>
                {hireOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {errors("hires")}
            </label>
            <label htmlFor="field-practiceArea">
              Practice area
              <select
                id="field-practiceArea"
                name="practiceArea"
                defaultValue={
                  practiceAreas.some((area) => area.name === initialPractice)
                    ? initialPractice
                    : ""
                }
                {...invalid("practiceArea")}
              >
                <option value="">Select</option>
                {[
                  ...practiceAreas.map((area) => area.name),
                  "Other / multiple practice areas",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {errors("practiceArea")}
            </label>
            <label htmlFor="field-timeline">
              Hiring timeline
              <select
                id="field-timeline"
                name="timeline"
                {...invalid("timeline")}
              >
                <option value="">Select</option>
                {timelineOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {errors("timeline")}
            </label>
            <label htmlFor="field-phone">
              Phone
              <input
                id="field-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                {...invalid("phone")}
              />
              {errors("phone")}
            </label>
            <label className="full-width" htmlFor="field-message">
              Anything else we should know?
              <textarea
                id="field-message"
                name="message"
                rows={4}
                maxLength={2000}
                placeholder="Useful experience, your software, or coverage hours…"
                aria-describedby={
                  fieldErrors.message
                    ? "message-error message-hint"
                    : "message-hint"
                }
                aria-invalid={Boolean(fieldErrors.message)}
              />
              <span id="message-hint" className="field-hint">
                Please don’t include confidential case or client information.
              </span>
              {errors("message")}
            </label>
          </div>
        </details>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">
            Leave this field empty
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        <p className="form-privacy">
          By submitting, you ask Legal Mate to contact you about your staffing
          needs. Read our <Link href="/privacy">privacy notice</Link>.
        </p>
        <button
          className="button button-primary form-submit"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending"
            ? "Sending your request…"
            : "Get my candidate shortlist"}
          {status !== "sending" && <Arrow />}
        </button>
        <p className="form-note">
          A conversation about your firm. No commitment to hire.
        </p>
      </fieldset>
      <noscript>
        <p className="form-error">
          Please enable JavaScript to submit this form, or use a contact option
          below.
        </p>
      </noscript>
    </form>
  );
}
