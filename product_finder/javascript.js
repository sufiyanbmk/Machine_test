import puppeteer from "puppeteer";

async function run(keyword) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  console.log(`https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`);
  await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`);

  await page.waitForSelector('div[data-component-type="s-search-result"]');

  const res = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('div[data-component-type="s-search-result"]'),
      (e) => {
        return {
          link: e.querySelector("a").getAttribute("href"),
          title: e.querySelector("h2.a-size-mini").textContent.trim(),
          price: e.querySelector("span.a-price-whole").textContent.trim(),
          img: e.querySelector(".s-image").getAttribute("src"),
        };
      }
    );
  });
  console.log(`https://www.amazon.in${res[0].link}`);
  await page.goto(`https://www.amazon.in${res[0].link}`);
  await page.waitForSelector("#merchant-info");
  const details = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#merchant-info"), (e) => ({
      seller: e.querySelector("#merchant-info > a:nth-child(2) > span")
        .innerHTML,
    }));
  });
  const result = {
    ...details[0],
    ...res[0],
  };
  console.log(result);

  await browser.close();
}
run("iphone");
