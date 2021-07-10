class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;
	constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
		this.val = val === undefined ? 0 : val;
		this.left = left === undefined ? null : left;
		this.right = right === undefined ? null : right;
	}
}

function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
    if (!A || !B) return false;
    return recur(A, B) || isSubStructure(A.right, B) || isSubStructure(A.left, B);
};

function recur(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!b) return true;
    if (!a || a.val !== b.val) return false;
	return recur(a.left, b.left) && recur(a.right, b.right);
}

const treeA = {
    val: 10,
    left: {
        val: 12,
        left: {
            val: 8
        },
        right: {
            val: 3
        }
    },
    right: {
        val: 6,
        left: {
            val: 11
        }
    }
}

const treeB = {
    val: 10,
    left: {
        val: 12,
        left: {
            val: 8
        }
    },
    right: {
        val: 6
    }
}

console.log('result：', isSubStructure(treeA as any, treeB as any));