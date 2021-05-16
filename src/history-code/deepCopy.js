function isObject(target) {
	return typeof target === "object" && target !== null;
}

/**
 * @author XHL
 * @function es6写法
 * @param {Object} obj 拷贝对象
 * @param {WeakMap} hash 可以不用写
 */
function deepClone(obj, hash = new WeakMap()) {
	/**判断是否为null类型如果是则直接返回 */
	if (!isObject(obj)) {
		return obj;
	}

	/**判断是否已经在哈希表中存在 */

	if (hash.get(obj)) {
		return hash.get(obj);
	}

	/**判断是否是数组 */
	let result = Array.isArray(obj) ? [] : {};

	/**往哈希表存储数据 */
	hash.set(obj, result);

	for (let i in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, i)) {
			if (isObject(obj[i])) {
				result[i] = deepClone(obj[i], hash);
			} else {
				result[i] = obj[i];
			}
		}
	}
	return result;
}

/**
 * 数组方法 兼容es5
 */
function _deepClone(obj, uniqueList = []) {
	/**判断是否为null类型如果是则直接返回 */
	if (!isObject(obj)) {
		return obj;
	}
	/**判断是否是数组 */
	let result = Array.isArray(obj) ? [] : {};

	/**判断是否已经存在 */
	let isCloned = find(uniqueList, obj);
	if (isCloned) {
		return isCloned;
	}

	/**将当前拷贝对象或数组放入去重数组 */
	uniqueList.push({
		source: obj, //被拷贝对象
		target: result, //拷贝后的对象
	});

	for (let i in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, i)) {
			if (isObject(obj[i])) {
				result[i] = _deepClone(obj[i], uniqueList);
			} else {
				result[i] = obj[i];
			}
		}
	}
	return result;
}

function find(arr, item) {
	let len = arr.length;
	for (let i = 0; i < len; i++) {
		if (item === arr[i].source) {
			return arr[i].target;
		}
	}
}

/**
 * 解决递归爆栈
 */
function deepCopy(obj) {
	let uniqueList = [];
	let root = {};
	let loopList = [
		{
			parent: root,
			key: undefined,
			data: obj,
		},
	];
	while (loopList.length) {
		let node = loopList.pop();
		let parent = node.parent;
		let key = node.key;
		let data = node.data;

		let res = parent;
		if (key !== undefined) {
			res = parent[key] = {};
		}

		let isCloned = find(uniqueList, data);
		if (isCloned) {
			parent[key] = isCloned;
			continue;
		}

		uniqueList.push({
			source: data,
			target: res,
		});

		for (let i in data) {
			if (data.hasOwnProperty(i)) {
				if (isObject(data[i])) {
					loopList.push({
						parent: res,
						key: i,
						data: data[i],
					});
				} else {
					res[i] = data[i];
				}
			}
		}
	}
	return root;
}

let a = {
	a: 10,
	b: {
		v: 14,
		c: {
			f: 1000,
		},
	},
};
a.b.c.d = a;
console.log(deepCopy(a));

function spawn(fn) {
	return new Promise((resolve, reject) => {
		const gen = fn();
		let step = function (nextFn) {
			let next;
			try {
				next = nextFn();
			} catch (error) {
				reject(error);
			}
			if (next.done) {
				return resolve(next.value);
			}
			return Promise.resolve(next.value).then(
				(v) => {
					step(() => gen.next(v));
				},
				(e) => {
					step(() => gen.throw(e));
				}
			);
		};
		step(() => gen.next(undefined));
	});
}

let rawData = [
	{
		type: "element",
		tagName: "section",
		attrs: {
			class: "chunk-container",
			style: "bgc:black;font-size:    17px;color:#fff",
		},
		children: [
			{
				type: "comment",
				content: " wp:heading ",
				attrs: {},
			},
			{
				type: "element",
				tagName: "h2",
				children: [
					{
						type: "text",
						content: "H2 H2  H2",
						attrs: {},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:heading ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: ' wp:heading {"level":3} ',
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "h3",
				children: [
					{
						type: "text",
						content: "H3 H3  H3  H3",
						attrs: {},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:heading ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: ' wp:heading {"level":4} ',
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "h4",
				children: [
					{
						type: "text",
						content: "H4 H4  H4  H4",
						attrs: {},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:heading ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "p",
				children: [
					{
						type: "text",
						content:
							"20号正文字体 20号正文字体  20号正文字体  20号正文字体  20号正文字体",
						attrs: {},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "p",
				children: [
					{
						type: "element",
						tagName: "span",
						children: [
							{
								type: "text",
								content:
									"17号正文字体 17号正文字体  17号正文字体",
								attrs: {},
							},
						],
						attrs: {
							style: "font-size:17px",
							class: "tss-fontsize",
						},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "p",
				children: [
					{
						type: "element",
						tagName: "span",
						children: [
							{
								type: "text",
								content:
									"15号正文字体 15号正文字体  15号正文字体  15号正文字体",
								attrs: {},
							},
						],
						attrs: {
							style: "font-size:15px",
							class: "tss-fontsize",
						},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "p",
				children: [
					{
						type: "element",
						tagName: "span",
						children: [
							{
								type: "text",
								content:
									"10号正文字体 10号正文字体  10号正文字体  10号正文字体",
								attrs: {},
							},
						],
						attrs: {
							style: "font-size:10px",
							class: "tss-fontsize",
						},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "p",
				children: [
					{
						type: "text",
						content: "混杂： 20号正文字体",
						attrs: {},
					},
					{
						type: "element",
						tagName: "span",
						children: [
							{
								type: "text",
								content: "，17号正文字体",
								attrs: {},
							},
						],
						attrs: {
							style: "font-size:17px",
							class: "tss-fontsize",
						},
					},
					{
						type: "text",
						content: "，",
						attrs: {},
					},
					{
						type: "element",
						tagName: "span",
						children: [
							{
								type: "text",
								content: "15号正文字体",
								attrs: {},
							},
						],
						attrs: {
							style: "font-size:15px",
							class: "tss-fontsize",
						},
					},
					{
						type: "text",
						content: "，",
						attrs: {},
					},
					{
						type: "element",
						tagName: "span",
						children: [
							{
								type: "text",
								content: "10号正文字体",
								attrs: {},
							},
						],
						attrs: {
							style: "font-size:10px",
							class: "tss-fontsize",
						},
					},
				],
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: " /wp:paragraph ",
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "comment",
				content: ' wp:tss/list {"ordered":true} ',
				attrs: {},
			},
			{
				type: "text",
				attrs: {},
			},
			{
				type: "element",
				tagName: "ol",
				children: [
					{
						type: "element",
						tagName: "li",
						children: [
							{
								type: "text",
								content: "listblock字体20",
								attrs: {},
							},
						],
						attrs: {},
					},
				],
				attrs: {
					"data-inheritance": "true",
					"data-template": "ol1",
				},
			},
		],
	},
];

function changeFontSize(arr) {
	let reg = /font-size:\s*(\d+)px/g;
	let arrLen = arr.length;
	for (let i = 0; i < arrLen; i++) {
		let item = arr[i];
		if (item.children) {
			item.children = changeFontSize(item.children);
		}
		if (
			item.attrs &&
			item.attrs.style &&
			reg.test(item.attrs.style.trim())
		) {
			item.attrs.style = item.attrs.style.replace(
				reg,
				`font-size:${RegExp.$1 - 4}px`
			);
		}
	}
	return arr;
}
console.log(changeFontSize(rawData));
