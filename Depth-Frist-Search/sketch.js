
var canvasHeight = 1000;
var canvasWidth = 1000;

var tile = 20;

var rows = canvasHeight / tile;
var columns = canvasWidth / tile;

var graph = new Array(rows);

var startNode = [0, 0];
var targetNode = [49, 49];

// mouse pointer to know if mouse is pressed or not
var moveNode = false;
var whichNode = null;

// colors for start node
var colorStartNode = "#00FF00";
var colorTargetNode = "#1B02A3";
var colorObstacleNode = "#2B4BFF";
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
    
    var neighbours = [];

    if (x + 1 < rows) neighbours.push([x+1, y])

    if (x - 1 >= 0) neighbours.push([x-1, y])

    if (y + 1 < columns) neighbours.push([x, y+1])

    if (y - 1 >= 0) neighbours.push([x, y-1])

    if (x + 1 < rows && y + 1 < columns) neighbours.push([x+1, y+1]);

    if (x - 1 >= 0 && y - 1 >= 0) neighbours.push([x-1, y-1]);

    return neighbours;
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
            dfs();
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
        dfs();
    }

    drawNode([x, y], colorObstacleNode);
    graph[x][y] = 1;
}

function mouseClicked() {
    if (visualizationStarted) {
        drawGraph();
        dfs();
    }
}

function doubleClicked() {
    
    var [x, y] = getGridPos();

}

function dfs() {
    // push the start node to stack 
    // pop the top node as current node
    // add the current node to visited list
    // push the neighbours of current node to stack if not in visited

    var stack = [startNode];
    var visited = {startNode: null};

    while (stack.length != 0) {
        var current = stack.pop();

        var [x, y] = current;

        // if current node is block then continue with the next iteration
        if (graph[x][y] == 1)
            continue;

        var neighbors = getNeighbors(current);

        for (var i = 0; i < neighbors.length; ++i) {
            var neighbor = neighbors[i];
            if (!(neighbor in visited)) {
                stack.push(neighbor);
                visited[neighbor] = current;
            }
        }
    }

    var curr = targetNode;

    if (!(curr in visited)) {
        console.log("Can't reach target node");
        return;
    }

    var path = [];
    while (curr != startNode) {
        path.push(curr);
        curr = visited[curr];
    }

    path.push(startNode);

    for (var i = 0; i < path.length; ++i) {
        drawNode(path[i], 'red');
    }
}

function drawGraph() {
    noStroke();
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < columns; ++j) {
            if (graph[i][j] == 1) {
                drawNode([i, j], colorObstacleNode);
            } else
                drawNode([i, j], "#B8B9BB");
        }
    }

    // draw startNode and targetNode
    drawNode(startNode, colorStartNode);
    drawNode(targetNode, colorTargetNode);
}

function startVisualization() {
    visualizationStarted = true; 
    dfs();
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
