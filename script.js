var side = 11.25;
var grassArr = [];
var grassEaterArr = [];
var predArr = [];
var ponchArr = [];
var grassEater;
var gr;
var pred;
var ponch;
var count = 80, grassEatercount = 160, pcount = 60, ponchcount = 80;
var matrix = [];
var tx, ty, tx, ty;
var eatch;
var GodObject1, GodObject2, GodObject3, GodObject4;
function setup() {
	createCanvas(900, 900);
	background("grey");
	frameRate(10);
	var num = 80;
	matrix = new Array(num);
	var x = -1;
	for (var y = 0; y < matrix.length; y++) {
		matrix[y] = new Array(num);
		for (var x = 0; x < matrix[y].length; x++)
			matrix[y][x] = 0;
	}
	GodObject1 = new God(0, 0);
	GodObject2 = new God(0, 1);
	GodObject3 = new God(1, 0);
	GodObject4 = new God(1, 1);


	while (count > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (matrix[tx][ty] == 0) {
			gr = new Grass(tx, ty);
			grassArr.push(gr);
			count--;
		}
	}
	while (grassEatercount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < matrix[0].length && ty >= 0 && ty < matrix.length) {
			if (matrix[tx][ty] == 0) {
				grassEater = new grassEaterO(tx, ty);
				grassEaterArr.push(grassEater);
				grassEatercount--;
			}
		}

	}
	while (pcount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < matrix[0].length && ty >= 0 && ty < matrix.length) {
			if (matrix[tx][ty] == 0) {
				pred = new Predator(tx, ty);
				predArr.push(pred);
				pcount--;
			}
		}
	}
	while (ponchcount > 0) {
		tx = Math.floor(Math.random() * num);
		ty = Math.floor(Math.random() * num);
		if (tx >= 0 && tx < matrix[0].length && ty >= 0 && ty < matrix.length) {
			if (matrix[tx][ty] == 0) {
				ponch = new Poncho(tx, ty);
				ponchArr.push(ponch);
				ponchcount--;
			}
		}
	}
}

var cellch;
function keyReleased() {
	if (keyCode == 87) {
		if (GodObject1.moveUp() && GodObject3.moveUp()) {
			GodObject2.moveUp();
			GodObject4.moveUp();
		}
	}
	else if (keyCode == 83) {
		if (GodObject2.moveDown() && GodObject4.moveDown()) {
			GodObject1.moveDown();
			GodObject3.moveDown();
		}
	}
	else if (keyCode == 65) {
		if (GodObject1.moveLeft() && GodObject2.moveLeft()) {
			GodObject3.moveLeft();
			GodObject4.moveLeft();
		}
	}
	else if (keyCode == 68) {
		if (GodObject3.moveRight() && GodObject4.moveRight()) {
			GodObject1.moveRight();
			GodObject2.moveRight();
		}
	}
}

function draw() {
	
	background("grey");

	GodObject1.paintArr();
	GodObject2.paintArr();
	GodObject3.paintArr();
	GodObject4.paintArr();

	for (y = 0; y < grassArr.length; y++) {
		grassArr[y].spread();
	}
	for (y = 0; y < grassEaterArr.length; y++) {
		grassEaterArr[y].id = y;
		eatch = grassEaterArr[y].eat();
		if (!eatch)
			grassEaterArr[y].move();
		grassEaterArr[y].spread();
		grassEaterArr[y].die();
	}
	var predeatch;
	for (y = 0; y < predArr.length; y++) {
		predArr[y].id = y;
		predeatch = predArr[y].eat();
		if (!predeatch) {
			predArr[y].move();
			predArr[y].energy--;
		}
		predArr[y].spread();
		predArr[y].die();
	}
	var poncheatch;
	for (y = 0; y < ponchArr.length; y++) {
		ponchArr[y].id = y;
		poncheatch = ponchArr[y].eat();
		if (!poncheatch) {
			ponchArr[y].move();
			ponchArr[y].energy--;
		}
		ponchArr[y].setMaxEn();
		ponchArr[y].spread();
		ponchArr[y].backtocanspread();
		ponchArr[y].die();
	}
	background("grey");
	for (y = 0; y < matrix.length; y++)
		for (x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1 && grassArr.length > 0) {
				fill("green");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 2) {
				fill("yellow");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 3) {
				fill("red");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 4) {
				fill("blue");
				rect(x * side, y * side, side, side);
			}
			else if (matrix[y][x] == 5) {
				fill("black");
				rect(x * side, y * side, side, side);
			}
		}
}