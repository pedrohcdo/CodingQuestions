import { ListNode } from "./utils/list-node"

/**
    You are given the heads of two sorted linked lists list1 and list2.

    Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

    Return the head of the merged linked list.

    

    Example 1:


    Input: list1 = [1,2,4], list2 = [1,3,4]
    Output: [1,1,2,3,4,4]
    Example 2:

    Input: list1 = [], list2 = []
    Output: []
    Example 3:

    Input: list1 = [], list2 = [0]
    Output: [0]
    

    Constraints:

    The number of nodes in both lists is in the range [0, 50].
    -100 <= Node.val <= 100
    Both list1 and list2 are sorted in non-decreasing order.

    ---
    https://leetcode.com/problems/merge-two-sorted-lists/
 */

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (!list1) return list2
    else if (!list2) return list1

    let node: ListNode | null = null
    let head: ListNode | null = null
    function insertNode(iN: ListNode) {
        if (!node) {
            node = head = new ListNode(iN.val, null)
            return
        }
        node = node.next = new ListNode(iN.val, null)

    }

    while (list1 || list2) {
        if (!list1) {
            insertNode(list2!)
            list2 = list2!.next
        } else if (!list2) {
            insertNode(list1)
            list1 = list1.next
        } else if (list1.val <= list2.val) {
            insertNode(list1)
            list1 = list1.next
        } else {
            insertNode(list2)
            list2 = list2.next
        }
    }

    return head
};