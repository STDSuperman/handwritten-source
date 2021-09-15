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

    test('bind', () => {
        function getAFn (...args) {
            const myArgs = args.concat(this.a || []);
            this.args = myArgs;
            return this.a + ',' + args.toString();
        }
        const obj = {
            a: 1,
            getA: getAFn
        }

        const obj2 = {a: 2}

        const getA = obj.getA.myBind(obj2, 1, 2);
        expect(getA()).toEqual('2,1,2');
        expect(getA(3, 4)).toEqual('2,1,2,3,4')
        // 判断传参是否合并至初始参数
        expect((new getA(3)).args).toEqual([1, 2, 3]);
        // 测试是否为继承关系
        expect(new getA instanceof obj.getA).toBeTruthy()
    })
})