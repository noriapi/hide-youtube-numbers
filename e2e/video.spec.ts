import { Locator, TestInfo } from "@playwright/test";

import { expect, test } from "./fixtures";
import { openVideo } from "./pages/video";

const takeSs = async (testInfo: TestInfo, elem: Locator, name: string) => {
  const ss = await elem.screenshot();
  return testInfo.attach(name, {
    body: ss,
    contentType: "image/png",
  });
};

test("views should not be visible", async ({ page }, testInfo) => {
  const video = await openVideo(page);

  await takeSs(testInfo, video.views(), "video-views-hidden");
  await expect(video.views()).not.toBeVisible();
});

test("subscribers should not be visible", async ({ page }, testInfo) => {
  const video = await openVideo(page);

  await takeSs(testInfo, video.subscribers(), "video-subscribers-hidden");
  await expect(video.subscribers()).not.toBeVisible();
});

test("video likes should not be visible", async ({ page }, testInfo) => {
  const video = await openVideo(page);

  await takeSs(testInfo, video.videoLikes(), "video-videolikes-hidden");
  await expect(video.videoLikes()).not.toBeVisible();
});

test("comment likes should not be visible", async ({ page }, testInfo) => {
  const video = await openVideo(page);

  await takeSs(testInfo, video.commentLikes(), "video-commentlikes-hidden");
  await expect(video.commentLikes()).not.toBeVisible();
});

test("related videos views should not be visible", async ({
  page,
}, testInfo) => {
  const video = await openVideo(page);

  await takeSs(
    testInfo,
    video.relatedVideoViews(),
    "video-relatedvideoviews-hidden",
  );
  await expect(video.relatedVideoViews().first()).not.toBeVisible();
});
