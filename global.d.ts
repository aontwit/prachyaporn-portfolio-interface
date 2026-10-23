import type { Locale } from "./i18n/locales";
import type th from "./i18n/messages/th/translation.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof th;
  }
}
