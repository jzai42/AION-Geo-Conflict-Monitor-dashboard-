import puppeteer from 'puppeteer-core';

const chrome = process.env.CHROME_PATH
  || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = 'http://127.0.0.1:3000/AION-Geo-Conflict-Monitor-dashboard-/?pdf=geo-monitor&lang=en';
const out = new URL('../snapshot-preview.png', import.meta.url).pathname;

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--hide-scrollbars', '--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await page.waitForSelector('iframe');
const handle = await page.$('iframe');
if (!handle) throw new Error('iframe missing');
await handle.screenshot({ path: out });
await browser.close();
console.log(out);
