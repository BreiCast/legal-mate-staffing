import { site } from "@/content/siteContent";
import { IconBadge } from "@/components/ui/IconBadge";
import { LockIcon } from "@/components/icons";

export function ComplianceNote() {
  const { compliance } = site;

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 sm:p-10">
          {/* Decorative blur */}
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--brand-blue)]/5 blur-xl" />
          <div className="relative flex gap-5">
            <div className="hidden shrink-0 sm:block">
              <IconBadge hoverFlip={false}>
                <LockIcon />
              </IconBadge>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--brand-black)]">
                {compliance.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {compliance.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
