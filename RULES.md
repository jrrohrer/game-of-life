## The Rules of the Game

You can think of the Game of Life as a sandbox. Originally, no cell is alive. Alive cells can be either set by the user or sprinkled in randomly. In each game tick, the game determines which cells are alive and which ones are dead in the next generation. This step is then repeated until the user interrupts. 

To determine the next generation, the game looks at each cell's neighbors and applies a set of rules.
* If a cell was alive in the current generation:
  * If it has less than 2 neighbors (dies of loneliness) or more than 3 neighbors (dies of overpopulation), otherwise it stays alive
* If a cell was dead in the current generation:
  * If it has exactly 3 alive neighbors, it will become alive in the next generation, otherwise it stays dead.

The next generation needs to be calculated all at once. If the game sets cell 1 as 'alive' that was dead in the previous generation, and starts applying the rules to cell 2, it needs to consider the original 'dead' status of cell one when deciding what to do with cell 2.

What happens with the border of the field, if we're talking about a square grid? Two options:
1. Consider the border of the field as always dead
2. Or the world is actually formed like a donut (or torus)
  (Whatever leaves will re-enter on the other side. Left to right, top to bottom, and vice versa)