
/**
    You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

    Return the length of the longest substring containing the same letter you can get after performing the above operations.

    Example 1:

    Input: s = "ABAB", k = 2
    Output: 4
    Explanation: Replace the two 'A's with two 'B's or vice versa.
    Example 2:

    Input: s = "AABABBA", k = 1
    Output: 4
    Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
    The substring "BBBB" has the longest repeating letters, which is 4.
    There may exists other ways to achive this answer too.
    

    Constraints:

    1 <= s.length <= 105
    s consists of only uppercase English letters.
    0 <= k <= s.length

    ---
    https://leetcode.com/problems/longest-repeating-character-replacement/description/
 */

// With support freq - O(N)
function characterReplacementSlidingWindow(s: string, k: number): number {


    let freq: {
        [key: string]: number
    } = {}

    const letters = s.split('')

    let longestFreq = 0
    let pivot = 0
    let max = 0


    for (let i = 0; i < letters.length; i++) {
        let curr = letters[i]
        //
        freq[curr] ||= 0
        freq[curr]++

        //
        longestFreq = Math.max(longestFreq, freq[curr])

        if ((i - pivot + 1) - longestFreq > k) {
            freq[letters[pivot]]--
            pivot++
        }

        max = Math.max(max, i - pivot + 1)
    }

    return max
};


// With suporting queue - O(N*chrs(s))
function characterReplacementWith(s: string, k: number, w: string) {
    let q: number[] = [-1]
    let max = 1
    for (let i = 0; i < s.length; i++) {
        if (s[i] !== w) {
            q.push(i)
            if (q.length > k + 1) q.shift()
        }
        max = Math.max(max, i - q[0])
    }
    return max
}

function characterReplacementSlowly(s: string, k: number): number {
    let max = 0
    let chars = new Set(s)
    for (const c of chars) {
        max = Math.max(max, characterReplacementWith(s, k, c))
    }
    return max
};