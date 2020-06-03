"use strict";
/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
/**
 * Configure global validation options
 */
function configure(config) {
    Object.assign(config_1.config, config);
}
exports.configure = configure;
configure.DEFAULTS = Object.assign({}, config_1.config);
