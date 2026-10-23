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

// ImageResponse cannot read CSS variables: these mirror the tokens in src/app/globals.css.
const TOKENS = {
  bg: "#f3f7f6",
  ink: "#1d2a30",
  muted: "#5a6a70",
  line: "#d9e4e2",
  accent: "#3f7f80",
  sand: "#efe9df",
} as const;

/** A TTF subset with just `text` from Google Fonts (a plain fetch gets TTF, which Satori needs). */
async function googleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const query = `family=${family.replaceAll(" ", "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`opengraph-image: no TTF for ${family} ${weight} from Google Fonts`);
  const font = await fetch(url);
  if (!font.ok) throw new Error(`opengraph-image: ${family} ${weight} returned ${font.status}`);
  return font.arrayBuffer();
}

// Nothing here depends on the request, so it is read once (at build time for the static image).
const [serif, sans, portrait] = await Promise.all([
  googleFont("Noto Serif Thai", 600, name + latinName),
  googleFont("IBM Plex Sans Thai", 400, role + location),
  readFile(join(process.cwd(), "public/images/portrait.jpg"), "base64"),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "64px 88px",
          background: TOKENS.bg,
          color: TOKENS.ink,
          fontFamily: "Plex",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              borderTop: `1px solid ${TOKENS.line}`,
              paddingTop: 20,
              fontSize: 24,
              color: TOKENS.muted,
            }}
          >
            {location}
          </div>
          <div
            style={{
              marginTop: 40,
              fontFamily: "NotoSerif",
              fontSize: 84,
              lineHeight: 1.3,
            }}
          >
            {name}
          </div>
          <div style={{ marginTop: 8, fontFamily: "NotoSerif", fontSize: 34, color: TOKENS.muted }}>{latinName}</div>
          <div style={{ marginTop: 40, width: 96, height: 2, background: TOKENS.accent }} />
          <div style={{ marginTop: 32, fontSize: 36, lineHeight: 1.6 }}>{role}</div>
        </div>
        <div style={{ display: "flex", padding: 14, borderRadius: 28, background: TOKENS.sand }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img>, next/image does not apply here */}
          <img
            src={`data:image/jpeg;base64,${portrait}`}
            alt=""
            width={380}
            height={458}
            style={{ borderRadius: 18, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NotoSerif", data: serif, weight: 600, style: "normal" },
        { name: "Plex", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
