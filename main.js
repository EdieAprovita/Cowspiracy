const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let frames = 0
let score = 0
let interval
const pipes = []

class Farm {
  constructor() {
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src ="./imag/pastizal.png"
    this.img.onload = () => {
      this.draw()
    }
  }
  draw() {
    this.x--
    if (this.x < -canvas.width) {
      this.x = 0
    }
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

class cow{
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.img = new Image()
    this.img.src ="./imag/vaquita.png"
""  }
  draw() {
    this.y++
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }
  fly() {
    this.y -= 20
  }
  isTouching(farmer) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    )
  }
}

class Farmer {
  constructor(y, width, height, type) {
    this.x = canvas.width
    this.y = y
    this.width = width
    this.height = height
    this.type = type
    this.imgTop = new Image()
    this.imgTop.src ="./imag/farmer.png"
    this.imgBot = new Image()
    this.imgBot.src ="./imag/farmer2 .png"
  }
  draw() {
    this.x--
    if (this.type) {
      ctx.drawImage(this.imgTop, this.x, this.y, this.width, this.height)
    } else {
      ctx.drawImage(this.imgBot, this.x, this.y, this.width, this.height)
    }
  }
}

const farm = new Farm()
const cow = new cow(20, 10)

function drawScore() {
  if (frames % 200 === 0) {
    score += 1
  }
  ctx.font = '24px Courier'
  ctx.fillText(score, canvas.width / 2, 50)
}

function buildingFarmers() {
  const min = 20
  const max = 100
  const pastizal = 100
  if (frames % 200 === 0) {
    const randomHeight = Math.floor(Math.random() * (max - min))
    farmers.push(new Pipe(0, 50, randomHeight, true))
    farmers.push(
      new Farmer(
        randomHeight + pastizal,
        50,
        canvas.height - randomHeight,
        false
      )
    )
  }
}

function drawFarmer() {
  pipes.forEach(farmer => {
    farmer.draw()
  })
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  frames++
  farm.draw()
  cow.draw()
  generateFarmers()
  drawFarmers()
  checkCollition()
  drawScore()
}

function start() {
  interval = setInterval(update, 1000 / 60)
}

function gameOver() {
  ctx.font = '50px Courier'
  ctx.fillText('Game Over', canvas.width / 2 - 100, 200)
  clearInterval(interval)
}

function checkCollition() {
  if (cow.y > canvas.height - cow.height) return gameOver()
  farmers.forEach(farmer => {
    if (cow.isTouching(farmer)) return gameOver()
  })
}

start()

document.onkeydown = e => {
  switch (e.keyCode) {
    case 32:
      cow.fly()
      break

    default:
      break
  }
}
