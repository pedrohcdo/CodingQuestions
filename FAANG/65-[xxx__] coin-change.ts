
/**
    You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

    Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

    You may assume that you have an infinite number of each kind of coin.

    Example 1:

    Input: coins = [1,2,5], amount = 11
    Output: 3
    Explanation: 11 = 5 + 5 + 1
    Example 2:

    Input: coins = [2], amount = 3
    Output: -1
    Example 3:

    Input: coins = [1], amount = 0
    Output: 0
    

    Constraints:

    1 <= coins.length <= 12
    1 <= coins[i] <= 231 - 1
    0 <= amount <= 104

    ---
    https://leetcode.com/problems/coin-change/description/
 */

// Bottom up - with restrict amount strategy
// Runtime: O(a * C) 
// Memory: O(a)
// (Dynamic Programming (DP) can often be more efficient than straightforward recursion, 
//  especially in terms of memory usage, due to the avoidance of deep recursive call stacks. 
//  However, recursion itself doesn't always use more memory; it depends on the depth of the 
//  recursive calls. In some cases, tail recursion can be as efficient as iterative solutions, 
//  especially in languages that optimize for tail recursion.) :D
function coinChangeFastest(coins: number[], amount: number): number {
    let dp: number[] = new Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) dp[i] = Math.min(dp[i], 1 + dp[i - coin])
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};


// Top down - with restrict amount strategy
// Runtime: O(a * C) 
// Memory: O(a)
function coinChangeAcceptable(coins: number[], amount: number): number {

    let cache: (number | null)[] = new Array(10000 + 1).fill(null)

    function dfs(amount: number): number {
        if (amount < 0) return Infinity
        else if (amount === 0) return 0
        if (cache[amount] !== null) return cache[amount]!

        let minCount = Infinity

        for (const coin of coins) {
            minCount = Math.min(minCount, 1 + dfs(amount - coin))
        }

        return cache[amount] = minCount
    }

    const count = dfs(amount)
    if (count === Infinity) return -1

    return count
};

// Top down - with restrict coins strategy
// Runtime: O(a * C)
// Memory: O(a * C)
function coinChangeSlowly(coins: number[], amount: number): number {

    let cache: any = {}
    function dfs(i: number, amount: number): number {
        if (i === coins.length) return !amount ? 0 : -1
        if (cache[amount]?.[i]) return cache[amount]?.[i]
        const max = Math.floor(amount / coins[i])
        let result: number = -1
        for (let j = 0; j <= max; j++) {
            let currResult = dfs(i + 1, amount - j * coins[i])
            if (currResult > -1 && (result === -1 || currResult + j < result)) {
                result = currResult + j
            }
        }
        cache[amount] ||= {}
        cache[amount][i] = result
        return result
    }

    return dfs(0, amount)
};