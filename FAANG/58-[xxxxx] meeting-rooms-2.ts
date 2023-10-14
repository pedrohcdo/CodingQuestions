/**
    Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

    Example 1:

    Input: intervals = [[0,30],[5,10],[15,20]]
    Output: 2
    Example 2:

    Input: intervals = [[7,10],[2,4]]
    Output: 1
    

    Constraints:

    1 <= intervals.length <= 104
    0 <= starti < endi <= 106

    ---
    https://leetcode.com/problems/meeting-rooms-ii/description/
 */

import { PQueue, PQueueMinHeap } from "./utils/pq";

// O(NlogN)
function minMeetingRooms(intervals: number[][]): number {
    if (intervals.length === 0) return 0;

    // O(NlogN)
    intervals.sort((a, b) => a[0] - b[0]);

    // O(NlogN)
    const pq = new PQueue(PQueueMinHeap)
    for (const interval of intervals) {
        pq.queue(interval[1])
        if (interval[0] >= pq.peek())
            pq.dequeue()
    }

    return pq.size()
};