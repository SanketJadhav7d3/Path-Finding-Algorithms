
var canvasHeight = 800;
var canvasWidth = 800;

var tile = 20;

var rows = canvasHeight / tile;
var columns = canvasWidth / tile;

var graph = new Array(rows);

var startNode = [0, 0];
var targetNode = [rows-1, columns-1];

// mouse pointer to know if mouse is pressed or not
var moveNode = false;
var whichNode = null;

// colors for start node
var colorStartNode = "#6960EC";
var colorTargetNode = "#8A2BE2";
var colorObstacleNode = "#F6EEF0";
var visualizationStarted = false;

function initGraph() {
    for (let i = 0; i < rows; ++i) {
        graph[i] = new Array(columns);
        for (var j = 0; j < columns; ++j) {
            graph[i][j] = 0;
        }
    }
}

// node [x , y]
function getNeighbors(node) {
    var [x, y] = node;
    
    var neighbors = [];

    if (x + 1 < rows) neighbors.push([x+1, y])

    if (x - 1 >= 0) neighbors.push([x-1, y])

    if (y + 1 < columns) neighbors.push([x, y+1])

    if (y - 1 >= 0) neighbors.push([x, y-1])

    if (x + 1 < rows && y + 1 < columns) neighbors.push([x+1, y+1]);

    if (x - 1 >= 0 && y - 1 >= 0) neighbors.push([x-1, y-1]);

    if (x + 1 < rows && y > 0) neighbors.push([x+1, y-1]);

    if (x > 0 && y + 1 < columns) neighbors.push([x-1, y+1]);

    return neighbors;
}

function getGridPos() {
    var x = mouseX;
    var y = mouseY;

    x = Math.floor(x / tile);
    y = Math.floor(y / tile);

    return [x, y];
}

function drawNode(node, color) {
    var [x, y] = node;
    fill(color);
    square(x*tile, y*tile, tile-2, 5);
}

function mouseDragged() {

    var [x, y] = getGridPos();

    if (x == startNode[0] && y == startNode[1]) {
        // to stop bliting obstacle nodes as well as to move the start node
        moveNode = true;
        whichNode = "startNode";
    }
     
    if (x == targetNode[0] && y == targetNode[1]) {
        moveNode = true;
        whichNode = "targetNode";
    }

    // if node dragged then do nothing
    if (moveNode) {
        if (graph[x][y] == 1)
            return;

        if (whichNode == "startNode") {
            startNode = [x, y];
            drawNode(startNode, colorStartNode);
        } else if (whichNode == "targetNode") {
            targetNode = [x, y];
            drawNode(targetNode, colorTargetNode);
        }

        drawGraph();

        if (visualizationStarted) {
            bfs();
        }

        return;
    }

    if (x >= rows || y >= rows) {
        return;
    }

    if (x == startNode[0] && y == startNode[1]) {
        return;
    }

    if (x == targetNode[0] && y == targetNode[1]) {
        return;
    }

    if (visualizationStarted) {
        drawGraph();
        bfs();
    }

    drawNode([x, y], colorObstacleNode);
    graph[x][y] = 1;
}

function mouseClicked() {
    if (visualizationStarted) {
        drawGraph();
        bfs();
    }
}

function doubleClicked() {
    
    var [x, y] = getGridPos();

}

function bfs() {

    var queue = [startNode];
    var visited = {startNode: null};


    while (queue.length != 0) {
        // get the element from queue
        var current = queue.shift();

        var [x, y] = current;

        // it is a obstacle or block
        if (graph[x][y] == 1)
            continue;

        var neighbors = getNeighbors(current);

        for (let i = 0; i < neighbors.length; ++i) {
            neighbor = neighbors[i];

            // if neighbor not in visited
            if (!(neighbor in visited)) {
                queue.push(neighbor);
                visited[neighbor] = current;
            }
        }
    }

    // construct path
    var curr = targetNode;
    var path = []

    if (!(visited.hasOwnProperty(targetNode))) {
        console.log("Can't reach target node");
        return;
    }

    while (curr != startNode) {
        path.push(curr);
        curr = visited[curr];
    }

    path.push(startNode);

    for (var i = 0; i < path.length; ++i) {
        var [x, y] = path[i];
        drawNode([x, y], "purple");
    }
}

function drawGraph() {
    noStroke();
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < columns; ++j) {
            if (graph[i][j] == 1) {
                drawNode([i, j], colorObstacleNode);
            } else
                drawNode([i, j], "#95B9C7");
        }
    }

    // draw startNode and targetNode
    drawNode(startNode, colorStartNode);
    drawNode(targetNode, colorTargetNode);
}

function startVisualization() {
    visualizationStarted = true; 
    bfs();
}

function mouseReleased() {
    moveNode = false;
} 

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    initGraph();

    drawGraph();

    var button = createButton("Start Visualization");

    button.mousePressed(startVisualization);
}

function draw() {
}
