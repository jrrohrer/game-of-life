const field = [];

// Here we create a field as a nested array of 100 x 100 boolean variables. By setting everything false, the code will consider all cells as dead. True on the other hand, would mean that a cell is alive.
for (let y = 0; y < 100; y++) {
  field[y] = [];
  for (let x = 0; x < 100; x++) {
    field[y][x] = false;
  }
}