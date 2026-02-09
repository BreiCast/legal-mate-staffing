"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-xl font-semibold text-[var(--brand-black)]">
        Something went wrong
      </h1>
      <p className="max-w-md text-center text-sm text-gray-600">
        {error.message}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-xl bg-[var(--brand-blue)] px-4 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
