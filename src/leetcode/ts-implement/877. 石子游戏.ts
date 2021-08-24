/*
亚历克斯和李用几堆石子在做游戏。偶数堆石子排成一行，每堆都有正整数颗石子 piles[i] 。

游戏以谁手中的石子最多来决出胜负。石子的总数是奇数，所以没有平局。

亚历克斯和李轮流进行，亚历克斯先开始。 每回合，玩家从行的开始或结束处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中石子最多的玩家获胜。

假设亚历克斯和李都发挥出最佳水平，当亚历克斯赢得比赛时返回 true ，当李赢得比赛时返回 false 。

 

示例：

输入：[5,3,4,5]
输出：true
解释：
亚历克斯先开始，只能拿前 5 颗或后 5 颗石子 。
假设他取了前 5 颗，这一行就变成了 [3,4,5] 。
如果李拿走前 3 颗，那么剩下的是 [4,5]，亚历克斯拿走后 5 颗赢得 10 分。
如果李拿走后 5 颗，那么剩下的是 [3,4]，亚历克斯拿走后 4 颗赢得 9 分。
这表明，取前 5 颗石子对亚历克斯来说是一个胜利的举动，所以我们返回 true 。
*/

class Pair {
    fir: number;
    sec: number;
    constructor(data: Pair) {
        this.fir = data.fir;
        this.sec = data.sec;
    }
}

function stoneGame(piles: number[]): boolean {
    const dp: Pair[][] = [];
    for (let i = 0; i < piles.length; i++) {
        for (let j = i; j < piles.length; j++) {
            if (!dp[i]) dp[i] = [];
            dp[i][j] = new Pair({
                fir: 0,
                sec: 0
            });
        }
    }
    for (let i = 0; i < piles.length; i++) {
        dp[i][i].fir = piles[i];
        dp[i][i].sec = 0;
    }

    for (let l = 1; l < piles.length; l++) {
        for (let i = 0; i < piles.length - l; i++) {
            const j = l + i;
            const left = piles[i] + dp[i + 1][j].sec;
            const right = piles[j] + dp[i][j - 1].sec;
            if (left > right) {
                dp[i][j].fir = left;
                dp[i][j].sec = dp[i + 1][j].fir;
            } else {
                dp[i][j].fir = right;
                dp[i][j].sec = dp[i][j - 1].fir;
            }
        }
    }
    const finalPair = dp[0][piles.length - 1];
    return finalPair.fir - finalPair.sec > 0;
};

console.log(stoneGame([5,3,4,5]))