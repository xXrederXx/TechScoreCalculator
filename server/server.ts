import express from 'express';
import cors from 'cors';
import { scrapePrice, scrapeSpecs } from './scraper';

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json());

app.get('/scrapeGH', async (req:any, res:any) => {
    const url = req.query.url as string;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const data = await scrapeSpecs(url);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/scrapeGHPrice', async (req:any, res:any) => {
    const url = req.query.url as string;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const data = await scrapePrice(url);
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
