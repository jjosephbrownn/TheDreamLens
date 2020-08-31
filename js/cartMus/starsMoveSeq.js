// randomises start here - but would be cool if it remembered drawn star maps from earlier pages (see stars.js)
// looks mint, constrain map into square, stop movement if it comes up against edge

let randInfoMess = [
    "do you have any idea whats going on?", 
    "what are you looking at?", 
    "go away", 
    "you're nearly there", 
    "what now?", 
    "there's bound to be something round the next corner", 
    "keep searching",
    "what",
    "nothing here",
    "yep, same thing again",
    "no help here",
    "this looks good on our CV",
    "floating info boxes rule",
    "stop getting distracted",
    "worked it out yet?",
    "one of these days...",
    "behind you!",
    "no",
    "hi",
    "nah",
    "internet > real life",
    "apple is not good",
    "Musk will not save you",
    "eat the rich"
]
let cnv;
let x1 = []
let y1 = []
let ex = []
let ey = []

let inc1 = 1,inc2 =1 ,inc3 =1 ,inc4 =1 
let xmax,xmin,ymax,ymin

let diffX
let diffY

let starX = []
let starY = []
let mouseState = true

let stringLen
let detune = 0.1
let per;
let part = 1;

let strings
let noteMode = true
let toggle = true
let pos1,pos2,pos3 
let structure = 0
let mouseCount = 0
let rand

let infoBox

let loadImg
let loadText
let loadStep

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let load = new loadChoice()
	let loadThing = load.loader()
	
	if(loadStep === "scatter"){
		loadImg = loadImage(loadThing)
	} else if(loadStep === "cartography"){
		loadImg = loadImage(loadThing)
	} else if (loadStep === "gather"){
		loadText = loadStrings(loadThing)
	} else if (loadStep === "repurpose"){
		loadText = loadImage(loadThing)
	} else {
		loadImg = loadImage(loadThing)
	}
}


function setup() {
	cnv = createCanvas(windowWidth-20,windowHeight-20);

	let loops = parseInt(sessionStorage.getItem("numLoops"))

	let td = select("#loader")

	if(loadStep === "scatter"){
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "repurpose"){
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "cartography"){
		loadImg.resize(width*1.5,0)
		image(loadImg,random(-width/2,0),random(-height/2,0))
	} else if (loadStep === "gather") {
		loadText = join(loadText,"\n")
		td.html(loadText)
	} else {
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	let masterBPM = random(30,60)
	let masterLen = round(random(4,12))
	strings = new aphex(loops,round(random(36,48)),masterBPM,masterLen); //loops, oct, pace, len
	strings.startUp()
	stringLen = strings.length()

	thing = new board(masterLen,masterBPM)

	rand = round(random(4,12))
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		background(0);


		xmin = width/20
		xmax = width-xmin
		ymin = height/10
		ymax = height-ymin

		for(i=0;i<9;i++){
			x1[i] = Math.floor(Math.random()*(xmax-xmin+1)+xmin)
			y1[i] = Math.floor(Math.random()*(ymax-ymin+1)+ymin)
			ex[i] = x1[i]+((Math.random()*50)-25)
			ey[i] = y1[i]+((Math.random()*50)-25)
		};	

		for(i=0;i<100;i++){
			starX[i] = Math.random()*width
			starY[i] = Math.random()*height
			stroke(255)
			strokeWeight(1.5)
			point(starX[i],starY[i])
		}

		pos1 = 0
		pos2 = 0
		pos3 = 0

		mapper()
		setInterval(mapper,25)

		infoBox = createDiv("info")
		infoBox.class("info")
		infoBox.style("display", "none")
		infoBox.position(15,15)
		infoBox.mouseOver(infoOn)
		infoBox.mouseOut(infoOff)
		setTimeout(function(){
			infoBox.style("display", "block")
		},120000)
	},1000)
};

function mapper(){
	cnv.clear()
	background(0);
	
	for(i=0;i<100;i++){
		stroke(255)
		strokeWeight(1.5)
		point(starX[i],starY[i])
	}

	noFill()
	stroke(255)
	strokeWeight(1)
	line(x1[0],y1[0],x1[1],y1[1])
	line(x1[1],y1[1],x1[2],y1[2])
	line(x1[2],y1[2],x1[3],y1[3])
	line(x1[3],y1[3],x1[4],y1[4])
	line(x1[4],y1[4],x1[5],y1[5])
	line(x1[5],y1[5],x1[6],y1[6])
	line(x1[6],y1[6],x1[7],y1[7])
	line(x1[7],y1[7],x1[8],y1[8])

	line(x1[0],y1[0],ex[0],ey[0])
	line(x1[1],y1[1],ex[1],ey[1])
	line(x1[2],y1[2],ex[2],ey[2])
	line(x1[3],y1[3],ex[3],ey[3])
	line(x1[4],y1[4],ex[4],ey[4])
	line(x1[5],y1[5],ex[5],ey[5])
	line(x1[6],y1[6],ex[6],ey[6])
	line(x1[7],y1[7],ex[7],ey[7])

	for(i=0;i<8;i++){
		if(i%2 === 0){
			x1[i] += inc1
			y1[i] += inc2
			ex[i] += inc2
			ey[i] += inc1
		
			if(x1[i] > xmax ){
				x1[i] = xmax
			} else if(x1[i] < xmin ){
				x1[i] = xmin				
			}

			if(y1[i] > ymax ){
				y1[i] = ymax				
			} else if(y1[i] < ymin ){
				y1[i] = ymin				
			}

		} else if(i%2 === 1){
			x1[i] -= inc2
			y1[i] -= inc1
			ex[i] += inc1
			ey[i] += inc2

			if(x1[i] > xmax){
				x1[i] = xmax
			} else if(x1[i] < xmin){
				x1[i] = xmin
			}

			if(y1[i] > ymax){
				y1[i] = ymax
			} else if(y1[i] < ymin){
				y1[i] = ymin
			}
			
		}
	}


	for(i=0;i<100;i++){
		if(i%2 === 0){			
			starX[i] += inc1
			starY[i] += inc2
		} else if(i%2 === 1){			
			starX[i] += inc2
			starY[i] += inc1
		}
		
	}

	inc1 = map(pmouseX,0,width,0,2)-1
	inc2 = map(pmouseY,0,height,0,2)-1

}

function mouseDragged(){
	let mouseDec
	let mouseFreq
	let mouseSwell
	if(structure === 0 || structure === 1 || structure === 2 || structure === 3 ){
		mouseDec = map(mouseX,0,width,0.005,2)
		mouseFreq = map(mouseY,0,height,100,5000)
		strings.envChange(mouseDec)
		strings.freqChange(mouseFreq)
	} else if(structure === 4){
		mouseDec = map(mouseX,0,width,0.005,2)
		mouseFreq = map(mouseY,0,height,100,5000)
		mouseSwell = map(mouseX,0,width,0.005,2)
		strings.envChange(mouseDec)
		strings.freqChange(mouseFreq)
		strings.swell(mouseSwell)
	}
	
}

function mousePressed(){
	console.log(mouseCount,rand,structure)
	mouseCount++
	if(structure === 0){
		if(mouseButton === LEFT){
			strings.play(0)
		}if(mouseButton === RIGHT){
			strings.play(2)
		}
	}else if (structure === 1){
		strings.sampler(1)
		if(mouseButton === LEFT){
			strings.play(0)
		}if(mouseButton === RIGHT){
			strings.play(1)
			strings.play(2)
		}
	}else if (structure === 2){
		if(mouseButton === LEFT){
			strings.play(0)
		}if(mouseButton === RIGHT){
			strings.play(1)
			strings.play(2)
			thing.ostPlay()
		}
	}else if (structure === 3){
		if(mouseButton === LEFT){
			strings.pos(1)
		}if(mouseButton === RIGHT){
			thing.ostPlay()
		}
	}else if (structure === 4){
		if(mouseButton === LEFT){
			strings.pos(0)
			strings.play(0)
		}if(mouseButton === RIGHT){
			strings.pos(1)
			strings.pos(2)
			strings.play(1)
			strings.play(2)
		}
	}	
	if(mouseCount === rand){
		structure++
		mouseCount = 0
		rand = round(random(4,12))
	}
}

function mouseReleased(){
	if(structure === 0){
		if(mouseButton === LEFT){
			strings.stop(0)
		}if(mouseButton === RIGHT){
			strings.stop(2)
		}
	}else if (structure === 1){
		if(mouseButton === LEFT){
			strings.stop(0)
		}if(mouseButton === RIGHT){
			strings.stop(2)
			strings.stop(1)
		}
	}else if (structure === 2){
		if(mouseButton === LEFT){
			return null
		}if(mouseButton === RIGHT){
			thing.ostStop()
		}
	}else if (structure === 3){
		if(mouseButton === LEFT){
			strings.stop(0)
		}if(mouseButton === RIGHT){
			strings.stop(1)
			strings.stop(2)
			strings.pos(0)
			strings.pos(1)
			thing.ostStop()
		}
	}else if (structure === 4){
		if(mouseButton === LEFT){
			strings.stop(0)
		}if(mouseButton === RIGHT){
			strings.stop(1)
			strings.stop(2)
		}
	}

}

function infoOn(){
    console.log("on")
    setTimeout(function(){
        infoBox.html(randInfoMess[round(random(randInfoMess.length-1))])
    },2000)
    
}

function infoOff(){
	console.log("off")
	infoBox.html("info")
}


