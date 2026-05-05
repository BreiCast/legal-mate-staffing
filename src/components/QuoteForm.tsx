"use client";

import { useState } from "react";
import { site } from "@/content/siteContent";
import { ButtonLink, Button } from "@/components/ui/Button";
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

const inputBase =
  "w-full rounded-md border border-line bg-paper px-4 py-3 text-[14px] text-ink placeholder:text-muted/70 transition-colors duration-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/15";

const labelBase = "mb-2 block text-[13px] font-medium text-ink";

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
    console.log("Quote request:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start py-14">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-ink">
          <CheckIcon className="h-5 w-5" />
        </div>
        <h2 className="mt-6 font-serif text-[28px] leading-[1.15] text-ink sm:text-[36px]">
          {pg.successHeading}
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-muted-strong">
          {pg.successMessage}
        </p>
        <ButtonLink href="/" size="lg" variant="primary" withArrow className="mt-8">
          {pg.successCta}
        </ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelBase}>
            {pg.fields.name} <span className="text-signal">*</span>
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
          <span className={labelBase}>{pg.fields.company}</span>
          <input
            type="text"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Doe & Associates LLP"
            className={inputBase}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelBase}>
            {pg.fields.email} <span className="text-signal">*</span>
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
          <span className={labelBase}>{pg.fields.phone}</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={inputBase}
          />
        </label>
      </div>

      <fieldset>
        <legend className={labelBase}>{pg.fields.roles}</legend>
        <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {allRoles.map((role) => {
            const checked = form.roles.includes(role);
            return (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`flex items-center gap-2.5 rounded-md border px-3 py-2.5 text-left text-[13px] transition-colors duration-200 ${
                  checked
                    ? "border-ink bg-ink/[0.04] text-ink"
                    : "border-line bg-paper text-ink/80 hover:border-ink/40"
                }`}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 ${
                    checked
                      ? "border-ink bg-ink text-paper"
                      : "border-line-strong bg-paper"
                  }`}
                >
                  {checked && <CheckIcon className="h-2.5 w-2.5" />}
                </span>
                <span className="leading-snug">{role}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelBase}>{pg.fields.positions}</span>
          <select
            value={form.positions}
            onChange={(e) => set("positions", e.target.value)}
            className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b6f76%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select...</option>
            {pg.positionOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelBase}>{pg.fields.timeline}</span>
          <select
            value={form.timeline}
            onChange={(e) => set("timeline", e.target.value)}
            className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b6f76%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select...</option>
            {pg.timelineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={labelBase}>{pg.fields.message}</span>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about the tools, workflows, or experience level you need..."
          className={`${inputBase} resize-none`}
        />
      </label>

      <Button type="submit" size="lg" variant="primary" withArrow>
        {pg.submitLabel}
      </Button>
    </form>
  );
}
