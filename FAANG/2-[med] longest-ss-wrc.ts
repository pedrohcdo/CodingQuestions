/**
    Given a string s, find the length of the longest 
    substring
    without repeating characters.

    Example 1:

    Input: s = "abcabcbb"
    Output: 3
    Explanation: The answer is "abc", with the length of 3.
    Example 2:

    Input: s = "bbbbb"
    Output: 1
    Explanation: The answer is "b", with the length of 1.
    Example 3:

    Input: s = "pwwkew"
    Output: 3
    Explanation: The answer is "wke", with the length of 3.
    Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
    

    Constraints:

    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.

    ---
    https://leetcode.com/problems/longest-substring-without-repeating-characters/
 */
function lengthOfLongestSubstring(s: string): number {
    if (s.length === 0) return 0

    let freq = []
    freq[s[0]] = 1

    let left = 0
    let longest = 1


    for (let i = 1; i < s.length; i++) {
        // Fix left
        while (freq[s[i]] !== undefined)
            freq[s[left++]] = undefined

        freq[s[i]] = true
        longest = Math.max(longest, (i - left) + 1)
    }

    return longest
};