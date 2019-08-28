//Variables
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
const button = document.querySelector("#star-buttom")
let bucle
const speed = 5
const width = canvas.width
const height = canvas.height
let scorep1 = 0
let scorep2 = 0
const tamPaleta = 75
const superficie = canvas.height-tamPaleta 
//Clases

class Field {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "./imag/pastizal.png"
    this.img.onload = () => {
    this.draw()
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    ctx.drawImage(
    this.img,
    this.x + canvas.width,
    this.y,
    this.width,
    this.height
    )
    
  }
}


class Base {
  choque(obj) {
    if(this.fondo < obj.y || this.y > obj.fondo || this.derecha < obj.x || this.x > obj.derecha) {
      return false
    }else {
      return true
    }
  }
}
class Score {
  constructor(x) {
    this.x = x
    this.y = 25
    this.score = 0
  }
  draw() {
    ctx.font = "25px Arial"
    ctx.fillText(this.score.toString(), this.x,this.y)
  }
}
class Ball  {
  constructor() {
    this.t = 25
    this.x = Math.floor(Math.random() * (canvas.width - this.t))
    this.y = Math.floor(Math.random() * (canvas.height - this.t))
    this.xdir = speed
    this.ydir = speed
    this.p1 = new Score(25)
    this.p2 = new Score(575)
    this.img = new Image()
    this.img.src = "./imag/poop.png"
    
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  choqueV() {
    if(this.y <= 0 || this.y >=(canvas.height - this.t)) {
      this.ydir = -this.ydir
    }
  }
  choqueH(){
    if(this.x <=0) {
      this.xdir = -this.xdir
      scorep2++
      this.p2.score = scorep2
    }
    if(this.x >= (canvas.width - this.t)) {
      this.xdir = -this.xdir
      scorep1++
      this.p1.score = scorep1
    }
  }
  move() {
    this.x+=this.xdir
    this.y+=this.ydir
    this.fondo = this.y + this.t
    this.derecha = this.x + this.t
    this.choqueV()
    this.choqueH()
  }
  draw() {
    ctx,fillRect(this.x,this.y,this.t,this.t)
    this.p1.draw()
    this.p2.draw()
  }
}

class Paletas {
  constructor(x) {
    this.x = x
    this.w = 25
    this.h = tamPaleta
    this.y = Math.floor(Math.random()* superficie)
    this.dir = 0
  }
  draw() {
    ctx.fillRect(this.x,this.y,this.w,this.h)
  }
  move() {
    this.y+=this.dir
    this.derecha = this.w + this.x
    this.fondo = this.h + this.y 
    if(this.y <= 0) {
      this.y = 0
      this.dir = 0
    }
    if(this.y >= superficie) {
      this.y = superficie
      this.dir= 0
    }
  }
}

//Objetos
const ball = new Ball()
const player1 = new Paletas(30)
const player2 = new Paletas(545)

//Funciones de control
function movePaletas(event) {
  let tecla = event.keyCode
  if(tecla == 38) {
    player2.dir = -speed 
  }
  if(tecla ==40) {
    player2.dir = speed
  }
  if(tecla == 87) {
    player1.dir = -speed
  }
  if(tecla == 83) {
    player1.dir = speed
  }
}

function stopPaletas(event)  {
  let tecla = event.keyCode
  if(tecla == 38 || tecla == 40) {
    player2.dir = 0
  }
  if(tecla == 87 || tecla == 83) {
    player1.dir = 0
  }
}

function choque() {
  if(ball.choque(player1) || ball.choque(player2)) {
    ball.xdir = -ball.xdir
  }
}

//Funciones globales 

function draw() {
  ctx.clearReact(0,0,canvas.width,canvas.height)
  ball.draw()
  player1.draw()
  player2.draw()
}

function frame(){
  ball.move()
  player1.move()
  player2.move()
  draw()
  choque()
  bucle = requestAnimationFrame(frame)
}

button.onclick = function () {
document.querySelector("modal")  
frame()
}

function gameOver() {
  if(scorep1 === 5 || scorep2 === 5 ) {
    ctx.font = "65px Ariel"
  ctx.fillText("Game Over!!!!", canvas.width / 2 -100, 200)
  }
  
}