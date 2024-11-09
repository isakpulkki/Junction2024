import puppeteer from "puppeteer";

(async () => {
  const pollLink = 'https://www.eduskunta.fi/FI/vaski/HallituksenEsitys/Sivut/HE_187+2024.aspx';
  try {
    console.log('Starting Puppeteer...');
    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: puppeteer.executablePath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-software-rasterizer'],
    });
    const page = await browser.newPage();

    
    await page.setExtraHTTPHeaders({
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "DNT": "1",  
      "Referer": "https://google.com"
    });

    
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

   
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000 + Math.random() * 2000); 

    console.log('Navigating to URL:', pollLink);
    await page.goto(pollLink, { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('Page loaded, extracting <html>, <head>, and <body> content...');

    // Get the content of the <html>, <head>, and <body> sections
    const htmlContent = await page.evaluate(() => document.documentElement.outerHTML);
    const headContent = await page.evaluate(() => document.head.innerHTML);
    const bodyContent = await page.evaluate(() => document.body.innerHTML);

    // Print the contents to the console
    console.log('--- <html> Content ---');
    console.log(htmlContent);
    console.log('--- <head> Content ---');
    console.log(headContent);
    console.log('--- <body> Content ---');
    console.log(bodyContent);

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Scraping failed:', error.message, error.stack);
  }
})();
