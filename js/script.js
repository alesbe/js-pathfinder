// Classes
class Node {
    constructor(x, y, parentNode, isStartingNode = false, isTargetNode = false) {
        this.x = x;
        this.y = y;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;

        this.parentNode = parentNode;

        this.isStartingNode = isStartingNode;
        this.isTargetNode = isTargetNode;
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

class WallNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Constants
const GRID_SIZE = 10;
const GRID_HEIGHT = 10;
const GRID_WIDTH = 10;
const BLUEPRINT_GRID = [
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

let nodeGrid = initGrid(BLUEPRINT_GRID);

// Functions
function aStarAlgorithm(grid) {
    let openList = [];
    let closedList = [];
    let startingNode;
    let targetNode;

    [startingNode, targetNode] = findStartingAndTargetNodes(grid);

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
            if(neighbour.constructor.name == "WallNode" || isNodeInClosed) {
                return;
            }

            console.log(calcHcost(neighbour, targetNode));

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

    grid.forEach(row => {
        row.forEach(node => {
            if(node.isStartingNode) {
                startingNode = node;
            }
            if(node.isTargetNode) {
                targetNode = node;
            }
        });
    });

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
            neighboursPos.push(grid[node.x - 1][node.y - 1]);
        }

        // Top Center
        neighboursPos.push(grid[node.x - 1][node.y]);

        // Top Right
        if(node.y < GRID_WIDTH - 1) {
            neighboursPos.push(grid[node.x - 1][node.y + 1]);
        }
    }

    // Middle
    // Middle Left
    if(node.y > 0) {
        neighboursPos.push(grid[node.x][node.y - 1]);
    }

    // Middle Right
    if(node.y < GRID_WIDTH - 1) {
        neighboursPos.push(grid[node.x][node.y + 1]);
    }

    // Bottom
    if(node.x < GRID_HEIGHT - 1) {
        // Bottom Left
        if(node.y > 0) {
            neighboursPos.push(grid[node.x + 1][node.y - 1]);
        }

        // Bottom Center
        neighboursPos.push(grid[node.x + 1][node.y]);

        // Bottom Right
        if(node.y < GRID_WIDTH - 1) {
            neighboursPos.push(grid[node.x + 1][node.y + 1]);
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

function initGrid(blueprintGrid) {
    let nodeGrid = [];

    for(let row = 0; row < blueprintGrid.length; row++) {
        nodeGrid.push([]);
        for(let col = 0; col < blueprintGrid[row].length; col++) {
            let nodeType = blueprintGrid[row][col];

            switch (nodeType) {
                // Node
                case 0:
                    nodeGrid[row].push(new Node(row, col, null));
                    break;

                // Wall
                case 1:
                    nodeGrid[row].push(new WallNode(row, col));
                    break;
                
                // Starting node
                case 2:
                    nodeGrid[row].push(new Node(row, col, null, true));
                    break;
                
                // Last node
                case 3:
                    nodeGrid[row].push(new Node(row, col, null, false, true));
                    break;
            }
        }
    }

    return nodeGrid;
}

// MAIN

aStarAlgorithm(nodeGrid);