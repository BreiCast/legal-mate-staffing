import type { Metadata } from "next";
import { company } from "@/content/company";
import { contact, isIndexable, siteUrl } from "@/lib/config";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | ${company.name}` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: company.name,
      title: `${title} | ${company.name}`,
      description,
      url: path,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Legal Mate Staffing — Legal talent. Human connection.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
      images: ["/opengraph-image"],
    },
    robots: { index: isIndexable, follow: isIndexable },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/brand-mark.png`,
    description: company.description,
    areaServed: { "@type": "Country", name: "United States" },
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.linkedin ? { sameAs: [contact.linkedin] } : {}),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
