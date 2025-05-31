import { Monaco } from "@monaco-editor/react";
import { Theme } from "../../../types";

type LanguageConfig = Record<
  string,
  {
    id: string;
    label: string;
    logoPath: string;
    pistonRuntime: { language: string; version: string };
    monacoLanguage: string;
    defaultCode: string;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
   cpp: {
    id: "cpp",
    label: "C++",
    logoPath: "/cpp.png",
    pistonRuntime: { language: "cpp", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `// C++: Z-Algorithm for pattern matching and longest substring prefix

#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> z_algorithm(const string &s) {
    int n = s.length();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for (int i = 1; i < n; i++) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
}

int main() {
    string text = "abacaba";
    vector<int> z = z_algorithm(text);
    cout << "Z-array: ";
    for (int v : z) cout << v << " ";
    cout << endl;
    return 0;
}`,
  },
  python: {
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python: Fenwick Tree (Binary Indexed Tree) for Prefix Sums

class FenwickTree:
    def __init__(self, size):
        self.n = size
        self.bit = [0] * (size + 1)

    def update(self, idx, val):
        while idx <= self.n:
            self.bit[idx] += val
            idx += idx & -idx

    def query(self, idx):
        result = 0
        while idx > 0:
            result += self.bit[idx]
            idx -= idx & -idx
        return result

    def range_query(self, l, r):
        return self.query(r) - self.query(l - 1)

# Example usage:
arr = [1, 2, 3, 4, 5]
ft = FenwickTree(len(arr))
for i, val in enumerate(arr, 1):
    ft.update(i, val)
print("Prefix sum of first 3 elements:", ft.query(3))
print("Sum of elements in range [2, 4]:", ft.range_query(2, 4))`,
  },
  javascript: {
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
    defaultCode: `// JavaScript: Manacher's Algorithm to find the longest palindromic substring
function manacher(s) {
  const A = '@#' + s.split('').join('#') + '#$';
  const Z = new Array(A.length).fill(0);
  let center = 0, right = 0;

  for (let i = 1; i < A.length - 1; i++) {
    if (i < right) {
      Z[i] = Math.min(right - i, Z[2 * center - i]);
    }
    while (A[i + Z[i] + 1] === A[i - Z[i] - 1]) {
      Z[i]++;
    }
    if (i + Z[i] > right) {
      center = i;
      right = i + Z[i];
    }
  }

  let maxLen = 0, centerIndex = 0;
  for (let i = 1; i < A.length - 1; i++) {
    if (Z[i] > maxLen) {
      maxLen = Z[i];
      centerIndex = i;
    }
  }
  const start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}

// Example usage:
const str = "babad";
console.log("Longest Palindromic Substring:", manacher(str));`,
  },
 

  typescript: {
    id: "typescript",
    label: "TypeScript",
    logoPath: "/ts.png",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// TypeScript: Segment Tree for Range Sum Queries 

class SegmentTree {
  n: number;
  tree: number[];

  constructor(arr: number[]) {
    this.n = arr.length;
    // Allocate an array of length 4*n, then explicitly zero each entry
    this.tree = new Array<number>(4 * this.n);
    for (let i = 0; i < this.tree.length; i++) {
      this.tree[i] = 0;
    }
    this.build(arr, 1, 0, this.n - 1);
  }

  private build(arr: number[], idx: number, left: number, right: number): void {
    if (left === right) {
      this.tree[idx] = arr[left];
      return;
    }
    const mid = Math.floor((left + right) / 2);
    this.build(arr, 2 * idx, left, mid);
    this.build(arr, 2 * idx + 1, mid + 1, right);
    this.tree[idx] = this.tree[2 * idx] + this.tree[2 * idx + 1];
  }

  update(
    pos: number,
    val: number,
    idx: number = 1,
    left: number = 0,
    right: number = this.n - 1
  ): void {
    if (left === right) {
      this.tree[idx] = val;
      return;
    }
    const mid = Math.floor((left + right) / 2);
    if (pos <= mid) {
      this.update(pos, val, 2 * idx, left, mid);
    } else {
      this.update(pos, val, 2 * idx + 1, mid + 1, right);
    }
    this.tree[idx] = this.tree[2 * idx] + this.tree[2 * idx + 1];
  }

  query(
    l: number,
    r: number,
    idx: number = 1,
    left: number = 0,
    right: number = this.n - 1
  ): number {
    if (r < left || right < l) return 0;
    if (l <= left && right <= r) return this.tree[idx];
    const mid = Math.floor((left + right) / 2);
    return (
      this.query(l, r, 2 * idx, left, mid) +
      this.query(l, r, 2 * idx + 1, mid + 1, right)
    );
  }
}

// Example usage:
const arr = [1, 3, 5, 7, 9, 11];
const segTree = new SegmentTree(arr);
console.log("Sum of values in range [1, 3]:", segTree.query(1, 3));
// → “Sum of values in range [1, 3]: 15”
segTree.update(1, 10);
console.log("After update, sum of values in range [1, 3]:", segTree.query(1, 3));
// → “After update, sum of values in range [1, 3]: 22”
`,
  },
  go: {
    id: "go",
    label: "Go",
    logoPath: "/go.png",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `// Go: Dijkstra's Algorithm for Shortest Path

package main

import (
    "container/heap"
    "fmt"
    "math"
)

type Edge struct {
    to, weight int
}

type Node struct {
    vertex, dist int
}

type PriorityQueue []Node

func (pq PriorityQueue) Len() int { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].dist < pq[j].dist }
func (pq PriorityQueue) Swap(i, j int) { pq[i], pq[j] = pq[j], pq[i] }
func (pq *PriorityQueue) Push(x interface{}) { *pq = append(*pq, x.(Node)) }
func (pq *PriorityQueue) Pop() interface{} {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}

func dijkstra(adj map[int][]Edge, start int) map[int]int {
    dist := make(map[int]int)
    for v := range adj {
        dist[v] = math.MaxInt64
    }
    dist[start] = 0

    pq := &PriorityQueue{}
    heap.Init(pq)
    heap.Push(pq, Node{vertex: start, dist: 0})

    for pq.Len() > 0 {
        node := heap.Pop(pq).(Node)
        u := node.vertex
        if node.dist > dist[u] {
            continue
        }
        for _, e := range adj[u] {
            if dist[u]+e.weight < dist[e.to] {
                dist[e.to] = dist[u] + e.weight
                heap.Push(pq, Node{vertex: e.to, dist: dist[e.to]})
            }
        }
    }
    return dist
}

func main() {
    adj := map[int][]Edge{
        0: {{to: 1, weight: 4}, {to: 2, weight: 1}},
        1: {{to: 3, weight: 1}},
        2: {{to: 1, weight: 2}, {to: 3, weight: 5}},
        3: {},
    }
    dist := dijkstra(adj, 0)
    for v, d := range dist {
        fmt.Printf("Distance from 0 to %d: %d", v, d)
        fmt.Println()
    }
}`,
  },

  

  java: {
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    pistonRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `// Java: Quick Sort Implementation

import java.util.Arrays;

public class Main {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original array: " + Arrays.toString(arr));
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
  },

  

  rust: {
    id: "rust",
    label: "Rust",
    logoPath: "/rust.png",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `// Rust: Breadth-First Search (BFS) on a Graph

use std::collections::VecDeque;

fn bfs(adj: &Vec<Vec<usize>>, start: usize) {
    let n = adj.len();
    let mut visited = vec![false; n];
    let mut queue = VecDeque::new();

    visited[start] = true;
    queue.push_back(start);

    while let Some(u) = queue.pop_front() {
        print!("{} ", u);
        for &v in &adj[u] {
            if !visited[v] {
                visited[v] = true;
                queue.push_back(v);
            }
        }
    }
}

fn main() {
    let adj = vec![
        vec![1, 2],
        vec![0, 3, 4],
        vec![0, 4],
        vec![1, 5],
        vec![1, 2, 5],
        vec![3, 4],
    ];
    println!("BFS starting from vertex 0:");
    bfs(&adj, 0);
}`,
  },
  csharp: {
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.png",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `// C#: Binary Search on a Sorted Array

using System;

class Program {
    static int BinarySearch(int[] arr, int target) {
        int left = 0, right = arr.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    static void Main() {
        int[] arr = { 1, 3, 5, 7, 9, 11 };
        int target = 7;
        int index = BinarySearch(arr, target);
        Console.WriteLine(index >= 0
            ? $\"Target {target} found at index {index}.\"
            : $\"Target {target} not found.\");
    }
}`,
  },

  ruby: {
    id: "ruby",
    label: "Ruby",
    logoPath: "/ruby.png",
    pistonRuntime: { language: "ruby", version: "3.0.1" },
    monacoLanguage: "ruby",
    defaultCode: `# Ruby: Merge Sort Implementation

def merge_sort(arr)
  return arr if arr.length <= 1
  mid = arr.length / 2
  left = merge_sort(arr[0...mid])
  right = merge_sort(arr[mid...arr.length])
  merge(left, right)
end

def merge(left, right)
  sorted = []
  until left.empty? || right.empty?
    sorted << (left.first <= right.first ? left.shift : right.shift)
  end
  sorted + left + right
end

# Example usage:
arr = [38, 27, 43, 3, 9, 82, 10]
puts "Original array: #{arr}"
sorted = merge_sort(arr)
puts "Sorted array: #{sorted}"`,
  },

  swift: {
    id: "swift",
    label: "Swift",
    logoPath: "/swift.png",
    pistonRuntime: { language: "swift", version: "5.3.3" },
    monacoLanguage: "swift",
    defaultCode: `// Swift: Binary Search Tree (BST) Insertion and Inorder Traversal

class TreeNode {
    var val: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ val: Int) {
        self.val = val
        self.left = nil
        self.right = nil
    }
}

func insert(_ root: TreeNode?, _ val: Int) -> TreeNode {
    guard let root = root else { return TreeNode(val) }
    if val < root.val {
        root.left = insert(root.left, val)
    } else {
        root.right = insert(root.right, val)
    }
    return root
}

func inorder(_ root: TreeNode?) {
    guard let root = root else { return }
    inorder(root.left)
    print(root.val, terminator: " ")
    inorder(root.right)
}

// Example usage:
let values = [5, 3, 7, 2, 4, 6, 8]
var root: TreeNode?
for v in values { root = insert(root, v) }
print("Inorder Traversal of BST:", terminator: " ")
inorder(root)
`,
  },
};


export const THEMES: Theme[] = [
  { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
  { id: "vs-light", label: "VS Light", color: "#ffffff" },
  { id: "github-dark", label: "GitHub Dark", color: "#0d1117" },
  { id: "monokai", label: "Monokai", color: "#272822" },
  { id: "solarized-dark", label: "Solarized Dark", color: "#002b36" },
];

export const THEME_DEFINITONS = {
  "github-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6e7681" },
      { token: "string", foreground: "a5d6ff" },
      { token: "keyword", foreground: "ff7b72" },
      { token: "number", foreground: "79c0ff" },
      { token: "type", foreground: "ffa657" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "d2a8ff" },
      { token: "variable", foreground: "ffa657" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#161b22",
      "editorLineNumber.foreground": "#6e7681",
      "editorIndentGuide.background": "#21262d",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#264f7855",
    },
  },
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "string", foreground: "E6DB74" },
      { token: "keyword", foreground: "F92672" },
      { token: "number", foreground: "AE81FF" },
      { token: "type", foreground: "66D9EF" },
      { token: "class", foreground: "A6E22E" },
      { token: "function", foreground: "A6E22E" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "F92672" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#75715E",
      "editor.selectionBackground": "#49483E",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorCursor.foreground": "#F8F8F2",
      "editor.selectionHighlightBackground": "#49483E",
    },
  },
  "solarized-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "586e75" },
      { token: "string", foreground: "2aa198" },
      { token: "keyword", foreground: "859900" },
      { token: "number", foreground: "d33682" },
      { token: "type", foreground: "b58900" },
      { token: "class", foreground: "b58900" },
      { token: "function", foreground: "268bd2" },
      { token: "variable", foreground: "b58900" },
      { token: "operator", foreground: "859900" },
    ],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
      "editorLineNumber.foreground": "#586e75",
      "editor.selectionBackground": "#073642",
      "editor.lineHighlightBackground": "#073642",
      "editorCursor.foreground": "#839496",
      "editor.selectionHighlightBackground": "#073642",
    },
  },
};


export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    });
  });
};