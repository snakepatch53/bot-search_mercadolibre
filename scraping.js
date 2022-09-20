const { chromium } = require("playwright");
const { htmlToJSON, jsonToStringMsg } = require("./functions.js");

async function search(text) {
    // Make sure to run headed.
    const browser = await chromium.launch({ headless: false });
    // Setup context however you like.
    const context = await browser.newContext({
        /* pass any options */
    });
    // await context.route("**/*", (route) => route.continue());
    // Pause the page, and start recording manually.
    const page = await context.newPage();
    await page.goto("https://www.mercadolibre.com.ec/#from=homecom");
    // await page.screenshot({ path: `example.png` });
    await page.locator(".nav-search .nav-search-input").fill(text);
    await page.locator(".nav-search .nav-search-btn").click(text);
    // await page.waitForNavigation();
    const resultHtml = await page.innerHTML(".ui-search-layout");
    const resultJson = htmlToJSON(resultHtml);
    const resultStringMsg = jsonToStringMsg(resultJson, 5);
    await browser.close();
    return resultStringMsg;
}

module.exports = search;
