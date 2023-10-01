/**
    There is an integer array nums sorted in ascending order (with distinct values).

    Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

    Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

    You must write an algorithm with O(log n) runtime complexity.

    Example 1:

    Input: nums = [4,5,6,7,0,1,2], target = 0
    Output: 4
    Example 2:

    Input: nums = [4,5,6,7,0,1,2], target = 3
    Output: -1
    Example 3:

    Input: nums = [1], target = 0
    Output: -1
    

    Constraints:

    1 <= nums.length <= 5000
    -104 <= nums[i] <= 104
    All values of nums are unique.
    nums is an ascending array that is possibly rotated.
    -104 <= target <= 104

    ---
    https://leetcode.com/problems/search-in-rotated-sorted-array/
 */

function search(nums: number[], target: number): number {
    //[....................x................../..]
    // ^                   ^


    let l = 0
    let r = nums.length

    while (r - l > 3) {
        let m = Math.floor((r + l) / 2)
        if (nums[m] === target) return m

        if (nums[m] >= nums[l]) {
            if (target >= nums[l] && target <= nums[m]) {
                r = m
            } else {
                l = m + 1
            }
        } else {
            if (target >= nums[m] && target <= nums[r]) {
                l = m
            } else {
                r = m - 1
            }
        }
    }

    return -1
};