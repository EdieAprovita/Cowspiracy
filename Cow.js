CowFactory = function(cowName) {
	const validName = cowName.charAt(0).toUpperCase() + cowName.slice(1);
	const className = 'Cow' + validName;
	if( typeof window[className] != 'undefined' ) 
		const args = Array.prototype.slice.call(arguments,1);
		return new window[className](cowName);	
	}
}

AvailableCow = function(plantCow, position) {
	let offset = 20;
	this.cow = CowFactory(cowName);
	this.position = position;
	this.w = 50;
	this.h = 50;
	this.x = offset/2 + position * ( this.w + offset);
	this.y = offset/2;

	this.isReloading = false;
	this.reloadStarted = 0;
	this.reloadInterval = 5000;
}

AvailableCow.prototype.draw = function() {
	map.save();

	if( ! this.isReloading ) {
		map.fillStyle = this.isAvailable ? '#fff' : '#ccc';
		map.fillRect( this.x, this.y, this.w, this.w);
	} else {

		const lightH = parseInt(this.w * this.reloadPercent / 100);
		const darkH = this.w - lightH;
		const boundY = this.y + darkH;

		map.fillStyle = '#777';
		map.fillRect( this.x, this.y, this.w, darkH);
		
		map.fillStyle = this.isAvailable ? '#fff' : '#ccc';
		map.fillRect( this.x, boundY, this.w, lightH);
		
	}
	
	map.fillStyle = this.cow.color;
	map.fillRect( this.x + 10, this.y + 10, this.w - 20, this.w - 20 );
	
	map.font = 'bold 18px Arial';
	map.fillStyle = 'yellow';
	map.fillText( this.cow.price, this.x + 4, this.y + 16);
	map.font = '16px Arial';
	map.fillStyle = '#333	';
	map.fillText( this.cow.price, this.x + 5, this.y + 15);

	map.restore();
}

AvailableCow.prototype.update = function() {
	if( ! this.isReloading ) return;

	const now = new Date().getTime(),
	    start = this.reloadStarted,
	    end = this.reloadStarted + this.reloadInterval;

	if( now > end ) {
		this.isReloading = false;
	} else {
		this.reloadPercent = Math.round( (now - start) / (end - start) * 100 );
	}
}

AvailableCow.prototype.select = function() {
	Cows.reloadingItems++;
	this.isReloading = true;
	this.reloadStarted = new Date().getTime();
}

Cow = function(cowName) {
	this.name = cowName;
	this.price = 25;
	this.line = null;
	this.cell = null;
	this.w = 40;
	this.h = 50;
	this.isAlive = true;
	this.health = 100;
}

Cow.prototype.setPosition = function(l,c) {
	const levelOffset = Cows.levelOffset;
	this.line = l;
	this.c = c;
	this.y = l * 60 + levelOffset + 60*2/3;
	this.x = c * 60 + 60/2;
}
Cow.prototype.draw = function() {
	cxt.fillStyle = this.isDamaged ? '#fff' : this.color;
	cxt.fillRect( this.x - this.w/2, this.y - this.h, this.w,this.h);
	cxt.strokeRect( this.x - this.w/2, this.y - this.h, this.w,this.h);	

	//Display health
	cxt.font = '16px Arial';
	cxt.fillStyle = '#fff';
	cxt.fillText(this.health,this.x - 15,this.y - 20);
}

Cow.prototype.update = function() {}

Cow.prototype.die = function() {
	this.isAlive = false;	
	const newCows = [];
	for( let cell = 0; cell < 8; cell++ ) {
		if( Cows.cows[this.line][cell] !== this)
			newCows.push(Cows.cows[this.line][cell]);
		else
			newCows.push(undefined);
	}
	Cows.cows[this.line] = newCows;
	delete this;
}

Cow.prototype.setDamage = function(damage) {
	this.health -= damage;
	this.isDamaged = true;
	this.damageTime = new Date().getTime();
}

Cow.prototype.checkDamage = function(t) {
	if( this.isDamaged ) {
		if( t - 250 > this.damageTime ) {
			if( this.health > 0) {
				this.isDamaged = false;
			} else {
				this.die();
			}
		}
	}
}