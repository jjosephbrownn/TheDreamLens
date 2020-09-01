
let cnv;

let loadImg
let loadText
let loadStep

let topBars = []
let botBars = []
let lineLen
let xOff
let initX
let incX
let posX = 105
let radFrac
let dur1
let randPos,loPos,hiPos

function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight-20)
	background(255)

	lineLen = width-200
	xOff = lineLen/24
	initX = (lineLen/24) + 100
	incX = 0
	for(i=0;i<23;i++){
		topBars[i] = createVector(initX+incX,random([(height/2)-20,(height/2)-10,(height/2)-5]))
		botBars[i] = createVector(initX+incX,random([(height/2)+20,(height/2)+10,(height/2)+5]))
		incX += xOff
	}

	radFrac = new radio(3)
	setTimeout(function(){
		dur1 = radFrac.dur()
		randPos = random(100,width-100)
		loPos = randPos - 50
		hiPos = randPos + 50
		radFrac.radLoop()
	},2000)

	setInterval(cueChange,10000)

	let textWidth = width*0.7
	let textHeight = height/8

	let marginL = (width/2)-(textWidth/2)
	let marginT = height/8

	let title = createElement("h1", "Radio Oddments")
	title.class("textTitle")
	title.position(marginL, marginT)

	let caption = createDiv("Broadcasting all the bits left over")
	caption.style("width","66%")
	caption.style("text-align","center")
	caption.style("font-family","centaur")
	caption.style("font-size","25px")
	caption.position(marginL,height/3)
};

function draw(){
	clear()
	noStroke()
	rectMode(CENTER)
	fill("red")
	rect(posX,height/2,5,50)
	
	strokeWeight(4)
	stroke(0)
	line(100,height/2,width-100,height/2)
	line(100,(height/2)-25,100,(height/2)+25)
	line(width-100,(height/2)-25,width-100,(height/2)+25)
	for(i=0;i<23;i++){
		line(topBars[i].x,topBars[i].y,botBars[i].x,botBars[i].y)
	}
}

function cueChange(){
	randPos = random(100,width-100)
	loPos = randPos - 50
	hiPos = randPos + 50
	radFrac.radFilt(0)
}

function mouseDragged(){
	posX = constrain(mouseX,105,width-105)

	print(mouseX,loPos,hiPos)

	if(posX > loPos && posX < randPos){
		let filtFreq = map(mouseX,loPos,randPos,0,10000)
		radFrac.radFilt(filtFreq)
	}

	if(posX > randPos && posX < hiPos){
		let filtFreq = map(mouseX,randPos,hiPos,10000,0)
		radFrac.radFilt(filtFreq)
	}

	if(posX < loPos || posX > hiPos){
		radFrac.radFilt(0)
	}

}
