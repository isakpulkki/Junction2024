import puppeteer from "puppeteer";
process.env.LD_LIBRARY_PATH = '/usr/lib/x86_64-linux-gnu';

(async () => {
  const pollLink = 'https://www.eduskunta.fi/FI/vaski/HallituksenEsitys/Sivut/HE_187+2024.aspx';
  try {
    console.log('Starting Puppeteer...');
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: puppeteer.executablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      dumpio: true,
    });
    const page = await browser.newPage();

    console.log('Navigating to URL:', pollLink);
    await page.goto(pollLink, { waitUntil: 'networkidle2' });

    console.log('Waiting for #content-area selector...');
    await page.waitForSelector('#content-area', { timeout: 10000 });

    const pageContent = await page.evaluate(() => {
      const contentContainer = document.querySelector('#content-area');
      return contentContainer ? contentContainer.innerText : 'Content not found';
    });

    console.log('Scraped content:', pageContent);

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Scraping failed:', error.message, error.stack);
  }
})();
