import { Page } from "puppeteer-core";
import { getAvailableBrowser, releaseBrowser } from "./BrowserManager";

const RegexValidator = /https:\/\/geizhals.de\/[\w\d-]+.html/gm;

export async function scrapeSpecs(url: string): Promise<{ [key: string]: string; }> {
    return RunScrape(scrapeSpecsIntern, url)
}
export async function scrapePrice(url: string): Promise<{ [key: string]: string }> {
    return RunScrape(scrapePriceIntern, url)
}

async function RunScrape<T>(func: (url: string, page: Page) => Promise<T>, url: string): Promise<T> {
    const browser = await getAvailableBrowser();
    const page = await browser.newPage();
    try {
        return await func(url, page);
    } finally {
        await page.close();
        releaseBrowser(browser); // ✅ return to pool
    }
}

async function scrapeSpecsIntern(url: string, page: Page): Promise<{ [key: string]: string; }> {
    console.log("Start Scrape");

    if (!RegexValidator.test(url)) {
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }


    await page.goto(url, { waitUntil: "networkidle2" });

    const specs = await page.evaluate(() => {
        const specsObj: { [key: string]: string } = {};

        document.querySelectorAll("dl.specs-grid > div").forEach((div) => {
            const dtElement = div.querySelector("dt");
            const ddElement = div.querySelector("dd");

            if (dtElement && ddElement) {
                const key = dtElement.innerText.trim();
                const value = ddElement.innerText.trim();
                specsObj[key] = value;
            }
        });

        return specsObj;
    });

    console.log("End Scrape");
    return specs;
}
async function scrapePriceIntern(url: string, page: Page): Promise<{ [key: string]: string }> {
    console.log("Start Price Scrape");

    if (!RegexValidator.test(url)) {
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }

    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector("span.variant__header__pricehistory__pricerange > strong > span.gh_price", { timeout: 5000 });

    const scraped = await page.evaluate(() => {
        const prices: number[] = [];

        document.querySelectorAll("span.variant__header__pricehistory__pricerange > strong > span.gh_price").forEach((priceSpan) => {
            const rawText = priceSpan.textContent ?? "";
            const numericText = rawText.replace(/[^\d,.-]/g, "").replace(",", ".");
            const value = parseFloat(numericText);
            if (!isNaN(value)) {
                prices.push(value);
            }
        });

        return prices;
    });

    console.log("End Price Scrape");

    if (scraped.length < 2) {
        return {
            error: "Expected at least 2 prices.\n URL: " + url + "\n data: " + scraped.join(", "),
        };
    }

    const min = Math.min(...scraped);
    const max = Math.max(...scraped);

    return {
        min: min.toFixed(2),
        max: max.toFixed(2),
    };
}
