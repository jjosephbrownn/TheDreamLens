let zinChoice
let photo1

function preload() {
	let newZin = new ziner()
	let zin = newZin.whichZin()
	photo1 = loadImage(zin)
}

function setup() {
	cnv = createCanvas(windowWidth-20,windowHeight-30);
	let td = select("#loader")
 	td.class("loaded")
	photo1.resize(0,height)	
}

function draw(){
	image(photo1, (width/2) - (photo1.width/2),0);
}



