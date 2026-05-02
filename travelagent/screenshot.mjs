import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function screenshot(url, label = '') {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });

  const screenshotDir = './temporary screenshots';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const files = fs.readdirSync(screenshotDir);
  const nums = files.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || 0)).filter(n => !isNaN(n));
  const nextNum = nums.length > 0 ? Math.max(...nums) + 1 : 1;

  const filename = `screenshot-${nextNum}${label ? '-' + label : ''}.png`;
  const filepath = path.join(screenshotDir, filename);

  await page.screenshot({ path: filepath, fullPage: true });
  await browser.close();

  console.log(`Screenshot saved: ${filepath}`);
  return filepath;
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
screenshot(url, label);