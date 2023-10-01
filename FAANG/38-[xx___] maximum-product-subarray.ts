/**
    Given an integer array nums, find a 
    subarray
    that has the largest product, and return the product.

    The test cases are generated so that the answer will fit in a 32-bit integer.

    Example 1:

    Input: nums = [2,3,-2,4]
    Output: 6
    Explanation: [2,3] has the largest product 6.
    Example 2:

    Input: nums = [-2,0,-1]
    Output: 0
    Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
    

    Constraints:

    1 <= nums.length <= 2 * 104
    -10 <= nums[i] <= 10
    The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

    ---
    https://leetcode.com/problems/maximum-product-subarray/
 */



function maxProduct(nums: number[]): number {
    if (nums.length === 1) return nums[0]

    let lMult = 1
    let rMult = 1
    let result = Number.MIN_SAFE_INTEGER

    // I tried to use a different approach, but I could also do it with a variable 
    // that represents a minimum value and one that represents a maximum value and 
    // swap when it reaches a negative value.
    for (let i = 0; i < nums.length; i++) {
        let j = nums.length - i - 1

        if (!lMult) lMult = nums[i]
        else lMult *= nums[i]

        if (!rMult) rMult = nums[j]
        else rMult *= nums[j]

        result = Math.max(result, lMult, rMult)
    }

    return result
};