"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/siteContent";
import { CheckIcon } from "@/components/icons";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  roles: string[];
  positions: string;
  timeline: string;
  message: string;
};

const allRoles = site.services.flatMap((s) => s.items);

export function QuoteForm() {
  const pg = site.pages.requestQuote;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    roles: [],
    positions: "",
    timeline: "",
    message: "",
  });

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleRole(role: string) {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to backend / email service
    console.log("Quote request:", form);
    setSubmitted(true);
  }

  /* ---------------------------------------------------------------- */
  /*  Success state                                                    */
  /* ---------------------------------------------------------------- */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-bold text-[var(--brand-black)] sm:text-3xl">
          {pg.successHeading}
        </h2>
        <p className="mt-3 max-w-md text-gray-600">{pg.successMessage}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-xl bg-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2"
        >
          {pg.successCta}
        </Link>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Form                                                             */
  /* ---------------------------------------------------------------- */
  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[var(--brand-black)] placeholder:text-gray-400 transition focus:border-[var(--brand-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name + Company row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
            {pg.fields.name} <span className="text-[var(--brand-red)]">*</span>
          </span>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Jane Doe"
            className={inputBase}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
            {pg.fields.company}
          </span>
          <input
            type="text"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Doe & Associates LLP"
            className={inputBase}
          />
        </label>
      </div>

      {/* Email + Phone row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
            {pg.fields.email} <span className="text-[var(--brand-red)]">*</span>
          </span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jane@firm.com"
            className={inputBase}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
            {pg.fields.phone}
          </span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputBase}
          />
        </label>
      </div>

      {/* Roles checkboxes */}
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium text-[var(--brand-black)]">
          {pg.fields.roles}
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {allRoles.map((role) => {
            const checked = form.roles.includes(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                  checked
                    ? "border-[var(--brand-blue)] bg-[var(--brand-blue)]/5 text-[var(--brand-blue)]"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition ${
                    checked
                      ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {checked && <CheckIcon className="h-3 w-3" />}
                </span>
                <span className="leading-snug">{role}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Positions + Timeline row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
            {pg.fields.positions}
          </span>
          <select
            value={form.positions}
            onChange={(e) => set("positions", e.target.value)}
            className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239ca3af%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select...</option>
            {pg.positionOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
            {pg.fields.timeline}
          </span>
          <select
            value={form.timeline}
            onChange={(e) => set("timeline", e.target.value)}
            className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%239ca3af%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select...</option>
            {pg.timelineOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Message */}
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--brand-black)]">
          {pg.fields.message}
        </span>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about the tools, workflows, or experience level you need..."
          className={`${inputBase} resize-none`}
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-[var(--brand-blue)] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--brand-blue-light)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)] focus-visible:ring-offset-2 sm:w-auto"
      >
        {pg.submitLabel}
      </button>
    </form>
  );
}
