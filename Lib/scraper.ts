import puppeteer from "puppeteer";


interface Specs {
    [key: string]: string;
}

interface ScrapeResponse {
    error?: string;
    [key: string]: string | undefined;
}

export async function scrapeSpecs(url: string): Promise<ScrapeResponse> {
    console.log("Start Scrape");
    
    if (!url.includes("geizhals.de")) {
        return { error: "Invalid URL. Must be from geizhals.de" };
    }
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const specs: Specs = await page.evaluate(() => {
        const specsObj: { [key: string]: string } = {};
        
        document.querySelectorAll("dl.specs-grid > div").forEach(div => {
            const dtElements = div.querySelectorAll("dt");
			const ddElements = div.querySelectorAll("dd");

			if (dtElements.length === 1 && ddElements.length === 1) {
				const key = dtElements[0].innerText.trim();
				const value = ddElements[0].innerText.trim();
				specsObj[key] = value;
			}
        });
        return specsObj;
    });

    await browser.close();
    console.log("End Scrape");
    
    return specs;
}