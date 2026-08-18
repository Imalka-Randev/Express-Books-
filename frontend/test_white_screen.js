import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:5173/');
  console.log('Navigated to home');
  
  // Wait for books to load
  await page.waitForSelector('.group.relative.bg-white', { timeout: 10000 });
  console.log('Books loaded');
  
  // Click the first book
  await page.click('.group.relative.bg-white');
  console.log('Clicked book');
  
  // Wait a bit to see if there are errors
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await browser.close();
})();
