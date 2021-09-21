/**两个栈实现队列 */
class queue {
	constructor() {
		this.stack1 = [];
		this.stack2 = [];
	}
	push(val) {
		this.stack1.push(val);
	}

	pop() {
		if (this.stack1.length === 0 && this.stack2.length === 0) return null;
		if (this.stack2.length === 0) {
			let len = this.stack1.length;
			for (let i = 0; i < len; i++) {
				this.stack2.push(this.stack1.pop());
			}
		}
		return this.stack2.pop();
	}
}

/**数组扁平化 */
function flat(arr) {
	return arr.reduce((a, b) => {
		return a.concat(Array.isArray(b) ? flat(b) : b);
	}, []);
}

function flat1(arr) {
	while (arr.some((item) => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
}

function flat2(arr) {
	return arr
		.toString()
		.split(",")
		.map((item) => +item);
}
function flat3(arr) {
	return arr
		.join(",")
		.split(",")
		.map((item) => +item);
}

/**斐波那契数列尾递归优化 */
function fabonacci(n, ac1 = 1, ac2 = 1) {
	if (n <= 1) return ac2;
	return fabonacci(n - 1, ac2, ac1 + ac2);
}

/**实现一个map */

Array.prototype.map = function map(fn) {
	let res = [];
	let self = this;
	for (let i = 0; i < self.length; i++) {
		res.push(fn(self[i], i, self));
	}
	return res;
};

/**实现一个forEach */
Array.prototype.forEach = function (fn) {
	let self = this;
	for (let i = 0; i < self.length; i++) {
		fn(self[i], i, self);
	}
};

/**实现一个reduce */
Array.prototype.reduce = function (fn, init) {
	let self = this;
	let curIndex = init ? 0 : 1;
	let result = init ? init : self[0];
	for (let i = curIndex; i < self.length; i++) {
		result = fn(result, self[i], i, self);
	}
	return result;
};

/**实现一个call */
Function.prototype.mycall = function (...args) {
	let context = args.shift();
	let fn = Symbol("fn");
	context[fn] = this;
	let res = context[fn](args);
	delete context[fn];
	return res;
};

/**实现一个new */
function myNew(fn, ...args) {
	let instance = Object.create(fn.prototype);
	let res = fn.apply(instance, args);
	return typeof res === "object" ? res : instance;
}

/**实现一个instanceof */
function myInstanceof(left, right) {
	left = Object.getPrototypeOf(left);
	while (left) {
		if (left === null) {
			return false;
		}
		if (left === right.prototype) {
			return true;
		}
		left = Object.getPrototypeOf(left);
	}
	return false;
}

/**防抖debounce */
function debounce(fn, delay) {
	let timer = null;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(this, args), delay);
	};
}

/**节流 */
function throttle(fn, delay) {
	let timer = true;
	return (...args) => {
		if (!timer) {
			return;
		}
		timer = false;
		setTimeout(() => {
			fn.apply(this, args);
			timer = true;
		}, delay);
	};
}

/**手写ajax */
function ajax(url) {
	return new Promise((resolve, reject) => {
		let xmlhttp;
		if (XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else if (ActiveXObject) {
			let arr = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			try {
				xmlhttp = new ActiveXObject(arr[0]);
			} catch (error) {
				xmlhttp = new ActiveXObject(arr[1]);
			}
		}
		xmlhttp.open("GET", url, true);
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status >= 200 && xmlhttp.status <= 304) {
					resolve(xmlhttp.responseText);
				} else {
					reject();
				}
			}
		};
		xmlhttp.onerror = (e) => reject(e);
		xmlhttp.send();
	});
}

/**失败后请求三次 */
let count = 0;
function myAjax(url) {
	if (++count > 3) {
		return false;
	}
	ajax(url)
		.then((a) => console.log(a))
		.catch((e) => {
			myAjax(url);
		});
}
myAjax("http://localhost:3000/webWorker.html/111");

function palindrome(str) {
	let maxLen = 0;
	let maxStr = "";
	const judge = (str) => {
		return str == str.split("").reverse().join("");
	};
	for (let i = 0; i < str.length; i++) {
		for (let j = i + 1; j <= str.length; j++) {
			let curStr = str.slice(i, j);
			if (judge(curStr) && curStr.length > maxLen) {
				maxLen = curStr.length;
				maxStr = curStr;
			}
		}
	}
	return maxStr;
}
