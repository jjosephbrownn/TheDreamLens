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
let strings
let pos1 =0, pos2 = 0,pos3 = 0
let posLen
let detune1=0,detune2=0
let playState = false
let fastState = false
let clicker = true
let interactState = true
let dragPic = false
let rand
let mouseCount = 0
let newInt
let place1,place2
let inc1,inc2
let dragW
let dragH

let newScat = [
	"../starsFade.html",
    // "../textAddNotes.html",
    "../textOnly.html",
    "../textScroll.html",
    "../textTypingSamples.html",
    "../perlinFlowColours.html",  
    "../picTransAuto.html"
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

	strings = new linden(loops,0.1,0.1)//change this
	strings.startUp()
	posLen = strings.length()-1

	rand = round(random(4,12))

	setTimeout(function(){
		clear()
		td.class("loaded")

		image(photo1,width/2,height/2); 
		setTimeout(timer, 3000)

	},1000)
}

function adder(total, num) {
  return total + num;
}

function timer(){
	int1 = setInterval(fade,2000)
	setTimeout(getAway, random(60000,120000))
}

function mousePressed(){
	mouseCount++
	if(mouseCount === rand){
		playState = true
	} 
	if(mouseCount === rand*2 && clicker === true){
		fastState = true
		clicker = false
		newInt = setInterval(newTimer,random(500,1000))
	}
	if(mouseCount === rand*3 && clicker === false){
		clearInterval(newInt)
		newInt = setInterval(lastTimer,random(500,1000))
		interactState = false
		strings.paramChange(0,0.05,0.5)
		strings.paramChange(1,0.05,0.5)
		strings.paramChange(2,0.05,0.5)
	}
}


function mouseDragged(){
	if(interactState === true){
		if(dragPic === false){
			if(mouseButton === LEFT){
				let sp = map(mouseX,0,width,-1,1)
				let satk = map(mouseX,0,width,0.01,2)
				let sdec = map(mouseY,0,height,0.01,2)
				strings.panner(0,constrain(sp,-1,1))
				strings.paramChange(0,satk,sdec)
			} else if(mouseButton === RIGHT){
				let sp = map(mouseY,0,height,-1,1)
				let satk = map(mouseX,0,width,0.01,2)
				let sdec = map(mouseY,0,height,0.01,2)
				strings.panner(1,constrain(sp,-1,1))
				strings.paramChange(1,satk,sdec)
			}
		} else if(dragPic === true){
			clear()
			tint(255,255)
			image(photo1,width/2,height/2);
			image(photo2,mouseX+255,mouseY,dragW,dragH,mouseX,mouseY,100,100);
			tint(255,alph)
			console.log(dragPic)
		}
	} else if(interactState === false){
			return null
	}	
	
}

function newTimer(){
	setTimeout(function(){
		strings.play1(pos1,0,round(random([0.5,1,2])))
	},random(100,500))

	setTimeout(function(){
		strings.play2(pos2,0,round(random([0.5,1,2])))
	},random(100,500))

	setTimeout(function(){
		strings.play3(pos3,0,round(random([0.5,1,2])))
	},random(100,500))
	
	pos1++
	pos2++
	pos3++
	if(pos1 > posLen){pos1 = 0}
	if(pos2 > posLen){pos2 = 0}
	if(pos3 > posLen){pos3 = 0}
	console.log("newTimer")
}

function lastTimer(){
	
	strings.play1(pos1,detune1,round(random([0.5,1,2])))
	strings.play2(pos2,detune2,round(random([0.5,1,2])))
	strings.play3(pos3,detune2,round(random([0.5,1,2])))
	
	pos1++
	pos2++
	pos3++
	if(pos1 > posLen){pos1 = 0}
	if(pos2 > posLen){pos2 = 0}
	if(pos3 > posLen){pos3 = 0}

	console.log("lastTimer")
	
	setTimeout(function(){
		clearInterval(newInt)
		newInt = setInterval(finalTimer,2000)
		interactState = true
		strings.distSet(0)
		strings.distortion(0.25,"none")
		dragPic = true
	},5000)
}

function finalTimer(){
	strings.play1(pos1,detune1,round(random([0.5,1,2])))
	pos1++
	if(pos1 > posLen){pos1 = 0}
}

function fade(){
	if(dragPic === false){
		let r = Math.random()*width
		let t = Math.random()*height
		
		alph = map(mouseX,0,width,0,255)
		tint(255,alph)
		image(photo2,r+255,t,100,100,r,t,100,100);
	} else if(dragPic === true){
		alph = random(0,255)
		dragW = map(mouseX,0,width,5,100)
		dragH = map(mouseY,0,height,100,5)
	}
	let q = random([0,1])

	place1 = round(map(mouseX,0,width,0,1))
	place2 = round(map(mouseY,0,height,0,1))

	inc1 = round(map(mouseX,0,width,0,0.1))
	inc2 = round(map(mouseY,0,height,0,0.1))
	detune1 += inc1
	detune2 += inc2

	if(fastState === false){
		if(playState === true){
			strings.paramChange(2,random(0.01,2),random(0.01,2))
			if(q === 0){
				setTimeout(function(){
					strings.play1(pos1,detune1,1)
					strings.play2(pos2,detune2,1)
					pos1++
					pos2++
					if(pos1 > posLen){pos1 = 0}
					if(pos2 > posLen){pos2 = 0}
				},random(100,1000))
				
			} else if (q === 1){
				setTimeout(function(){
					strings.play1(pos1,detune1,1)
					strings.play3(pos3,detune2,1)
					pos1++
					pos3++
					if(pos1 > posLen){pos1 = 0}
					if(pos3 > posLen){pos3 = 0}
				},random(100,1000))
			}
		}else if(playState === false){
			if(q === 0){
				strings.play1(pos1,detune1,1)
				strings.play2(pos2,detune2,1)
				pos1++
				pos2++
				if(pos1 > posLen){pos1 = 0}
				if(pos2 > posLen){pos2 = 0}
			} else if (q === 1){
				strings.play1(pos1,detune1,1)
				strings.play3(pos3,detune2,1)
				pos1++
				pos3++
				if(pos1 > posLen){pos1 = 0}
				if(pos3 > posLen){pos3 = 0}
			}
		}
	} else if(fastState === true && interactState === true){
		strings.paramChange(2,random(0.01,2),random(0.01,2))
	} else if(fastState === true && interactState === false){
		return null
	} 
}

function getAway(){
	strings.stop()
	clearInterval(newInt)
	setTimeout(function(){
		let chx = Math.round(Math.random()*(newScat.length-1))
	
		window.location.href = newScat[chx];
		sessionStorage.setItem("footsteps", "scatter")
	},2000)
}


