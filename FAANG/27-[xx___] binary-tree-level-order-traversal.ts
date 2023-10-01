/**
    Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

    Example 1:


    Input: root = [3,9,20,null,null,15,7]
    Output: [[3],[9,20],[15,7]]
    Example 2:

    Input: root = [1]
    Output: [[1]]
    Example 3:

    Input: root = []
    Output: []
    
    Constraints:

    The number of nodes in the tree is in the range [0, 2000].
    -1000 <= Node.val <= 1000

    ---
    https://leetcode.com/problems/binary-tree-level-order-traversal/
 */

import { TreeNode } from "./utils/tree-node"

function levelOrder(root: TreeNode | null): number[][] {
    let values: number[][] = []
    let level: TreeNode[] = [root!]

    while (level.length > 0) {
        let newLevel: TreeNode[] = []
        let levelValues: number[] = []

        for (let node of level) {
            if (!node) continue
            levelValues.push(node.val)
            newLevel.push(node.left!)
            newLevel.push(node.right!)
        }

        if (levelValues.length > 0)
            values.push(levelValues)
        level = newLevel
    }

    return values
};