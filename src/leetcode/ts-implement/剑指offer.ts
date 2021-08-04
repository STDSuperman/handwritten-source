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

// console.log('result：', myPow(2.00000, -2147483648))

/**
 *剑指 Offer 40. 最小的k个数
 *输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。
 */

function getLeastNumbers(arr: number[], k: number): number[] {
    if (arr.length <= 1) return arr;
    randomSelect(arr, 0, arr.length - 1, k);
    return arr.slice(0, k)
};

function randomSelect(arr: number[], start: number, end: number, k: number) {
    if (start >= end) return;
    const mid = partition(arr, start, end);
    const num = mid - start + 1;
    if (num === k) {
        return
    } else if (num > k) {
        randomSelect(arr, start, mid - 1, k)
    } else {
        randomSelect(arr, mid + 1, end, k - num)
    };
}

function partition(arr: number[], start: number, end: number) {
    const base = start;
    const key = arr[base]
    while (start < end) {
        while (start < end && arr[end] > key) end--;
        if (start < end) {
            arr[start++] = arr[end]
        }
        while (start < end && arr[start] < key) start++;
        if (start < end) {
            arr[end--] = arr[start];
        }
    }
    arr[start] = key;
    return start;
}

// console.log(getLeastNumbers([1, 3, 4, 2, 4, 1, 3, 10], 4))



/**
 * 215. 数组中的第K个最大元素
 */

// 快排法
 function findKthLargest1(nums: number[], k: number): number {
    let result = Infinity;
    partitionKth(nums, 0, nums.length - 1, k);
    console.log(nums.slice(0, k))
    for (let i = 0; i < k; i++) {
        result = Math.min(result, nums[i])
    }
    return result;
};

function partitionKth(arr: number[], start: number, end: number, k: number): number {
    let i = start;
    let j = end;
    const baseKey = arr[j];
    while (i < j) {
        while (i < j && arr[i] >= baseKey) i++;
        if (i < j) {
            arr[j--] = arr[i];
        }
        while (i < j && arr[j] <= baseKey) j--;
        if (i < j) {
            arr[i++] = arr[j];
        }
    }
    arr[i] = baseKey;
    if (i < k - 1) {
        return partitionKth(arr, i + 1, end, k);
    } else if (i > k - 1) {
        return partitionKth(arr, 0, i - 1, k);
    } else {
        return i - 1;
    }
}

// 堆排法
function findKthLargest(nums: number[], k: number): number {
    let len = nums.length;
    buildHeapfy(nums, len);
    for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
        swap(nums, 0, i);
        len--;
        maxHeapify(nums, 0, len);
    }
    return nums[0]
};

function buildHeapfy(arr: number[], len: number) {
    for (let i = ~~(len / 2 - 1); i >= 0; i--) {
        maxHeapify(arr, i, len);
    }
}

function maxHeapify(arr: number[], i: number, len: number) {
    let l = 2 * i;
    let r = 2 * i + 1;
    let maxValIndex = i;
    if (l < len && arr[l] > arr[maxValIndex]) {
        maxValIndex = l;
    }
    if (r < len && arr[r] > arr[maxValIndex]) {
        maxValIndex = r;
    }
    if (maxValIndex !== i) {
        swap(arr, i, maxValIndex)
        maxHeapify(arr, maxValIndex, len);
    }
}

function swap(arr: number[], i: number, j: number) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 1))