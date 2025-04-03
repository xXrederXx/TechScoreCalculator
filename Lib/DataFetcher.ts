import axios from 'axios';

export async function fetchDataGeizhals(url: string) {
    try {
        const response = await axios.get(`http://localhost:3001/scrapeGH?url=${encodeURIComponent(url)}`);
        return response.data;
    } catch (error: any) {
        console.error('Error:', error.message);
        return { error: "Failed to fetch data\n URL: " + url };
    }
};
