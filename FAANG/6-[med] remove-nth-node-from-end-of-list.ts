import { ListNode } from "./utils/list-node"

/**
    Given the head of a linked list, remove the nth node from the end of the list and return its head.

    Example 1:

    Input: head = [1,2,3,4,5], n = 2
    Output: [1,2,3,5]
    Example 2:

    Input: head = [1], n = 1
    Output: []
    Example 3:

    Input: head = [1,2], n = 1
    Output: [1]

    ---
    https://leetcode.com/problems/remove-nth-node-from-end-of-list/
 */
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    if (!head) return null

    let traverse = head

    while (traverse.next) {
        (traverse.next as any).prev = traverse
        traverse = traverse.next
    }

    let prev = 1

    while (prev !== n) {
        traverse = (traverse as any).prev
        prev++
    }

    if (!traverse.next && !(traverse as any).prev) {
        return null
    } else if (!(traverse as any).prev) {
        return traverse.next
    } else if (!traverse.next) {
        (traverse as any).prev.next = null
    } else {
        (traverse as any).prev.next = traverse.next
    }

    return head
};
