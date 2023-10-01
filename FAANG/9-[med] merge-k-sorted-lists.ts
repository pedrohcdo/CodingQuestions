/**
    You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

    Merge all the linked-lists into one sorted linked-list and return it.

    Example 1:

    Input: lists = [[1,4,5],[1,3,4],[2,6]]
    Output: [1,1,2,3,4,4,5,6]
    Explanation: The linked-lists are:
    [
    1->4->5,
    1->3->4,
    2->6
    ]
    merging them into one sorted list:
    1->1->2->3->4->4->5->6
    Example 2:

    Input: lists = []
    Output: []
    Example 3:

    Input: lists = [[]]
    Output: []
    

    Constraints:

    k == lists.length
    0 <= k <= 104
    0 <= lists[i].length <= 500
    -104 <= lists[i][j] <= 104
    lists[i] is sorted in ascending order.
    The sum of lists[i].length will not exceed 104.

    ---
    https://leetcode.com/problems/merge-k-sorted-lists/
 */

import { ListNode } from "./utils/list-node"

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    let root = new ListNode()
    let curr = root
    while (lists.some(v => !!v)) {
        let bestOption: number = lists.reduce((best: number, curr: ListNode | null, currIndex: number) => {
            if (best === -1 || !lists[best]) return currIndex
            if (!curr) return best
            if (curr.val <= lists[best]!.val) return currIndex
            return best
        }, -1)
        curr = curr.next = new ListNode(lists[bestOption]!.val)
        lists[bestOption] = lists[bestOption]!.next
    }

    return root.next
};