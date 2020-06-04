"use strict";
/**
 * @module indicative
 */
Object.defineProperty(exports, "__esModule", { value: true });
const indicative_rules_1 = require("indicative-rules");
const indicative_compiler_1 = require("indicative-compiler");
const CacheManager_1 = require("../CacheManager");
const cacheManager = new CacheManager_1.CacheManager();
/**
 * Returns executor by pre-compiling and optionally caching schema.
 */
function getExecutor(schema, config) {
    /**
     * Always compile schema, when there is no cacheKey
     */
    if (!config.cacheKey) {
        const compiler = new indicative_compiler_1.SanitizerCompiler(schema, indicative_rules_1.sanitizations);
        return new indicative_compiler_1.SanitizerExecutor(compiler.compile());
    }
    /**
     * Pre-compile the schema and set it as cache when it's not
     * inside the cache already
     */
    const compiledSchema = cacheManager.get(config.cacheKey);
    if (!compiledSchema) {
        const compiler = new indicative_compiler_1.SanitizerCompiler(schema, indicative_rules_1.sanitizations);
        cacheManager.set(config.cacheKey, compiler.compile());
    }
    return new indicative_compiler_1.SanitizerExecutor(cacheManager.get(config.cacheKey));
}
/**
 * Santize given data against a pre-defined set of rules schema.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
exports.sanitize = (data, schema, config) => {
    config = config || {};
    return getExecutor(schema, config).exec(data, config);
};
