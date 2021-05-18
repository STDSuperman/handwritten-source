/**
 * 数组扁平化
 */

export function flatByReduce(arr: any[]): any[] {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatByReduce(cur) : cur)
    }, []);
}