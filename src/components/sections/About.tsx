import { getLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/Section";

/**
 * Splits the summary into its opening line and the rest, from the text alone (no per-language copy):
 * up to the first ". " when there is one (English), else up to the first space (Thai separates clauses with spaces).
 * A lead that is not a sensible pull-quote length → no lead, the whole summary as body text.
 */
function splitLead(text: string): [lead: string, rest: string] {
  const stop = text.indexOf(". ");
  const at = stop >= 0 ? stop + 1 : text.indexOf(" ");
  return at >= 20 && at <= 160 ? [text.slice(0, at), text.slice(at).trim()] : ["", text];
}

// Static on purpose: a calm page of text. (The shared `Reveal` mismatches on hydration under reduced motion.)
export async function About() {
  const t = await getTranslations();
  const thai = (await getLocale()) === "th";
  const [lead, rest] = splitLead(t("profile.summary"));
  return (
    <Section id="about" title={t("nav.about")}>
      <p className="mb-12 border-t border-line pt-3 text-xs leading-[1.6] tracking-[0.12em] text-muted uppercase">
        {t("about.label")}
      </p>
      <div className="grid gap-12 md:grid-cols-[1fr_12rem] md:gap-16">
        <div>
          {lead && (
            <p className={`font-display mb-8 text-2xl text-ink sm:text-4xl ${thai ? "leading-[1.6]" : "leading-[1.3]"}`}>
              {lead}
            </p>
          )}
          {rest && <p className="max-w-xl text-lg leading-[1.8] text-muted">{rest}</p>}
        </div>
        <aside className="border-t border-line pt-3">
          <p className="text-xs leading-[1.6] tracking-[0.12em] text-muted uppercase">{t("about.basedIn")}</p>
          <p className="font-display mt-2 text-lg leading-[1.6] text-ink">{t("profile.location")}</p>
        </aside>
      </div>
    </Section>
  );
}
