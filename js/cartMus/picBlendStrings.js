//based on https://editor.p5js.string/js6450/sketches/kWcChe550
//also cool if mousePressed is changed to draw for drag function
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

let strings
let posLen
let detune1 = 0,detune2 = 0
let pos1 = 0, pos2 = 0, pos3 = 0
let rand
let toggle = true

let mouseCount = 0
let picState = true
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

	let loops = parseInt(sessionStorage.getItem("numLoops"))

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
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	noCursor();
	imageMode(CENTER)

	rand = round(random(12))
	strings = new linden(loops,36,0.01,0.2,0); // make this param changeable
	strings.startUp()
	posLen = strings.length()
	
	setTimeout(function(){
		clear()
		td.class("loaded")
	
		image(photo1,width/2,height/2); 

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

	tint(255,255)
	image(photo2,mouseX+255,mouseY,100,100,mouseX,mouseY,100,100); 
	
	mouseCount++

	let place = mouseX + mouseY
	let voice = round(map(place,0,(width+height),0,2))

	let inc1 = round(map(mouseX,0,width,0,0.1))
	let inc2 = round(map(mouseY,0,height,0,0.1))
	detune1 += inc1
	detune2 += inc2
	
	if(picState === true){
		strings.begin()
		picState = false
	}

	if(toggle === true){
		if(voice === 0){
			strings.play1(pos1,detune1)
			pos1++
			if(pos1 > posLen){pos1 = 0}
		}else if(voice === 1){
			strings.play2(pos2,detune2)
			pos2++
			if(pos2 > posLen){pos2 = 0}
		}if(voice === 2){
			strings.play3(pos3,detune2)
			pos3++
			if(pos3 > posLen){pos3 = 0}
		}
	toggle = false
	} else if(toggle === false){
		let r = random([0,1])
		if(r === 0){
			strings.play1(pos1,detune1)
			pos1++
			if(pos1 > posLen){pos1 = 0}
		}
	toggle = true
	}

	if(mouseButton === RIGHT){
		strings.atkChange(inc1)
	} else if(mouseButton === LEFT){
		strings.atkChange(-inc1)
	}

	

	if(mouseCount === rand){
		let r = round(random())
		let q = round(random())
		strings.stop()
		strings.paramInit()
		rand = round(random(12))
		mouseCount = 0 
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
