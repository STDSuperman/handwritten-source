"use strict";
/**
 * 手写 forEach、map、reduce、filter、some、find、every
 */
Array.prototype.myForEach = function (fn) {
    if (typeof fn !== 'function')
        throw new Error(fn + " is not a function");
    for (var i = 0; i < this.length; i++) {
        fn(this[i], i, this);
    }
};
Array.prototype.myMap = function (fn) {
    if (typeof fn !== 'function')
        throw new Error(fn + " is not a function");
    var result = [];
    for (var i = 0; i < this.length; i++) {
        result.push(fn(this[i], i, this));
    }
    return result;
};
