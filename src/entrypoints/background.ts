import { browser } from "wxt/browser";
import { defineBackground } from "wxt/sandbox";
import { initOptions } from "~/lib/options";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    initOptions().catch((reason) =>
      console.error("[EXT]: Failed to init options", reason),
    );
  });
});
