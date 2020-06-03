/**
 * @module indicative
 */
import { Schema, Messages, TypedSchema, ParsedTypedSchema } from 'indicative-parser';
import { ErrorFormatterContract, ErrorCollectorFn } from 'indicative-compiler';
/**
 * Shape of validator config
 */
export declare type ValidatorConfig = {
    cacheKey?: string;
    existyStrict: boolean;
    removeAdditional: boolean;
    customErrorCollector?: ErrorCollectorFn;
    formatter: {
        new (): ErrorFormatterContract;
    };
};
/**
 * Shape of sanitizer config. This must be passed inline
 */
export declare type SanitizerConfig = {
    cacheKey?: string;
};
/**
 * Shape of `validate` and `validateAll` function.
 */
export declare type ValidateFn = <T extends ParsedTypedSchema<TypedSchema> | Schema>(data: any, schema: T, messages?: Messages, config?: Partial<ValidatorConfig>) => T extends Schema ? Promise<any> : Promise<T['props']>;
/**
 * Shape of `sanitize` function.
 */
export declare type SanitizeFn = (data: any, schema: Schema, config?: Partial<SanitizerConfig>) => any;
