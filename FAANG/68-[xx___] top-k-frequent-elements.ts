/**
    Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

    Example 1:

    Input: nums = [1,1,1,2,2,3], k = 2
    Output: [1,2]
    Example 2:

    Input: nums = [1], k = 1
    Output: [1]
    

    Constraints:

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    k is in the range [1, the number of unique elements in the array].
    It is guaranteed that the answer is unique.
    

    Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

    ---
    https://leetcode.com/problems/top-k-frequent-elements/description/
 */

// O(nLogn)
function topKFrequent(nums: number[], k: number): number[] {
    nums.sort((a, b) => a - b)

    const freq: {
        value: number,
        count: number
    }[] = []

    let pivot = 0

    for (let i = 1; i <= nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            freq.push({
                value: nums[i - 1],
                count: i - pivot
            })
            pivot = i
        }
    }

    return freq.sort((a, b) => b.count - a.count).slice(0, k).map(v => v.value)
};