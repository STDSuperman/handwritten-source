/**
 * 手写 forEach、map、reduce、filter、some、every、find
 */

interface Array<T> {
    myForEach: (fn: Function) => void;
    myMap: (fn: Function) => any[];
    myReduce: (fn: Function, initial?: unknown) => unknown;
    myFilter: (fn: Function) => any[];
    mySome: (fn: Function) => boolean;
    myEvery: (fn: Function) => boolean;
    myFind: (fn: Function) => any[] | undefined;
}

Array.prototype.myForEach = function(fn): void {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    for(let i = 0; i < this.length; i++) {
        fn(this[i], i, this);
    }
}

Array.prototype.myMap = function(fn): any[] {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(fn(this[i], i, this))
    }
    return result;
}

Array.prototype.myReduce = function(fn, initial): unknown {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    const hasInitial = typeof initial !== 'undefined';
    let result = hasInitial ? initial : this[0];
    let i = hasInitial ? 0 : 1;
    for (i; i < this.length; i++) {
        result = fn(result, this[i], i, this);
    }
    return result;
}

Array.prototype.myFilter = function(fn): any[] {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    const result = [];
    for (let i = 0; i < this.length; i++) {
        fn(this[i], i, this) && result.push(this[i]);
    }
    return result;
}

Array.prototype.mySome = function(fn): boolean {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) return true;
    }
    return false;
}

Array.prototype.myEvery = function(fn): boolean {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    for (let i = 0; i < this.length; i++) {
        if (!fn(this[i], i, this)) return false;
    }
    return true;
}

Array.prototype.myFind = function(fn): any | undefined {
    if (typeof fn !== 'function') throw new Error(`${fn} is not a function`)
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) return this[i];
    }
}