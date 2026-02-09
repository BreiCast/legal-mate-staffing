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
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1>Application error</h1>
        <p>{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
