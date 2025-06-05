/* Grid selector */
const gridContainer = document.getElementById("main-grid");
const gridWrapper = document.getElementById("grid-wrapper");

function updateCellSize() {
  const size = Math.min(
    gridWrapper.clientWidth / nCols,
    gridWrapper.clientHeight / nRows
  );
  document.documentElement.style.setProperty("--cell-size", `${size}px`);
}

/* Node type selectors */
const dropdownNodeSelector = document.getElementById("dropdown-node-selector");
const wallNodeSelector = document.getElementById("wall-node-selector");
const startingNodeSelector = document.getElementById("starting-node-selector");
const targetNodeSelector = document.getElementById("target-node-selector");
const clearNodeSelector = document.getElementById("clear-node-selector");

/* Algorithm selectors */
const dropdownAlgorithmSelector = document.getElementById("dropdown-algorithm-selector");
const astarAlgorithmSelector = document.getElementById("astar-algorithm-selector");
const dijkstraAlgorithmSelector = document.getElementById("dijkstra-algorithm-selector");

/* Operation selector */
const clearOperation = document.getElementById("clear-operation");
const visualizeOperation = document.getElementById("visualize-operation");

/* Enums */
const NodeState = {
  Wall: 0,
  Starting: 1,
  Target: 2,
  Clear: 3
}

const AlgorithmType = {
  Astar: 0,
  Dijkstra: 1
}

/* States */
let nodeTypeState = NodeState.Clear;
let algorithmTypeState = AlgorithmType.Astar;

function clearGrid() {
  for(let row of gridContainer.childNodes) {
    for(let node of row.childNodes) {
      node.className = "grid-cell__clear";
    }
  }
}

function parseGrid() {
  let parsedGrid = [];

  for(let row of gridContainer.childNodes) {
    parsedGrid.push([]);

    for(let node of row.childNodes) {
      let lastIndex = parsedGrid.length - 1;

      switch(node.className) {
        case "grid-cell__wall":
          parsedGrid[lastIndex].push(1);
          break;
        case "grid-cell__starting":
          parsedGrid[lastIndex].push(2);
          break;
        case "grid-cell__target":
          parsedGrid[lastIndex].push(3);
          break;
        case "grid-cell__clear":
          parsedGrid[lastIndex].push(0);
          break;
      }
    }
  }

  return parsedGrid;
}

// Generate grid
const nRows = 45;
const nCols = 100;

for (let row = 0; row < nRows; row++) {
  let row = document.createElement("div");
  row.className = "grid-row";

  for (let col = 0; col < nCols; col++) {
    let cell = document.createElement("div");
    cell.className = "grid-cell__clear";

    cell.onmousemove = function (e) {
      e.preventDefault();
      if (e.buttons == 1) {
        console.log(nodeTypeState);
        switch (nodeTypeState) {
          case NodeState.Wall:
            cell.className = "grid-cell__wall";
            break;
        
          case NodeState.Starting:
            cell.className = "grid-cell__starting";
            break;

          case NodeState.Target:
            cell.className = "grid-cell__target";
            break;

          case NodeState.Clear:
            cell.className = "grid-cell__clear";
            break;
        }
      }
    };

    row.appendChild(cell);
  }

  gridContainer.appendChild(row);
}

updateCellSize();
window.addEventListener("resize", updateCellSize);

function paintNode(row, col) {
  let selectedNode = gridContainer.childNodes[row].childNodes[col];

  selectedNode.className = "grid-cell_path";
}

// Setup navbar
astarAlgorithmSelector.onclick = (e) => {
  e.preventDefault();
  algorithmTypeState = AlgorithmType.Astar;
  dropdownAlgorithmSelector.innerHTML = "A*";
}
dijkstraAlgorithmSelector.onclick = (e) => {
  e.preventDefault();
  algorithmTypeState = AlgorithmType.Dijkstra;
  dropdownAlgorithmSelector.innerHTML = "Dijkstra";
}

wallNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Wall;
  dropdownNodeSelector.innerHTML = "Wall node";
}
startingNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Starting;
  dropdownNodeSelector.innerHTML = "Starting node";
}
targetNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Target;
  dropdownNodeSelector.innerHTML = "Target node";
}
clearNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Clear;
  dropdownNodeSelector.innerHTML = "Clear node";
}

clearOperation.onclick = () => {
  clearGrid();
}
visualizeOperation.onclick = () => {
  let parsedGrid = parseGrid();
  let path = loadAlgorithm(algorithmTypeState, parsedGrid)

  path.forEach(node => {
    paintNode(node[0], node[1]);
  });
}