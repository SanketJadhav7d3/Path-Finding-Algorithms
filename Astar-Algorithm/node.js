
function Node(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.tile = 20;

    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    this.show = function(color) {
        if (this.wall) {
            fill('#F6EEF0');
        } else {
            fill(color)
        }
        noStroke();
        square(this.i*this.tile, this.j*this.tile, this.tile-2, 5);
    }

    this.addNeighbors = function(grid) {
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

        if (i + 1 < rows && j > 0) this.neighbors.push(grid[i+1][j]);

        if (i > 0 && j + 1 < columns) this.neighbors.push(grid[i-1][j+1]);
    }
}
