"use server";

import { cookies } from "next/headers";

import { isLocale } from "./locales";

const ONE_YEAR = 365 * 24 * 60 * 60;

/** Stores the reader's language; the caller then runs `router.refresh()`. */
export async function setLocale(value: string): Promise<{ ok: boolean }> {
  if (!isLocale(value)) return { ok: false };
  (await cookies()).set("NEXT_LOCALE", value, { path: "/", maxAge: ONE_YEAR, sameSite: "lax" });
  return { ok: true };
}
