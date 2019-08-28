function autoScale(id) {
	
	let d = document, E, iw = window.innerWidth,
		ih = window.innerHeight, X, Y, scale;
	
	if(typeof id == 'object') E = id;
	else E = d.getElementById(id);
	
	X = iw/2 - E.width/2; 
	Y = ih/2 - E.height/2;
	
	if (iw/E.width > ih/E.height) {
		scale = ih/E.height;
	} else if (iw/E.width < ih/E.height) {
		scale = iw/E.width;	
	} else {
		scale = 1;
	}
	
	E.style.transform = 'translate('+X+'px,'+Y+'px) scale('+scale+')';
	document.body.width = iw;
	
	window.onresize = function (event) {		
		autoScale(id);	
	}
	
}
