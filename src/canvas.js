const size = 10000;
const skip = 1000;

var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth-25;
canvas.height = window.innerHeight-25;

var c = canvas.getContext("2d");

var vertices = new Array();
var edges = new Array();

class Vertex {
    constructor() {
        this.x = randint(10, canvas.width-10);
        this.y = randint(10, canvas.height-10);
    }
    draw(next) {
        c.beginPath();
        c.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        c.fill();
        c.beginPath();
        c.moveTo(this.x, this.y);
        c.lineTo(next.x, next.y);
        c.stroke()
    }
}

function randint(minInclusive, maxExclusive) {
    return Math.floor(Math.random()*(maxExclusive-minInclusive)+minInclusive);
}

function init() {
    for (var i = 0; i < size; i++) {
        vertices.push(new Vertex());
    }
    setInterval(draw, 0);
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

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < size-1; i++) {
        vertices[i].draw(vertices[i+1]);
    }
    vertices[size-1].draw(vertices[size-1]);
    for (var i = 0; i < skip; i++) {
        var n1 = randint(0,size-2);
        var n2 = randint(n1+1,size-1);
        while (distance(n1, n2) + distance(n1+1, n2+1) > distance(n1, n1+1) + distance(n2, n2+1)) {
            n1 = randint(0, size-2);
            n2 = randint(n1+1, size-1);
        }
        vertices = [].concat(vertices.slice(0, n1+1), vertices.slice(n1+1, n2+1).reverse(), vertices.slice(n2+1))
    }
}

init()
