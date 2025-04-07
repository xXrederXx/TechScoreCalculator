type CacheEntry = {
    timestamp: number;
    data: any;
};

const CACHE_TTL = 1000 * 60 * 10; // 10 minutes
const cache: { [url: string]: CacheEntry } = {};

export function getFromCache(url: string): any | null {
    const entry = cache[url];
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > CACHE_TTL;
    if (isExpired) {
        delete cache[url];
        return null;
    }

    return entry.data;
}

export function saveToCache(url: string, data: any): void {
    cache[url] = {
        timestamp: Date.now(),
        data,
    };
}
