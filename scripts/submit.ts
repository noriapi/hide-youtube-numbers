import { publishExtension } from "publish-browser-extension";

publishExtension({
  dryRun: true,
  // chrome: {
  //   zip: 'dist/chrome.zip',
  //   extensionId: '<cws-extension-id>',
  //   clientId: '<gcp-client-id>',
  //   clientSecret: '<gcp-client-secret>',
  //   refreshToken: '<gcp-refresh-token>',
  //   publishTarget: '<default|trustedTesters>',
  //   skipSubmitReview: false,
  // },
  firefox: {
    zip: ".output/firefox.zip",
    sourcesZip: ".output/sources.zip",
    extensionId: "<addons-extension-id>",
    // jwtIssuer: '<addons-jwt-issuer>',
    // jwtSecret: '<addons-jwt-secret>',
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
