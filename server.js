// backend/server.js
import express from 'express';
import scrape from 'website-scraper';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/scrape', async (req, res) => {
  const pollLink = req.query.url; // Get URL from query parameters
  if (!pollLink) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const options = {
    urls: [pollLink],
    directory: './scraped-data', // Temp storage
  };

  try {
    const result = await scrape(options);
    const pageContent = result[0].text; // Sisältö
    res.json({ content: pageContent });
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
