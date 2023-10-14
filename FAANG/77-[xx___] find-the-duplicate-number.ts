/**
    Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

    There is only one repeated number in nums, return this repeated number.

    You must solve the problem without modifying the array nums and uses only constant extra space.

    Example 1:

    Input: nums = [1,3,4,2,2]
    Output: 2
    Example 2:

    Input: nums = [3,1,3,4,2]
    Output: 3

    Constraints:

    1 <= n <= 105
    nums.length == n + 1
    1 <= nums[i] <= n
    All the integers in nums appear only once except for precisely one integer which appears two or more times.
    

    Follow up:

    How can we prove that at least one duplicate number must exist in nums?
    Can you solve the problem in linear runtime complexity?

    ---
    https://leetcode.com/problems/find-the-duplicate-number/description/
 */

// Greedy - Floyd's Tortoise and Hare
function findDuplicateFastest(nums: number[]): number {
    let tortoise = nums[nums[0]];
    let hare = nums[nums[nums[0]]];

    while (tortoise != hare) {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    }

    // Start again
    tortoise = nums[0];
    while (tortoise != hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }

    return hare;
};

// Greedy 
function findDuplicate(nums: number[]): number {
    let curr = nums[0]
    let visited = new Array(nums.length).fill(false)
    while (true) {
        if (visited[curr]) return curr
        visited[curr] = true
        curr = nums[curr]
    }
};