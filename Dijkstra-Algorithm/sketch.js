
var canvasHeight = 800;
var canvasWidth = 800;

var tile = 20;

var rows = canvasHeight / tile;
var columns = canvasHeight / tile;

var startNode = undefined;
var targetNode = undefined;

var visualizationStarted = false;

// colors
var startNodeColor = "#6960EC";
var targetNodeColor = "#8A2BE2";
var nodeColor = "#95B9C7";

var unvisited = [];

function initGraph() {
    var graph = new Array(rows);

    for (var i = 0; i < rows; ++i) {
        graph[i] = new Array(columns);
        for (var j = 0; j < columns; ++j) {
            graph[i][j] = new Node(i, j);
        }
    }

    return graph;
}

function drawGraph(graph) {
    for (var i = 0; i < graph.length; ++i) {
        for (var j = 0; j < graph[0].length; ++j) {
            graph[i][j].show(nodeColor);
        }
    }

    startNode.show(startNodeColor);
    targetNode.show(targetNodeColor);
}

var graph = initGraph();

function getGridPos() {
    var x = mouseX;
    var y = mouseY;

    x = Math.floor(x / tile);
    y = Math.floor(y / tile);

    return [x, y];
}

function mouseDragged() {
    var [x, y] = getGridPos();

    if (x < 0 || x >= rows) return;

    if (y < 0 || y >= columns) return;

    graph[x][y].isWall = true;

    graph[x][y].show();
}

function startVisualization() {
    visualizationStarted = true;
}

function distance(a, b) {
    return Math.floor(dist(a.i, a.j, b.i, b.j));
}

function removeFromArray(arr, value) {
    var index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

function setup() {

    createCanvas(canvasWidth, canvasHeight);

    // for all nodes set their neighbours
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < columns; ++j) {
            graph[i][j].addNeighbours(graph);
            unvisited.push(graph[i][j]);
        }
    }

    startNode = graph[0][0];

    // startNode will have distance of 0
    startNode.distance = 0;
    
    // startNode is visited
    startNode.isVisited = true;

    targetNode = graph[30][30];

    drawGraph(graph);

    var button = createButton("Start Visualization");

    button.mousePressed(startVisualization);
}
function draw() {

    if (!visualizationStarted)
        return;

    if (unvisited.length > 0) {
        
        var winner = 0;

        for (var i = 0; i < unvisited.length; ++i) {
            if (unvisited[winner].distance > unvisited[i].distance) {
                winner = i;
            }
        }

        var current = unvisited[winner];

        if (current.isWall) {
            return;
        }

        if (targetNode.previous != undefined || current == targetNode) {
            // construct path
            var path = [];
            var u = targetNode;
            while (u != undefined) {
                path.push(u);
                u = u.previous;
            }

            for (var i = 0; i < path.length; ++i) 
                path[i].show('red');

            return;
        }

        var neighbours = current.neighbours;

        for (var i = 0; i < neighbours.length; ++i) {
            var neighbour = neighbours[i];

            var alt = current.distance + distance(current, neighbour);

            if (alt < neighbour.distance) {
                neighbour.distance = alt;
                neighbour.previous = current;
            }

            // write position
            createP(neighbour.distance).style('font-size', '10px').position(neighbour.i*tile + 10, neighbour.j*tile + 3);
        }

        removeFromArray(unvisited, current);
    }
}
