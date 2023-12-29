import { expect, test } from "./fixtures";
import { openPopup } from "./pages/popup";

test("subs should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  expect(popup.getSubs()).toBeChecked();
});

test("views should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.getViews()).toBeChecked();
});

test("video likes should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.getVideoLikes()).toBeChecked();
});

test("comment likes should be checked", async ({ page, extensionId }) => {
  const popup = await openPopup(page, extensionId);

  await expect(popup.getCommentLikes()).toBeChecked();
});
