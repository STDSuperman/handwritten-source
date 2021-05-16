/**
 * Promise源码解析
 * new 一个promise的时候需要传递一个执行器函数，立即执行
 * 执行器函数只接受两个参数 resolve reject
 * Promise有三个状态 pedding fulfilled rejected
 * 状态改变只能由pedding -> fulfilled 或者 pendding -> rejected
 * 状态一经确定就无法改变
 *
 * Promise 的 then 可以链式调用(返回一个promise对象)
 * 可接收两个参数(可缺省)，一个是成功的回调onFulfilled 一个是失败的回调onRejected
 * 如果成功且有返回值，则如果返回值为Promise对象则等待promise执行完成
 * 如果成功则走下一个Promise成功的回调否则就走失败的回调
 * 如果返回值是其他类型则直接作为下一个then对应的成功或失败的回调(在成功的回调返回就走下一个then成功的回调，反之亦然)
 *
 */
const PENDDING = "pendding";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(fn) {
	let self = this;
	self.status = PENDDING;
	self.onFulfilledCallBack = [];
	self.onRejectedCallBack = [];
	/**执行成功回调 */
	function resolve(value) {
		if (self.status === PENDDING) {
			self.status = FULFILLED;
			self.value = value;
			self.onFulfilledCallBack.forEach((fn) => fn(self.value));
		}
	}
	function reject(reason) {
		if (self.status === PENDDING) {
			self.status = REJECTED;
			self.reason = reason;
			self.onRejectedCallBack.forEach((fn) => fn(self.reason));
		}
	}

	/**立即执行传入的函数,并加一层捕获异常 */
	try {
		fn(resolve, reject);
	} catch (error) {
		reject(error);
	}
}

Promise.prototype.then = function (onFulfilled, onRejected) {
	onFulfilled =
		typeof onFulfilled === "function" ? onFulfilled : (value) => value;
	onRejected =
		typeof onRejected === "function"
			? onRejected
			: (reason) => {
					throw reason;
			  };
	let self = this;
	let promise2 = new Promise(function (resolve, reject) {
		if (self.status === FULFILLED) {
			try {
				setTimeout(() => {
					let x = onFulfilled(self.value);
					resolvePromise(promise2, x, resolve, reject);
				});
			} catch (error) {
				reject(error);
			}
		} else if (self.status === REJECTED) {
			try {
				setTimeout(() => {
					let x = onRejected(self.reason);
					resolvePromise(promise2, x, resolve, reject);
				});
			} catch (error) {
				reject(error);
			}
		} else if (self.status === PENDDING) {
			self.onFulfilledCallBack.push(() =>
				setTimeout(() => {
					try {
						let x = onFulfilled(self.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				})
			);

			self.onRejectedCallBack.push(() =>
				setTimeout(() => {
					try {
						let x = onRejected(self.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				})
			);
		}
	});
	return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
	let used;
	if (x == promise2) {
		reject(new TypeError("Chaining cycle"));
	} else if ((x && typeof x === "function") || typeof x === "object") {
		try {
			let then = x.then;
			if (typeof then === "function") {
				then.call(
					x,
					(y) => {
						if (used) return;
						used = true;
						resolvePromise(promise2, y, resolve, reject);
					},
					(e) => {
						if (used) return;
						used = true;
						reject(e);
					}
				);
			} else {
				if (used) return;
				used = true;
				resolve(x);
			}
		} catch (error) {
			reject(error);
		}
	} else {
		x && resolve(x);
	}
}

let test = new Promise(function (resolve, reject) {
	setTimeout(() => {
		resolve("dsadsadaSD");
	}, 3000);
});
test.then(
	(data) => {
		console.log(data);
	},
	(error) => {
		console.log(error, "=====");
	}
);
