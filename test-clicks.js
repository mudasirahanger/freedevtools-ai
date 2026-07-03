const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://freedevtoolsai.com/tools');
  
  // Wait for the tool cards to appear
  await page.waitForSelector('a[href="/tools/base64-decode"]');
  
  // Try to click
  try {
    await page.click('a[href="/tools/base64-decode"]');
    console.log("Click successful!");
    
    await page.waitForNavigation();
    console.log("Navigated to:", page.url());
  } catch (error) {
    console.error("Click failed:", error.message);
  }

  await browser.close();
})();
