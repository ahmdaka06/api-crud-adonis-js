/**
 * @module indicative
 */
import { SanitizeFn } from '../Contracts';
/**
 * Santize given data against a pre-defined set of rules schema.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
export declare const sanitize: SanitizeFn;
