var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import puppeteer from "puppeteer";
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);
let sleep = (page, min, max) => __awaiter(void 0, void 0, void 0, function* () {
    let sleep_duration = randomNumber(min, max);
    yield new Promise((resolve) => setTimeout(resolve, sleep_duration));
});
function run(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const browser = yield puppeteer.launch({ headless: false });
            const page = yield browser.newPage();
            const URL = `https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`;
            yield page.goto(URL, { waitUntil: "networkidle2" });
            yield sleep(page, 1000, 2000);
            const button = yield page.$x(`//div[(@data-cel-widget="search_result_2")] //div[1]`);
            console.log("hiii");
            yield browser.close();
        }
        catch (err) {
            console.log(err);
        }
    });
}
//   const browser = await puppeteer.launch({ headless: false });
//   const pages = await browser.newPage();
//   console.log(`https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`);
//   await pages.goto(`https://www.amazon.in/s?k=${encodeURIComponent(keyword)}`);
//   await page.waitForSelector('div[data-component-type="s-search-result"]');
//   const res: Array<{
//     link: string ;
//     title: string;
//     price: string;
//     img: string;
//   }>  await page.evaluate(() => {
//     return Array.from(
//       document.querySelectorAll('div[data-component-type="s-search-result"]'),
//       (e) => {
//         return {
//           link: e.querySelector("a")?.getAttribute("href"),
//           title: e.querySelector("h2.a-size-mini").textContent?.trim(),
//           price: e.querySelector("span.a-price-whole").textContent.trim(),
//           img: e.querySelector(".s-image").getAttribute("src"),
//         };
//       }
//     );
//   });
//   console.log(res);
//   console.log(`https://www.amazon.in${res[0].link}`);
//   await page.goto(`https://www.amazon.in${res[0].link}`);
//   await page.waitForSelector("#merchant-info");
//   const details: Array<{
//     seller: string;
//   }> = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll("#merchant-info"), (e) => ({
//       seller: e.querySelector("#merchant-info > a:nth-child(2) > span")
//         .innerHTML,
//     }));
//   });
//   const result: {
//     seller: string;
//     link: string;
//     title: string;
//     price: string;
//     img: string;
//   } = {
//     ...details[0],
//     ...res[0],
//   };
//   console.log(result);
const keyword = "iphone";
run(keyword);
