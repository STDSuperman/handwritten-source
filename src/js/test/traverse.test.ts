import '../traverse';

const testArr = [1, 2]

describe('遍历函数测试', () => {

    const commonTest = (fnName, needTraverseAll = true) => {
        const mockFn = jest.fn((x, i) => x);
        (testArr as any)[fnName](mockFn);
        const callLength = mockFn.mock.calls.length;
        needTraverseAll && expect(callLength).toEqual(2);
        if (callLength >= 1) {
            // 测第一个参数是否正确
            expect(mockFn.mock.calls[0][0]).toEqual(1);
            expect(mockFn.mock.calls[0][1]).toEqual(0);
        }
        if (callLength > 1) {
            // 测第二个参数是否为索引
            expect(mockFn.mock.calls[1][0]).toEqual(2);
            expect(mockFn.mock.calls[1][1]).toEqual(1);
        }
        // 测传入非法参数是否报错
        try {
            (testArr as any)[fnName]('22' as any);
        } catch (error) {
            expect(error.message).toMatch('22 is not a function')
        }
    }

    test('测试forEach', () => {
        commonTest('myForEach')
    })
    
    test('测试map', () => {
        commonTest('myMap')
        const mockMapFn = jest.fn(x => x + 1);
        testArr.myMap(mockMapFn);
        // 测返回值是否都+1
        expect(mockMapFn.mock.results[0].value).toEqual(2);
    })
    
    test('测试reduce', () => {
        // 测reduce是否累加成功
        expect(testArr.myReduce((pre, cur) => {
            return pre + cur
        })).toEqual(3)

        expect(testArr.myReduce((pre, cur) => {
            return pre + cur
        }, 1)).toEqual(4)
    })

    test('测试filter', () => {
        commonTest('myFilter')
        // 测筛选
        expect(testArr.myFilter(item => item > 1)).toEqual([2]);
    })

    test('测试some', () => {
        commonTest('mySome', false)
        expect(testArr.mySome(item => item === 2)).toBeTruthy();
        expect(testArr.mySome(item => item === 0)).toBeFalsy();
    })

    test('测试every', () => {
        commonTest('myEvery', false)
        expect(testArr.myEvery(item => item === 2)).toBeFalsy();
        expect(testArr.myEvery(item => item >= 1)).toBeTruthy();
    })

    test('测试find', () => {
        commonTest('myFind', false)
        expect(testArr.myFind(item => item === 1)).toEqual(1);
        expect(testArr.myFind(item => item === 0)).toBeUndefined();
    })
})