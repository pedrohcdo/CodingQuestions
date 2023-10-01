/**
    *********** ************ ************ ************ ************ ************* *************
    **** The leet code is dificulty is medium, but it can be considered a difficult problem****
    *********** ************ ************ ************ ************ ************* *************

    Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

    Example 1:

    Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
    Output: [3,9,20,null,null,15,7]
    Example 2:

    Input: preorder = [-1], inorder = [-1]
    Output: [-1]
    

    Constraints:

    1 <= preorder.length <= 3000
    inorder.length == preorder.length
    -3000 <= preorder[i], inorder[i] <= 3000
    preorder and inorder consist of unique values.
    Each value of inorder also appears in preorder.
    preorder is guaranteed to be the preorder traversal of the tree.
    inorder is guaranteed to be the inorder traversal of the tree.

    ---
    https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 */

import { TreeNode } from "./utils/tree-node"

function makeTree(preorder: number[], order: number[]) {
    if (order.length === 0) return null
    let min: { value: number, index: number } | null = null
    for (let i = 0; i < order.length; i++) {
        if (!min || order[i] < min.value) min = { value: order[i], index: i }
    }
    // This is not expected to happen
    if (!min) return null
    return new TreeNode(
        preorder[min.value],
        makeTree(preorder, order.slice(0, min.index)),
        makeTree(preorder, order.slice(min.index + 1, order.length))
    )
}

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null
    else if (preorder.length === 1) return new TreeNode(preorder[0])

    let order = new Array(preorder.length).fill(0)

    for (let i = 0; i < preorder.length; i++) {
        order[inorder.indexOf(preorder[i])] = i
    }

    return makeTree(preorder, order)
};