/**
    You are building a string s of length n one character at a time, prepending each new character to the front of the string. The strings are labeled from 1 to n, where the string with length i is labeled si.

    For example, for s = "abaca", s1 == "a", s2 == "ca", s3 == "aca", etc.
    The score of si is the length of the longest common prefix between si and sn (Note that s == sn).

    Given the final string s, return the sum of the score of every si.

    Example 1:

    Input: s = "babab"
    Output: 9
    Explanation:
    For s1 == "b", the longest common prefix is "b" which has a score of 1.
    For s2 == "ab", there is no common prefix so the score is 0.
    For s3 == "bab", the longest common prefix is "bab" which has a score of 3.
    For s4 == "abab", there is no common prefix so the score is 0.
    For s5 == "babab", the longest common prefix is "babab" which has a score of 5.
    The sum of the scores is 1 + 0 + 3 + 0 + 5 = 9, so we return 9.
    Example 2:

    Input: s = "azbazbzaz"
    Output: 14
    Explanation: 
    For s2 == "az", the longest common prefix is "az" which has a score of 2.
    For s6 == "azbzaz", the longest common prefix is "azb" which has a score of 3.
    For s9 == "azbazbzaz", the longest common prefix is "azbazbzaz" which has a score of 9.
    For all other si, the score is 0.
    The sum of the scores is 2 + 3 + 9 = 14, so we return 14.
    

    Constraints:

    1 <= s.length <= 105
    s consists of lowercase English letters.

    ---
    https://leetcode.com/problems/sum-of-scores-of-built-strings/description/
 */

// O(N) 
function sumScores(s: string): number {
    let zArray = new Array(s.length).fill(0)

    let l = 0
    let r = 0

    for (let k = 1; k < s.length; k++) {
        if (zArray[k - l] <= r - k) {
            zArray[k] = zArray[k - l]
            continue
        }
        //
        r = Math.max(k, r)
        l = k
        while (r < s.length && s[r] === s[r - l]) r++
        zArray[k] = r-- - l
    }

    return zArray.reduce((sum, curr) => sum + curr, 0) + s.length
};
