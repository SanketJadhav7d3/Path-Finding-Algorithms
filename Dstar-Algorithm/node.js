

function Node(i, j) {
    this.i = i;
    this.j = j;
    this.tile = 20;
    this.wall = false;
    this.neighbours = [];

    this.show = function(color) {
        if (!this.wall && color) {
            fill(color);
        } else {
            fill('black');
        }
        noStroke();
        square(this.tile * i, this.tile * j, this.tile-2, 5);
    }

    this.addNeighbours = function(graph) {
        var i = this.i;
        var j = this.j;

        var rows = grid.length;
        var columns = grid[0].length;

        if (i + 1 < rows) this.neighbors.push(grid[i+1][j]);

        if (i > 0) this.neighbors.push(grid[i-1][j]);

        if (j + 1 < columns) this.neighbors.push(grid[i][j+1]);

        if (j > 0) this.neighbors.push(grid[i][j-1]);

        if (i + 1 < rows && j + 1 < columns) this.neighbors.push(grid[i+1][j+1]);

        if (i > 0 && j > 0) this.neighbors.push(grid[i-1][j-1]);

        if (i + 1 < rows && j > 0) this.neighbors.push(grid[i+1][j-1]);

        if (i > 0 && j + 1 < columns) this.neighbors.push(grid[i-1][j+1]);
    }
}
