import { Page } from "@playwright/test";

export async function openPopup(page: Page, extensionId: string) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  const popup = {
    views: page.getByRole("checkbox", { name: "Views" }),
    subs: page.getByRole("checkbox", { name: "Subscribers" }),
    videoLikes: page.getByRole("checkbox", { name: "Video likes" }),
    commentLikes: page.getByRole("checkbox", { name: "Comment likes" }),
  };

  return popup;
}
