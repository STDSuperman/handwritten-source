/**
    51. N 皇后
    n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

    给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

    每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 */

function solveNQueens(n: number): string[][] {
    const board: string[][] = [];
    const result: string[][] = [];
    const recur = (row: number) => {
        if (row === n) {
            const strArr = board.slice() as any[];
            for (let i = 0; i < strArr.length; i++) {
                strArr[i] = strArr[i].join('')
            }
            result.push(strArr);
            return;
        };
        for (let j = 0; j < n; j++) {
            if (!board[row]) board[row] = new Array(n).fill('.');
            if (!isValid(row, j, board)) continue;
            board[row][j] = 'Q'
            recur(row + 1);
            board[row][j] = '.'
        }
    }
    recur(0);
    return result;
};

function isValid(row: number, col: number, board: string[][]) {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === 'Q' && (j === col || i + j === col + row || i - j === row - col)) {
                return false
            };
        }
    }
    return true;
}

// console.log(solveNQueens(4))


/**
 46. 全排列

 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 */


 function permute(nums: number[]): number[][] {
    const result: number[][] = [];

    const recur = (path: number[], set: Set<number>) => {
        if (path.length === nums.length) {
            result.push(path.slice());
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (set.has(nums[i])) continue;
            set.add(nums[i]);
            path.push(nums[i]);
            recur(path, set);
            path.pop();
            set.delete(nums[i])
        }
    }
    recur([], new Set())
    return result;
};

// console.log(permute([1,2,3]))


/**
 剑指 Offer 31. 栈的压入、弹出序列
 输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。
 */


function validateStackSequences(pushed: number[], popped: number[]): boolean {
    const stack = [];
    let j = 0;
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i]);
        while (stack.length && stack[stack.length - 1] === popped[j]) {
            stack.pop();
            j++;
        }
    }
    return stack.length === 0;
};

console.log(validateStackSequences([2, 1, 0], [1, 2, 0]))