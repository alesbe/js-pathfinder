// Constants
const GRID_SIZE = 10;
const TEST_GRID = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 3, 0],
    [0, 2, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
]

// Classes
class Node {
    constructor(x, y, parentNode, isStartingNode = false, isTragetNode = false) {
        this.x = x;
        this.y = y;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;

        this.parentNode = parentNode;

        this.isStartingNode = isStartingNode;
        this.isTragetNode = isTragetNode;
    }

    
}

// Functions
function aStarAlgorithm(grid) {
    let openList = [];
    let closedList = [];
    let startingNode;
    let targetNode;

    [startingNode, targetNode] = findStartingAndTargetNodes(grid);

    startingNode = new Node(startingNode.x, startingNode.y, null, true);
    targetNode = new Node(targetNode.x, targetNode.y, null, false, true);

    openList.push(startingNode);

    while(true) {
        let current = findLowestfCostNode(openList);
        
        // Move current from openList to closedList
        openList = openList.filter(node => node != current);
        closedList.push(current);

        break;
    }

    // create OPEN list containing calculated fCost nodes
    // create CLOSED list containing visited nodes
    // Add start node to open

    // loop
        // current = node in OPEN with lowest fCost
        // remove current from OPEN
        // add current to CLOSED

        // if current is the target node
            // return

        // for each neighbour of current node:
            // if neighbour is not traversable (wall) or neighnour is in CLOSED (already visited)
                // skip to next neighbour

            // if new path to neighbour is shorter or neighbour is not in OPEN
                // set fCost of neighbour
                // set parent of neighbour to current
                // if neighbour is not in OPEN
                    // add neighbour to OPEN
}

function findStartingAndTargetNodes(grid) {
    let startingNode;
    let targetNode;

    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] == 2) {
                startingNode = {x: row, y: col};
            }
            if (grid[row][col] == 3) {
                targetNode = {x: row, y: col};
            }
        }
    }

    return [startingNode, targetNode];
}

function findLowestfCostNode (list) {
    let currentLowest = false;

    list.forEach(node => {
        if(node.fCost < currentLowest.fCost || !currentLowest) {
            currentLowest = node;
        }
    });

    return currentLowest;
}

// MAIN
aStarAlgorithm(TEST_GRID);