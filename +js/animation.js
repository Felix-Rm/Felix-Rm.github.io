var partCnt, minConnect, maxConnect, maxSpeed
var color = "#4286f4"


var _minSpeed = 0.5
var _maxSpeed = 6
var _minRange = 10
var _maxRange = 400
var _minPart = 70
var _maxPart = 400


var mouseX = 0
var mouseY = 0
var mousePressed = false

var PproQ = 20700

//get body and canvas -> set size
var canvas = document.querySelector('canvas')
var body = document.querySelector('body')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var ui = {
  x: 5,
  y: window.innerHeight - 115,
  w: 200,
  h: 115,
  pressed: false,
  relx: 0,
  rely: 0,
  show: true,
  sli1: 20,
  sli2: 10,
  sli3: 50,
  sli4: constrain(canvas.width * canvas.height / PproQ, 0, 200),
  update: false
}





function updateParticles() {
  for (var i = 0; i < partCnt; i++) {
    particles[i] = {
      x: random_range(0, canvas.width),
      y: random_range(0, canvas.height),
      xSpeed: random_range(-maxSpeed, maxSpeed),
      ySpeed: random_range(-maxSpeed, maxSpeed),
      size: random_range(1, 10),
      range: random_range(minConnect, maxConnect)
    }
  }
}

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ui.sli4 = constrain(canvas.width * canvas.height / PproQ, 0, 200)
  ui.x = 5
  ui.y = window.innerHeight - 115
  updateParticles()
});

var ctx = canvas.getContext('2d')
var particles = []


maxSpeed = eval(ui.sli1, _minSpeed, _maxSpeed)
minConnect = eval(ui.sli2, _minRange, _maxRange)
maxConnect = eval(ui.sli3, _minRange, _maxRange)
partCnt = _maxPart
minConnect >= maxConnect ? minConnect = maxConnect - 1 : maxSpeed
updateParticles()
partCnt = eval(ui.sli4, _minPart, _maxPart)
updateParticles()
requestAnimationFrame(draw)



function draw() {
  requestAnimationFrame(draw)

  ctx.fillStyle = '#222'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < partCnt; i++) {
    check_points(particles[i].x, particles[i].y, particles[i].size, particles[i].range)
    particles[i].x += particles[i].xSpeed;
    particles[i].y += particles[i].ySpeed;
    ctx.fillStyle = "#555"
    ctx.fillRect(particles[i].x, particles[i].y, particles[i].size, particles[i].size)
    if (particles[i].x > canvas.width)
      particles[i].x = 0
    if (particles[i].x < 0)
      particles[i].x = canvas.width
    if (particles[i].y > canvas.height)
      particles[i].y = 0
    if (particles[i].y < 0)
      particles[i].y = canvas.height
  }
  if (ui.show) {
    sett()
  }
}


function sett() {

  if (mousePressed && mouseX > ui.x + ui.w - 15 && mouseX < ui.x + ui.w && mouseY > ui.y && mouseY < ui.y + 15) {
    ui.show = false
  }

  if (mousePressed && mouseX > ui.x && mouseX < ui.x + ui.w && mouseY > ui.y + 30 && mouseY < ui.y + 40) {
    ui.sli1 = mouseX - ui.x
    ui.update = true
    maxSpeed = eval(ui.sli1, _minSpeed, _maxSpeed)
  }
  if (mousePressed && mouseX > ui.x && mouseX < ui.x + ui.w && mouseY > ui.y + 50 && mouseY < ui.y + 60) {
    ui.sli2 = mouseX - ui.x
    ui.update = true
    minConnect = eval(ui.sli2, _minRange, _maxRange)
  }
  if (mousePressed && mouseX > ui.x && mouseX < ui.x + ui.w && mouseY > ui.y + 70 && mouseY < ui.y + 80) {
    ui.sli3 = mouseX - ui.x
    ui.update = true
    maxConnect = eval(ui.sli3, _minRange, _maxRange)
  }
  if (mousePressed && mouseX > ui.x && mouseX < ui.x + ui.w && mouseY > ui.y + 90 && mouseY < ui.y + 100) {
    ui.sli4 = mouseX - ui.x
    ui.update = true
    partCnt = eval(ui.sli4, _minPart, _maxPart)
  }

  if (!mousePressed && ui.update) {
    minConnect >= maxConnect ? minConnect = maxConnect - 1 : maxSpeed
    updateParticles()
    ui.update = false
  }


  ctx.fillStyle = '#6666'
  ctx.fillRect(ui.x, ui.y, ui.w, ui.h)
  ctx.fillRect(ui.x, ui.y, ui.w, 15)

  ctx.fillStyle = color + "66"
  ctx.fillRect(ui.x + ui.w - 15, ui.y, 15, 15)
  ctx.fillRect(ui.x, ui.y + 30, ui.w, 10)
  ctx.fillRect(ui.x, ui.y + 50, ui.w, 10)
  ctx.fillRect(ui.x, ui.y + 70, ui.w, 10)
  ctx.fillRect(ui.x, ui.y + 90, ui.w, 10)

  ctx.fillStyle = color
  ctx.fillRect(ui.x, ui.y + 30, ui.sli1, 10)
  ctx.fillRect(ui.x, ui.y + 50, ui.sli2, 10)
  ctx.fillRect(ui.x, ui.y + 70, ui.sli3, 10)
  ctx.fillRect(ui.x, ui.y + 90, ui.sli4, 10)

  ctx.fillStyle = '#000'
  ctx.fillText('SPEED', ui.x + 5, ui.y + 39)
  ctx.fillText('MIN-Range', ui.x + 5, ui.y + 59)
  ctx.fillText('MAX-Range', ui.x + 5, ui.y + 79)
  ctx.fillText('PARTICLES', ui.x + 5, ui.y + 99)
}






// functions

function eval(a, b, c) {
  return b + (c - b) * (a - 0) / (ui.w - 0);
}

function constrain(x, y, z) {
  var s = 0;
  x < y ? s = x : s = y;
  x > z ? s = z : s = x;
  return Math.floor(s)
}

function check_points(x, y, size, range) {
  for (var i = 0; i < partCnt; i++) {
    if (distance(x, y, particles[i].x, particles[i].y) < range) {
      ctx.beginPath()
      ctx.moveTo(x + size / 2, y + size / 2)
      ctx.lineTo(particles[i].x + particles[i].size / 2, particles[i].y + particles[i].size / 2)
      ctx.strokeStyle = color
      ctx.stroke()
    }
  }
}

function random_range(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}

function mouseM(event) {
  mouseX = event.layerX
  mouseY = event.layerY
}

function mouseD() {
  mousePressed = true
}

function mouseU() {
  mousePressed = false
}