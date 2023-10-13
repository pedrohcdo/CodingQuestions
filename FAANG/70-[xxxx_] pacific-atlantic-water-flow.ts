/**
    There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

    The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

    The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

    Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

    Example 1:


    Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
    Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
    Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
    [0,4]: [0,4] -> Pacific Ocean 
        [0,4] -> Atlantic Ocean
    [1,3]: [1,3] -> [0,3] -> Pacific Ocean 
        [1,3] -> [1,4] -> Atlantic Ocean
    [1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
        [1,4] -> Atlantic Ocean
    [2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
        [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
    [3,0]: [3,0] -> Pacific Ocean 
        [3,0] -> [4,0] -> Atlantic Ocean
    [3,1]: [3,1] -> [3,0] -> Pacific Ocean 
        [3,1] -> [4,1] -> Atlantic Ocean
    [4,0]: [4,0] -> Pacific Ocean 
        [4,0] -> Atlantic Ocean
    Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
    Example 2:

    Input: heights = [[1]]
    Output: [[0,0]]
    Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
    

    Constraints:

    m == heights.length
    n == heights[r].length
    1 <= m, n <= 200
    0 <= heights[r][c] <= 105

    ---
    https://leetcode.com/problems/pacific-atlantic-water-flow/description/
 */

type pType = ('n' | 'p' | 'a' | 'pa')
function mixColor(c1: pType, c2: pType): pType {
    let mixed = c1 + c2
    if (mixed.includes('p') && mixed.includes('a')) return 'pa'
    else if (mixed.includes('p')) return 'p'
    else if (mixed.includes('a')) return 'a'
    return 'n'
}

function pacificAtlantic(heights: number[][]): number[][] {

    let m = heights.length
    let n = heights[0].length

    const canva: pType[][] = new Array(m)
        .fill(null)
        .map(v => new Array(n).fill('n'))


    function draw(r: number, c: number, p: pType, lh: number = Number.MIN_SAFE_INTEGER) {
        if (r < 0 || c < 0 || r >= m || c >= n || lh > heights[r][c] || canva[r][c].includes(p)) return
        canva[r][c] = mixColor(canva[r][c], p)
        //
        let h = heights[r][c]
        draw(r - 1, c, p, h)
        draw(r + 1, c, p, h)
        draw(r, c - 1, p, h)
        draw(r, c + 1, p, h)
    }

    for (let i = 0; i < m; i++) {
        draw(i, 0, 'p')
        draw(i, n - 1, 'a')
    }
    for (let i = 0; i < n; i++) {
        draw(0, i, 'p')
        draw(m - 1, i, 'a')
    }

    let res: number[][] = []

    for (let c = 0; c < m; c++) {
        for (let r = 0; r < n; r++) {
            if (canva[c][r] === 'pa') {
                res.push([c, r])
            }
        }
    }

    return res

};