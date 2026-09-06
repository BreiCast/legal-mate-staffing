"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Something didn’t load</p>
        <h1>Please try again.</h1>
        <p className="page-description">
          We couldn’t load this page. You can retry or return to the homepage.
        </p>
        <div className="button-row" style={{ marginTop: 28 }}>
          <button className="button button-primary" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="button button-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
