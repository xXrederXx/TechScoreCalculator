import axios from 'axios';
import { Price } from './Types';

export async function fetchDataGeizhals(url: string) {
    try {
        const response = await axios.get(`http://localhost:3001/scrapeGH?url=${encodeURIComponent(url)}`);
        return response.data;
    } catch (error: any) {
        console.error('Error:', error.message);
        return { error: "Failed to fetch data\n URL: " + url };
    }
};
export async function fetchPriceGeizhals(url: string) : Promise<Price> {
    try {
        const response = await axios.get(`http://localhost:3001/scrapeGHPrice?url=${encodeURIComponent(url)}`);
        console.log(response);
        
        return new Price(parseFloat(response.data.min), parseFloat(response.data.max));
    } catch (error: any) {
        console.error('Error:', error.message);
        return new Price(-1, -1);
    }
};
