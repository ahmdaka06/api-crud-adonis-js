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
var indicative_parser_1 = require("indicative-parser");
exports.schema = indicative_parser_1.t;
var extend_1 = require("./src/Validator/extend");
exports.extend = extend_1.extend;
var configure_1 = require("./src/Validator/configure");
exports.configure = configure_1.configure;
var Validator_1 = require("./src/Validator");
exports.validate = Validator_1.validate;
exports.validateAll = Validator_1.validateAll;
var validations_1 = require("./src/Validator/validations");
exports.validations = validations_1.validations;
