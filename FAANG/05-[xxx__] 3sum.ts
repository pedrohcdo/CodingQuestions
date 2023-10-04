/**
    Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

    Notice that the solution set must not contain duplicate triplets.

    Example 1:

    Input: nums = [-1,0,1,2,-1,-4]
    Output: [[-1,-1,2],[-1,0,1]]
    Explanation: 
    nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
    nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
    nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
    The distinct triplets are [-1,0,1] and [-1,-1,2].
    Notice that the order of the output and the order of the triplets does not matter.
    Example 2:

    Input: nums = [0,1,1]
    Output: []
    Explanation: The only possible triplet does not sum up to 0.
    Example 3:

    Input: nums = [0,0,0]
    Output: [[0,0,0]]
    Explanation: The only possible triplet sums up to 0.
    

    Constraints:

    3 <= nums.length <= 3000
    -105 <= nums[i] <= 105

    ---
    https://leetcode.com/problems/3sum/
 */
function twoSumOf(array: number[], targetSum: number): number[][] {
    const seenNumbers = new Set<number>();
    const resultSet = new Set<string>();
    const resultPairs: number[][] = [];

    for (const num of array) {
        const complement = targetSum - num;

        if (seenNumbers.has(complement)) {
            const sortedPair = [num, complement].sort((a, b) => a - b);
            const pairKey = sortedPair.join(',');

            if (!resultSet.has(pairKey)) {
                resultPairs.push(sortedPair);
                resultSet.add(pairKey);
            }
        }

        seenNumbers.add(num);
    }

    return resultPairs;
}

function threeSum(nums: number[]): number[][] {
    const resultSet = new Set<string>();
    const resultPairs: number[][] = [];

    while (nums.length >= 3) {
        const [start, ...subArray] = nums
        for (let sum of twoSumOf(subArray, start * -1)) {
            const result = [start, ...sum]
            const sortedPair = result.sort((a, b) => a - b);
            const pairKey = sortedPair.join(',');

            if (!resultSet.has(pairKey)) {
                resultPairs.push(sortedPair);
                resultSet.add(pairKey);
            }
        }
        nums = subArray
    }

    return resultPairs;
};