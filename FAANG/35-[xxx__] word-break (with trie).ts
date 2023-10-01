/**
    Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

    Note that the same word in the dictionary may be reused multiple times in the segmentation.

    Example 1:

    Input: s = "leetcode", wordDict = ["leet","code"]
    Output: true
    Explanation: Return true because "leetcode" can be segmented as "leet code".
    Example 2:

    Input: s = "applepenapple", wordDict = ["apple","pen"]
    Output: true
    Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
    Note that you are allowed to reuse a dictionary word.
    Example 3:

    Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
    Output: false
    

    Constraints:

    1 <= s.length <= 300
    1 <= wordDict.length <= 1000
    1 <= wordDict[i].length <= 20
    s and wordDict[i] consist of only lowercase English letters.
    All the strings of wordDict are unique.

    ---
    https://leetcode.com/problems/word-break/
 */


class PreffixNode {
    isWord: boolean = false
    identifier: number = 0
    next: {
        [key: string]: PreffixNode
    } = {}
}

let globalIdentifier = 1
function insertWord(node: PreffixNode, word: string) {
    if (word.length === 0) {
        node.isWord = true
        return
    }
    let curr = word[0]
    node.next[curr] ||= new PreffixNode()
    node.identifier = globalIdentifier++
    insertWord(node.next[curr], word.substring(1))
}

function test(text: string, index: number, root: PreffixNode, curr: PreffixNode, cache: { [key: string]: boolean }): boolean {
    let cacheJKey = `${index}-${curr.identifier}`
    if (cache[cacheJKey] !== undefined) return false

    if (index >= text.length) return false
    cache[cacheJKey] = false

    const nextNode = curr.next[text[index]]
    if (!nextNode) return false

    if (nextNode.isWord) {
        if (index == text.length - 1) return true
        cache[cacheJKey] ||= test(text, index + 1, root, root, cache)
    }

    cache[cacheJKey] ||= test(text, index + 1, root, nextNode, cache)

    return cache[cacheJKey]
}


function wordBreak(s: string, wordDict: string[]): boolean {

    let root = new PreffixNode()
    for (const word of wordDict) insertWord(root, word);

    return test(s, 0, root, root, {})
};