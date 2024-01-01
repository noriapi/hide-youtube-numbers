import { BrowserContext, Locator, Page } from "@playwright/test";

import { expect, test } from "./fixtures";
import { openPopup } from "./pages/popup";
import { openVideo } from "./pages/video";

test.describe("visiblity conform options", () => {
  const prepare = async (
    popupPage: Page,
    extensionId: string,
    context: BrowserContext,
  ) => {
    const popup = await openPopup(popupPage, extensionId);
    await popup.uncheckAll();

    const videoPage = await context.newPage();
    const video = await openVideo(videoPage);

    return {
      popupPage,
      popup,
      videoPage,
      video,
    };
  };

  type P = Awaited<ReturnType<typeof prepare>>;

  const withExpandDescription =
    (f: typeof prepare) =>
    async (...args: Parameters<typeof prepare>) => {
      const p = await f(...args);
      await p.video.descriptionMore.click();
      return p;
    };

  const testCases: [
    string,
    (p: P) => Locator,
    (p: P) => Locator,
    typeof prepare,
  ][] = [
    [
      "views",
      ({ video }) => video.views,
      ({ popup }) => popup.checkbox.views,
      prepare,
    ],
    [
      "subscribers",
      ({ video }) => video.subscribers,
      ({ popup }) => popup.checkbox.subscribers,
      prepare,
    ],
    [
      "videoLikes",
      ({ video }) => video.videoLikes,
      ({ popup }) => popup.checkbox.videoLikes,
      prepare,
    ],
    [
      "commentLikes",
      ({ video }) => video.commentLikes.first(),
      ({ popup }) => popup.checkbox.commentLikes,
      prepare,
    ],
    [
      "relatedVideosViews",
      ({ video }) => video.relatedVideoViews.first(),
      ({ popup }) => popup.checkbox.views,
      prepare,
    ],
    [
      "subscribers in description",
      ({ video }) => video.subscribersInDescription,
      ({ popup }) => popup.checkbox.subscribers,
      withExpandDescription(prepare),
    ],
  ];

  testCases.forEach(([label, getTarget, getCheckbox, prepare]) => {
    if (label === "commentLikes") {
      // to render comments
      test.use({ viewport: { width: 1600, height: 1200 } });
    }

    test(label, async ({ page, extensionId, context }) => {
      const p = await prepare(page, extensionId, context);
      const target = getTarget(p);
      const targetCheckbox = getCheckbox(p);

      await target.waitFor({ state: "visible" });
      await targetCheckbox.check();
      await expect(target).not.toBeVisible();
      await targetCheckbox.uncheck();
      await expect(target).toBeVisible();
    });
  });

  test.only("description tooltip", async ({ page, extensionId, context }) => {
    const p = await prepare(page, extensionId, context);
    const target = p.video.descriptionInfoTooltip;
    const targetCheckbox = p.popup.checkbox.viewsTooltip;

    await p.video.descriptionInfoContainer.hover();

    await target.waitFor({ state: "visible" });
    await targetCheckbox.check();
    await expect(target).not.toBeVisible();
    await targetCheckbox.uncheck();
    await expect(target).toBeVisible();
  });
});
