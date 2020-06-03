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
const indicative_formatters_1 = require("indicative-formatters");
/**
 * Base validator config
 */
exports.config = {
    existyStrict: false,
    formatter: indicative_formatters_1.VanillaFormatter,
    removeAdditional: false,
};
