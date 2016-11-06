//https://www.hackerrank.com/challenges/ctci-connected-cell-in-a-grid

(function() {
	var state = {
		rows: 4,
		cols: 4,
		values: [
			[1, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 1, 0],
			[1, 0, 0, 0]
		],
		nodes: [],
		visited: [],
		idCount: 0,
		maxRegionCountDfs: 0,
		maxRegionCountBfs: 0
	};

	(function createNodes(){
		for (var y = 0; y < state.values.length; y++) {
			var row = [];
			for (var x = 0; x < state.values[y].length; x++) {
				row.push(
					{
						xPos: x,
						yPos: y,
						id: state.idCount++,
						value: state.values[y][x]
					}
				)
			}
			state.nodes.push(row);
		}
	})();

	function getCell(x, y) {
		if (y < state.rows - 1 && y >= 0){
			return state.nodes[y][x];
		} else {
			return undefined;
		}
	}

	function getConnectedCells(cell) {
		var connectedCells = [];
		var y = cell.yPos;
		var x = cell.xPos;

		connectedCells.push(
			getCell(x + 1, y),
			getCell(x - 1, y)
		)

		connectedCells.push(
			getCell(x, y + 1),
			getCell(x - 1, y + 1),
			getCell(x + 1, y + 1)
		)

		connectedCells.push(
			getCell(x, y - 1),
			getCell(x - 1, y - 1),
			getCell(x + 1, y - 1)
		)

		return connectedCells.filter(function(cell){
			return cell != undefined;
		});
	}

	function depthFirstSearchRegionCount(cell, regionCount){
		if (!state.visited.includes(cell.id)) {
			state.visited.push(cell.id);

			if (cell.value != 0) {
				regionCount++;

				var connectedCells = getConnectedCells(cell);

				connectedCells.forEach(function(connectedCell){
					regionCount = depthFirstSearchRegionCount(connectedCell, regionCount);
				});
			}
		}
		return regionCount;
	}

	function breadthFirstSearchRegionCount(cell){
	 	var nextToVisit = []
	 	var regionCountBfs = 0;

	 	nextToVisit.push(cell)

	 	while (nextToVisit.length != 0) {
			var node = nextToVisit.shift();

			if(state.visited.includes(node.id)) {
				continue;
			}

			state.visited.push(node.id);

			if(node.value != 0){
				regionCountBfs++;

				var connectedCells = getConnectedCells(node);

				connectedCells.forEach(function(connectedCell){
					nextToVisit.push(connectedCell);
				});
			}
	 	}
	 	return regionCountBfs;
	}

	function getLargestRegionOfConnectedCells(searchType){
		state.nodes.forEach(function(row){
			row.forEach(function(cell){
				if(searchType == 'dfs'){
					var regionCountDfs = depthFirstSearchRegionCount(cell, 0);

					if (regionCountDfs > state.maxRegionCountDfs) {
						state.maxRegionCountDfs = regionCountDfs;
					}

					console.log(regionCountDfs, searchType)
				}

				if(searchType == 'bfs'){
					var regionCountBfs = breadthFirstSearchRegionCount(cell);

					if (regionCountBfs > state.maxRegionCountBfs) {
						state.maxRegionCountBfs = regionCountBfs;
					}

					console.log(regionCountBfs, searchType)
				}

			});
		});
		state.visited = [];
	};

	getLargestRegionOfConnectedCells('dfs');
	console.log('The largest region of connected cells according to getLargestRegionOfConnectedCells is ', state.maxRegionCountDfs);

	getLargestRegionOfConnectedCells('bfs');
	console.log('The largest region of connected cells according to getLargestRegionOfConnectedCells is ', state.maxRegionCountBfs);
})()

/*
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
