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
};

function handle(i: number, j: number, arr: any[]) {
    arr[i] = arr[j];
    arr[j] = 0;
}

// console.log('result：', removeElement([4,5], 5));

/**
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
};
let arr = [1,2]
rotate(arr, 3);
console.log(arr)