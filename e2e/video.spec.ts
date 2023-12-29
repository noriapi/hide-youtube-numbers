import { expect, test } from "./fixtures";
import { openVideo } from "./pages/video";

test("views should not be visible", async ({ page }) => {
  const video = await openVideo(page);

  await expect(video.views).not.toBeVisible();
});

test("subscribers should not be visible", async ({ page }) => {
  const video = await openVideo(page);

  await expect(video.subscribers).not.toBeVisible();
});

test("video likes should not be visible", async ({ page }) => {
  const video = await openVideo(page);

  await expect(video.videoLikes).not.toBeVisible();
});

test("comment likes should not be visible", async ({ page }) => {
  const video = await openVideo(page);

  await expect(video.commentLikes).not.toBeVisible();
});

test("related videos views should not be visible", async ({ page }) => {
  const video = await openVideo(page);

  await expect(video.relatedVideoViews.first()).not.toBeVisible();
});
