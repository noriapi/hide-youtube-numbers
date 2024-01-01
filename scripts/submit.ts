import { publishExtension } from "publish-browser-extension";

//
//accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=802073216874-2e0ltqurbqfrj76ictri90ui95v456h7.apps.googleusercontent.com&redirect_uri=urn:ietf:wg:oauth:2.0:oob

publishExtension({
  dryRun: true,
  chrome: {
    zip: `.output/hide-youtube-numbers-${process.env.npm_package_version}-chrome.zip`,
    extensionId: "joboadjmcbnnneggpohpnmkblmmjiehh",
    clientId: process.env.CHROME_CLIENT_ID ?? "",
    clientSecret: process.env.CHROME_CLIENT_SECRET ?? "",
    // refreshToken: "<gcp-refresh-token>",
    // publishTarget: "<default|trustedTesters>",
    // skipSubmitReview: false,
  },
  firefox: {
    zip: `.output/hide-youtube-numbers-${process.env.npm_package_version}-firefox.zip`,
    sourcesZip: `.output/hide-youtube-numbers-${process.env.npm_package_version}-sources.zip`,
    extensionId: "hide-youtube-numbers@noriapi.addon",
    jwtIssuer: process.env.FIREFOX_JWT_ISSUER ?? "",
    jwtSecret: process.env.FIREFOX_JWT_SECRET ?? "",
    // channel: '<listed|unlisted>',
  },
  // edge: {
  //   zip: 'dist/chrome.zip',
  //   productId: "<edge-product-id>",
  //   clientId: "<edge-client-id>",
  //   clientSecret: "<edge-client-secret>",
  //   accessTokenUrl: "<edge-access-token-url>",
  //   skipSubmitReview: false,
  // },
})
  .then((results) => console.log(results))
  .catch((err) => console.error(err));
