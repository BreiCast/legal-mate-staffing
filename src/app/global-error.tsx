"use client";
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#f7f6f2",
          color: "#172c38",
          fontFamily: "Arial, sans-serif",
          padding: "10vh 8vw",
          lineHeight: 1.7,
        }}
      >
        <main>
          <h1>We couldn’t load the website.</h1>
          <p>
            Please try again. If the problem continues, contact
            info@legalmatestaffing.com.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#142b37",
              color: "white",
              padding: "14px 24px",
              border: 0,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
