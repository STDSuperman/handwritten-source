import { flatByReduce, flatByCycle, flatByToString, flatByJoin } from '../array-flat';

describe('数组扁平化', () => {
    const testMethods = [flatByReduce, flatByCycle, flatByToString, flatByJoin];
    testMethods.forEach(method => {
        test(method.name, () => {
            expect(method([1, [2, [3, [4, [5, [6, [7]]]]]]])).toEqual([1, 2, 3, 4, 5, 6, 7])
        })
    })
})