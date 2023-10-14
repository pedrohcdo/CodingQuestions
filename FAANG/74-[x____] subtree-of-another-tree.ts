/**
    Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

    A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.

    Example 1:


    Input: root = [3,4,5,1,2], subRoot = [4,1,2]
    Output: true
    Example 2:


    Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
    Output: false
    

    Constraints:

    The number of nodes in the root tree is in the range [1, 2000].
    The number of nodes in the subRoot tree is in the range [1, 1000].
    -104 <= root.val <= 104
    -104 <= subRoot.val <= 104

    ---
    https://leetcode.com/problems/subtree-of-another-tree/description/
 */

import { TreeNode } from "./utils/tree-node"

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {

    function serialize(currRoot: TreeNode | null): string {
        if (!currRoot) return "$"
        return "." + currRoot.val + serialize(currRoot.left) + serialize(currRoot.right)
    }

    // includes(..) is O(N) -> (KMP, Z Alg, or similar..)
    return serialize(root).includes(serialize(subRoot))
};