import "./style.css";
import { browser } from "wxt/browser";

import { defineContentScript } from "wxt/sandbox";
import { Options, getOptions, onChangeHandler } from "~/lib/options";

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
    setStyle(key as any, enabled),
  );
};

const initStyle = async () => {
  const options = await getOptions();
  setStyles(options);
};

export default defineContentScript({
  matches: ["*://www.youtube.com/*"],
  runAt: "document_end",
  cssInjectionMode: "manifest",
  main: (_ctx) => {
    initStyle();

    browser.storage.onChanged.addListener(
      onChangeHandler((newValues) => {
        setStyles(newValues);
      }),
    );
  },
});
