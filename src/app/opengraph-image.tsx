import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import en from "../../i18n/messages/en/translation.json";
import th from "../../i18n/messages/th/translation.json";

// Crawlers send no NEXT_LOCALE cookie, so the shared card is in the default language (Thai),
// with the Latin name under the Thai one for readers abroad.
const name = th.profile.name;
const latinName = en.profile.name;
const role = th.profile.role;
const location = th.profile.location;

export const alt = `${name} — ${role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse cannot read CSS variables: these mirror the notebook tokens in src/app/globals.css.
const TOKENS = {
  paper: "#fbfaf5",
  grid: "#cfe0ec",
  ink: "#2b3a42",
  pencil: "#5d6b72",
  inkBlue: "#2f5f93",
  crayonGreen: "#7fb08a",
  tape: "rgba(242, 201, 76, 0.55)",
} as const;

/** A TTF subset with just `text` from Google Fonts (a plain fetch gets TTF, which Satori needs). */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const query = `family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const signal = AbortSignal.timeout(15_000);
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`, { signal })).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`opengraph-image: no TTF for ${family} ${weight} from Google Fonts`);
  const font = await fetch(url, { signal });
  if (!font.ok) throw new Error(`opengraph-image: ${family} ${weight} returned ${font.status}`);
  return font.arrayBuffer();
}

// Assets load inside the handler, not at module scope: every page imports this module for
// `alt` / `size`, and a module-level fetch would run (and could fail) on each page render.
// The route itself is static, so this runs once at build time.
export default async function OpengraphImage() {
  const [mali, sans, portrait] = await Promise.all([
    googleFont("Mali", 700, name + latinName),
    googleFont("IBM Plex Sans Thai", 400, role + location),
    // the hero's cut-out sticker (blue studio background removed) — PNG, which Satori decodes
    readFile(join(process.cwd(), "public/images/portrait-cutout.png"), "base64"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "56px 88px",
          backgroundColor: TOKENS.paper,
          // the notebook's grid paper
          backgroundImage: `linear-gradient(${TOKENS.grid} 1px, transparent 1px), linear-gradient(90deg, ${TOKENS.grid} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          color: TOKENS.ink,
          fontFamily: "Plex",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: TOKENS.pencil }}>{location}</div>
          <div style={{ marginTop: 28, fontFamily: "Mali", fontSize: 82, lineHeight: 1.35 }}>{name}</div>
          <div style={{ marginTop: 4, fontFamily: "Mali", fontSize: 34, color: TOKENS.pencil }}>{latinName}</div>
          <div style={{ marginTop: 34, display: "flex" }}>
            {/* the role on a strip of highlighter, as in the hero */}
            <div style={{ padding: "2px 14px", fontSize: 38, lineHeight: 1.5, color: TOKENS.inkBlue, background: TOKENS.tape }}>
              {role}
            </div>
          </div>
        </div>
        <div style={{ position: "relative", display: "flex", transform: "rotate(2deg)" }}>
          <div
            style={{ position: "absolute", top: -12, left: 140, width: 120, height: 32, background: TOKENS.tape, transform: "rotate(-3deg)" }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>, next/image does not apply here */}
          <img src={`data:image/png;base64,${portrait}`} alt="" width={404} height={499} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mali", data: mali, weight: 700 },
        { name: "Plex", data: sans, weight: 400 },
      ],
    },
  );
}
