/**
    Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

    You must do it in place.

    Example 1:


    Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
    Output: [[1,0,1],[0,0,0],[1,0,1]]
    Example 2:


    Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    

    Constraints:

    m == matrix.length
    n == matrix[0].length
    1 <= m, n <= 200
    -231 <= matrix[i][j] <= 231 - 1
    

    Follow up:

    A straightforward solution using O(mn) space is probably a bad idea.
    A simple improvement uses O(m + n) space, but still not the best solution.
    Could you devise a constant space solution?

    ---
    https://leetcode.com/problems/set-matrix-zeroes/
 */

function setZeroes(matrix: number[][]): void {
    let fr = false, fc = false;

    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
            if (!matrix[r][c]) {
                if (r == 0) fr = true
                if (c == 0) fc = true

                matrix[0][c] = 0
                matrix[r][0] = 0
            }
        }
    }

    for (let r = 1; r < matrix.length; r++) {
        for (let c = 1; c < matrix[0].length; c++) {
            if (!matrix[r][0] || !matrix[0][c]) {
                matrix[r][c] = 0
            }
        }
    }

    if (fr) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[0][j] = 0;
        }
    }
    if (fc) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0;
        }
    }
};