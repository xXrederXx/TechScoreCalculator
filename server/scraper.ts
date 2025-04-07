import puppeteer from "puppeteer-core";

export async function scrapeSpecs(url: string): Promise<{ [key: string]: string; }> {
    console.log("Start Scrape");

    if (!url.includes("geizhals.de")) {
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

export async function scrapePrice(url: string): Promise<{ [key: string]: string; }> {
    console.log("Start Scrape");

    if (!url.includes("geizhals.de")) {
        return { error: "Invalid URL. Must be from geizhals.de\n URL: " + url };
    }

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: require("puppeteer").executablePath(), // Use Puppeteer's bundled Chromium
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // Fix permission issues
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const scraped = await page.evaluate(() => {
        const priceObj: number[] = [];

        document.querySelectorAll("span.variant__header__pricehistory__pricerange > strong").forEach((elm) => {
            priceObj.push(parseFloat(elm.querySelector("span.gh_price")?.textContent ?? "0"))
        })

        return priceObj;
    });

    await browser.close();
    console.log("End Scrape");

    if (scraped.length !== 2) {
        return { error: "Got more or less than 2 elemnts.\n URL: " + url + "\n data: " + scraped.join(", ") };
    }

    return {
        min: (scraped[0] < scraped[1] ? scraped[0] : scraped[1]).toFixed(2),
        max: (scraped[0] > scraped[1] ? scraped[0] : scraped[1]).toFixed(2)
    };
}
