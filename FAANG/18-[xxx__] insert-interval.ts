/**
    You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

    Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

    Return intervals after the insertion.

    Example 1:

    Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
    Output: [[1,5],[6,9]]
    Example 2:

    Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
    Output: [[1,2],[3,10],[12,16]]
    Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
    

    Constraints:

    0 <= intervals.length <= 104
    intervals[i].length == 2
    0 <= starti <= endi <= 105
    intervals is sorted by starti in ascending order.
    newInterval.length == 2
    0 <= start <= end <= 105

    ---
    https://leetcode.com/problems/insert-interval/
 */

function findNearestLowerBoundIndex(intervals: number[][], target: number): number {
    let l = 0, r = intervals.length - 1;

    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        if (intervals[m][0] === target) return m;
        else if (intervals[m][0] < target) l = m + 1;
        else r = m - 1;
    }
    return l;
}

function joinInterval(left: number[], right: number[]): number[] {
    return [Math.min(left[0], right[0]), Math.max(left[1], right[1])];
}
function insert(intervals: number[][], newInterval: number[]): number[][] {
    let startIndex = findNearestLowerBoundIndex(intervals, newInterval[0]);
    let endIndex = findNearestLowerBoundIndex(intervals, newInterval[1]);

    // Verifica e ajusta o startIndex
    if (startIndex > 0 && intervals[startIndex - 1][1] >= newInterval[0]) {
        startIndex--;
    }

    // Expande o intervalo até cobrir todos os intervalos interseccionados
    while (endIndex < intervals.length && intervals[endIndex][0] <= newInterval[1]) {
        newInterval = joinInterval(newInterval, intervals[endIndex]);
        endIndex++;
    }

    return [...intervals.slice(0, startIndex), newInterval, ...intervals.slice(endIndex)];
}