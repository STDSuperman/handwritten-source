/**
 * 数组扁平化
 */

// 递归 + reduce
export function flatByReduce(arr: any[]): any[] {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatByReduce(cur) : cur)
    }, []);
}

// 循环加额外栈
export function flatByCycle(arr: any[]): any[] {
    const stack = arr.slice();
    const result = [];
    while(stack.length) {
        const item = stack.shift();
        if (Array.isArray(item)) {
            stack.unshift(...item);
        } else {
            result.push(item);
        }
    }
    return result;
}

enum FormatType {
    number = 1,
    string = 2,
}

type ResultArr = number[] | string[];

// 对纯数字(或数字字符串)数组扁平化
export function flatByToString(arr: any[], type: FormatType = FormatType.number): any[]{
    let result: ResultArr = arr.toString().split(',');
    if (type === 1) {
        result = result.map(item => Number(item));
    }
    return result;
}

export function flatByJoin(arr: any[], type: FormatType = FormatType.number): any[]{
    let result: ResultArr = arr.join().split(',');
    if (type === 1) {
        result = result.map(item => Number(item));
    }
    return result;
}