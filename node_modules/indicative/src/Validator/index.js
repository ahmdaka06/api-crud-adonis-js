"use strict";
/**
 * @module indicative
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
const indicative_rules_1 = require("indicative-rules");
const indicative_compiler_1 = require("indicative-compiler");
const CacheManager_1 = require("../CacheManager");
const config_1 = require("./config");
const cacheManager = new CacheManager_1.CacheManager();
/**
 * Returns executor by pre-compiling and optionally caching schema.
 */
function getExecutor(schema, messages, config) {
    /**
     * Always compile schema, when there is no cacheKey
     */
    if (!config.cacheKey) {
        const compiler = new indicative_compiler_1.ValidatorCompiler(schema, messages, indicative_rules_1.validations);
        return new indicative_compiler_1.ValidatorExecutor(compiler.compile());
    }
    /**
     * Pre-compile the schema and set it as cache when it's not
     * inside the cache already
     */
    const compiledSchema = cacheManager.get(config.cacheKey);
    if (!compiledSchema) {
        const compiler = new indicative_compiler_1.ValidatorCompiler(schema, messages, indicative_rules_1.validations);
        cacheManager.set(config.cacheKey, compiler.compile());
    }
    return new indicative_compiler_1.ValidatorExecutor(cacheManager.get(config.cacheKey));
}
/**
 * Validates the given data set against the defined schema. The validator
 * stops at the first error. You must use [[validateAll]] to continue
 * validations, even after first error.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
exports.validate = (data, schema, messages, config) => {
    config = Object.assign({}, config_1.config, config);
    return getExecutor(schema, messages || {}, config).exec(data, config.formatter, config, true, config.removeAdditional, config.customErrorCollector);
};
/**
 * Validates the given data set against the defined schema. The validator
 * continues even after errors. You must use [[validate]] to stop
 * validations after first error.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
exports.validateAll = (data, schema, messages, config) => {
    config = Object.assign({}, config_1.config, config);
    return getExecutor(schema, messages || {}, config).exec(data, config.formatter, config, false, config.removeAdditional, config.customErrorCollector);
};
