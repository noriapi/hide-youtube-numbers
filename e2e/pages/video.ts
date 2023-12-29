import { Page } from "@playwright/test";

export const openVideo = async (page: Page) => {
  await page.goto("https://www.youtube.com/watch?v=rdwz7QiG0lk");

  const videoPage = {
    description: () => page.locator("#description"),
    views: () => videoPage.description().getByText(/^\d.* views$/),
    subscribers: () =>
      page.getByLabel("subscribers").filter({ hasText: "subscribers" }),
    videoLikeButton: () =>
      page.getByRole("button", { name: "like this video" }),
    videoLikes: () => videoPage.videoLikeButton().getByText(/\d/),
    commentLikes: () =>
      page.locator("ytd-comment-renderer").getByLabel(/^\d.* likes$/),
    sidePane: () => page.locator("ytd-watch-next-secondary-results-renderer"),
    relatedVideoViews: () => videoPage.sidePane().getByText(/^\d.* views$/),
  };

  return videoPage;
};
