/**
	There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

	You are given a list of strings words from the alien language's dictionary. Now it is claimed that the strings in words are 
	sorted lexicographically
	by the rules of this new language.

	If this claim is incorrect, and the given arrangement of string in words cannot correspond to any order of letters, return "".

	Otherwise, return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there are multiple solutions, return any of them.

	Example 1:

	Input: words = ["wrt","wrf","er","ett","rftt"]
	Output: "wertf"
	Example 2:

	Input: words = ["z","x"]
	Output: "zx"
	Example 3:

	Input: words = ["z","x","z"]
	Output: ""
	Explanation: The order is invalid, so return "".
	

	Constraints:

	1 <= words.length <= 100
	1 <= words[i].length <= 100
	words[i] consists of only lowercase English letters.

	---
	https://leetcode.com/problems/alien-dictionary/description/
 */
function alienOrder(words: string[]): string {

	let adj: {
		[key: string]: string[]
	} = {}

	// Initialize hash by order
	for (const word of words) {
		for (const letter of word)
			adj[letter] ||= []
	}

	// Constructing the Directed Graph
	for (let i = 0; i < words.length - 1; i++) {
		let l1 = words[i].length
		let l2 = words[i + 1].length
		let minLen = Math.min(l1, l2)

		// Invalid pos
		let j = 0
		for (; j < Math.min(l1, l2); j++) {
			if (words[i][j] !== words[i + 1][j]) break
		}

		// Found a incorrect word
		if (j < minLen) {
			adj[words[i][j]] ||= []
			adj[words[i][j]].push(words[i + 1][j])
			// Word[i] is a preffix of Word[i+1]
		} else if (j < l1) {
			return ""
		} // else - does nothing, because it is the same string
	}

	// DFS topological sort
	const visited: { [key: string]: boolean } = {}
	const alphabet: string[] = []

	function dfs(w: string) {
		if (visited[w] !== undefined) return visited[w]
		visited[w] = true
		for (const nei of adj[w]) {
			if (dfs(nei)) return true
		}
		visited[w] = false
		alphabet.push(w)
		return false
	}

	for (const w in adj) {
		if (dfs(w)) return ""
	}

	return alphabet.reverse().join('')
};
