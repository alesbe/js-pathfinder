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
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
]

// Classes
class Cell {
    constructor(x, y, parentNode, isStartingNode = false, isTragetNode = false) {
        this.x = x;
        this.y = y;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;

        this.parentNode = parentNode;

        this.isStartingNode = isStartingNode;
        this.isTragetNode = isLastNode;
    }
}

// Functions
function aStarAlgorithm(grid) {
    let openList = [];
    let closedList = [];

    // create OPEN list containing calculated fCost nodes
    // Create CLOSED list containing visited nodes

    // loop
        // current = node in OPEN with lowest fCost
        // remove current from OPEN
        // add current to CLOSED

        // if current is the target node
            // return

        // for each neighbour of current node:
            // if neighbour is not traversable (wall) or neighnour is in CLOSED (already visited)
                // skip to next neighbour

            // https://www.youtube.com/watch?v=-L-WgKMFuhE
}

// MAIN
aStarAlgorithm(TEST_GRID);