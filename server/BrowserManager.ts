import puppeteer, { Browser } from "puppeteer-core";

const MAX_BROWSERS = 3;
const browserPool: Browser[] = [];
let initializing = 0;

export async function createBrowser(): Promise<Browser> {
    initializing++;
    const newBrowser = await puppeteer.launch({
        headless: true,
        executablePath: require("puppeteer").executablePath(),
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    initializing--;
    return newBrowser;
}

export async function getAvailableBrowser(): Promise<Browser> {
    // Reuse an idle browser
    if (browserPool.length > 0) {
        return browserPool.pop()!;
    }

    // If below limit, create a new one
    if (browserPool.length + initializing < MAX_BROWSERS) {
        return createBrowser();
    }

    // Otherwise wait for one to free up
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (browserPool.length > 0) {
                clearInterval(interval);
                resolve(browserPool.pop()!);
            }
        }, 100); // check every 100ms
    });
}

export function releaseBrowser(browser: Browser) {
    if (browserPool.length < MAX_BROWSERS) {
        browserPool.push(browser);
    } else {
        browser.close();
    }
}

// Optional: Cleanup on shutdown
export async function closeAllBrowsers() {
    for (const browser of browserPool) {
        await browser.close();
    }
    browserPool.length = 0;
}

process.on("exit", closeAllBrowsers);
process.on("SIGINT", () => { closeAllBrowsers().then(() => process.exit()); });
process.on("SIGTERM", () => { closeAllBrowsers().then(() => process.exit()); });