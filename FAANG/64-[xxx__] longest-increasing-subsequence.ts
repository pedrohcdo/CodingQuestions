/**
    Given an integer array nums, return the length of the longest strictly increasing 
    subsequence
    .

    Example 1:

    Input: nums = [10,9,2,5,3,7,101,18]
    Output: 4
    Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
    Example 2:

    Input: nums = [0,1,0,3,2,3]
    Output: 4
    Example 3:

    Input: nums = [7,7,7,7,7,7,7]
    Output: 1
    

    Constraints:

    1 <= nums.length <= 2500
    -104 <= nums[i] <= 104
    

    Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?

    ---
    https://leetcode.com/problems/longest-increasing-subsequence/description/
 */

function findLowerBound(q: number[], num: number) {
    let l = 0;
    let r = q.length - 1;
    while (l < r) {
        let mid = Math.floor((l + r) / 2);
        if (q[mid] == num) return mid
        if (q[mid] < num) l = mid + 1;
        else r = mid;
    }
    return l
}

// O(N * LogN)
// With support suffix array and bs
function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0

    const q: number[] = []

    for (let elm of nums) {
        if (q.length === 0 || elm > q[q.length - 1]) q.push(elm)
        else q[findLowerBound(q, elm)] = elm
    }

    return q.length
};