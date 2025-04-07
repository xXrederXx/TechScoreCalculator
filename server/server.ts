// RUN "tsc" after changes

import express from 'express';
import cors from 'cors';
import { scrapePrice, scrapeSpecs } from './scraper';
import { getFromCache, saveToCache } from './cache';

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json());

app.get('/scrapeGH', async (req:any, res:any) => {
    const url = req.query.url as string;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const cached = getFromCache(url + '_specs');
    if (cached) return res.json(cached);
    
    try {
        const data = await scrapeSpecs(url);
        saveToCache(url + '_specs', data);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message});
    }
});

app.get('/scrapeGHPrice', async (req:any, res:any) => {
    const url = req.query.url as string;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const cached = getFromCache(url + '_price');
    if (cached) return res.json(cached);

    try {
        const data = await scrapePrice(url);
        saveToCache(url + '_price', data);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: "->" + error.message });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
