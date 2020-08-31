//blends pics together
//crossfades two samples by EQ band, voice, sung or samples depending
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
let pChoice
let photo1,photo2
let alph = 0
let int1,int2
let overlay
let scl = 8
let mouseState = true
let drawState = false
let melState = false
let mouseCount = 0
let melCount = 0
let sub = 0
let spec
let inc = [0,0,0,0,0,0]
let nInc = [1,1,1,1,1,1]
let dragPosX,dragPosY
let infoBox
let newImg
let tempImg

let lGain1 = 20000
let hGain1 = 20000
let lGain2 = 20000
let hGain2 = 20000

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
	cnv = createCanvas(windowWidth-20,windowHeight-20);

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

	spec = new spectral()

	overMel = new melody(random(30,60),random(0.01,1),random(0.1,2))
	overMel.startup()

	rand = round(random(12,24))
	melRand = round(random(random(8,18)))
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		
		image(photo1,width/2,height/2)		
		spec.startup()

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
}


function mousePressed(){//click draw
	spec.play()
	dragPosX = mouseX
	dragPosY = mouseY
	mouseCount++
	if(mouseCount === rand){
		overMel.begin()
		melState = true
	}
}

function mouseReleased(){
	spec.stop()
	if(melState === true){
		overMel.env(random(0.01,1),random(0.1,2))
		melCount++
		overMel.env(random([0.01,0.5]),random([0.1,2]))
	}
	if(melCount === melRand){
		let subber = random([0,1])
		melCount = 0
		melRand = round(random(8,18))
		overMel.rhythm
		overMel.sub(subber)
		overMel.env(random([0.01,0.5]),random([0.1,2]))
	}

	if(mouseX < width/2 && mouseY < height/2){
		lGain1 = 20000
	}else if(mouseX > width/2 && mouseY < height/2){
		hGain1 = 20000
	}else if(mouseX > width/2 && mouseY > height/2 || mouseX < width/2 && mouseY > height/2){
		hGain2 = 20000
	}
	spec.pass(0,hGain1)
	spec.pass(1,lGain1)
	spec.pass(2,hGain2)
}	

function mouseDragged(){
	if(mouseButton === LEFT){
		if(mouseX < width/2 && mouseY < height/2){
			lGain1 -= 50
		}else if(mouseX > width/2 && mouseY < height/2){
			hGain1 -= 50
		}else if(mouseX > width/2 && mouseY > height/2 || mouseX < width/2 && mouseY > height/2){
			hGain2 -= 50
		}

		spec.pass(0,hGain1)
		spec.pass(1,lGain1)
		spec.pass(2,hGain2)
		tint(255,10)
		image(photo2,mouseX+255,mouseY,100,100,mouseX,mouseY,100,100); 
		
	} else if(mouseButton === RIGHT){
		let pan1 = constrain(map(mouseX,0,width,-1,1),-1,1)
		let pan2 = constrain(map(mouseY,0,height,-1,1),-1,1)
		spec.panner(0,pan1)
		spec.panner(1,pan2)
		spec.panner(2,pan1)
		tint(255,10)
		image(photo1,dragPosX,dragPosY,200,200,mouseX,mouseY,200,200)
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

