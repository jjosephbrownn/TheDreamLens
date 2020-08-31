//this looked great with 
//only e1 and e2 nad -50 to 50 pix
// and black and white

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
let p1 = []
let p2 = []
let e1 = []
let e2 = []
let starX = [], starY = []
let allLines = [];
let mouseState = true;
let startState = false
let keyStart = false
let choirState = false
let flag = 0;
let starName = "";
let name = []
let numStars = 0
let voiceStars
let basicMel = []
let pos = 0
let posLen = 0
let playState = true
let sInd = 0
let starPosX = []
let starPosY = []
let chordOn = 0
let structure = 0
let drumState = false
let drumOn = false
	
let infoBox

let choir

let starList = [
	"Sirius",
	"Canopus",
	"Arcturus",
	"Vega",
	"Capella",
	"Rigel",
	"Procyon",
	"Achernar",
	"Hadar",
	"Altair",
	"Acrux",
	"Aldebaran",
	"Spica",
	"Pollux",
	"Fomalhaut",
	"Miaplacidus",
	"Alioth",
	"Wezen",
	"Menkalinan",
	"Mirzam",
	"Polaris",
	"Alpheratz",
	"Muhlifain",
	"Sadr",
	"Almach",
	"Dschubba",
	"Ankaa",
	"Enif",
	"Markab",
	"Aljanah",
	"Eltanin",
	"Alphecca",
	"Algol",
	"Aspidiske",
	"Alphard"
]

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
		loadImg = loadImage(loadThing)
	} else {
		loadImg = loadImage(loadThing)
	}

	typ = loadFont("/fonts/PfefferMediaeval.otf")
}


window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});


function setup() {
	createCanvas(windowWidth,windowHeight,WEBGL);

	let td = select("#loader")

	if(loadStep === "scatter"){
		loadImg.resize(0,height)
		image(loadImg,0 - (loadImg.width/2),(-height/2))
	}else if(loadStep === "repurpose"){
		loadImg.resize(0,height)
		image(loadImg,0 - (loadImg.width/2),(-height/2))
	}else if(loadStep === "cartography"){
		loadImg.resize(width*1.5,0)
		image(loadImg,random(-width/2,0),random(-height/2,0))
	} else if (loadStep === "gather") {
		loadText = join(loadText,"\n")
		td.html(loadText)
	} else {
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	let pitch = random([36,48,54,58])
	choir = new parallel(random(30,90),pitch,1)
	choir.startup()
	choir.firmus()
	choir.counterpoint()
	posLen = choir.cantLen()-1

	chord = new orgChord(60,0)
	chord.startup()
	chord.harmony()

	rand = round(random(7)+2)
	voiceStars = round(random(7)+rand)

	setTimeout(function(){
		clear()
		td.class("loaded")
		background(0);
		translate(-width/2,-height/2,0)

		for(i=0;i<100;i++){
			starX[i] = Math.random()*width
			starY[i] = Math.random()*height
			stroke(255)
			strokeWeight(1)
			point(starX[i],starY[i])
		}

		infoBox = createDiv("info")
		infoBox.class("info")
		infoBox.style("display", "none")
		infoBox.position(15,15)
		infoBox.mouseOver(infoOn)
		infoBox.mouseOut(infoOff)
		setTimeout(function(){
			infoBox.style("display", "block")
		},60000)
	},3000)
};


function keyTyped(){
	if(structure === 0){
		choir.stop()
		chordOn = 1
		name.push(key)
		starName = name.join("")
		playState = false
		pos = 0
	} else {
		choir.stop()
		chordOn = 1
		name.push(key)
		starName = name.join("")
		playState = false
		pos = 0
	}
	
}

function draw(){
	textFont(typ)
    textSize(width/50)
    text(starName,-500,100)
}


function mousePressed() {
	print(structure,playState,pos)
	translate(-width/2,-height/2,0)
	if(playState === true){
		if(mouseButton === LEFT){
			if(allLines.length<16){
				let extra = [];
				for(i=0;i<8;i++){
					let a = Math.random();
					extra[i] = map(a,0,1,-100,100);
				}	
				if(mouseState === true) {
					p1 = [mouseX,mouseY];
					e1 = [mouseX+extra[0], mouseY+extra[1]];
					starPosX[sInd] = mouseX + 10
					starPosY[sInd] = mouseY - 10
			
					stroke(255)

					allLines[0] = p1[0]
					allLines[1] = p1[1]
					allLines[2] = e1[0]
					allLines[3] = e1[1]

					point(p1[0],p1[1])
					point(e1[0],e1[1])
					let dec = random([0,1])
					let on = random([0,1])
					if(dec === 0){
						choir.voices(0,on)
					} else if (dec === 1) {
						choir.voices(1,on)
					}
					
					mouseState = false;	
					numStars++
					sInd++
				} else if (mouseState === false) {
					p2 = [mouseX,mouseY];
					e2 = [mouseX+extra[4], mouseY+extra[5]];
					starPosX[sInd] = mouseX + 10
					starPosY[sInd] = mouseY - 10
					point(p2[0],p2[1])
					point(e2[0],e2[1])
				
					stroke(255)

					allLines[4] = p2[0]
					allLines[5] = p2[1]
					allLines[6] = e2[0]
					allLines[7] = e2[1]

					mouseState = true;	
					numStars++
					sInd++

					let dec = random([0,1])
					let on = random([0,1])
					if(dec === 0){
						choir.speeds(0,on)
					} else if (dec === 1) {
						choir.speeds(1,on)
					}			
				}

				if(numStars%3 === 0){
					choir.counterpoint()
				}
			} 	

			line(p1[0],p1[1],p2[0],p2[1]);
			line(allLines[0],allLines[1],allLines[2],allLines[3])
			line(allLines[4],allLines[5],allLines[6],allLines[7])

			choir.nextNote(2,pos)
			chord.nextNote(chordOn,pos)
			choir.swell(map(mouseX+mouseY,0,(width+height),0.001,1))
			if(drumState === true && drumOn === false){
				chord.sampler(random(0.25,0.75),1)
				drumOn = true
			}
			

		} else if(mouseButton === RIGHT){
			choir.tuning(1)
			choir.rhythm()
		}
		pos++
		if(pos === posLen){pos = 0}

	} else if (playState === false && structure === 0){
		choir.nextNote(0,pos)
		choir.nextNote(1,pos)
		choir.nextNote(2,pos)
		chord.nextNote(chordOn,pos)
		pos++
		if(pos === posLen){pos = 0;playState = true;choir.paramChange(0,1);structure = 1}

		let randStar = round(random(starPosX.length-1))
		textSize(12)
  		textFont(typ)
		text(starList[randStar],starPosX[randStar],starPosY[randStar])
		if(drumState === true){
			chord.sampler(0,0)
			drumOn = false
		}
	}  else if(playState === false && structure === 1){
		chord.nextNote(chordOn,pos)
		pos++
		if(pos === posLen){pos = 0;playState = true;choir.paramChange(0,1);structure === 0;drumState = true;}
		let randStar = round(random(starPosX.length-1))
		textSize(12)
  		textFont(typ)
		text(starList[randStar],starPosX[randStar],starPosY[randStar])
		chordOn = 0
		if(drumState === true){
			chord.sampler(0,0)
			drumOn = false
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
