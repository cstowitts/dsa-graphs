"use strict";

/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);

    //using the add method on the Set class bc 
    //it's a bag, order doesn't matter
    //not a list, no .push (adds to end)

    //test is checking for if the value is in the set
    //don't need to create the Node, vertex is already a node
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
    //remember that adjacent is a Set, use .add
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    //create a "visited" Set 
    //(even if we visit the same node 2x, we only want it to show once)
    //create nodeVals array to return later

    //helper function, traverse
    //accepts a node (we will pass from adjacency list)
    //if the node is null, return
    //if it exists, check if it's in visited
    //if unvisited, call traverse

    let visited = new Set();
    let nodeVals = [];

    function traverse(node) {
      if (node === null) {
        return;
      }
      visited.add(node);
      nodeVals.push(node.value);

      for (let adjNode of node.adjacent) {
        if (visited.has(adjNode) === false) {
          traverse(adjNode);
        }
      }

    }
    traverse(start);
    console.log("nodeVals: ", nodeVals);
    return nodeVals;

    //create a stack, unvisited, must be array because we can have 
    //repeating nodes we've visited as we traverse the graph
    //create container array for visited Node VALUES
    //create array to track which NODES we've visited
    //.pop to make current
    //add current to the visited array
    //look at current's adjacency list
    //if there are adjacencies, push to unvisited

    //WHY DONT IT WORK???? >>> changed for..in to for..of
    //and though it works, it doesn't add the vals in the right order
    //even if the content is correct
    // const unvisited = [start];
    // const visited = [];
    // const visitedNodeVals = [];

    // while (unvisited.length > 0) {
    //   let current = unvisited.pop();

    //   if (visited.includes(current) === false) {
    //     //a Set is an object so we need a for..in loop to iterate over it

    //     for (let node of current.adjacent) {
    //       unvisited.push(node);
    //     }
    //     //if current doesn't have any adjacencies the loop won't fire
    //     visited.push(current);
    //   }
    // }

    // for(let node of visited){
    //   visitedNodeVals.push(node.value);
    // }
    // console.log("visitedNodeVals: ", visitedNodeVals);
    // return visitedNodeVals;

  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {
    //make queue
    //make a visited Set
    //nodeValues array
    //while loop
    //current is queue.shift
    //if current isn't visited
    //take its adjacencies and push to queue
    //add current to visited Set
    //update current


    const toVisitQueue = [start];
    const visited = new Set();
    const nodeValues = [];

    while (toVisitQueue.length > 0) {
      let current = toVisitQueue.shift();
      nodeValues.push(current.value);
      visited.add(current);

      for (let adjNode of current.adjacent) {
        if (visited.has(adjNode) === false) {
          toVisitQueue.push(adjNode);
          visited.add(adjNode);
          //we need mark the adjNodes as visited when we add them to the queue
          //to avoid duplicating, retain only unique nodes
          //unlike a tree, a node can have multiple "parents"/connections in a graph
        }
      }

    }
    return nodeValues;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    //create empty hastable/obj, nodes, 
    //where key whill be node and value is minimum distance from start
    //every value will start at Infinity
    //create unvisited array
    //create a queue, we're doing BFS, starting at start
    //while unvisited.length
    //current = unvisited.shift()
    //

    if (start === end) return 0;

    const nodesDistances = new Map();
    // const unvisited = [];
    let queue = [start];

    nodesDistances.set(start) = [0, start];
    //where idx 0 = minimum distance from start
    //where idx 1 = the node prior to the current node

    while (queue.length) {
      let current = queue.shift();
      if (current === end) return nodesDistances[current.value];

      for (let adjNode of current.adjacent) {
        if (nodesDistances.has(adjNode) === false) {
          nodesDistances.set(adjNode) = [(nodesDistances[current][0]) + 1, current];
          queue.push(adjNode);
        // } else {
        //   if (nodesDistances[adjNode][0] > nodesDistances[current][0] + 1){
        //     nodesDistances.set(adjNode) = [(nodesDistances[current][0]) + 1, current];
        //   }
        // this would be helpful if the weights weren't uniformly 1
        }
      }
    }



  }
}

module.exports = { Graph, Node }
