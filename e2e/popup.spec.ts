import { expect, test } from "./fixtures";
import { openPopup } from "./pages/popup";

test("subs should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.subs).toBeChecked();
});

test("views should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.views).toBeChecked();
});

test("video likes should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.videoLikes).toBeChecked();
});

test("comment likes should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.commentLikes).toBeChecked();
});
