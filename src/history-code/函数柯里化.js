function curry(fn, arg) {
	let othis = this;
	let args = arg || [];
	return function () {
		let num = fn.length;
		args.push(...Array.from(arguments));
		if (args.length < num) {
			return curry.call(othis, fn, args);
		} else {
			fn.call(othis, args);
		}
	};
}

curry(function (a, b, k, v, c, t) {
	console.log(arguments);
})(1)(2)(3)(4)(5)(6);
