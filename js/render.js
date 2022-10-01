const grid = document.getElementById("main-grid");
const gridWrapper = document.getElementById("grid-wrapper");
const dropDownMenu = document.getElementById("select-algo-menu");

const nRows = 45;
const nCols = 100;

const DrawModes = {
  Wall: 0,
  StartingNode: 1,
  TargetNode: 2,
  ClearNode: 3
}

// Generate grid
for (let row = 0; row < nRows; row++) {
  let row = document.createElement("div");
  row.className = "grid-row";

  for (let col = 0; col < nCols; col++) {
    let cell = document.createElement("div");
    cell.className = "grid-cell";

    cell.onmousemove = function (e) {
      e.preventDefault();
      if (e.buttons == 1) {
        cell.className = "grid-cell__wall";
      }
    };

    row.appendChild(cell);
  }

  grid.appendChild(row);
}

// TODO: Setup navbar