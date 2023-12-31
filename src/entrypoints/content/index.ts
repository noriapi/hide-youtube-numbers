import "./style.css";

import { browser } from "wxt/browser";
import { defineContentScript } from "wxt/sandbox";

import { getOptions, onChangeHandler, Options } from "~/lib/options";

const setStyle = (key: keyof Options, enabled: boolean) => {
  const body = document.getElementsByTagName("body")[0];

  if (enabled) {
    body.classList.add(`__hide-${key}`);
  } else {
    body.classList.remove(`__hide-${key}`);
  }
};

const setStyles = (options: Partial<Options>) => {
  Object.entries(options).forEach(([key, enabled]) =>
    setStyle(key as keyof Options, enabled),
  );
};

const initStyle = () => {
  getOptions()
    .then((options) => setStyles(options))
    .catch((reason) =>
      // eslint-disable-next-line no-console
      console.error("[hide-youtube-numbers]: Failed to get options", reason),
    );
};

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_end",
  cssInjectionMode: "manifest",
  main: () => {
    initStyle();

    browser.storage.onChanged.addListener(
      onChangeHandler((newValues) => {
        setStyles(newValues);
      }),
    );
  },
});
