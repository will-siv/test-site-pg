
let updateBall;
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
        this.vx = Math.random() * 10;
        this.vy = 0;
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

const b = new Ball(c.width/2, c.height/2);

updateBall = function() {
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

    // draw ball at location
    ctx.strokeStyle = `rgb(255 255 255)`;
    ctx.beginPath();
    ctx.arc(b.x, b.y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    // update tracker
    let v = Math.sqrt((b.vy * b.vy) + (b.vx * b.vx));
    let kE = (1/2) * v * v;
    let pE = g * Math.abs(b.y - c.height);
    if (peakEnergy < kE + pE) peakEnergy = kE + pE;
    let text = `current y pos: ${b.y} | <br>
    current y vel: ${b.vy} <br>
    kinetic energy: ${kE} <br>
    potential energy: ${pE} <br>
    total energy: ${kE + pE} <br>
    max energy: ${peakEnergy}
    `;
    tracker.innerHTML = text;

    window.requestAnimationFrame(updateBall);
}

updateBall();

window.addEventListener("resize", onResize);
