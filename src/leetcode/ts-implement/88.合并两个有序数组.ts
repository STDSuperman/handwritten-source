/**
88. 合并两个有序数组
给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。

请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。

示例 1：

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。

 */

/**方案一 */
 function merge1(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let lastInsertIdx = nums1.length - 1;
    let num1TailIdx = i;
    if (n <= 0) return;
    while (i >= 0 && j >= 0 || (m <= 0 && j >= 0)) {
        if (nums2[j] > nums1[i] || m <= 0) {
            nums1[lastInsertIdx--] = nums2[j];
        } else {
            while (i - 1 >= 0 && nums2[j] < nums1[i - 1]) i--;
            parserMove(nums1, i, num1TailIdx);
            num1TailIdx++;
            nums1[i] = nums2[j];
        }
        j--;
    }
};

function parserMove(arr: number[], startIdx: number, endIndex: number) {
    for (let i = endIndex; i >= startIdx; i--) {
        arr[i + 1] = arr[i];
    }
}

/**方案二 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let p1 = m - 1;
    let p2 = n - 1;
    let cur = null;
    let lastIdx = nums1.length - 1;

    while (p1 >= 0 || p2 >= 0) {
        if (p1 === -1) {
            cur = nums2[p2--];
        } else if (p2 === -1) {
            cur = nums1[p1--]
        } else if (nums1[p1] > nums2[p2]) {
            cur = nums1[p1--];
        } else {
            cur = nums2[p2--]
        }
        nums1[lastIdx--] = cur;
    }
};

// const nums1 = [1,2,3,0,0,0];
// merge(nums1, 3, [2,5,6], 3);
// const nums1 = [0];
// merge(nums1, 0, [1], 1)
const nums1 = [-1,0,0,3,3,3,0,0,0];
merge(nums1, 6, [1,2,2], 3);
console.log(nums1);