const field = [];

// Here we create a field as a nested array of 100 x 100 boolean variables. By setting everything false, the code will consider all cells as dead. True on the other hand, would mean that a cell is alive.
for (let y = 0; y < 100; y++) {
  field[y] = [];
  for (let x = 0; x < 100; x++) {
    field[y][x] = false;
  }
}

// Next, we need a function to get any cell's neighbors. A cell is identified by its X and Y values, so we can subtract and add 1 to those values to get all neighbors. Remember that the field is a donut shape, so we need to catch the border cases as well:

const getNeighbors = (x, y, field) => {
  let prevX = x - 1;
  if (prevX < 0) {
    prevX = field[0].length -1;
  }

  let nextX = x + 1;
  if (nextX === field[0].length) {
    nextX = 0;
  }

  let prevY = y - 1;
  if (prevY < 0) {
    prevY = field.length - 1;
  }

  let nextY = y + 1;
  if (nextY === field.length) {
    nextY = 0;
  }

  return [
    field[prevY][prevX],
    field[prevY][x],
    field[prevY][nextX],
    field[y][prevX],
    field[y][nextX],
    field[nextY][prevX],
    field[nextY][x],
    field[nextY][nextX]
  ]
}

// This function returns an array of boolean values. The game's rules don't care about which neighbors are alive or dead, only how many of them are. The next step is to actally implement the rules. We need a function that takes x and y and returns the state of the cell for the next generation.

const getDeadOrAlive = (x, y, field) => {
  const neighbors = getNeighbors(x, y, field);
  const numberOfAliveNeighbors = neighbors.filter(Boolean).length;

  // Cell is alive

  if (field[y][x]) {
    if (numberOfAliveNeighbors < 2 || numberOfAliveNeighbors > 3) {
      // cell dies
      return false;
    } 
    // cell lives
    return true;
  }

  // Cell is dead
  if (numberOfAliveNeighbors === 3) {
    // Cell lives
    return true;
  }
  // Cell stays dead
  return false;
}

// Lets make a function to draw the entire field on a square canvas.

const scaleFactor = 8;

const drawFeild = field => {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d'); 

  // Fill entire field
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 100 * scaleFactor, 100 * scaleFactor);
  context.fillStyle = '#008000';

  // Fill alive cells as small rectangles
  field.forEach((row, y) => row.forEach((cell, x) => {
    if (cell) {
      context.fillRect(
        x * scaleFactor,
        y * scaleFactor,
        scaleFactor,
        scaleFactor
      );
    }
  }));
}

// Now lets add some control buttons to let the game automatically calculate and draw new generations each 80ms:

let nextFeild = field;

drawFeild(field);

const step = () => {
  nextFeild = nextFeild.map((row, y) => row.map((_, x) => {
    return getDeadOrAlive(x, y, nextFeild)
  }));
  drawFeild(nextFeild);
}

let interval = null;

document.querySelector('#step').addEventListener('click', step);
document.querySelector('#start').addEventListener('click', () => {
  interval = setInterval(step, 80);
});
document.querySelector('#stop').addEventListener('click', () => {
  clearInterval(interval);
});