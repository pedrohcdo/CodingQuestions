/**
    You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

    You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

    Example 1:


    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    Output: [[7,4,1],[8,5,2],[9,6,3]]
    Example 2:


    Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
    Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
    

    Constraints:

    n == matrix.length == matrix[i].length
    1 <= n <= 20
    -1000 <= matrix[i][j] <= 1000

    ---
    https://leetcode.com/problems/rotate-image/
 */

/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    let n = matrix.length

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            matrix[r][c] += 1000
        }
    }

    for (let r = 0; r < n; r++) {
        for (let rm = 0; rm < n; rm++) {
            matrix[rm][n - r - 1] += (matrix[r][rm] % 2000) * 2000
        }
    }

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            matrix[r][c] = Math.floor(matrix[r][c] / 2000) - 1000
        }
    }
}