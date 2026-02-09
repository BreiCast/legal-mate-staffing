import Link from "next/link";
import { site } from "@/content/siteContent";

export default function NotFound() {
  const { notFound } = site;
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-[var(--brand-black)] sm:text-3xl">
        {notFound.title}
      </h1>
      <p className="mt-2 text-center text-gray-600">{notFound.message}</p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-[var(--brand-blue)] px-6 py-3 font-medium text-white transition hover:bg-[var(--brand-blue-light)]"
      >
        {notFound.backHome}
      </Link>
    </div>
  );
}
