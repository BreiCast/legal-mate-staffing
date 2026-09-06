import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "Legal Mate Staffing — Legal talent. Human connection.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const [regular, italic] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "public/fonts/InstrumentSerif-Italic.ttf")),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f7f6f2",
        color: "#172c38",
        padding: "56px 74px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="32" height="38" viewBox="0 0 38 40" fill="none">
          <path
            d="M3 2v35h15V2M20 37V2h15v35M3 20h32M3 2l15 18L35 2M3 37l15-17 17 17"
            stroke="#172c38"
            strokeWidth="1.5"
          />
        </svg>
        <span style={{ fontFamily: "Instrument Serif", fontSize: 36 }}>
          Legal Mate
        </span>
        <span style={{ fontSize: 13, letterSpacing: 4, marginLeft: 9 }}>
          STAFFING
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Instrument Serif",
          fontSize: 106,
          lineHeight: 0.95,
          letterSpacing: -2,
          marginTop: 5,
        }}
      >
        <span>Legal talent.</span>
        <span style={{ color: "#637665", fontStyle: "italic" }}>
          Human connection.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #c5cfc5",
          paddingTop: 27,
          fontSize: 18,
          justifyContent: "space-between",
        }}
      >
        <span>Bilingual remote professionals for U.S. law firms.</span>
        <span>Built by legal operators.</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Instrument Serif",
          data: italic,
          weight: 400,
          style: "italic",
        },
      ],
    },
  );
}
