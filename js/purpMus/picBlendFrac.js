//based on https://editor.p5js.org/js6450/sketches/kWcChe550


//picBlending - plays fractures when clicked, mouseup stops

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

let cnv
let photo1,photo2
let a,b
let mouseState = true
let offPix = []

let voice
let word
let dur1
let dur2
let dry,time,dec
let atkInc = 0
let decInc = 0

let mouseCount = 0
let picState = true
let playState = false
let fracState = true
let melState = false
let holeCount = 0
let smallHoleCount = 0
let holeRand
let smallHoleRand

let tim1,tim2
let infoBox

let loadImg
let loadText
let loadStep
let mouseRand

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let load = new loadChoice()
	let loadThing = load.loader()
	pChoice = new piccer()
	let pic1
	let pic2
	layerChoice = random([0,1,2])

	if(loadStep === "scatter"){
		loadImg = loadImage(loadThing)
	} else if(loadStep === "cartography"){
		loadImg = loadImage(loadThing)
	} else if (loadStep === "gather"){
		loadText = loadStrings(loadThing)
	} else if (loadStep === "repurpose"){
		loadImg = loadImage(loadThing)
	} else {
		loadImg = loadImage(loadThing)
	}
	
	if(loadStep !== "cartography"){
		pic1 = pChoice.pic1()
		pic2 = pChoice.pic2()	
	}else if(loadStep === "cartography"){
		if(layerChoice === 0){
			pic1 = pChoice.pic1()
			pic2 = pChoice.mapPic()
		} else if(layerChoice === 1){
			pic1 = pChoice.mapPic()
			pic2 = pChoice.pic2()
		}else if(layerChoice === 2){
			pic1 = pChoice.mapPic()
			pic2 = pChoice.mapPic()
		}
	}
	photo1 = loadImage(pic1);
	photo2 = loadImage(pic2);	
}

function setup() {
	createCanvas(windowWidth-20,windowHeight-20);

	let td = select("#loader")

	if(loadStep === "scatter"){
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "repurpose"){
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "cartography"){
		loadImg.resize(width*1.5,0)
		image(loadImg,random(-width/2,0),random(-height/2,0))
		if(layerChoice === 0){
			photo1.resize(0,height)
			photo2.resize(width,0)
		}else if(layerChoice === 1){
			photo1.resize(width,0)
			photo2.resize(0,height)
		}else if(layerChoice === 2){
			photo1.resize(width,0)
			photo2.resize(width,0)
		}
	} else if (loadStep === "gather") {
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadText = join(loadText,"\n")
		td.html(loadText)
	} else {
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	noCursor();
	imageMode(CENTER)
	
	mouseRand = round(random(4,12))
	holeRand = round(random(4,16))
	smallHoleRand = round(random(4,16))

	let genPrint = sessionStorage.getItem("prevPlace")
	if(genPrint === "scatter"){
		voice = new fracture(1)
	} else if(genPrint === "repurpose"){
		voice = new fracture(0,random([0,1,2]))
	} else {		
		voice = new fracture(0,random([0,1,2]))
	}

	overMel = new melody(random(30,60),random(0.05,1),random(0.1,2))
	overMel.startup()
	voice.params()
		
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		
		image(photo1,width/2,height/2); 

		dur1 = voice.dur1()
		dur2 = voice.dur2()

	  	infoBox = createDiv("info")
		infoBox.class("info")
		infoBox.style("display", "none")
		infoBox.position(15,15)
		infoBox.mouseOver(infoOn)
		infoBox.mouseOut(infoOff)
		setTimeout(function(){
			infoBox.style("display", "block")
		},120000)
	},5000)
}

function mousePressed(){	
	let hole1,hole2
	if(fracState === true){
		hole1 = 100
		hole2 = 100
	} else if(fracState === false){
		hole1 = random(100)
		hole2 = random(100)
	}

	tint(255,255)
	image(photo2,mouseX+255,mouseY,hole1,hole2,mouseX,mouseY,hole1,hole2); 
	
	let place1 = mouseX+mouseY
	let place2 = mouseX+mouseY
	place1 = round(map(place1,0,(width+height),0,dur1))
	place2 = round(map(place2,0,(width+height),0,dur2))

	mouseCount++

	if(fracState === true){
		if(mouseButton === LEFT){
			voice.fracBegin(0)
		} else if(mouseButton === RIGHT){
			voice.fracBegin(1)
		}

		if(mouseCount === mouseRand){
			if(playState === false){
				voice.fracBPM(0,random([30,60]),0)
				voice.fracBPM(1,random([30,60]),0)
				mouseRand = round(random(4,12))
				mouseCount = 0
				playState = true
			} else if(playState === true){
				voice.fracBPM(0,0,1)
				voice.fracBPM(1,0,1)
				mouseRand = round(random(4,12))
				mouseCount = 0
				playState = false
			}
		}
		holeCount++
		voice.add(0,place1)
		voice.add(1,place2)
		smallHoleCount = 0
		smallHoleRand = round(random(4,16))

	} else if(fracState === false){
		voice.fracStop(0)
		voice.fracStop(1)
		if(mouseButton === LEFT){
			voice.loop(0)
			voice.delay(0,random(0.75),random(0.5))
		} else if(mouseButton === RIGHT){
			voice.loop(1)
			voice.delay(0,random(0.75),random(0.5))
		}

		if(mouseCount === mouseRand){
			if(playState === false){			
				voice.filt(0,random(100,500),random(5))
				voice.filt(1,random(100,500),random(5))
				mouseRand = round(random(4,12))
				mouseCount = 0
				playState = true
			} else if(playState === true){
				voice.filt(0,random(1000,5000),random(5))
				voice.filt(1,random(1000,5000),random(5))
				mouseRand = round(random(4,12))
				mouseCount = 0
				playState = false
				overMel.begin()
				melState = true
				setTimeout(function(){
					overMel.stop()
				},random(20000,120000))
			}
		}
		smallHoleCount++
		holeCount = 0
		holeRand = round(random(4,16))
	}
} 

function mouseReleased(){
	mouseState = true;
	if(fracState === true){
		voice.fracStop()
	} else if(fracState === false){
		voice.samplePause(0)
		voice.samplePause(1)
	}

	if(holeCount === holeRand){
		fracState = false
	} 
	if(smallHoleCount === smallHoleRand){
		fracState = true
	}

	if(melState === true && mouseButton === LEFT){
		atkInc += 0.05
		decInc += 0.05
		overMel.env(atkInc,decInc)
	}else if(melState === true && mouseButton === RIGHT){
		atkInc -= 0.05
		decInc -= 0.05
		overMel.env(atkInc,decInc)
	}
}


function infoOn(){
    setTimeout(function(){
        infoBox.html(randInfoMess[round(random(randInfoMess.length-1))])
    },2000) 
}

function infoOff(){
	infoBox.html("info")
}