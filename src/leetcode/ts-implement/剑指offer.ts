class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
    if (!A || !B) return false;
    return recur(A, B) || isSubStructure(A.right, B) || isSubStructure(A.left, B);
};

function recur(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!b) return true;
    if (!a || a.val !== b.val) return false;
	return recur(a.left, b.left) && recur(a.right, b.right);
}

const treeA = {
    val: 10,
    left: {
        val: 12,
        left: {
            val: 8
        },
        right: {
            val: 3
        }
    },
    right: {
        val: 6,
        left: {
            val: 11
        }
    }
}

const treeB = {
    val: 10,
    left: {
        val: 12,
        left: {
            val: 8
        }
    },
    right: {
        val: 6
    }
}

/**
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

方案：快速幂
 */

function myPow(x: number, n: number): number {
    if (x === 0) return 0;
    let res = 1.0;
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    while (n > 0) {
        if ((n & 1) === 1) res *= x;
        x *= x;
        n >>>= 1;
    }
    return res;
};

console.log('result：', myPow(2.00000, -2147483648))