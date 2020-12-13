const size = 10000;
const iterPerDraw = 1000;
const time = 5000;

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth-25;
canvas.height = window.innerHeight-25;

var c = canvas.getContext("2d");

var vertices = new Array();

class Vertex {
    constructor() {
        this.x = randint(10, canvas.width-10);
        this.y = randint(10, canvas.height-10);
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        c.fill();
    }
    drawLineTo(next) {
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(next.x, next.y);
        c.stroke()
    }
}

function randint(minInclusive, maxExclusive) {
    return Math.floor(Math.random()*(maxExclusive-minInclusive)+minInclusive);
}

function distance(n1, n2) {
    var v1 = vertices[n1];
    var v2 = vertices[n2]
    var x = v2.x-v1.x;
    var y = v2.y-v1.y;
    return Math.sqrt(x*x + y*y);
}

function adjacent(e1, e2) {
    return e1.v1 == e2.v1 || e1.v2 == e2.v2 || e1.v1 == e2.v2 || e1.v2 == e2.v1
}

function resetCanvas() {
    c.clearRect(0, 0, canvas.width, canvas.height);
}

function displayDistance() {
    document.getElementById("distance").innerHTML = "Distance: " + Math.round(getDistance()).toString();
}

function displayElapsed() {
    document.getElementById("elapsed").innerHTML = "Elapsed: " + Math.round(elapsed).toString();
}

function getDistance() {
    var total = 0;
    for (var i = 0; i < size-1; i++) {
        total += distance(i, i+1)
    }
    return total
}

function draw() {
    resetCanvas()
    for (var i = 0; i < size-1; i++) {
        vertices[i].draw()
        vertices[i].drawLineTo(vertices[i+1]);
    }
    vertices[size-1].draw();
    displayDistance()
    displayElapsed()
    if (elapsed >= time) {
        stop()
    }
}

function init(func) {
    elapsed = 0;
    finishedElements = 0;
    for (var i = 0; i < size; i++) {
        vertices.push(new Vertex());
    }
    setInterval(draw, 1000/60);
    run(func)
}

function twoOpt() {
    var n1, n2;
    // pick two random nodes such that n1 <= n2
    do {
        n1 = randint(0, size-2);
        n2 = randint(0, size-1);
    } while (
        n1 >= n2 || distance(n1, n2) + distance(n1+1, n2+1) > distance(n1, n1+1) + distance(n2, n2+1)
    );

    vertices = [].concat(
        vertices.slice(0, n1+1),
        vertices.slice(n1+1, n2+1).reverse(),
        vertices.slice(n2+1));
}

function greedy() {
    if (finishedElements == size-2) {
        greedyStop();
        return;
    }
    var shortestDistance = 0;
    var closestIndex = 0;
    for (var i = finishedElements+1; i < size-1; i++) {
        let d = distance(finishedElements, i);
        if (i == finishedElements+1 || d < shortestDistance) {
            shortestDistance = d;
            closestIndex = i;
        }
    }
    let temp = vertices[finishedElements+1];
    vertices[finishedElements+1] = vertices[closestIndex];
    vertices[closestIndex] = temp;
    finishedElements++;
}

function greedyStop() {
    stop()
    run(twoOpt)
}

function bruteForce() {
    let original = vertices.slice();
    let d = getDistance();
    for (let i = 0; i < 10000; i++) {
        shuffleVertices();
        if (getDistance() <= d) {
            return;
        }
    }
    vertices = original;
}

function shuffleVertices() {
    for (let i = 1; i < size-2; i++) {
        let j = randint(i, size-1);
        temp = vertices[i];
        vertices[i] = vertices[j];
        vertices[j] = temp;
    }
}

function optimise(func) {
    var d1 = new Date();
    for (var i = 0; i < iterPerDraw; i++) {
        func()
    }
    var d2 = new Date();
    elapsed += d2.getTime() - d1.getTime();
}

function run(func) {
    runHandle = setInterval(() => optimise(func), 0);
}

function stop() {
    clearInterval(runHandle);
}

var elapsed = 0;
var finishedElements = 0;
var runHandle = null;

init(greedy)