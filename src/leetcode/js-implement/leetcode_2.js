/**大数反转 */
var reverse = function (x) {
	let res = '';
	if (x < 0) {
		res += '-';
	}
	let arr = Math.abs(x).toString().split('').reverse().join('');
	res += +arr.replace(/^0+/, '');
	if (res >= Math.pow(2, 31) || res <= Math.pow(2, 31) - 1) {
		return 0;
	}
	return res;
};

/**给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。 */
var firstUniqChar = function (s) {
	for (let i = 0; i < s.length; i++) {
		if (s.indexOf(s[i]) === i && s.lastIndexOf(s[i]) === i) {
			return i;
		}
	}
	return -1;
};

var removeDuplicates = function (nums) {
	let temp = nums.length;
	nums.push(...new Set(nums));
	nums.splice(0, temp);
	return nums.length;
};

var getSum = function (a, b) {
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

var detectCycle = function (head) {
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
	return 'no cycle';
};

console.log(
	detectCycle({
		val: 10,
		next: {
			val: 11,
			next: {
				val: 10,
			},
		},
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
// console.log(getRsult([1, 2, 3, 4, 5, 6, 7], 4, 19));

class LRUCache {
	linkList;
	tail;
	head;
	capacity;
	size = 0;
	cache = new Map();
	constructor(capacity) {
		this.head = new LinkNode(null);
		this.tail = new LinkNode(null);
		this.head.next = this.tail;
		this.tail.pre = this.head;
		this.capacity = capacity;
	}

	get(key) {
		const result = this.cache.get(key);
		if (!result) return -1;
		this.moveToHead(result);
		return result.value;
	}

	removeNode(node) {
		node.pre.next = node.next;
		node.next.pre = node.pre;
	}

	removeFromTail() {
		const pre = this.tail.pre;
		this.removeNode(this.tail.pre);
		return pre;
	}

	put(key, value) {
		const currentNot = this.cache.get(key);
		if (currentNot) {
			currentNot.value = value;
			this.moveToHead(currentNot);
			return;
		}
		const node = new LinkNode(key, value);
		this.cache.set(key, node);
		this.addToHead(node);
		this.size++;
		if (this.size > this.capacity) {
			this.size--;
			const tailNode = this.removeFromTail();
			this.cache.delete(tailNode.key);
		}
	}

	addToHead(node) {
		node.pre = this.head;
		node.next = this.head.next;
		this.head.next.pre = node;
		this.head.next = node;
	}

	moveToHead(node) {
		this.removeNode(node);
		this.addToHead(node);
	}
}

class LinkNode {
	value;
	next;
	pre;
	key;
	constructor(key, value) {
		this.value = value;
		this.next = null;
		this.pre = null;
		this.key = key;
	}
}
const testLRU = new LRUCache(2);
console.log(
	testLRU.put(1, 1),
	testLRU.put(2, 2),
	testLRU.get(1),
	testLRU.put(3, 3),
	testLRU.get(2),
	testLRU.put(4, 4),
	testLRU.get(1),
	testLRU.get(3),
	testLRU.get(4)
);
// const testLRU = new LRUCache(1);
// console.log(testLRU.put(2, 1), testLRU.get(2),)
