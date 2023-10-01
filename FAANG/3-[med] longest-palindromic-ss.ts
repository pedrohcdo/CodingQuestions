/**
  Given a string s, return the longest 
  palindromic
  
  substring
  in s.

  Example 1:

  Input: s = "babad"
  Output: "bab"
  Explanation: "aba" is also a valid answer.
  Example 2:

  Input: s = "cbbd"
  Output: "bb"
  

  Constraints:

  1 <= s.length <= 1000
  s consist of only digits and English letters.

  ---
  https://leetcode.com/problems/longest-palindromic-substring/
 */
function longestPalindrome(s: string): string {
  if (s.length === 0) return ""

  let dp = new Array(s.length + 1).fill([]).map(
    _ => new Array(s.length + 1).fill(-1)
  )

  let longest = 1
  let ai = 0
  let aj = 1

  for (let i = 0; i < s.length; i++) {
    dp[0][i] = 0
    dp[1][i] = 1
  }


  for (let i = 2; i <= s.length; i++) {
    for (let m = 0; m <= s.length - i; m++) {

      //
      if (s[m] === s[m + i - 1] && dp[i - 2][m + 1] >= 0)
        dp[i][m] = 2 + dp[i - 2][m + 1]

      //
      if (dp[i][m] > longest) {
        ai = m
        aj = m + i
        longest = dp[i][m]
      }
    }
  }

  return s.substring(ai, aj)
};