// @ts-ignore
import chromePaths from "chrome-paths";
import puppeteer, { Page } from "puppeteer-core";

export type { Page as PuppeteerPage } from "puppeteer-core";

export async function withPuppeteerPage(
  callback: (page: Page) => Promise<any>,
  { headless = true, autoCloseBrowser = true } = {}
) {
  const browser = await puppeteer.launch({
    executablePath:
      chromePaths.chrome ||
      (!!chromePaths.chromium
        ? "/usr/bin/chromium-browser"
        : "chromium-browser"),
    headless,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  let res;

  try {
    const page = await browser.newPage();

    // Close the first page by default
    await (await browser.pages())[0]?.close();

    res = await callback(page);

    await page.close();
  } catch (err) {
    console.error(err);

    throw err;
  } finally {
    if (autoCloseBrowser) {
      await browser.close();
    }
  }

  return res;
}
