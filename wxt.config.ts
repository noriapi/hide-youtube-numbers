import Solid from "vite-plugin-solid";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    build: {
      target: "esnext",
    },
    plugins: [Solid()],
  }),
  manifest: {
    name: "Hide YouTube Numbers",
    permissions: ["storage"],
    author: "noriapi",
    homepage_url: "https://github.com/noriapi/hide-youtube-numbers",
    browser_specific_settings: {
      gecko: {
        id: "hide-youtube-numbers@noriapi.addon",
        strict_min_version: "57.0",
      },
    },
  },
  srcDir: "src",
  imports: false,
});
