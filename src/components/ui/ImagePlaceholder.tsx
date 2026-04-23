interface ImagePlaceholderProps {
  title: string;
  assetPath: string;
  note?: string;
  ratio?: "wide" | "video" | "square" | "portrait";
}

const ratioClasses: Record<NonNullable<ImagePlaceholderProps["ratio"]>, string> = {
  wide: "aspect-[16/7]",
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

export function ImagePlaceholder({
  title,
  assetPath,
  note = "Replace with final image asset.",
  ratio = "video",
}: ImagePlaceholderProps) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div
        className={`relative ${ratioClasses[ratio]} bg-gradient-to-br from-[var(--brand-blue)]/8 via-gray-50 to-[var(--brand-red)]/8`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,163,234,0.12),transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-blue)]/80">
              Image placeholder
            </p>
            <p className="mt-2 text-lg font-semibold text-[var(--brand-black)]">
              {title}
            </p>
          </div>
        </div>
      </div>
      <figcaption className="space-y-1 border-t border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Suggested path
        </p>
        <p className="text-sm font-mono text-gray-700">{assetPath}</p>
        <p className="text-sm text-gray-600">{note}</p>
      </figcaption>
    </figure>
  );
}
