/**
    The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

    For example, for arr = [2,3,4], the median is 3.
    For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
    Implement the MedianFinder class:

    MedianFinder() initializes the MedianFinder object.
    void addNum(int num) adds the integer num from the data stream to the data structure.
    double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.
    
    Example 1:

    Input
    ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
    [[], [1], [2], [], [3], []]
    Output
    [null, null, null, 1.5, null, 2.0]

    Explanation
    MedianFinder medianFinder = new MedianFinder();
    medianFinder.addNum(1);    // arr = [1]
    medianFinder.addNum(2);    // arr = [1, 2]
    medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
    medianFinder.addNum(3);    // arr[1, 2, 3]
    medianFinder.findMedian(); // return 2.0
    

    Constraints:

    -105 <= num <= 105
    There will be at least one element in the data structure before calling findMedian.
    At most 5 * 104 calls will be made to addNum and findMedian.
    

    Follow up:

    If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
    If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?

    ---
    https://leetcode.com/problems/find-median-from-data-stream/description/
 */

interface PQueueHeapComparator {

    (a: number, b: number): boolean
}

const PQueueMaxHeap: PQueueHeapComparator = (a: number, b: number) => a > b
const PQueueMinHeap: PQueueHeapComparator = (a: number, b: number) => a < b

class PQueue2 {

    private heap: number[] = []

    constructor(private comparator: PQueueHeapComparator) { }

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
            if (this.comparator(this.heap[parent], this.heap[curr])) break

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
            if (right < this.heap.length && this.comparator(this.heap[right], this.heap[left]))
                choice = right

            if (!this.comparator(this.heap[choice], this.heap[curr])) break

            this.heap[choice] ^= this.heap[curr]
            this.heap[curr] ^= this.heap[choice]
            this.heap[choice] ^= this.heap[curr]

            curr = choice
        }
    }
}

//
class MedianFinder {

    maxHeap: PQueue2 = new PQueue2(PQueueMaxHeap)
    minHeap: PQueue2 = new PQueue2(PQueueMinHeap)

    constructor() {

    }

    // O(logN)
    addNum(num: number): void {
        if (this.maxHeap.size() === 0 || this.maxHeap.size() === this.minHeap.size()) {
            this.maxHeap.queue(num)
        } else {
            this.minHeap.queue(num)
        }
        if (this.maxHeap.peek() > this.minHeap.peek()) {
            let maxElm = this.maxHeap.dequeue()
            let minElm = this.minHeap.dequeue()
            this.maxHeap.queue(minElm!)
            this.minHeap.queue(maxElm!)
        }
    }

    // O(1)
    findMedian(): number {
        if ((this.maxHeap.size() + this.minHeap.size()) % 2 === 0)
            return (this.maxHeap.peek() + this.minHeap.peek()) / 2
        return this.maxHeap.peek()
    }
}
