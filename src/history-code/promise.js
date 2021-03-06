/**
 * Promise源码解析
 * new 一个promise的时候需要传递一个执行器函数，立即执行
 * 执行器函数只接受两个参数 resolve reject
 * Promise有三个状态 pending fulfilled rejected
 * 状态改变只能由pending -> fulfilled 或者 pending -> rejected
 * 状态一经确定就无法改变
 *
 * Promise 的 then 可以链式调用(返回一个promise对象)
 * 可接收两个参数(可缺省)，一个是成功的回调onFulfilled 一个是失败的回调onRejected
 * 如果成功且有返回值，则如果返回值为Promise对象则等待promise执行完成
 * 如果成功则走下一个Promise成功的回调否则就走失败的回调
 * 如果返回值是其他类型则直接作为下一个then对应的成功或失败的回调(在成功的回调返回就走下一个then成功的回调，反之亦然)
 *
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(fn) {
	let self = this;
	self.status = PENDING;
	self.value = undefined;
	self.reason = undefined;
	self.onFulfilledCallBack = [];
	self.onRejectedCallBack = [];
	/**执行成功回调 */
	function resolve(value) {
		setTimeout(() => {
			if (value && value.then) {
				return value.then(resolve, reject);
			}
			if (self.status === PENDING) {
				self.status = FULFILLED;
				self.value = value;
				self.onFulfilledCallBack.forEach((fn) => fn());
			}
		})
	}
	function reject(reason) {
		setTimeout(() => {
			if (reason && reason.then) {
				return reason.then(resolve, reject);
			}
			if (self.status === PENDING) {
				self.status = REJECTED;
				self.reason = reason;
				self.onRejectedCallBack.forEach((fn) => fn());
			}
		})
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
			: (r) => {
					throw r;
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
		} else if (self.status === PENDING) {
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
	if (x === promise2) {
		return reject(new TypeError("Chaining cycle"));
	}

	if (typeof x === "function" || (x && typeof x === "object")) {
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
				resolve(x);
			}
		} catch (error) {
			if (used) return;
			used = true;
			reject(error);
		}
	} else {
		resolve(x);
	}
}

Promise.all = function (promises) {
	return new Promise((resolve, reject) => {
		const len = promises.length;
		const result = [];
		let count = 0;

		if (len === 0) return resolve([]);

		promises.forEach((fn, index) => {
			Promise.resolve(fn).then(value => {
				count++;
				result[index] = value;
				if (count >= len) {
					resolve(result);
				}
			}, e => {
				reject(e)
			})
		})
	})
}

Promise.resolve = function (val) {
	return new Promise((resolve) => resolve(val))
}

Promise.allSettled = function (promises) {
	return new Promise((resolve) => {
		const len = promises.length;
		const result = [];
		let count = 0;

		if (len === 0) return resolve([]);

		promises.forEach((fn, index) => {
			Promise.resolve(fn).then(value => {
				count++;
				result[index] = {status: FULFILLED, value};
				if (count >= len) {
					resolve(result);
				}
			}, reason => {
				count++;
				result[index] = {status: REJECTED, reason};
				if (count >= len) {
					resolve(result);
				}
			})
		})
	})
}

Promise.all([new Promise((resolve) => {
	setTimeout(() => {
		resolve('呀呀呀呀')
	}, 1000)
}), 21321]).then(res => {
	console.log(res, 'all结果');
})

Promise.allSettled([new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('呀呀呀呀')
	}, 1000)
}), 21321]).then(res => {
	console.log(res, 'allSettled结果');
})

// 添加测试 Promise A+
Promise.defer = Promise.deferred = function () {
	let dfd = {};
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve;
		dfd.reject = reject;
	});
	return dfd;
};

let test = new Promise(function (resolve, reject) {
	setTimeout(() => {
		resolve("dsadsadaSD");
	}, 3000);
});
test.then(
	(data) => {
		return new Promise((r) => {
			r('嵌套');
		});
	},
	(error) => {
		console.log(error, "=====");
	}
).then((res) => {
	console.log(res);
});

module.exports = Promise;