/**大数反转 */
var reverse = function(x) {
  let res = "";
  if (x < 0) {
    res += "-";
  }
  let arr = Math.abs(x)
    .toString()
    .split("")
    .reverse()
    .join("");
  res += +arr.replace(/^0+/, "");
  if (res >= Math.pow(2, 31) || res <= Math.pow(2, 31) - 1) {
    return 0;
  }
  return res;
};

/**给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。 */
var firstUniqChar = function(s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === i && s.lastIndexOf(s[i]) === i) {
      return i;
    }
  }
  return -1;
};

var removeDuplicates = function(nums) {
  let temp = nums.length;
  nums.push(...new Set(nums));
  nums.splice(0, temp);
  return nums.length;
};

var getSum = function(a, b) {
  b = ~b;
  while (b != 0) {
    let temp = a ^ b;
    b = (a & b) << 1;
    a = temp;
  }
  return a + 1;
};
// console.log(getSum(6, 19))

function Sub(nNum1, nNum2) {
  if (nNum1 == 0 || nNum2 == 0) return nNum1 || -nNum2;
  nNum2 = ~nNum2; //取反码
  var ntempNum;
  while (nNum2 != 0) {
    ntempNum = nNum1 ^ nNum2;
    nNum2 = (nNum1 & nNum2) << 1;
    nNum1 = ntempNum;
  }
  return nNum1 + 1;
}

var detectCycle = function(head) {
  let arr = [];
  arr.push(head.val);
  let pos;
  while ((head = head.next)) {
    if ((pos = arr.indexOf(head.val)) !== -1) {
      return `tail connects to node index ${pos}`;
    } else {
      arr.push(head.val);
    }
  }
  return "no cycle";
};

console.log(
  detectCycle({
    val: 10,
    next: {
      val: 11,
      next: {
        val: 10
      }
    }
  })
);

/**从数组中选n个数使其等于sum */
function getRsult(data, n, sum) {
  if (n == 0 && sum == 0) {
    return true;
  }
  if (n < 0) {
    return false;
  }
  if (n > 0 && data.length > 0) {
    var temp = data.slice(1, data.length);
    return getRsult(temp, n - 1, sum - data[0]) || getRsult(temp, n, sum);
  }
}
console.log(getRsult([1, 2, 3, 4, 5, 6, 7], 4, 19));
