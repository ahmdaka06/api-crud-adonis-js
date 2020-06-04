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
var Sanitizer_1 = require("./src/Sanitizer");
exports.sanitize = Sanitizer_1.sanitize;
var extend_1 = require("./src/Sanitizer/extend");
exports.extend = extend_1.extend;
var sanitizations_1 = require("./src/Sanitizer/sanitizations");
exports.sanitizations = sanitizations_1.sanitizations;
