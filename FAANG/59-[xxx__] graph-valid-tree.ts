/**
    You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.

    Return true if the edges of the given graph make up a valid tree, and false otherwise.

    Example 1:


    Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
    Output: true
    Example 2:


    Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
    Output: false
    

    Constraints:

    1 <= n <= 2000
    0 <= edges.length <= 5000
    edges[i].length == 2
    0 <= ai, bi < n
    ai != bi
    There are no self-loops or repeated edges.
 */

function validTree(n: number, edges: number[][]): boolean {
    if (n - 1 !== edges.length) return false
    else if (n == 1) return true

    let nodes: {
        [from: number]: number[]
    } = {}

    for (let edge of edges) {
        nodes[edge[0]] ||= []
        nodes[edge[1]] ||= []
        nodes[edge[0]].push(edge[1])
        nodes[edge[1]].push(edge[0])
    }

    const visited: {
        [key: number]: boolean
    } = {}

    function dfs(fromIndex: number, parent: number) {
        if (visited[fromIndex] || !nodes[fromIndex]) return false
        visited[fromIndex] = true
        for (const neighbour of nodes[fromIndex]) {
            if (neighbour === parent) continue
            if (!dfs(neighbour, fromIndex)) return false
        }
        return true
    }

    if (!dfs(0, -1)) return false

    return Object.keys(visited).length === n
};