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