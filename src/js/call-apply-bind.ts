/**
 * 手写call、apply、bind
 */

interface ThisArg {
    fn: (arg?: any) => any;
}

interface Function {
    myCall: <T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A) => R;
    myApply: <T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args?: A) => R;
}

Object.prototype.toString.call

Function.prototype.myCall = function(this, thisArg: any, ...args) {
    const fn = Symbol('fn')
    thisArg[fn] = this || window;
    const result = thisArg[fn](args);
    delete thisArg.fn;
    return result;
}

Function.prototype.myApply = function (this, thisArg: any, args) {
    const fn = Symbol('fn')
    thisArg[fn] = this || window;
    const result = thisArg[fn](args);
    delete thisArg.fn;
    return result;
}