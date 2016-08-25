/**
 * @author Christopher on 8/24/2016.
 */

"use strict";

var isObject = function (o) {
    return Object.prototype.toString.call(o) === '[object Object]'
};

/**
 * @module collection-utils
 */
module.exports = {
    /**
     * @alias module:collection-utils.pluck
     * @param {array|object} obj
     * @param {sring} key
     * @returns {Array}
     */
    pluck: function(obj, key) {
        if (Array.isArray(obj)) {
            return obj.map(function (o) {
                return o[key];
            });
        } else if (isObject(obj)) {
            return Object.keys(obj).map(function(k) {
                return obj[k][key];
            });
        }
    }
};
