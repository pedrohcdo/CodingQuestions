/**
    Design a data structure that supports adding new words and finding if a string matches any previously added string.

    Implement the WordDictionary class:

    WordDictionary() Initializes the object.
    void addWord(word) Adds word to the data structure, it can be matched later.
    bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
    
    Example:

    Input
    ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
    [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
    Output
    [null,null,null,null,false,true,true,true]

    Explanation
    WordDictionary wordDictionary = new WordDictionary();
    wordDictionary.addWord("bad");
    wordDictionary.addWord("dad");
    wordDictionary.addWord("mad");
    wordDictionary.search("pad"); // return False
    wordDictionary.search("bad"); // return True
    wordDictionary.search(".ad"); // return True
    wordDictionary.search("b.."); // return True
    

    Constraints:

    1 <= word.length <= 25
    word in addWord consists of lowercase English letters.
    word in search consist of '.' or lowercase English letters.
    There will be at most 2 dots in word for search queries.
    At most 104 calls will be made to addWord and search.
 */
class Trie {

    isAWord: boolean = false
    next: {
        [key: string]: Trie
    } = {}
}

class WordDictionary {

    constructor(public root: Trie = new Trie()) { }

    addWord(word: string): void {
        let node = this.root
        for (let w of word.split('')) {
            node.next[w] ||= new Trie()
            node = node.next[w]
        }
        node.isAWord = true
    }

    search(word: string, curr: Trie = this.root): boolean {
        if (!word?.length) return curr?.isAWord

        let currLetter: string = word[0]
        let subWord = word.substring(1)

        if (currLetter === '.') {
            for (let next of Object.values(curr.next)) {
                if (this.search(subWord, next)) return true
            }
        } else if (curr.next[currLetter])
            return this.search(subWord, curr.next[currLetter])

        return false
    }
}