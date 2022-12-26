
function Node(i, j) {
    this.i = i;
    this.j = j;
    this.tile = 20;
    this.distance = Infinity;
    this.isWall = false;
    this.isVisited = false;
    this.previous = undefined;

    this.neighbours = [];

    this.show = function(color) {
        if (this.isWall) {
            fill('#F6EEF0');
        } else {
            fill(color);
        }
        noStroke();
        square(i * this.tile, j * this.tile, this.tile - 2, 5);
    }

    this.addNeighbours = function(graph) {
        var rows = graph.length;
        var columns = graph[0].length;

        if (i + 1 < rows) this.neighbours.push(graph[i+1][j]);

        if (i - 1 >= 0) this.neighbours.push(graph[i-1][j]);

        if (j + 1 < columns) this.neighbours.push(graph[i][j+1]);

        if (j - 1 >= 0) this.neighbours.push(graph[i][j-1]);

        if (i > 0 && j > 0) this.neighbours.push(graph[i-1][j-1]);

        if (i + 1 < rows && j > 0) this.neighbours.push(graph[i+1][j-1]);

        if (i + 1 < rows && j + 1 < columns) this.neighbours.push(graph[i+1][j+1]);

        if (i > 0 && j + 1 < columns) this.neighbours.push(graph[i-1][j+1]);
    }
}

