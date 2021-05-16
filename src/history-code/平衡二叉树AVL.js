class newAVLNode {
	constructor(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}
class AVL {
	constructor() {
		this.root = null;
	}

	/**获取树高度 */
	getMaxHeight(node) {
		if (!node) {
			return 0;
		}
		let leftHeight = 0,
			rightHeight = 0;
		if (node.left) {
			leftHeight = this.getMaxHeight(node.left);
		}
		if (node.right) {
			rightHeight = this.getMaxHeight(node.right);
		}
		return Math.max(leftHeight, rightHeight) + 1;
	}

	/**左单旋 */
	rotateLL(node) {
		let temp = node.right;
		node.right = temp.left;
		temp.left = node;
		return temp;
	}

	/**右单旋 */
	rotateRR(node) {
		let temp = node.left;
		node.left = temp.right;
		temp.right = node;
		return temp;
	}

	/**左-右旋 */
	rotateLR(node) {
		node.left = this.rotateLL(node.left);
		return this.rotateRR(node);
	}

	/**右-左旋 */
	rotateRL(node) {
		node.right = this.rotateRR(node.right);
		return this.rotateLL(node);
	}

	/**保持树的平衡 */
	checkBalance(node) {
		if (node == null) {
			return node;
		}
		// 左子树高度比右子树高度大   父节点平衡因子为-2
		if (this.getMaxHeight(node.left) - this.getMaxHeight(node.right) > 1) {
			if (
				this.getMaxHeight(node.left.left) >=
				this.getMaxHeight(node.left.right)
			) {
				// 如果左子树的左子树高度大于等于左子树的右子树高度  左子节点为-1和0
				// 直接进行右单旋
				node = this.rotateRR(node);
			} else {
				//如果左子节点为1，需要先左后右双旋
				node = this.rotateLR(node);
			}
			// 右子树高度比左子树高度大1以上  父节点平衡因子为2
		} else if (
			this.getMaxHeight(node.right) - this.getMaxHeight(node.left) >
			1
		) {
			if (
				this.getMaxHeight(node.right.right) >=
				this.getMaxHeight(node.right.left)
			) {
				// 如果右子树的右子树高度大于等于右子树的左子树高度
				// 直接进行左单旋
				node = this.rotateLL(node);
			} else {
				// 否则需要右左双旋
				node = this.rotateRL(node);
			}
		}
		return node;
	}

	/** 插入方法 */
	insertNode(newNode, currentNode) {
		if (currentNode == null) {
			currentNode = newNode;
			return currentNode;
		} else if (newNode.key < currentNode.key) {
			if (currentNode.left) {
				currentNode.left = this.insertNode(newNode, currentNode.left);
				currentNode = this.checkBalance(currentNode);
			} else {
				currentNode.left = newNode;
			}
		} else if (newNode.key > currentNode.key) {
			if (currentNode.right) {
				currentNode.right = this.insertNode(newNode, currentNode.right);
				currentNode = this.checkBalance(currentNode);
			} else {
				currentNode.right = newNode;
			}
		}
		return currentNode;
	}

	/**插入方法 */
	insert(newNode) {
		if (!(newNode instanceof newAVLNode)) {
			newNode = new newAVLNode(newNode);
		}
		this.root = this.insertNode(newNode, this.root);
	}

	/**删除方法 */
	deleteNode(node, root = this.root) {
		if (root === null) {
			return null;
		}
		if (node < root.key) {
			this.deleteNode(node, root.left);
			this.checkBalance(root);
			return root;
		} else if (node > root.key) {
			this.deleteNode(node, root.right);
			this.checkBalance(root);
			return root;
		} else if (node === root.key) {
			/**如果要删除的节点左右节点都存在 */
			if (root.left && root.right) {
				let minNode = root.right;
				/**找出右子树最小的节点 */
				while (null !== minNode.left) {
					minNode = minNode.left;
				}
				/**将右子树最小节点放到当前的node */
				root.key = minNode.key;
				this.deleteNode(minNode.key, root.right);
				this.checkBalance(root);
				return root;
			} else {
				/**如果都不存在 */
				if (!root.left && !root.right) {
					root = null;
					return root;
				}

				if (root.left) {
					root = root.left;
					return root;
				}
				if (root.right) {
					root = root.right;
					return root;
				}
			}
		}
	}
}

let avlTree = new AVL();
avlTree.insert(1);
avlTree.insert(7);
avlTree.insert(0);
avlTree.insert(2);
avlTree.insert(8);
avlTree.insert(6);
console.log(avlTree);
// console.log(avlTree.deleteNode(7))
