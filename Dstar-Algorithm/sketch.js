
var canvasHeight = 800;
var canvasWidth = 800;

var tile = 20;

var rows = canvasHeight / tile;
var columns = canvasWidth / tile;

var graph;

function initGraph() {
    graph = new Array(rows);

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
            graph[i][j].show();
        }
    }
}

function setup() {

    createCanvas(canvasWidth, canvasHeight);

    initGraph();

    drawGraph()
}

function draw() {
}
