// Constants
const GRID_SIZE = 10;
const GRID_HEIGHT = 10;
const GRID_WIDTH = 10;
const TEST_GRID = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 3, 0],
    [0, 2, 1, 0, 0, 1, 0, 0, 0, 0],
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

    set setGCost(gCost) {
        this.gCost = fCost;
    }

    set setHCost(hCost) {
        this.hCost = fCost;
    }

    set setFCost(fCost) {
        this.fCost = fCost;
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
        let currentNode = findLowestfCostNode(openList);
        
        // Move current from openList to closedList
        openList = openList.filter(node => node != currentNode);
        closedList.push(currentNode);

        if(currentNode == targetNode) {
            return("path found! (todo: add path)")
        }

        // For each neighbour
        let currentNeighbours = findNeighbours(grid, currentNode);
        currentNeighbours.forEach(neighbour => {
            let isNodeInClosed = closedList.find(node => (node.x == neighbour.x) && (node.y == neighbour.y)) ? true : false;

            // If neighbour is a wall or is already visited, skip to next neighbour
            if(grid[neighbour.x][neighbour.y] == 1 || isNodeInClosed) {
                return;
            }

            console.log(calcHcost({x: neighbour.x, y: neighbour.y}, targetNode));

        });
        
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
            // if neighbour is not traversable (wall) or neighbour is in CLOSED (already visited)
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

function findNeighbours(grid, node) {
    let neighboursPos = [];

    // Top
    if(node.x > 0) {
        // Top Left
        if(node.y > 0) {
            neighboursPos.push({x: node.x - 1, y: node.y - 1});
        }

        // Top Center
        neighboursPos.push({x: node.x - 1, y: node.y});

        // Top Right
        if(node.y < GRID_WIDTH - 1) {
            neighboursPos.push({x: node.x - 1, y: node.y + 1});
        }
    }

    // Middle
    // Middle Left
    if(node.y > 0) {
        neighboursPos.push({x: node.x, y: node.y - 1});
    }

    // Middle Right
    if(node.y < GRID_WIDTH - 1) {
        neighboursPos.push({x: node.x, y: node.y + 1});
    }

    // Bottom
    if(node.x < GRID_HEIGHT - 1) {
        // Top Left
        if(node.y > 0) {
            neighboursPos.push({x: node.x + 1, y: node.y - 1});
        }

        // Top Center
        neighboursPos.push({x: node.x + 1, y: node.y});

        // Top Right
        if(node.y < GRID_WIDTH - 1) {
            neighboursPos.push({x: node.x + 1, y: node.y + 1});
        }
    }

    return neighboursPos;
}

function calcHcost(startingNode, targetNode) {
    return Math.sqrt(
        Math.pow(startingNode.x - targetNode.x, 2) +
        Math.pow(startingNode.y - targetNode.y, 2)
    );
}

// MAIN
aStarAlgorithm(TEST_GRID);