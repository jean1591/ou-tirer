import { useSettingsStore } from "@/store/settingsStore";
import { useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

const enMessages = require("@/assets/translations/en.json");
const frMessages = require("@/assets/translations/fr.json");
const deMessages = require("@/assets/translations/de.json");
const esMessages = require("@/assets/translations/es.json");
const itMessages = require("@/assets/translations/it.json");
const ptMessages = require("@/assets/translations/pt.json");

const allMessages: Record<string, Record<string, string>> = {
  en: enMessages,
  fr: frMessages,
  de: deMessages,
  es: esMessages,
  it: itMessages,
  pt: ptMessages,
};

export type Locale = keyof typeof allMessages;

export function IntlProvider({ children }: { children: React.ReactNode }) {
  const locale = useSettingsStore((state) => state.locale);
  const [translations, setTranslations] = useState(allMessages[locale] || {});

  useEffect(() => {
    setTranslations(allMessages[locale] || {});
  }, [locale]);

  return (
    <ReactIntlProvider
      locale={locale}
      messages={translations}
      defaultLocale="en"
    >
      {children}
    </ReactIntlProvider>
  );
}
