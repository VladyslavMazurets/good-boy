import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localeDetection: false,
  localePrefix: "as-needed",
});
