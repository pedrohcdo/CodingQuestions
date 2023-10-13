/**
    You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

    Return the number of connected components in the graph.

    Example 1:


    Input: n = 5, edges = [[0,1],[1,2],[3,4]]
    Output: 2
    Example 2:


    Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
    Output: 1
    

    Constraints:

    1 <= n <= 2000
    1 <= edges.length <= 5000
    edges[i].length == 2
    0 <= ai <= bi < n
    ai != bi
    There are no repeated edges.

    ---
    https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
 */

function countComponents(n: number, edges: number[][]): number {
    const adj: {
        [f: number]: number[]
    } = {}

    for (const edge of edges) {
        adj[edge[0]] ||= []
        adj[edge[1]] ||= []
        adj[edge[0]].push(edge[1])
        adj[edge[1]].push(edge[0])
    }

    const visited: { [n: number]: boolean } = {}
    function traverse(fromNode: number) {
        if (visited[fromNode]) return
        visited[fromNode] = true
        if (!adj[fromNode]) return
        for (const nei of adj[fromNode]) {
            traverse(nei)
        }
    }

    let count = 0
    for (let i = 0; i < n; i++) {
        if (visited[i]) continue
        traverse(i)
        count++
    }

    return count
};