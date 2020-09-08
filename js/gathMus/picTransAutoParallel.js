//click for blending/transparency
//could be cool automated
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
    "one of these days/pages/scatter",
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
let alph = 0
let int1,int2
let overlay
let choir
let playState = true
let parState = false
let reverse = false
let mouseCount = 0
let rand
let pos = 0

let newScat = [
    "/pages/scatter/addOrg.html",
    "/pages/scatter/radio.html",
    "/pages/scatter/textOnly.html",
    "/pages/scatter/textScroll.html",
    "/pages/scatter/picHoles.html",
    "/pages/gather/perlinFlowColours.html",
    "/pages/gather/starsDraw.html",
    "/pages/gather/textOnly.html",
    "/pages/gather/textHighlight.html",
    "/pages/gather/textHoverMove.html",
    "/pages/repurpose/starsMove.html",
    "/pages/repurpose/textOnly.html",
    "/pages/repurpose/textTypingSarcasm.html",
    "/pages/repurpose/textRewrite.html", 
    "/pages/repurpose/picTransAuto",
    "/pages/cartography/addSites.html",
    "/pages/cartography/addLinden.html",
    "/pages/cartography/stars3DName.html",
    "/pages/cartography/textOnly.html",
    "/pages/cartography/mapWord.html"
 ];


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
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	noCursor();
	imageMode(CENTER)

	let oct = random([24,36,48,60])
	let bpm = random([30,60,90,120])
	let param = random([0,1,2])

	choir = new parallel(bpm,oct,param)
	choir.startup()
	choir.firmus()
	posLen = choir.cantLen()

	rand = round(random(4,12))
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		image(photo1,width/2,height/2);   
		setTimeout(timer, 3000)
	},5000)
}


function timer(){
	int1 = setInterval(fade,2000)
	choir.begin()
	choir.counterpoint()
	setTimeout(getAway, random(60000,120000))
}


function mousePressed(){
	if(parState === false){
		choir.counterpoint()
		choir.pedBPM(random(30,60))
		mouseCount++
		if(mouseCount === rand){
			choir.stop()
			parState = true
			mouseCount = 0
			rand = round(random(4,12))
		}
	} else if (parState === true){
		if(mouseButton === LEFT){
			reverse = false
		} else if(mouseButton === RIGHT){
			reverse = true
		}
	}
}

function fade(){
	let envInc
	let ampInc
	let filtInc
	if(playState === true){
		let r = Math.random()*width
		let t = Math.random()*height

		alph = map(mouseX,0,width,0,255)
		
		tint(255,alph)
		image(photo2,r+255,t,100,100,r,t,100,100);

		let place1 = round(map(mouseX,0,width,0,1))
		let place2 = round(map(mouseY,0,height,0,1))

		if(reverse = false){
			envInc = map(alph,0,255,0.01,2)
			ampInc = map(alph,0,255,-100,100)
			filtInc = map(alph,0,255,100,1000)
		} else if(reverse = true){
			envInc = map(alph,0,255,0.01,2)
			ampInc = map(alph,0,255,100,-100)
			filtInc = map(alph,0,255,1000,100)
		}

		if(parState === false){
			choir.voices(0,place1)
			choir.voices(1,place2)
		} else if(parState === true){
			choir.nextNote(0,pos,1)
			choir.nextNote(1,pos,1)
			choir.nextNote(2,pos,1)
			choir.paramAlter(envInc,ampInc,filtInc)
			pos++
			if(pos === posLen){pos = 0}
		}
	}
}

function getAway(){
	choir.stop()
	playState = false
	setTimeout(function(){
		let chx = Math.round(Math.random()*(newScat.length-1))
	
		window.location.href = newScat[chx];
		sessionStorage.setItem("footsteps", "scatter")

	},2000)
	
}

function infoOn(){
	setTimeout(function(){
		infoBox.html("have you tried pressing keys?")
	},2000)
	
}

function infoOff(){
	infoBox.html("info")
}


