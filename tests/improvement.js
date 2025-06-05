const { loadAlgorithm } = require('../js/logic.js');

const blocked = [
  [0,0,1,0,3],
  [0,0,1,0,0],
  [2,0,1,0,0],
  [0,0,1,0,0],
  [0,0,0,0,0]
];

const shortcut = [
  [0,0,1,0,3],
  [0,0,1,0,0],
  [2,0,0,0,0],
  [0,0,1,0,0],
  [0,0,0,0,0]
];

console.log('Blocked path length:', loadAlgorithm(0, blocked).length);
console.log('Shortcut path length:', loadAlgorithm(0, shortcut).length);

