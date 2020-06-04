/**
 * @module indicative
 */
import { ValidateFn } from '../Contracts';
/**
 * Validates the given data set against the defined schema. The validator
 * stops at the first error. You must use [[validateAll]] to continue
 * validations, even after first error.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
export declare const validate: ValidateFn;
/**
 * Validates the given data set against the defined schema. The validator
 * continues even after errors. You must use [[validate]] to stop
 * validations after first error.
 *
 * It is recommended to define the `config` cacheKey to avoid
 * re-compiling the same schema again and again.
 */
export declare const validateAll: ValidateFn;
