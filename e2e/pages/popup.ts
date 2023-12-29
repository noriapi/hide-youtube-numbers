import { Page } from "@playwright/test";

export async function openPopup(page: Page, extensionId: string) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);

  const checkbox = {
    views: page.getByRole("checkbox", { name: "Views" }),
    subscribers: page.getByRole("checkbox", { name: "Subscribers" }),
    videoLikes: page.getByRole("checkbox", { name: "Video likes" }),
    commentLikes: page.getByRole("checkbox", { name: "Comment likes" }),
  };

  const popup = {
    checkbox,
    uncheckAll: async () => {
      for (const c of Object.values(checkbox)) {
        await c.uncheck();
      }
    },
  };

  return popup;
}
