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
let alph = 0
let int1,int2
let overlay
let choir
let newOct1,newOct2
let acdec,filt
let vox
let voxState = false
let mouseCount = 0
let rand
let structure = 0

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
    "/pages/repurpose/picTransClick.html",
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


	let oct = random(24,60)
	let bpm = random([30,60,90,120])
	let param = random([0,1,2])

	choir = new organa(bpm,oct,param)
	choir.startup()

	vox = new vocoder(bpm)
	vox.startup(0)

	rand = round(random(6,18))
	
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
	choir.floral()
	setTimeout(getAway, random(60000,120000))
}


function mousePressed(){
	if(voxState === true){
		if(mouseButton === LEFT){
			choir.floral()
			choir.pedBPM(random(30,60))
		}else if(mouseButton === RIGHT){
			choir.octSimp(0,newOct1)
			choir.octSimp(1,newOct2)
		}
		choir.paramChange(acdec,acdec,filt)		
	}
	
	else if(voxState === false){
		if(mouseButton === LEFT){
			choir.floral()
			choir.pedBPM(random(30,60))
			vox.begin(0)
			vox.begin(1)
		} else if(mouseButton === RIGHT){
			choir.octSimp(0,newOct1)
			choir.octSimp(1,newOct2)
			vox.stop(0)
			vox.stop(1)
		}
	}
	mouseCount++
	if(mouseCount === rand){
		structure++
		mouseCount = 0
		rand = round(random(6,18))
		if(structure === 1){
			vox.stop(0)
			vox.stop(1)
			vox.inton(0)
			vox.inton(1)
			voxState = true
		}
		if(structure === 2){
			structure = 0
			voxState = false
			vox.intonStop(0)
			vox.intonStop(1)
		}
	}
}

function draw(){
	let panx = map(mouseX,0,width,-1,1)
	let pany = map(mouseY,0,height,-1,1)
	panx = constrain(panx,-1,1)
	pany = constrain(pany,-1,1)
	choir.orgPan(0,panx)
	choir.orgPan(1,pany)

	newOct1 = round(map(mouseX,0,width,0,2))
	newOct2 = round(map(mouseY,0,height,0,2))

	acdec = map(mouseX,0,width,0.01,1)
	filt = map(mouseY,0,height,100,2000)
}

function fade(){
	let r = Math.random()*width
	let t = Math.random()*height

	alph = map(mouseX,0,width,0,255)
	tint(255,alph)
	image(photo2,r+255,t,100,100,r,t,100,100);

	let place1 = round(map(mouseX,0,width,0,1))
	let place2 = round(map(mouseY,0,height,0,1))

	choir.voices(0,place1)
	choir.voices(1,place2)
	if(voxState === true){
		vox.intonPitch(0)
		vox.intonPitch(1)
	}
}

function getAway(){
	choir.stop(0)
	choir.stop(1)
	choir.stop(2)
	setTimeout(function(){
		let chx = Math.round(Math.random()*(newScat.length-1))
	
		window.location.href = newScat[chx];
		sessionStorage.setItem("footsteps", "scatter")
	},2000)
}


