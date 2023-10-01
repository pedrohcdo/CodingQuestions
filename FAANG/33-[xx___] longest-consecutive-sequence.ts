/**
    Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

    You must write an algorithm that runs in O(n) time.

    Example 1:

    Input: nums = [100,4,200,1,3,2]
    Output: 4
    Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
    Example 2:

    Input: nums = [0,3,7,2,5,8,4,6,0,1]
    Output: 9
    

    Constraints:

    0 <= nums.length <= 105
    -109 <= nums[i] <= 109

    ---
    https://leetcode.com/problems/longest-consecutive-sequence/
 */


function longestConsecutive(nums: number[]): number {
    if (nums.length === 0) return 0

    nums.sort((a, b) => a - b)

    let seq = nums[1]
    let curr = 1
    let result = 1

    for (let elm of nums) {
        if (elm === seq + 1) curr++
        else if (elm !== seq) curr = 1
        seq = elm
        result = Math.max(result, curr)
    }

    return result

};