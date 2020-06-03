"use strict";
/**
 * @module indicative
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
/**
 * In memory cache manager to cache pre-compiled schemas when `cacheKey`
 * is defined.
 */
class CacheManager {
    constructor() {
        this.cache = new Map();
    }
    /**
     * Add to cache
     */
    set(key, value) {
        this.cache.set(key, value);
    }
    /**
     * Read from cache
     */
    get(key) {
        return this.cache.get(key);
    }
}
exports.CacheManager = CacheManager;
