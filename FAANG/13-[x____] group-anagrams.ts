/**
    49. Group Anagrams
    Medium
    17.3K
    508
    Companies
    Given an array of strings strs, group the anagrams together. You can return the answer in any order.

    An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

    Example 1:

    Input: strs = ["eat","tea","tan","ate","nat","bat"]
    Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
    Example 2:

    Input: strs = [""]
    Output: [[""]]
    Example 3:

    Input: strs = ["a"]
    Output: [["a"]]
    

    Constraints:

    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.

    ---
    https://leetcode.com/problems/group-anagrams/
 */

function groupAnagrams(strs: string[]): string[][] {
    let anagrams: {
        [key: string]: string[]
    } = {}

    for (let word of strs) {
        const sortedKey = word.split('').sort().join('')
        anagrams[sortedKey] ||= []
        anagrams[sortedKey].push(word)
    }

    return Object.values(anagrams)
};