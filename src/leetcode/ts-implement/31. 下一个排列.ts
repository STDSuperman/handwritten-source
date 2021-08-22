// 实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列（即，组合出下一个更大的整数）。

// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

// 必须 原地 修改，只允许使用额外常数空间。

//  

// 示例 1：

// 输入：nums = [1,2,3]
// 输出：[1,3,2]


function nextPermutation(nums: number[]): void {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        let j = nums.length - 1;
        while (j > i && nums[i] >= nums[j]) j--;
        swapArrValue(nums, i, j);
    }
    reverseArr(nums, i + 1, nums.length - 1);
};

function swapArrValue(arr: number[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j]
    arr[j] = temp;
}

function reverseArr(nums: number[], i: number, j: number) {
    while (i < j) {
        swapArrValue(nums, i++, j--);
    }
}

const nums = [3,2,1]

nextPermutation(nums);
console.log(nums);