import { Page } from "puppeteer-core";
import { getAvailableBrowser, releaseBrowser } from "./BrowserManager";

const RegexValidator = /https:\/\/geizhals.de\/[\w\d-]+.html/;

export async function scrapeSpecs(url: string): Promise<{ [key: string]: string; }> {
    const ret = await RunScrape(scrapeSpecsIntern, url);
    return ret ? ret : { error: "Probably wasnt able to load browser"}
}
export async function scrapePrice(url: string): Promise<{ [key: string]: string }> {
    const ret = await RunScrape(scrapePriceIntern, url);
    return ret ? ret : { error: "Probably wasnt able to load browser"}
}

async function RunScrape<T>(func: (url: string, page: Page) => Promise<T>, url: string): Promise<T | undefined> {
    const browser = await getAvailableBrowser();
    if(!browser)
    {
        return undefined
    }
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

    console.log("\t- Test URL with Regex")
    if (!RegexValidator.test(url)) {
        console.log("End Price Scrape, Faulty URL");
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }

    console.log("\t- Load page url")
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("\t- Evaluate (scraping)")
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

    console.log("\t- Test url with RegEx")
    if (!RegexValidator.test(url)) {
        console.log("End Price Scrape, Faulty URL");
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }

    console.log("\t- Loading page with url")
    await page.goto(url, { waitUntil: "networkidle2" });

    console.log("\t- Waiting for Selector to load")
    await page.waitForSelector("span.variant__header__pricehistory__pricerange > strong > span.gh_price", { timeout: 5000 });

    console.log("\t- Eavaluate (scraping)")
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


    console.log("\t- Checking Results")
    if (scraped.length < 2) {
        return {
            error: "Expected at least 2 prices.\n URL: " + url + "\n data: " + scraped.join(", "),
        };
    }

    console.log("\t- Calculating Min/Max")
    const min = Math.min(...scraped);
    const max = Math.max(...scraped);

    console.log("End Price Scrape");
    return {
        min: min.toFixed(2),
        max: max.toFixed(2),
    };
}
