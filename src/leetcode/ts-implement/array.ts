/**
27. 移除元素
给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 */

function moveZeroes(nums: number[]): void {
    let left = 0;
    let right = 0;
    while(right < nums.length) {
        if (nums[right]) {
            left !== right && handle(left, right, nums);
            left++;
        }
        right++;
    }
}

function handle(i: number, j: number, arr: any[]) {
    arr[i] = arr[j];
    arr[j] = 0;
}

// console.log('result：', removeElement([4,5], 5));

/**
 * 移动数组
 * 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数
 */
function rotate(nums: number[], k: number): void {
    if (nums.length < 2) return;
    const actualMoveNum = nums.length < k ? k % nums.length : k;
    const startMovedIdx = nums.length - actualMoveNum;
    if (startMovedIdx === 0) return;
    const waitForMove = nums.slice(startMovedIdx);
    for (let i = startMovedIdx - 1; i >= 0; i--) {
        nums[i + actualMoveNum] = nums[i];
    }
    for (let j = 0; j < waitForMove.length; j++) {
        nums[j] = waitForMove[j];
    }
}
// let arr = [1,2]
// rotate(arr, 3);
// console.log(arr)


// 15. 三数之和

function threeSum(nums: number[]): number[][] {
    if (nums.length < 3) return [];
    let length = nums.length;
    const result = [];
    nums.sort((a, b) => a - b);
    for (let first = 0; first < length; first++) {
        if (first > 0 && nums[first] === nums[first - 1]) continue;
        let third = length - 1;
        const target = -nums[first];
        for (let second = first + 1; second < length; second++) {
            if (second > first + 1 && nums[second] === nums[second - 1]) continue;
            while(second < third && (nums[second] + nums[third]) > target) third--;
            if (second < third && (nums[second] + nums[third]) === target) {
                let item = new Array<number>();
                item = item.concat(nums[first], nums[second], nums[third]);
                result.push(item);
            }
        }
    }
    return result;
}
// console.log(threeSum([-1,0,1,2,-1,-4]));


// 二分查找
function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {
        const mid = ~~(left + (right - left) / 2);
        if (target === nums[mid]) {
            return mid;
        } else if (target > nums[mid]) {
            left = mid + 1;
        } else if (target < nums[mid]) {
            right = mid - 1;
        }
    }
    return -1;
}

// console.log(search([-1,0,3,5,9,12], 9));

// 螺旋矩阵
function generateMatrix(n: number): number[][] {
    if (!n) return [[]];
    const arr: number[][] = [[]];
    let originVal = 1;
    let x = 0;
    let y = 0;
    const maxVal = n * n;
    let direct = 0;

    const direction = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0]
    ]

    while (x < n && x >= 0 && y >= 0 && y < n && originVal <= maxVal) {
        if (!Array.isArray(arr[x])) arr[x] = [];
        arr[x][y] = originVal++;
        const nextX = x + direction[direct][0];
        const nextY = y + direction[direct][1];
        if (nextX >= n || nextX < 0 || nextY >= n || nextY < 0 || arr[nextX]?.[nextY]) {
            direct++;
            if (direct > 3) direct = 0;
        }
        x = x + direction[direct][0];
        y = y + direction[direct][1];
    }
    return arr;
}

console.log(generateMatrix(3))