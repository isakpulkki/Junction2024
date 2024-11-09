import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/scrape', async (req, res) => {
    const pollLink = req.query.url;
    if (!pollLink) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      console.log('Starting Puppeteer...'); // Step 1
      const browser = await puppeteer.launch();
      console.log('Browser launched'); // Step 2
  
      const page = await browser.newPage();
      console.log('New page opened'); // Step 3
  
      console.log('Navigating to URL:', pollLink); // Step 4
      await page.goto(pollLink, { waitUntil: 'networkidle2' });
      console.log('Navigation complete'); // Step 5
  
      console.log('Waiting for #VaskiPage selector...'); // Step 6
      await page.waitForSelector('#VaskiPage', { timeout: 10000 });
      console.log('Selector #VaskiPage found'); // Step 7
  
      const pageContent = await page.evaluate(() => {
        const contentContainer = document.querySelector('#VaskiPage');
        return contentContainer ? contentContainer.innerText : 'Content not found';
      });
      console.log('Scraped content:', pageContent); // Step 8
  
      await browser.close();
      console.log('Browser closed'); // Step 9
  
      res.json({ content: pageContent || "Scraping test successful" });
    } catch (error) {
      console.error('Scraping failed:', error.message, error.stack);
      res.status(500).json({ error: 'Scraping failed', details: error.message });
    }
  });
  

// Start the server
console.log('Server starting...');
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
