import I18n from "i18next";
import { load } from "js-yaml";

import I18nLD from "i18next-browser-languagedetector";
import I18nXHR from "i18next-xhr-backend";

const options: I18n.InitOptions = {
  fallbackLng: "en",
  load: "languageOnly",
  debug: true,
  saveMissing: true,
  backend: {
    loadPath: "/locales/{{lng}}.yaml",
    allowMultiLoading: false,
    crossDomain: false,
    parse: load,
  },
  interpolation: {
    escapeValue: false,
  },
};

I18n
  .use(I18nLD)
  .use(I18nXHR);

if (!I18n.isInitialized) {
  I18n.init(options);
}

export default I18n;
