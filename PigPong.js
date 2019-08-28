// canvas, var
const canvas = document.getElementById('canvas')
const	ctx = canvas.getContext('2d')
let keydown = []
let twoPlayers = true, ball_speed_i = 5, winner = 0,
	play = false, score_1 = score_2 = 0 ,background = new Image;

// input event

(function() {
	window.addEventListener('keydown',function(e) {
		keydown[e.keyCode] = true;
	},false);
	window.addEventListener('keyup',function(e) {
		keydown[e.keyCode] = false;
	},false)
})();

// objetos

const player1 = {
	x:20,y:250,width:20,height:100
},
player2 = {
	x:760,y:250,width:20,height:100
},
ball = {
	x:400,y:parseInt(Math.random()*570+15),radio:15,dir:1,angle:120
};

// sonidos

let snd_go = document.createElement('audio'),
snd_colision = document.createElement('audio');
snd_go.src = 'aud/Pick.wav';
snd_colision.src = 'aud/wood1.wav';

// imagenes

let img_blok = new Image;
img_blok.src = './imag/palet.png';

// random background 

function randomBackgroung() {
	let backs = new Array('./imag/background.jpeg','./imag/background2.jpeg','./imag/background3.jpeg','./imag/background4.png','./imag/background5.jpeg',);
	let i = parseInt(Math.random()*backs.length);
	background.src = backs[i];
}

function drawBackground() {
	ctx.drawImage(background,0,0,800,600);
}
function drawPlayers() {
	// draw objetos
	
	ctx.save();
	ctx.fillStyle = '#00cc66';
	if(winner != 0) ctx.globalAlpha = 0;
	ctx.drawImage(img_blok,player1.x,player1.y,player1.width,player1.height);
	ctx.drawImage(img_blok,player2.x,player2.y,player2.width,player2.height);
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.radio,0,7);
	ctx.fill();
	ctx.restore();

	// draw score
	
	ctx.save();
	ctx.shadowOffsetX = shadowOffsetY = 0;
	ctx.shadowBlur = 10;
	ctx.shadowColor = '#fff';
	ctx.font = '45px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	ctx.verticalAlign = 'middle';
	ctx.fillText(score_1,20,30);
	ctx.fillText(score_2,780,30);
	ctx.restore();
}
function movePlayers() {
	// mover player1 
	
	if(keydown[65]) player1.y -= 5;
	if(keydown[90]) player1.y += 5;
	if(player1.y < 0) player1.y = 0;
	if(player1.y > 500) player1.y = 500;

	// mover player2 
	
	if(twoPlayers) {
		if(keydown[38]) player2.y -= 5;
		if(keydown[40]) player2.y += 5;
	}
	if(!twoPlayers && ball.dir == 1) {
		if(ball.y - 50 < player2.y) player2.y -= 5;
		if(ball.y - 50 > player2.y) player2.y += 5;
	}
	if(player2.y < 0) player2.y = 0;
	if(player2.y > 500) player2.y = 500;

	ball.x += (3 + ball_speed_i)*ball.dir;
	ball.y += Math.sin(ball.angle)*(3 + ball_speed_i);
	if (ball.x + ball.radio > player2.x &&
		ball.y > player2.y &&
		ball.y < player2.y + player2.height
		)
	{
		ball.dir = -1;
		ball_speed_i += 0.25;
		let snd = snd_colision;
		snd.currentTime = 0;
		snd.play();
	}
	// player1
	
	if (ball.x - ball.radio < player1.x + player1.width &&
		ball.y > player1.y &&
		ball.y < player1.y + player1.height
		)
	{
		ball.dir = 1;
		ball_speed_i += 0.25;
		let snd = snd_colision;
		snd.currentTime = 0;
		snd.play();
	}
	// walls
	
	if(ball.y + ball.radio > 600 && winner == 0) {
		ball.angle = -ball.angle;
		let snd = snd_colision;
		snd.currentTime = 0;
		snd.play();
	}
	if(ball.y - ball.radio < 0 && winner == 0) {
		ball.angle = -ball.angle;
		let snd = snd_colision;
		snd.currentTime = 0;
		snd.play();
	}

	if(ball.x < 0 && winner == 0) {
		winner = 'PLAYER 2';
		score_2 += 1;
		ball.x = 500;
	}
	if(ball.x > 800 && winner == 0) {
		winner = 'PLAYER 1';
		score_1 += 1;
		ball.x = 500;
	}
}
// draw winner
	
function drawText() {
	if(winner != 0) {
		ctx.save();
		ctx.shadowOffsetX = shadowOffsetY = 0;
		ctx.shadowBlur = 10;
		ctx.shadowColor = '#fff';
		ctx.font = '40px Arial';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.verticalAlign = 'middle';
		ctx.fillText('THE WINNER IS '+winner,400,300);
		ctx.fillText('PRESS SPACE TO CONTINUE MATCH',400,340);
		ball.x = 0;
		ctx.restore();
		
		// restar game
		
		if(keydown[32]) {
			winner = 0;
			ball_speed_i = 6;
			ball.angle = 120;
			ball.x = 400;
			ball.y = 300;
			ball.dir = 1;
			player1.y = player2.y = 250;
			snd_go.play();
			randomBackgroung();
		}
	}

}
// pantalla principal inicial del juego

function getPlay() {
	ctx.save();
	ctx.shadowOffsetX = shadowOffsetY = 0;
	ctx.shadowBlur = 10;
	ctx.shadowColor = '#fff';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'center';
	ctx.verticalAlign = 'middle';
	ctx.font = '42px verdana';
	ctx.fillText('PigPong',400,200);
	ctx.font = '32px verdana';
	ctx.fillText('PRESS 1 FOR ONE PLAYER',400,300);
	ctx.fillText('PRESS 2 FOR TWO PLAYERS',400,380);
	ctx.font = '24px verdana';
	ctx.fillText('USE "A" y "Z" FOR UP y DOWN',400,332);
	ctx.fillText('USE "A" y "Z" FOR UP y DOWN PLAYER 1',400,412);
	ctx.fillText('USE UP y DOWN ARROWS  FOR  PLAYER 2',400,436);
	ctx.restore();
	
	//choose player 
	
	if(keydown[97] || keydown[49]){
		play = true;
		twoPlayers = false;
		snd_go.play();
		randomBackgroung();
	}
	// choose 2 players
	
	if(keydown[98] || keydown[50]){
		play = true;
		twoPlayers = true;
		snd_go.play();
	}
}
canvas.width = 800; canvas.height = 600;

randomBackgroung();

autoScale(canvas);

function main() {
	drawBackground(); 
	if(play) {
		movePlayers();
		drawPlayers();
		drawText();
	} else { 
		getPlay();
	}
}

setInterval(main,40);
