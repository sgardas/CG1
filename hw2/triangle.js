var content;
var result;
var canvas, ctx;
var sqrt3over2 = Math.sqrt(3/2);

window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	level = document.getElementById("level").value;
	init();
	makeFlake(level);
}

function snowflake(n, x1, y1, x2, y2) {
	if(n == 0) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	} else {
		var xlen = (x2 - x1) / 3,
		ylen = (y2 - y1) / 3,
		x3 = x1 + xlen,
		y3 = y1 + ylen,
		x4 = x3 + xlen / 2 + sqrt3over2 * ylen,
		y4 = y3 - sqrt3over2 * xlen + ylen / 2,
		x5 = x1 + 2 * xlen,
		y5 = y1 + 2 * ylen;
		snowflake(n-1, x1, y1, x3, y3);
		snowflake(n-1, x3, y3, x4, y4);
		snowflake(n-1, x4, y4, x5, y5);
		snowflake(n-1, x5, y5, x2, y2);
	}
}

function makeFlake(n) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(n < 0 || n > 8) {
		document.getElementById("error").innerHTML = "Value must be between 0 and 8.";
	} else {
		document.getElementById("error").innerHTML = "";
		snowflake(n, x1, y1, x2, y2);
		snowflake(n, x2, y2, x3, y3);
		snowflake(n, x3, y3, x1, y1);
	}
}

function init() {
	length = canvas.height < canvas.width ? canvas.height/(1.5) : canvas.width/(1.5);
	x1 = (canvas.width-length) / 2;
	y1 = (canvas.height-length * (2/3)) / 2;
	x2 = x1 + length;
	y2 = y1;
	x3 = (x1 + x2) / 2;
	y3 = y1+(length * sqrt3over2);
}

function changeLevel() {
	var level = document.getElementById("level").value;
	init();
	makeFlake(level);
} 