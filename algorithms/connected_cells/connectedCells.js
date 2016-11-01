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
		mappedValues: [],
		visited: [],
		idCount: 0,
		regionCount: 0,
		maxRegionCount: 0
	};

	(function mapValuesToObjects(){
		for (var i = 0; i < state.values.length; i++) {
			var row = [];
			for (var x = 0; x < state.values[i].length; x++) {
				row.push(
					{
						xPos: x,
						yPos: i,
						id: state.idCount++,
						value: state.values[i][x]
					}
				)
			}
			state.mappedValues.push(row);
		}
	})();

	function getConnectedCells(cell) {
		var connectedCells = [];
		var y = cell.yPos;
		var x = cell.xPos;

		connectedCells.push(
			state.mappedValues[y][x + 1],
			state.mappedValues[y][x - 1]
		)

		if(y < state.rows - 1) {
			connectedCells.push(
				state.mappedValues[y + 1][x],
				state.mappedValues[y + 1][x - 1],
				state.mappedValues[y + 1][x + 1]
			)
		}

		if(y > 0){
			connectedCells.push(
				state.mappedValues[y - 1][x],
				state.mappedValues[y - 1][x - 1],
				state.mappedValues[y - 1][x + 1]
			)
		}

		return connectedCells.filter(function(cell){
			return cell != undefined;
		});
	}

	function depthFirstSearchRegionCount(cell){
		if (!state.visited.includes(cell.id)) {
			state.visited.push(cell.id);

			if (cell.value != 0) {
				state.regionCount++;

				var connectedCells = getConnectedCells(cell);

				if (connectedCells.length > 0) {
					connectedCells.forEach(function(connectedCell){
						depthFirstSearchRegionCount(connectedCell);
					});
				}
			}
		}
		return state.regionCount;
	}

	function breadthFirstSearchRegionCount(cell){
	 	var nextToVisit = []
	 	nextToVisit.push(cell)

	 	while (nextToVisit.length != 0) {
			var node = nextToVisit.shift();

			if(state.visited.includes(node.id)) {
				continue;
			}

			state.visited.push(node.id);

			if(node.value != 0){
				state.regionCount++;

				var connectedCells = getConnectedCells(node);

				connectedCells.forEach(function(connectedCell){
					nextToVisit.push(connectedCell);
				});
			}
	 	}
	 	return state.regionCount
	}

	function getLargestRegionOfConnectedCells(searchType){
		state.mappedValues.forEach(function(row){
			row.forEach(function(cell){
				var regionCount;

				if(searchType == 'dfs'){
					regionCount = depthFirstSearchRegionCount(cell);
				}

				if(searchType == 'bfs'){
					regionCount = breadthFirstSearchRegionCount(cell);
				}

				console.log(regionCount, searchType)

				if (regionCount > state.maxRegionCount) {
					state.maxRegionCount = regionCount;
				}

				state.regionCount = 0;
			});
		});
		state.visited = [];
	};

	getLargestRegionOfConnectedCells('dfs');
	console.log('The largest region of connected cells according to getLargestRegionOfConnectedCells is ', state.maxRegionCount);

	getLargestRegionOfConnectedCells('bfs');
	console.log('The largest region of connected cells according to getLargestRegionOfConnectedCells is ', state.maxRegionCount);
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
