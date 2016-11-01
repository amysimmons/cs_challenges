var input = {
	rows: 4,
	cols: 4,
	values: [
		[1, 1, 0, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 0, 0]
	]
};

var mappedValues = [];
var idCount = 0;

for (var i = 0; i < input.values.length; i++) {
	var row = [];
	for (var x = 0; x < input.values[i].length; x++) {
		row.push(
			{
				xPos: x,
				yPos: i,
				id: idCount++,
				value: input.values[i][x]
			}
		)
	}
	mappedValues.push(row);
}

var getConnectedCells = function(cell) {
	var connectedCells = [];
	var y = cell.yPos;
	var x = cell.xPos;

	connectedCells.push(
		mappedValues[y][x + 1],
		mappedValues[y][x - 1]
	)

	if(y < input.rows - 1) {
		connectedCells.push(
			mappedValues[y + 1][x],
			mappedValues[y + 1][x - 1],
			mappedValues[y + 1][x + 1]
		)
	}

	if(y > 0){
		connectedCells.push(
			mappedValues[y - 1][x],
			mappedValues[y - 1][x - 1],
			mappedValues[y - 1][x + 1]
		)
	}

	return connectedCells.filter(function(cell){
		return cell != undefined;
	});
}

var visited = [];
var regionCount = 0;
var regions = [];
var depthFirstSearch = 0;

var depthFirstSearch = function(cell){
	hasPathDFSCalled++;

	if (!visited.includes(cell.id)) {
		visited.push(cell.id)

		if(cell.value != 0){
			regionCount++;

			var connectedCells = getConnectedCells(cell)
			if(connectedCells.length > 0) {
				connectedCells.forEach(function(connectedCell){
					depthFirstSearch(connectedCell);
				})
			}

			if(regionCount > 0) {
				regions.push(regionCount);
				regionCount = 0;
			}
		}
	}
}

// mappedValues.forEach(function(row){
// 	row.forEach(function(cell){
// 		depthFirstSearch(cell);
// 	});
// });

// console.log('largest region of connected cells ', regions.sort(function(a, b){return b - a})[0]);
// console.log('depthFirstSearch called ', depthFirstSearch, ' times')

var breadthFirstSearchCount = 0;
var bfsWhileCount = 0;

var breadthFirstSearch = function(source){
	breadthFirstSearchCount++;

 	var nextToVisit = []
 	var visited = []

 	nextToVisit.push(source)

 	while (nextToVisit.length != 0) {
 		bfsWhileCount++;
		var node = nextToVisit.shift();

		if(visited.includes(node.id)) {
			continue;
		}

		visited.push(node.id);

		if(node.value != 0){
			regionCount++;

			var connectedCells = getConnectedCells(node);

			connectedCells.forEach(function(connectedCell){
				nextToVisit.push(connectedCell);
			})
		}
 	}

 	if(regionCount > 0) {
 		regions.push(regionCount);
 		regionCount = 0;
 	}

 	return false
}

mappedValues.forEach(function(row){
	row.forEach(function(cell){
		breadthFirstSearch(cell);
	});
});

console.log('largest region of connected cells ', regions.sort(function(a, b){return b - a})[0]);
console.log('breadthFirstSearch called', breadthFirstSearchCount, ' times')
console.log('breadthFirstSearch while loop executed ' + bfsWhileCount + 'times')


/*
NOTES

DEPTH FIRST SEARCH (DFS):

Typically a recursive algorithm
Say you have an initial node
You want to know if the initial node has a path to another node
Hey node 'S', do you have a path to node 'T'?
S will ask its children
If the first child has a path, it will give the answer
If the first child doesn't have a path, it will ask its children
It's called depth first search because we go deep into a node
before we even ask any of its other children
We might run really far away, when there could have been a really
fast connection elsewhere

The trick with DFS is to use an is-visited flag so that you don't
wind up in an infinite loop.


-map the nodes to ids so they can easily be looked up
-include a list of the visited ids


hasPathDFS(int souce, int destination) {
	source = getNode(source)
	destinationn = getNode(destination)
	visited = []
	return hasPathFDS(source, destination, visited)
}

hasPathDFS(source, destination, visited){
	if (visited.contains(source.id)) {
		return false;
	}
	visited.add(source.id)
	if (source == destination) {
		return true
	}
	for each node child in source.adjacent { //adjacent is the surrounding celles
		if hasPathDFS(child, destination, visited) {
			return true
		}
	}
	return false
}

BREADTH FIRST SEARCH (BFS):

Go level by level out.
First ask S, do you have a path to T.
S will check if any of its children are T.
If they aren't they get in line, form a queue.

queue child 1, child 2...

It keeps moving out to the next levels, level by level.

The trick is to use a queue.
Rather than going recursively you pull out the first element from the queue
check if it is the element you are looking for, and if not,
add its children to it.

-include a list of nodes you need to visit next
-include a list of visited ids
-the first node to visit is the source

hasPathBFS(int source, int destination){
	return hasPathBFS(getNode(source), getNode(destination))
}

hasPathBFS(source, destination){
 	nextToVisit = []
 	visited = []
 	next.tovisit.add(source)
 	while (!nextToVisit.isEmpty()) {
		node = nextToVisit.remove(); //removes the very first node in the list
		if (node == destination) { //there is a path
			return true;
		}

		if(visited.contains(node.id)) {
			continue;
		}
		visited.add(node.id);

		//queue up the children, adding to the end of the queue
		//this ensures the children won't be visited immediately,
		//but will be visited level by level
		for each node child in node.adjacent {
			add them to the next to visit list
		}
 	}
 	return false
}
*/
