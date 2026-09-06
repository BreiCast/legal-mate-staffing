import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { StructuredData } from "@/components/StructuredData";
import { organizationSchema, pageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/config";
import { company } from "@/content/company";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
export const metadata: Metadata = {
  ...pageMetadata(
    "Bilingual Legal Staffing for U.S. Law Firms",
    company.description,
    "/",
  ),
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Bilingual Legal Staffing for U.S. Law Firms | Legal Mate Staffing",
    template: "%s | Legal Mate Staffing",
  },
  applicationName: company.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <StructuredData data={organizationSchema()} />
        <Analytics />
      </body>
    </html>
  );
}
