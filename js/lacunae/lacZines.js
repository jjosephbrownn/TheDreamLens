let zinChoice
let photo1
let newZin
let mouseCount = 0
let getOut

function preload() {
	newZin = new ziner()
	let zin = newZin.whichZin()
	photo1 = loadImage(zin)
}

function setup() {
	cnv = createCanvas(windowWidth-20,windowHeight-30);
	let td = select("#loader")
 	td.class("loaded")
	getOut = select("#mymodal")//selecting modal div
}

function draw(){
	photo1.resize(0,height)
	image(photo1, (width/2) - (photo1.width/2),0);
}

function mousePressed(){
	mouseCount++
	if(mouseButton === LEFT){
		let zin = newZin.nextPage(0)
		photo1 = loadImage(zin)
		clear()
	} else if(mouseButton === RIGHT){
		let zin = newZin.nextPage(1)
		photo1 = loadImage(zin)
		clear()
	}
	if(mouseCount === 3){
		setTimeout(function(){
			getOut.style("display", "block")
		},2000)
		
	}
}



