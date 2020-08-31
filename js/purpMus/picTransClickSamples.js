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
let rateState = true
let drumState = false
let structure = true
let middleState = false
let timerState = true
let endState = false
let mouseCount = 0
let rand
let spec
let songLen
let inc = [0,0,0,0,0,0]
let nInc = [1,1,1,1,1,1]
let dragPosX,dragPosY
let infoBox
let newImg
let tempImg
let dur1,dur2,dur3
let opat1,opat2,opat3
let post = 255

let loadImg
let loadText
let loadStep
let layerChoice

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
	newImg = createGraphics(width,height)
	tempImg = createGraphics(width,height)

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

	songLen = round(random(4,15))
	song = new songer(songLen)
	opat1 = song.origPat(0)
	opat2 = song.origPat(1)
	opat3 = song.origPat(2)
	rand = round(random(4,12))

	setTimeout(function(){
		clear()
		td.class("loaded")
	
		dur1 = song.dur(0)
		dur2 = song.dur(1)
		dur3 = song.dur(2)
		
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

function mousePressed(){//click draw
	dragPosX = mouseX
	dragPosY = mouseY
	if(middleState === false){
		if(mouseButton === LEFT){
			song.alter(round(random(15)),0)
		} else if(mouseButton === RIGHT){
			song.alter(round(random(15)),1)
		}

		mouseCount++
		if(rateState === true){
			if(mouseCount === rand){
				song.rates(0,1)
			} else if(mouseCount === rand*2){
				song.rates(1,1)
				rateState = false
				mouseCount = 0
				rand = round(random(4,12))
			}
		}else if(rateState === false){
			if(mouseCount === rand){
				song.rates(0,0)
				song.pattern(0,opat1)
			} else if(mouseCount === rand*2){
				song.rates(1,0)
				song.pattern(1,opat2)
				rateState = true
				mouseCount = 0
				rand = round(random(4,12))
				drumState = true
			}
		}

		if(drumState === true && structure === true){
			song.rates(2,1)
			song.pattern(2,round(random(14)))
			structure = false
			setTimeout(function(){
				song.rates(2,0)
				song.pattern(2,opat3)
				structure = false
				drumState = false
				middleState = true
				console.log("middleState")
			},random(5000,10000))
		}
	} else if(middleState === true){
		if(timerState === true){
			setTimeout(function(){
				middleState = false
				endState = true
				clear()
				newImg.clear()
				tempImg.clear()
				song.sampleStop(0)
				song.sampleStop(1)
				song.sampleStop(2)
				song.songStop(0)
				song.songStop(1)
				song.songStop(2)
			},10000)
			timerState = false

			song.sampleStop(0)
			song.sampleStop(1)
			song.sampleStop(2)
			song.songStop(0)
			song.songStop(1)
			song.songStop(2)
		}

		song.samplePlay(0,0,-1)
		song.samplePlay(1,0,1)
		song.samplePlay(2,0,0)
		
	}
}

function mouseReleased(){
	if(middleState === false){
		if(mouseButton === RIGHT){
			song.sampleStop(0)
			song.sampleStop(1)
			song.sampleStop(2)
			song.songStop(random([0,1,2]))
			if(mouseX > width/2){
				song.songBegin(2)
			} else if(mouseX < width/2){
				song.songBegin(1)
			}
			if(mouseY > height/2){
				song.songBegin(0)
			} else if(mouseY < height/2){
				song.songBegin(0)
				song.songBegin(1)
			}

			if(endState === false){
				newImg.image(photo1,mouseX,mouseY,100,100,dragPosX,dragPosY,100,100)
				newImg.filter(POSTERIZE,post)
			}
			
		} else if(mouseButton === LEFT){
			song.songStop(0)
			song.songStop(1)
			song.songStop(2)
			song.sampleStop(random([0,1,2]))
			if(mouseX > width/2){
				song.samplePlay(2,map(mouseX,0,width,0,dur3),random(-1,1))
			} else if(mouseX < width/2){
				song.samplePlay(1,map(mouseX,0,width,0,dur2),random(-1,1))
			}
			if(mouseY > height/2){
				song.samplePlay(0,map(mouseY,0,height,0,dur1),random(-1,1))
			} else if(mouseY < height/2){
				song.samplePlay(0,map(mouseY,0,height,0,dur1),random(-1,1))
				song.samplePlay(1,map(mouseY,0,height,0,dur2),random(-1,1))
			}

			newImg.image(photo1,mouseX,mouseY,100,100,dragPosX,dragPosY,100,100)
		}
	} else if(middleState === true){
		tempImg.image(photo1,mouseX,mouseY,100,100,dragPosX,dragPosY,100,100)
		tempImg.blend(photo2,mouseX,mouseY,100,100,dragPosX,dragPosY,100,100,SCREEN)

		song.sampleStop(0)
		song.sampleStop(1)
		song.sampleStop(2)
	}
	
}

function mouseDragged(){
	if(middleState === false && endState === false){
		post = map((mouseX+mouseY),0,(width+height),5,10)
		tempImg.clear()
		tempImg.image(photo1,mouseX,mouseY,100,100,dragPosX,dragPosY,100,100)
	} else if(middleState === true){
		return null
	}
}

function draw(){	
	if(middleState === false && endState === false){
		image(photo1,width/2,height/2);
		image(tempImg,width/2,height/2)
		image(newImg,width/2,height/2)
	} else if (middleState === true && endState === false){
		newImg.image(photo1,width/2,height/2);
		newImg.blend(photo2,0,0,photo2.width,photo2.height,0,0,photo1.width,photo2.height, DARKEST)
		image(newImg,width/2,height/2)
		image(tempImg,width/2,height/2)
	}

	if(endState === true){
		image(photo2,width/2,height/2);
		blend(photo1,width/2,height/2,photo2.width,photo2.height,width/2,height/2,photo1.width,photo2.height, DARKEST)
		image(tempImg,width/2,height/2)
		image(newImg,width/2,height/2)
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

