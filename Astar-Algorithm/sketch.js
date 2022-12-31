
var canvasHeight = 800;
var canvasWidth = 800;

// cell size
var tile = 20;

var rows = canvasHeight / tile;
var columns = canvasHeight / tile;

var graph = new Array(rows);

// colors
var startNodeColor = "#6960EC";
var endNodeColor = "#8A2BE2";
var nodeColor = "#95B9C7";
var obstacleNodeColor = "#F6EEF0";

var openSet = [];
var closedSet = [];

var startNode = undefined;
var endNode = undefined; 

var startVisualization = false;

var moveNode = false;
var whichNode = undefined;

function initGraph() {
    for (var i = 0; i < rows; ++i) {
        graph[i] = new Array(columns);
        for (var j = 0; j < columns; ++j) {
            graph[i][j] = new Node(i, j);
        }
    }
}

function drawGraph() {
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < columns; ++j) {
            graph[i][j].show(nodeColor);
        }
    }

    startNode.show(startNodeColor);
    endNode.show(endNodeColor);
}

function getGridPos() {
    var x = mouseX;
    var y = mouseY;

    x = Math.floor(x / tile);
    y = Math.floor(y / tile);

    return [x, y];
}

function doubleClicked() {
    var [x, y] = getGridPos();

    if (startNode.i == x && startNode.j == y) {
        moveNode = true;
    }
}

function mouseReleased() {
    moveNode = false;
}

function mouseDragged() {

    if (startVisualization)
        return;

    var [x, y] = getGridPos();

    if (startNode.i == x && startNode.j == y) {
        moveNode = true;
        whichNode = "startNode";
    }

    if (endNode.i == x && endNode.j == y) {
        moveNode = true;
        whichNode = "endNode";
    }


    if (moveNode && whichNode == "startNode") {
        startNode = graph[x][y];

        openSet[0] = startNode;

        console.log(startNode);

        drawGraph();

        return;
    } else if (moveNode && whichNode == "endNode") {
        endNode = graph[x][y];

        drawGraph();
        return;
    }

    if (x >= rows || x < 0) return;

    if (y >= columns || y < 0) return;

    // startNode and endNode cannot be block node
    if (graph[x][y] === startNode || graph[x][y] === endNode)
        return;

    graph[x][y].wall = true;

    graph[x][y].show();
}

function herustic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

function removeFromArray(arr, element) {
    var index = arr.indexOf(element);
    arr.splice(index, 1);
}

function setStartVisualization() {
    startVisualization = true;
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    
    initGraph();

    startNode = graph[0][0];
    endNode = graph[rows - 1][columns - 1];

    openSet.push(startNode);

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            graph[i][j].addNeighbors(graph);
        }
    }

    drawGraph();

    var button = createButton("Start Visualization");
    button.mousePressed(setStartVisualization);
}

function draw() {

    if (!startVisualization)
        return;

    if (openSet.length > 0) {
        var winner = 0;

        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f)
                winner = i;
        }

        var current = openSet[winner];

        if (current === endNode) {
            var path = [];
            var temp = current;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            for (var i = 0; i < path.length; i++) {
                path[i].show("purple");
            }

            console.log("Reached");
            noLoop();
            return;
        }

        removeFromArray(openSet, current);
        // closedSet contains all the nodes visisted
        closedSet.push(current);

        var neighbors = current.neighbors;

        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                var tempG = current.g + herustic(current, neighbor);
                var newPath = false;

                if (openSet.includes(neighbor)) {
                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tempG;
                    newPath = true;
                    openSet.push(neighbor);
                }

                if (newPath) {
                    neighbor.h = herustic(neighbor, endNode);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            }
        } 
    } else {
        console.log("Can't reach destination");
        noLoop();
        return;
    }

    drawGraph();

    for (var i = 0; i < openSet.length; ++i) {
        openSet[i].show("red");
    }
    
    for (var i = 0; i < closedSet.length; ++i) {
        closedSet[i].show(color(255, 0, 0, 80));
    }
}
