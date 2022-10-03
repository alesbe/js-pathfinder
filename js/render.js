/* Grid selector */
const grid = document.getElementById("main-grid");
const gridWrapper = document.getElementById("grid-wrapper");

/* Node type selectors */
const wallNodeSelector = document.getElementById("wall-node-selector");
const startingNodeSelector = document.getElementById("starting-node-selector");
const targetNodeSelector = document.getElementById("target-node-selector");
const clearNodeSelector = document.getElementById("clear-node-selector");

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

/* States */
let nodeTypeState = 0;

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

  grid.appendChild(row);
}

// Setup navbar
wallNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Wall;
  console.log("Node type:", nodeTypeState);
}
startingNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Starting;
  console.log("Node type:", nodeTypeState);
}
targetNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Target;
  console.log("Node type:", nodeTypeState);
}
clearNodeSelector.onclick = (e) => {
  e.preventDefault();
  nodeTypeState = NodeState.Clear;
  console.log("Node type:", nodeTypeState);
}