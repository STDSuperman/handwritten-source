import '../call-apply-bind';

describe('测试call-apply-bind', () => {
    test('call', () => {
        expect(Object.prototype.toString.myCall([])).toEqual('[object Array]');
        expect(Array.prototype.concat.myCall([], 1, 2, 3)).toEqual([1, 2, 3])
    })

    test('apply', () => {
        expect(Object.prototype.toString.myApply([])).toEqual('[object Array]');
        expect(Array.prototype.concat.myApply([], [1, 2, 3])).toEqual([1, 2, 3])
    })
})