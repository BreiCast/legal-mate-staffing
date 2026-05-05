"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: "#fafaf7",
          color: "#0a0a0a",
          padding: "4rem 2rem",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6f76",
            }}
          >
            Application error
          </p>
          <h1
            style={{
              fontFamily: "Georgia, 'Iowan Old Style', serif",
              fontSize: "44px",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              marginTop: "1.5rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: "1.5rem",
              color: "#3f454d",
              lineHeight: 1.6,
            }}
          >
            {error.message}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 1.5rem",
              background: "#0a0a0a",
              color: "#fafaf7",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
