import { flatByReduce } from '../array-flat';

describe('数组扁平化', () => {
    test('flatByReduce', () => {
        expect(flatByReduce([1, [2, [3, [4, [5, [6, [7]]]]]]])).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
})