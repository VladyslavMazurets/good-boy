import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sk", "en"],
  defaultLocale: "sk",
  localeDetection: false,
  localePrefix: "as-needed",
  pathnames: {
    "/contacts": {
      sk: "/kontakty",
      en: "/contacts",
    },
    "/about": {
      sk: "/o-nas",
      en: "/about",
    },
  },
});
