/**
    Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

    Example 1:

    Input: intervals = [[0,30],[5,10],[15,20]]
    Output: false
    Example 2:

    Input: intervals = [[7,10],[2,4]]
    Output: true
    

    Constraints:

    0 <= intervals.length <= 104
    intervals[i].length == 2
    0 <= starti < endi <= 106

    ---
    https://leetcode.com/problems/meeting-rooms/
 */

function canAttendMeetings(intervals: number[][]): boolean {
    intervals.sort((a, b) => a[0] - b[0])
    let curr = intervals[0]
    for (let i = 1; i < intervals.length; i++) {
        let next = intervals[i]
        if (next[0] < curr[1]) return false
        curr = next
    }
    return true
};


