/**
    Given an m x n matrix, return all elements of the matrix in spiral order.

    Example 1:


    Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
    Output: [1,2,3,6,9,8,7,4,5]
    Example 2:


    Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    Output: [1,2,3,4,8,12,11,10,9,5,6,7]
    

    Constraints:

    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 10
    -100 <= matrix[i][j] <= 100

    ---
    https://leetcode.com/problems/spiral-matrix/
 */

function spiralOrder(matrix: number[][]): number[] {
    let hitDir: { [key: number]: number } = {
        6: 2,
        2: 4,
        4: 8,
        8: 6
    }
    let moveMap: { [key: number]: number[] } = {
        6: [1, 0],
        2: [0, 1],
        4: [-1, 0],
        8: [0, -1]
    }

    let dir = 6
    let r = 0, c = 0

    let output: number[] = []

    function isValidMove() {
        return matrix[r + moveMap[dir][1]]?.[c + moveMap[dir][0]] !== undefined
    }

    while (true) {
        output.push(matrix[r][c]);
        (matrix as any)[r][c] = undefined;

        if (!isValidMove()) {
            dir = hitDir[dir]
            if (!isValidMove()) break
        }

        r += moveMap[dir][1]
        c += moveMap[dir][0]
    }

    return output
};