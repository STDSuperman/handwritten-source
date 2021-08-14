// 给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 例如：
// 给定二叉树 [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回锯齿形层序遍历如下：

// [
//   [3],
//   [20,9],
//   [15,7]
// ]

 function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];
    let toLeft = false;
    const stack = [root];
	const result: number[][] = [];
    while (stack.length) {
        const newArr: number[] = [];
		const len = stack.length;
        for (let i = 0; i < len; i++) {
            const node = stack.shift()
            if (!node) continue;
            newArr[toLeft ? 'unshift' : 'push'](node.val);
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
        toLeft = !toLeft;
		result.push(newArr);
    }
	return result;
};