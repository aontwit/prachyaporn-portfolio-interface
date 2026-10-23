import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PenCircle, Sheet } from "@/components/paper";
import { Section } from "@/components/Section";
import { doodle } from "@/content/doodles";

/**
 * Splits the text around the first `phrase` so the pen can circle it; phrase missing → no circle.
 * Punctuation that touches the phrase ("(" before, ")" "." "," after) travels with it, so a line
 * never breaks between them.
 */
function splitAround(text: string, phrase: string) {
  const at = phrase ? text.indexOf(phrase) : -1;
  if (at < 0) return { before: text, open: "", phrase: "", close: "", after: "" };
  const head = text.slice(0, at);
  const tail = text.slice(at + phrase.length);
  const open = head.match(/[(“"]$/)?.[0] ?? "";
  const close = tail.match(/^[)”".,]+/)?.[0] ?? "";
  return {
    before: head.slice(0, head.length - open.length),
    open,
    phrase,
    close,
    after: tail.slice(close.length),
  };
}

const PAIRS: Record<string, string> = { "(": ")", "“": "”", '"': '"' };

const BEAR = doodle("bear-pencil");

// A taped notebook page: the summary written on the 32px rules, one key phrase circled by the pen.
export async function About() {
  const t = await getTranslations();
  const { before, open, phrase, close, after } = splitAround(t("profile.summary"), t("about.keyPhrase"));
  // only the bracket that really closes `open` goes inside the circle
  const pair = PAIRS[open];
  const closer = pair && close.startsWith(pair) ? pair : "";
  return (
    <Section id="about" title={t("nav.about")}>
      <Sheet tilt={-0.6} tape="one">
        <Image
          src={BEAR.src}
          alt=""
          width={BEAR.width}
          height={BEAR.height}
          sizes="(min-width: 640px) 96px, 64px"
          className="pointer-events-none absolute -top-12 right-3 h-auto w-16 rotate-6 drop-shadow-sm select-none sm:-top-16 sm:right-8 sm:w-24"
        />
        <p className="font-hand leading-8 text-pencil">{t("about.label")}</p>
        <p className="max-w-3xl text-base leading-8 text-ink sm:text-lg">
          {before}
          {phrase && (
            <span className="whitespace-nowrap">
              {/* the pen circles a matched bracket pair with the phrase; trailing "." "," stay outside */}
              <PenCircle>
                {open}
                {phrase}
                {closer}
              </PenCircle>
              {close.slice(closer.length)}
            </span>
          )}
          {after}
        </p>
        <p className="mt-8 font-hand text-sm leading-8 text-pencil">
          {t("about.basedIn")} <span className="text-base text-ink-blue">{t("profile.location")}</span>
        </p>
      </Sheet>
    </Section>
  );
}
