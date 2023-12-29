import { Page } from "@playwright/test";

export const openVideo = async (page: Page) => {
  await page.goto("https://www.youtube.com/watch?v=rdwz7QiG0lk");

  const description = page.locator("#description");
  const views = description.getByText(/^\d.* views$/);
  const subscribers = page
    .getByLabel("subscribers")
    .filter({ hasText: "subscribers" });
  const videoLikeButton = page.getByRole("button", { name: "like this video" });
  const videoLikes = videoLikeButton.getByText(/\d/);
  const commentLikes = page
    .locator("ytd-comment-renderer")
    .getByLabel(/^\d.* likes$/)
    .and(page.locator(":not([hidden])")); // there are hidden element `#vote-count-left`
  const sidePane = page.locator("ytd-watch-next-secondary-results-renderer");
  const relatedVideoViews = sidePane.getByText(/^\d.* views$/);

  const videoPage = {
    description,
    views,
    subscribers,
    videoLikeButton,
    videoLikes,
    commentLikes,
    sidePane,
    relatedVideoViews,
  };

  return videoPage;
};
