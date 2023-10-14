/**
    Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

    Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.

    The encoded string should be as compact as possible.

    Example 1:

    Input: root = [2,1,3]
    Output: [2,1,3]
    Example 2:

    Input: root = []
    Output: []
    

    Constraints:

    The number of nodes in the tree is in the range [0, 104].
    0 <= Node.val <= 104
    The input tree is guaranteed to be a binary search tree.

    ---
    https://leetcode.com/problems/serialize-and-deserialize-bst/description/
 */

import { TreeNode } from "./utils/tree-node"
import _ from 'lodash'

/*
* Encodes a tree to a single string.
*/
function serialize(root: TreeNode | null): string {
    const dheap: [number, number][] = []

    function traverse(curr: TreeNode | null, heapPos: number = 0) {
        if (!curr) return
        dheap.push([heapPos, curr.val])
        traverse(curr.left, heapPos * 2 + 1)
        traverse(curr.right, heapPos * 2 + 2)
    }

    traverse(root)

    return JSON.stringify(dheap)
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    if (data.length === 2) return null

    const mheap = {}
    for (const hv of JSON.parse(data)) {
        mheap[hv[0]] = hv[1]
    }

    function buildByHeap(heapPos = 0) {
        if (_.isNil(mheap[heapPos])) return null
        const node = new TreeNode(mheap[heapPos])
        node.left = buildByHeap(heapPos * 2 + 1)
        node.right = buildByHeap(heapPos * 2 + 2)
        return node
    }

    return buildByHeap()
};
