import { Page } from "@playwright/test";

export async function openPopup(page: Page, extensionId: string) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  const popup = {
    getViews: () => page.getByRole("checkbox", { name: "Views" }),
    getSubs: () => page.getByRole("checkbox", { name: "Subscribers" }),
    getVideoLikes: () => page.getByRole("checkbox", { name: "Video likes" }),
    getCommentLikes: () =>
      page.getByRole("checkbox", { name: "Comment likes" }),
  };

  return popup;
}
