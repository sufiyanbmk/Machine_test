import puppeteer from "puppeteer";
import fs from "fs";
import { ProductInterface } from "./types/productInterface.js";

const randomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

let sleep = async (
  page: puppeteer.Page,
  min: number,
  max: number
): Promise<void> => {
  let sleep_duration = randomNumber(min, max);
  await new Promise((resolve) => setTimeout(resolve, sleep_duration));
};

const navigateToPage = async (page: puppeteer.Page, link: string) => {
  await page.goto(link, { waitUntil: "networkidle2" });
};

async function run(keyword: string) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const URL = `https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`;

    await page.goto(URL, { waitUntil: "networkidle2" });
    await sleep(page, 1000, 2000);
    const [divElement] = await page.$x(
      `//div[(@data-cel-widget="search_result_2")] //div[1]`
    );

    if (divElement) {
      const linkElement = await divElement.$("a");
      if (linkElement) {
        const link = await page.evaluate((a) => a.href, linkElement);
        await sleep(page, 500, 1000);
        await navigateToPage(page, link);
        const details: ProductInterface[] = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll("#dp-container"),
            (e) => ({
              title:
                e.querySelector("#productTitle")?.textContent?.trim() || null,
              offerprice:
                e.querySelector("span.a-price-whole")?.textContent?.trim() ||
                null,
              seller:
                e.querySelector("#merchant-info > a:nth-child(2) > span")
                  ?.innerHTML || null,
              img:
                e
                  .querySelector("#imgTagWrapperId > img")
                  ?.getAttribute("src") || null,
              rating:
                e
                  .querySelector("span.a-size-base .a-color-base")
                  ?.textContent?.trim() || null,
            })
          );
        });
        console.log(details);
        fs.writeFile("file.json", JSON.stringify(details), (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log("Link element not found.");
      }
    } else {
      console.log("Div element not found.");
    }
    await browser.close();
  } catch (err) {
    console.log(err);
  }
}
const keyword: string = "macbook air m1";
run(keyword);
