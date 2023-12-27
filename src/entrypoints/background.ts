import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";

import { initOptions } from "~/lib/options";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    initOptions().catch((reason) =>
      // eslint-disable-next-line no-console
      console.error("[hide-youtube-numbers]: Failed to init options", reason),
    );
  });
});
