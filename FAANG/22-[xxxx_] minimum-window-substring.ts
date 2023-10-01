/**
    Given two strings s and t of lengths m and n respectively, return the minimum window 
    substring
    of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

    The testcases will be generated such that the answer is unique.

    Example 1:

    Input: s = "ADOBECODEBANC", t = "ABC"
    Output: "BANC"
    Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
    Example 2:

    Input: s = "a", t = "a"
    Output: "a"
    Explanation: The entire string s is the minimum window.
    Example 3:

    Input: s = "a", t = "aa"
    Output: ""
    Explanation: Both 'a's from t must be included in the window.
    Since the largest window of s only has one 'a', return empty string.
    

    Constraints:

    m == s.length
    n == t.length
    1 <= m, n <= 105
    s and t consist of uppercase and lowercase English letters.
    

    Follow up: Could you find an algorithm that runs in O(m + n) time?

    ---
    https://leetcode.com/problems/minimum-window-substring/
 */

type freq = {
    [key: string]: number,
}

function fromStringToFreq(str: string): freq {
    const freq: freq = {}
    for (const key of str.split('').sort()) {
        freq[key] ||= 0
        freq[key]++
    }
    return freq
}

function fit(s: string, l: number, r: number, freqs: freq, freqt: freq) {
    while (true) {
        let lChar = s[l]
        let rChar = s[r]
        if (!freqt[rChar] || freqs[rChar] > freqt[rChar]) {
            r--
            freqs[rChar]--
        } else if (!freqt[lChar] || freqs[lChar] > freqt[lChar]) {
            l++
            freqs[lChar]--
        } else {
            break
        }
    }
    return [l, r]
}

function isValidFreqT(freqS: freq, freqT: freq) {
    for (let key in freqT) {
        if (freqS[key] < freqT[key]) return false
    }
    return true
}

// O(S + T)
function minWindow(s: string, t: string): string {
    const freqs = fromStringToFreq(s)
    const freqt = fromStringToFreq(t)

    // Validate count O(26)
    for (let k in freqt) if (!freqs[k] || freqs[k] < freqt[k]) return ""

    // Adjust first time O(S)
    let l = 0
    let r = s.length - 1
    let result = fit(s, l, r, freqs, freqt)
    l = result[0]
    r = result[1]

    let bestResult = [l, r]

    // Scroll window O(S)
    while (r < s.length - 1) {

        let lChar = s[l++]
        let rChar = s[++r]
        freqs[lChar]--
        freqs[rChar]++

        // Fit again
        if (isValidFreqT(freqs, freqt)) {
            result = fit(s, l, r, freqs, freqt)
            l = result[0]
            r = result[1]
            bestResult = [l, r]
        }
    }
    return s.substring(bestResult[0], bestResult[1] + 1)
};