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

class PQueue {

    private heap: number[] = []

    // O(logN)
    queue(elem: number) {
        this.heap.push(elem)
        this.heapifyUP()
    }

    // O(1)
    peek() {
        return this.heap[0]
    }

    // O(logN)
    dequeue() {
        if (this.heap.length <= 1) return this.heap.pop()
        let elm = this.heap[0]
        this.heap[0] = this.heap.pop()!
        this.heapifyDown()
        return elm
    }

    size() {
        return this.heap.length
    }

    private heapifyUP() {
        let curr = this.heap.length - 1
        while (curr > 0) {
            let parent = Math.floor((curr - 1) / 2.0)
            if (this.heap[parent] <= this.heap[curr]) break

            this.heap[parent] ^= this.heap[curr]
            this.heap[curr] ^= this.heap[parent]
            this.heap[parent] ^= this.heap[curr]

            curr = parent
        }
    }

    private heapifyDown() {
        let curr = 0
        while (true) {
            let left = curr * 2 + 1
            let right = curr * 2 + 2

            if (left >= this.heap.length) break

            let choice = left
            if (right < this.heap.length && this.heap[right] < this.heap[left])
                choice = right

            if (this.heap[choice] > this.heap[curr]) break

            this.heap[choice] ^= this.heap[curr]
            this.heap[curr] ^= this.heap[choice]
            this.heap[choice] ^= this.heap[curr]

            curr = choice
        }
    }
}

// O(NlogN)
function minMeetingRooms(intervals: number[][]): number {
    if (intervals.length === 0) return 0;

    // O(NlogN)
    intervals.sort((a, b) => a[0] - b[0]);

    // O(NlogN)
    const pq = new PQueue()
    for (const interval of intervals) {
        pq.queue(interval[1])
        if (interval[0] >= pq.peek())
            pq.dequeue()
    }

    return pq.size()
};