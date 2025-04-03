import puppeteer from "puppeteer-core";

export async function scrapeSpecs(url: string) {
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
