const grid = document.getElementById("main-grid");

const nRows = 40;
const nCols = 100;

/*let row = document.createElement("div");
row.className = "grid__row";

let cell = document.createElement("div");
row.className = "grid__cell";
row.appendChild(cell);

grid.appendChild(row);*/

for(let row = 0; row < nRows; row++) {
    let row = document.createElement("div");
    row.className = "grid__row";

    for(let col = 0; col < nCols; col++) {
        let cell = document.createElement("div");
        cell.className = "grid__cell";
        row.appendChild(cell);
    }

    grid.appendChild(row);
}