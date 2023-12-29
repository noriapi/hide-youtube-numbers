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

  const testCases: [string, (p: P) => Locator, (p: P) => Locator][] = [
    ["views", ({ video }) => video.views, ({ popup }) => popup.checkbox.views],
    [
      "subscribers",
      ({ video }) => video.subscribers,
      ({ popup }) => popup.checkbox.subscribers,
    ],
    [
      "videoLikes",
      ({ video }) => video.videoLikes,
      ({ popup }) => popup.checkbox.videoLikes,
    ],
    [
      "commentLikes",
      ({ video }) => video.commentLikes.first(),
      ({ popup }) => popup.checkbox.commentLikes,
    ],
    [
      "relatedVideosViews",
      ({ video }) => video.relatedVideoViews.first(),
      ({ popup }) => popup.checkbox.views,
    ],
  ];

  testCases.forEach(([label, getTarget, getCheckbox]) => {
    test(label, async ({ page, extensionId, context }) => {
      const p = await prepare(page, extensionId, context);
      const target = getTarget(p);
      const targetCheckbox = getCheckbox(p);

      if (label === "commentLikes") {
        await p.videoPage.keyboard.press("End");

        await target.waitFor({ state: "visible" });
      } else {
        await target.waitFor({ state: "visible" });
      }
      await target.waitFor({ state: "visible" });
      await targetCheckbox.check();
      await expect(target).not.toBeVisible();
      await targetCheckbox.uncheck();
      await expect(target).toBeVisible();
    });
  });
});
