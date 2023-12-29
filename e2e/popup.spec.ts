import { expect, test } from "./fixtures";
import { openPopup } from "./pages/popup";

test("subs should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.checkbox.subscribers).toBeChecked();
});

test("views should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.checkbox.views).toBeChecked();
});

test("video likes should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.checkbox.videoLikes).toBeChecked();
});

test("comment likes should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.checkbox.commentLikes).toBeChecked();
});
