import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("profile");
  return (
    <footer className="border-t border-line py-10 text-center text-sm text-muted">
      © {new Date().getFullYear()} {t("name")}
    </footer>
  );
}
