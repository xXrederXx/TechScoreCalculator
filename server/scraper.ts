import puppeteer from "puppeteer-core";

const RegexValidator = /https:\/\/geizhals.de\/[\w\d-]+.html/gm;
export async function scrapeSpecs(url: string): Promise<{ [key: string]: string; }> {
    console.log("Start Scrape");

    if (!RegexValidator.test(url)) {
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: require("puppeteer").executablePath(), // Use Puppeteer's bundled Chromium
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // Fix permission issues
    });

    const page = await browser.newPage();
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

    await browser.close();
    console.log("End Scrape");

    return specs;
}

export async function scrapePrice(url: string): Promise<{ [key: string]: string }> {
    console.log("Start Price Scrape");

    if (!RegexValidator.test(url)) {
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }

    console.log("Launche Browser");

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: require("puppeteer").executablePath(), // Use Puppeteer's bundled Chromium
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    console.log("Load Page");
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the prices to be visible
    console.log("Wait selector");
    await page.waitForSelector("span.variant__header__pricehistory__pricerange > strong > span.gh_price", {timeout: 5000});

    console.log("Evaluet");
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

    console.log("Close Browser");
    await browser.close();
    console.log("Scraped prices:", scraped);
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
