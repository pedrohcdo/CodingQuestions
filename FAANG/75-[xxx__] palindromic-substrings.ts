/**
    Given a string s, return the number of palindromic substrings in it.

    A string is a palindrome when it reads the same backward as forward.

    A substring is a contiguous sequence of characters within the string.

    Example 1:

    Input: s = "abc"
    Output: 3
    Explanation: Three palindromic strings: "a", "b", "c".
    Example 2:

    Input: s = "aaa"
    Output: 6
    Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
    

    Constraints:

    1 <= s.length <= 1000
    s consists of lowercase English letters.

    ---
    https://leetcode.com/problems/palindromic-substrings/description/
 */

// Greedy - Worst Case O(N²)
//          Best Case O(N)
function countSubstringsFastest(s: string): number {
    if (s.length === 0) return 0

    let result = 0

    function expandFrom(start: number, end: number) {
        while (start >= 0 && end < s.length && s[start--] === s[end++]) result++
    }

    for (let i = 0; i < s.length; i++) {
        expandFrom(i, i)
        expandFrom(i, i + 1)
    }

    return result
}

// DP O(N²)
function countSubstrings(s: string): number {
    if (s.length === 0) return 0

    let dp = new Array(s.length + 1).fill([]).map(
        _ => new Array(s.length + 1).fill(false)
    )


    let count = s.length

    for (let i = 0; i < s.length; i++)
        dp[0][i] = dp[1][i] = true

    for (let i = 2; i <= s.length; i++) {
        for (let m = 0; m <= s.length - i; m++) {

            //
            if (s[m] === s[m + i - 1] && dp[i - 2][m + 1]) {
                dp[i][m] = true
                count++
            }
        }
    }

    return count
}