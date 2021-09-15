/**
 * 手写call、apply、bind
 */

interface ThisArg {
    fn: (arg?: any) => any;
}

interface Function {
    myCall: <T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, ...args: A) => R;
    myApply: <T, A extends any[], R>(this: (this: T, ...args: A) => R, thisArg: T, args?: A) => R;
    myBind: (this: Function, thisArg: any, ...args: any[]) => any;
}

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

interface TempF {
    new(): any
}

Function.prototype.myBind = function (this, thisArg: any, ...args) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
    const self = this;
    function fn(this: Function, ...childArgs: any[]) {
        return self.apply(this instanceof fn ? this : thisArg, args.concat(childArgs));
    }

    if (self.prototype) {
        const f = function () {} as any as TempF;
        f.prototype = self.prototype;
        fn.prototype = new f();
    }
    return fn;
}