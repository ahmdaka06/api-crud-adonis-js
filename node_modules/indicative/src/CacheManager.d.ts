/**
 * @module indicative
 */
/**
 * In memory cache manager to cache pre-compiled schemas when `cacheKey`
 * is defined.
 */
export declare class CacheManager<T extends any> {
    private cache;
    /**
     * Add to cache
     */
    set(key: string, value: T): void;
    /**
     * Read from cache
     */
    get(key: string): T | undefined;
}
