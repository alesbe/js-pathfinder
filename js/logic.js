/* Classes */
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

    setParent(parentNode) {
        this.parentNode = parentNode;
    }

    calcHCost(targetNode) {
        this.hCost = Math.sqrt(
            Math.pow(this.x - targetNode.x, 2) +
            Math.pow(this.y - targetNode.y, 2)
        );
    }

    calcGCost() {
        if(this.isStartingNode) {
            return 0;
        }

        // If parent node comes from side, gCost += 10, else gCost += 14
        if(this.parentNode.x == this.x || this.parentNode.y == this.y ) {
            this.gCost += this.parentNode.gCost + 10;
        } else {
            this.gCost += this.parentNode.gCost + 14;
        }
    }

    calcFCost() {
        this.calcGCost();
        this.fCost = this.hCost + this.gCost;
    }
}

class WallNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/* Algorithms */
function aStarAlgorithm(grid) {
    let openList = [];
    let closedList = [];
    let startingNode;
    let targetNode;
    
    [startingNode, targetNode] = findStartingAndTargetNodes(grid);
    
    // Calculate hCost of each node
    grid.forEach(row => {
        row.forEach(node => {
            if(node.constructor.name == "Node") {
                node.calcHCost(targetNode);
            }
        });
    });

    openList.push(startingNode);

    while(true) {
        let currentNode = findLowestfCostNode(openList);
        
        // Move current from openList to closedList
        openList = openList.filter(node => node != currentNode);
        closedList.push(currentNode);

        if(currentNode.isTargetNode) {
            console.log("Target node found! At x:",currentNode.x," y:",currentNode.y);
            return getNodePath(currentNode);
        }

        // For each neighbour
        let currentNeighbours = findNeighbours(grid, currentNode);
        currentNeighbours.forEach(neighbour => {
            let isNodeInClosed = closedList.find(node => (node.x == neighbour.x) && (node.y == neighbour.y)) ? true : false;

            // If neighbour is a wall or is already visited, skip to next neighbour
            if(neighbour.constructor.name == "WallNode" || isNodeInClosed) {
                return;
            }

            if(!openList.find(node => node == neighbour)) {
                neighbour.setParent(currentNode);
                neighbour.calcFCost();
                
                let isNodeInOpen = openList.find(node => (node.x == neighbour.x) && (node.y == neighbour.y)) ? true : false;
                if (!isNodeInOpen) {
                    openList.push(neighbour);
                }
                /*
                Note: If we calculate gCost each time that we access a new node,
                we won't need to go to the starting node
                */
            }
        });
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

/* Helpers */
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

function getGridSize(grid) {
    let width, height;

    width = grid[0].length;
    height = grid.length;

    return [width, height];
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
    let [gridWidth, gridHeight] = getGridSize(grid);

    // Top
    if(node.x > 0) {
        // Top Left
        /*if(node.y > 0) {
            neighboursPos.push(grid[node.x - 1][node.y - 1]);
        }*/

        // Top Center
        neighboursPos.push(grid[node.x - 1][node.y]);

        // Top Right
        /*if(node.y < gridWidth - 1) {
            neighboursPos.push(grid[node.x - 1][node.y + 1]);
        }*/
    }

    // Middle
    // Middle Left
    if(node.y > 0) {
        neighboursPos.push(grid[node.x][node.y - 1]);
    }

    // Middle Right
    if(node.y < gridWidth - 1) {
        neighboursPos.push(grid[node.x][node.y + 1]);
    }

    // Bottom
    if(node.x < gridHeight - 1) {
        // Bottom Left
        /*if(node.y > 0) {
            neighboursPos.push(grid[node.x + 1][node.y - 1]);
        }*/

        // Bottom Center
        neighboursPos.push(grid[node.x + 1][node.y]);

        // Bottom Right
        /*if(node.y < gridHeight - 1) {
            neighboursPos.push(grid[node.x + 1][node.y + 1]);
        }*/
    }

    return neighboursPos;
}

function initGrid(blueprintGrid) {
    let nodeGrid = [];

    // Create nodes
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

function getNodePath(node) {
    let pathArray = []

    let isStartingNodeFound = false;
    let currentNode = node;
    while(!isStartingNodeFound) {
        pathArray.push([currentNode.x, currentNode.y]);
        currentNode = currentNode.parentNode;

        if(currentNode.isStartingNode) {
            isStartingNodeFound = true;
            break;
        }
    }

    // Return path from starting to target without those nodes
    pathArray.reverse().pop();
    return pathArray;
}

/* Main */
function loadAlgorithm(algorithmNumber, grid) {
    switch (algorithmNumber) {
        case 0:
            let path = aStarAlgorithm(initGrid(grid));
            console.log(path);
            return path;
            break;
    
        default:
            break;
    }
}