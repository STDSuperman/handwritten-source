//重构二叉树
function TreeNode(root) {
	this.root = root;
	this.left = null;
	this.right = null;
}

function reStructBinaryTree(pre, vin) {
	if (pre.length == 0 || vin.length == 0) {
		return null;
	}
	let root = pre[0];
	let treeNode = new TreeNode(root);
	let index = vin.indexOf(root);
	treeNode.left = reStructBinaryTree(
		pre.slice(1, index + 1),
		vin.slice(0, index)
	);
	treeNode.right = reStructBinaryTree(
		pre.slice(index + 1),
		vin.slice(index + 1)
	);
	return treeNode;
}
reStructBinaryTree([1, 2, 4, 7, 3, 5, 6, 8], [4, 7, 2, 1, 5, 3, 8, 6]);

function BinaryTree() {
	let Node = function (root) {
		this.root = root;
		this.left = null;
		this.right = null;
	};

	let Root = null;

	this.insert = function (root) {
		let newNode = new Node(root);
		if (Root === null) {
			Root = newNode;
		} else {
			insertNode(Root, root);
		}
	};

	let insertNode = function (root, key) {
		let newRoot = new Node(key);
		if (key < root.root) {
			if (root.left === null) {
				root.left = newRoot;
			} else {
				insertNode(root.left, key);
			}
		} else {
			if (root.right === null) {
				root.right = newRoot;
			} else {
				insertNode(root.right, key);
			}
		}
	};
	let Ergodic = function (root, callback) {
		if (root !== null) {
			Ergodic(root.left, callback);
			callback(root);
			Ergodic(root.right, callback);
		}
	};

	this.ergodicBinaryTree = function (callback) {
		Ergodic(Root, callback);
	};

	/**交叉遍历
	 * 申请两个栈，一个栈用于储存单数层，另一个储存偶数层
	 */
	this.crossBinaryOrder = function () {
		if (Root == null) {
			return [];
		}
		let result = [];
		let stack1 = [Root];
		let stack2 = [];
		while (stack1.length || stack2.length) {
			if (stack1.length) {
				result.push(stack1.map((item) => item.root).reverse());
			}
			while (stack1.length) {
				let node = stack1.pop();
				if (node.left) {
					stack2.push(node.left);
				}
				if (node.right) {
					stack2.push(node.right);
				}
			}

			if (stack2.length) {
				result.push(stack2.map((item) => item.root).reverse());
			}
			while (stack2.length) {
				let node = stack2.pop();
				if (node.right) {
					stack1.push(node.right);
				}
				if (node.left) {
					stack1.push(node.left);
				}
			}
		}
		return result;
	};

	/**广度优先遍历 */
	this.bfs = function () {
		if (!Root) {
			return [];
		}
		let result = [];
		let query = [Root];
		while (query.length) {
			let level = query.length;
			let cur = [];
			for (let i = 0; i < level; i++) {
				let node = query.shift();
				node.left ? query.push(node.left) : "";
				node.right ? query.push(node.right) : "";
				cur.push(node.root);
			}
			result.push(cur);
		}
		return result;
	};

	/**深度7优先遍历 */
	this.dfs = function () {
		if (!Root) {
			return null;
		}
		let result = [];
		let query = [Root];
		while (query.length) {
			let node = query.pop();
			result.push(node.root);
			node.left ? query.push(node.left) : "";
			node.right ? query.push(node.right) : "";
		}
		return result;
	};
}
let arr1 = [50, 2, 3, 547, 6, 879, 35, 6546, 76, 87, 98];
let tree1 = new BinaryTree();
arr1.forEach((items) => {
	tree1.insert(items);
});

// tree1.ergodicBinaryTree(function(key) {
//   console.log(key.root);
// });

// console.log(tree1.crossBinaryOrder());
console.log(tree1.bfs());
console.log(tree1.dfs());
