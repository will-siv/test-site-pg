
let updateCanvas;
let ball = document.getElementById("ball");
const tracker = document.getElementById("tracker");
let peakEnergy = 0;

document.bgColor = "black";

const radius = 20;
let g = .1;

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.floor(Math.random() * 10);
        this.vy = 5;
    }
}

let c = document.getElementById("ball-canvas");

c.width = window.innerWidth;
c.height = window.innerHeight;

function onResize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

let ctx = c.getContext("2d");
let mouseX, mouseY;
let lastmX = 0, lastmY = 0;
let mouseVX, mouseVY;
let width = 50;

window.addEventListener("mousemove", e => {
    mouseX = e.x;
    mouseY = e.y;
});

const b = new Ball(c.width/2, c.height/2);

updateCanvas = function() {
    // clear canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // do logic for ball
    // every frame vy -= g due to gravity
    // if ball below ground on next frame vy = -vy
    if (b.y - radius < 0) {
        b.y = radius;
        b.vy = -b.vy;
    }
    if (b.x - radius < 0) {
        b.x = radius;
        b.vx = -b.vx;
    }
    if (b.y + radius > c.height) {
        b.y = c.height - radius;
        b.vy = -b.vy;
    }
    if (b.x + radius > c.width) {
        b.x = c.width - radius;
        b.vx = -b.vx;
    }
    b.x += b.vx;
    b.vy -= g;
    b.y -= b.vy;

    // do logic for paddle
    mouseVX = (mouseX - lastmX);
    mouseVY = (mouseY - lastmY);

    // draw ball at location
    ctx.strokeStyle = `rgb(255 255 255)`;
    ctx.beginPath();
    ctx.arc(b.x, b.y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // draw paddle at location
    ctx.linewidth = 24;
    ctx.beginPath();
    ctx.moveTo(mouseX - width/2, mouseY);
    ctx.lineTo(mouseX + width/2, mouseY);
    ctx.stroke();

    window.requestAnimationFrame(updateCanvas);
    lastmX = mouseX;
    lastmY = mouseY;

    tracker.innerHTML = `
    vx: ${mouseVX} <br>
    vy: ${mouseVY}
    `;
}

updateCanvas();
