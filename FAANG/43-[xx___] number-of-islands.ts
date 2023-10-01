/**
    Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

    An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

    Example 1:

    Input: grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
    ]
    Output: 1
    Example 2:

    Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
    ]
    Output: 3
    

    Constraints:

    m == grid.length
    n == grid[i].length
    1 <= m, n <= 300
    grid[i][j] is '0' or '1'.

    ---
    https://leetcode.com/problems/number-of-islands/
 */

function paint(grid: string[][], canvas: boolean[][], y: number, x: number) {
    let pointers: [number, number][] = [[y, x]]
    while (pointers.length > 0) {
        let [y, x] = pointers.pop()!

        canvas[y][x] = true
        if (grid[y][x + 1] === '1' && !canvas[y][x + 1]) pointers.push([y, x + 1])
        if (grid[y + 1]?.[x] === '1' && !canvas[y + 1][x]) pointers.push([y + 1, x])
        if (grid[y][x - 1] === '1' && !canvas[y][x - 1]) pointers.push([y, x - 1])
        if (grid[y - 1]?.[x] === '1' && !canvas[y - 1][x]) pointers.push([y - 1, x])
    }

}

function numIslands(grid: string[][]): number {
    let m = grid.length
    let n = grid[0].length


    let canvas: boolean[][] = new Array(m).fill(null).map(
        _ => new Array(n).fill(false)
    )

    let counter = 0

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1' && !canvas[r][c]) {
                paint(grid, canvas, r, c)
                counter++
            }
        }
    }

    return counter
};