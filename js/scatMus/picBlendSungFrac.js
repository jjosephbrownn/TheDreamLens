//based on https://editor.p5js.org/js6450/sketches/kWcChe550


//picBlending - plays samples simply when clicked, mouseup stops
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
let voc

let frac
let word
let dur1
let dur2
let dry,time

let mouseCount = 0
let picState = true
let mouseRand
let structure = 0

let tim1,tim2
let infoBox

let loadImg
let loadText
let loadStep

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

	rand = round(random(12))
	frac = new fracture(0,random([0,1,2]))
	voc = new vocoder(40)
	voc.startup(1)
	mouseRand = round(random(6,18))
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		
		image(photo1,width/2,height/2); 
		
		dur1 = frac.dur1()
		dur2 = frac.dur2()

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
	print(mouseCount,mouseRand,structure)

	tint(255,255)
	image(photo2,mouseX+255,mouseY,100,100,mouseX,mouseY,100,100); 

	let place1 = mouseX+mouseY
	let place2 = mouseX+mouseY
	place1 = round(map(place1,0,(width+height),0,dur1))
	place2 = round(map(place2,0,(width+height),0,dur2))
	frac.add(0,place1)
	frac.add(1,place2)

	mouseCount++

	if(mouseCount === mouseRand){
		structure++
		mouseCount = 0
		mouseRand = round(random(6,18))
		if(structure === 2){
			voc.stop(0)
			voc.stop(1)
			voc.inton(0)
			voc.inton(1)
		}else if(structure === 3){
			voc.intonStop(0)
			voc.intonStop(1)
			voc.stop(0)
			voc.stop(1)
			structure = 0
		}
	}

	if(structure === 0){
		if(mouseButton === LEFT){
			frac.fracBegin(0)
		} else if(mouseButton === RIGHT){
			frac.fracBegin(1)
		}
	}else if(structure === 1){
		if(mouseButton === LEFT){
			frac.fracBegin(0)
			voc.begin(0)
		} else if(mouseButton === RIGHT){
			frac.fracBegin(1)
			voc.begin(1)
		}
	}else if(structure === 2){
		if(mouseButton === LEFT){
			frac.samplePlayCont(0,random(-1,1))
			voc.intonPitch(0)
		} else if(mouseButton === RIGHT){
			frac.samplePlayCont(1,random(-1,1))
			voc.intonPitch(1)
		}
	}
	
} 

function mouseReleased(){
	if(structure === 0){
		if(mouseButton === LEFT){
			frac.fracStop(0)
		} else if(mouseButton === RIGHT){
			frac.fracStop(1)
		}
	} else if(structure === 1){
		if(mouseButton === LEFT){
			frac.fracStop(0)
			voc.stop(0)
		} else if(mouseButton === RIGHT){
			frac.fracStop(1)
			voc.stop(1)
		}
	} else if(structure === 2){
		if(mouseButton === LEFT){
			frac.samplePause(0)
		} else if(mouseButton === RIGHT){
			frac.samplePause(1)
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