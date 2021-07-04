
/**
 *
322. 零钱兑换
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

你可以认为每种硬币的数量是无限的。
 */
// 递归
function coinChange1(coins: number[], amount: number): number {
    if (amount === 0 ) return 0;
    const map: Record<string, number> = {};
    const dp = (am: number) => {
        if (map[am]) return map[am];
        if (am === 0) return 0;
        if (am < 0) return -1;
        let res = Infinity
        for (let i = 0; i < coins.length; i++) {
            const subResult = dp(am - coins[i]) ;
            if (subResult === -1) continue
            res = Math.min(res, subResult + 1)
        }
        map[am] = res === Infinity ? -1 : res;
        return map[am];
    }
    return dp(amount);
};

// 迭代
function coinChange(coins: number[], amount: number): number {
    if (amount === 0 ) return 0;
    const memo = new Array(amount + 1).fill(amount + 1);
    memo[0] = 0;
    for (let i = 0; i < memo.length; i++) {
        for (const coin of coins) {
            if (i - coin < 0) continue;
            memo[i] = Math.min(memo[i], memo[i - coin] + 1);
        }
    }
    return memo[amount] !== amount + 1 ? memo[amount] : -1;
};

// console.log(coinChange([1,2,5], 11))


/**
72. 编辑距离

给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

插入一个字符
删除一个字符
替换一个字符
*/
function minDistance(word1: string, word2: string): number {
    const dp = new Array();
    if (!dp[0]) dp[0] = [];
    for (let i = 1; i <= word1.length; i++) {
        if (!dp[i]) dp[i] = [];
        dp[i][0] = i;
    }
    for (let j = 1; j <= word2.length; j++) {
        dp[0][j] = j;
    }
    dp[0][0] = 0;

    for (let i = 1; i <= word1.length; i++) {
        for (let j = 1; j <= word2.length; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + 1
                )
            }
        }
    }
    return dp[word1.length][word2.length];
};

console.log(minDistance("horse", "ros"))