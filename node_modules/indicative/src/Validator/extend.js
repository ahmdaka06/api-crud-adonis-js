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
const validations_1 = require("./validations");
/**
 * Extend validator by adding new rules
 */
function extend(name, definition) {
    indicative_rules_1.validations[name] = definition;
    /**
     * Also adding it to the validations list used to define
     * schema rules
     */
    validations_1.validations[name] = function rule(args) {
        return { name, args: args || [] };
    };
}
exports.extend = extend;
