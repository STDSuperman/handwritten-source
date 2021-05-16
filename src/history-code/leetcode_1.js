/**
 *给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
 */
function findTwoIndex(arr, target) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] == target) {
        return [i, j];
      }
    }
  }
}

// console.log(findTwoIndex([1,23,4,7,213,64],30))

/**
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
示例 1:

输入: 123
输出: 321
 */

function reverseNum(num) {
  /**判断正负 */
  let isMimus = typeof num == "number" && !isNaN(num) && num < 0;
  num = Math.abs(num); //转绝对值
  let tempArr = num
    .toLocaleString()
    .replace(/,/g, "")
    .split("");
  let result = isMimus
    ? -Number(tempArr.reverse().join(""))
    : Number(tempArr.reverse().join(""));
  if (result > Math.pow(2, 31) - 1 || result < -Math.pow(2, 31)) {
    return 0;
  }
  return result;
}
//  console.log(reverseNum(-1534444444444455))

/**
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:
输入: 121
输出: true
 */

function palindromeNumber(num) {
  /**为负数的时候 */
  if (num < 0 || (num % 10 == 0 && num != 0)) return false;
  num = String(num);
  if (
    num
      .split("")
      .reverse()
      .join("") == num
  )
    return true;
  return false;
}
//  console.log(palindromeNumber(1221))

/**
 * 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。
 */

function romanNumber(num) {
  let romanNumberMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  let len = num.length;
  let result = 0;
  for (let i = 0; i < len; i++) {
    let temp = romanNumberMap[num[i]];
    if (romanNumberMap[num[i]] < romanNumberMap[num[i + 1]]) {
      temp = romanNumberMap[num[i + 1]] - romanNumberMap[num[i]];
      i++;
    }
    result += temp;
  }
  return result;
}
//  console.log(romanNumber("MCMXCIV"))
/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。

    如果不存在公共前缀，返回空字符串 ""。

    示例 1:

    输入: ["flower","flow","flight"]
    输出: "fl"
    示例 2:
 */
function getCommonPrefix(arr) {
  if (!arr.length) return "";
  let base = 0,
    preFixStr = "";
  let minLen = arr[0].length;
  preFixStr = arr[0][base];
  while (base <= minLen) {
    preFixStr = arr[0].slice(0, ++base);
    for (let item of arr.values()) {
      if (!(item.slice(0, base) == preFixStr)) {
        return base == 0 ? "" : item.slice(0, base - 1);
      }
    }
  }
  return preFixStr;
}
console.log(getCommonPrefix([""]));

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    注意空字符串可被认为是有效字符串。

    示例 1:
    输入: "()"
    输出: true
 */

function judgeBrackets(str) {
  let judge = {
    "[": "]",
    "(": ")",
    "{": "}"
  };
  let tempArr = str.split("");
  let len = tempArr.length;
  let arr = [];
  for (let i = 0; i < len; i++) {
    if (tempArr[i] == judge[arr[arr.length - 1]]) {
      arr.pop();
    } else {
      arr.push(tempArr[i]);
    }
  }
  if (arr.length == 0) {
    return true;
  }
  return false;
}
//  console.log(judgeBrackets("{[]}"))

/**
 * 将两个有序链表合并为一个新的有序链表并返回。

    新链表是通过拼接给定的两个链表的所有节点组成的。 

    示例：
    输入：1->2->4, 1->3->4
    输出：1->1->2->3->4->4
 */

function mergeLinkList(l1, l2) {
  let mergeHead = {
    val: -1,
    next: null
  };
  let cry = mergeHead;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cry.next = l1;
      l1 = l1.next;
    } else {
      cry.next = l2;
      l2 = l2.next;
    }
    cry = cry.next;
  }
  cry.next = l1 || l2;
  return mergeHead.next;
}
l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null
    }
  }
};
l2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 5,
      next: null
    }
  }
};
console.log(mergeLinkList(l1, l2));
// **********************************************
function judgeBrackets(str) {
  let judge = {
    "(": ")",
    '"': '"',
    "'": "'"
  };
  let tempArr = str.split("");
  let len = tempArr.length;
  let arr = [];
  for (let i = 0; i < len; i++) {
    if (tempArr[i] == judge[arr[arr.length - 1]]) {
      arr.pop();
    } else {
      arr.push(tempArr[i]);
    }
  }
  if (arr.length == 0) {
    return true;
  }
  return false;
}
