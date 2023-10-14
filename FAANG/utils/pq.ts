// My implementation of a because to be used in the exercises
interface PQueueHeapComparator {

    (a: number, b: number): boolean
}

export const PQueueMaxHeap: PQueueHeapComparator = (a: number, b: number) => a > b
export const PQueueMinHeap: PQueueHeapComparator = (a: number, b: number) => a < b

export class PQueue {

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