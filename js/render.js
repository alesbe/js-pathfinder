const grid = document.getElementById("main-grid");
const dropDownMenu = document.getElementById("select-algo-menu");

const nRows = 45;
const nCols = 100;

// Generate grid
for(let row = 0; row < nRows; row++) {
    let row = document.createElement("div");
    row.className = "grid-row";

    for(let col = 0; col < nCols; col++) {
        let cell = document.createElement("div");
        cell.className = "grid-cell";

        cell.onmousemove = function(e) {
            e.preventDefault();
            if(e.buttons == 1){
                cell.style.backgroundColor = "green";
                //cell.className = "grid-cell__wall";
            }
        }

        row.appendChild(cell);
    }

    grid.appendChild(row);
}

// Setup navbar
// TODO: fix this, use this menu to select algorithms!
for (const child of dropDownMenu.children) {
    child.onClick = (e) => {
        e.preventDefault();
        console.log("clicked!");
    }
}