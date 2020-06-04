"use strict";
/**
 * @module indicative
 */
Object.defineProperty(exports, "__esModule", { value: true });
const indicative_rules_1 = require("indicative-rules");
const sanitizations_1 = require("./sanitizations");
/**
 * Extend validator by adding new rules
 */
function extend(name, definition) {
    indicative_rules_1.sanitizations[name] = definition;
    /**
     * Also adding it to the sanitizations list used to define
     * schema rules
     */
    sanitizations_1.sanitizations[name] = function rule(args) {
        return { name, args: args || [] };
    };
}
exports.extend = extend;
