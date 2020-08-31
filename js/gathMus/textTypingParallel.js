

// let textSpace = document.getElementById("div1")
// let firstText = "I died to the mineral state and became a plant,I died to the vegetal state and reached animality,I died to the animal state and became a man,Then what should I fear? I have never become less from dying.At the next charge (forward) I will die to human nature,So that I may lift up (my) head and wings (and soar) among the angels,And I must (also) jump from the river of (the state of) the angel,Everything perishes except His Face,Once again I will become sacrificed from (the state of) the angel,I will become that which cannot come into the imagination,Then I will become non-existent; non-existence says to me (in tones) like an organ,Truly, to Him is our return."
// let node = document.createTextNode(firstText)
// textSpace.appendChild(node);

let marginL,marginT
let heading
let titleT,titleL
let style;

let titleWidth
let titleHeight
let textWidth
let textHeight

let cnv;
let div1

let choir
let posLen
let pos = 0

let title
let look
let fillText = []
let innerText
let word
let wordState = true
let keyState = true
let decInc
let keyCount = 0
let structure = 0
let rand
let vox
let randKey1,randKey2,randKey3
let key1State = false
let key2State = false
let key3State = false

let circuits = [
	"../pics/circuits/circ1.jpg",
	"../pics/circuits/circ2.jpg",
	"../pics/circuits/circ3.jpg",
	"../pics/circuits/circ4.jpg",
	"../pics/circuits/circ5.jpg",
	"../pics/circuits/circ6.jpg",
	"../pics/circuits/circ7.jpg",
	"../pics/circuits/circ8.jpg",
]

let loadImg
let loadText
let loadStep
let tintTrig
let spacePos = 0

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let getQuotes1 = JSON.parse(sessionStorage.getItem("typed1"))
	
	if(getQuotes1 !== undefined){
		quotes.push(getQuotes1)
	}
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
	let circChoice = round(random(circuits.length-1))
	backMap = loadImage(circuits[circChoice])
}


function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight-20)
	background(255);

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

	backMap.resize(width*1.5,0)
	tint(255,0)
	image(backMap,random(-width/2,0),random(-height/2,0))

	
	setTimeout(function(){
		clear()
		td.class("loaded")

		let oct = random(48,60)
		let bpm = random([30,60,90])
		let param = random([0,1,2])

		choir = new parallel(bpm,oct,param)
		choir.startup()
		choir.firmus()
		posLen = choir.cantLen()

		vox = new vocoder(bpm)
		vox.startup(1)

		rand = round(random(12,24))
		randKey1 = round(random(65,90))
		randKey2 = round(random(65,90))
		print(randKey1,randKey2)
		tintTrig = round(random(1,12))

		let titler = new headers()
		title = titler.choice()

		titleWidth = width*0.5
		titleHeight = 125

		titleL = (width/2)-(titleWidth/2)
		titleT = height/25;
		
		textWidth = width*0.7
		textHeight = height/2

		marginL = (width/2)-(textWidth/2)
		marginT = titleT+titleHeight

		heading = createElement("h1",title)
		heading.position(titleL,titleT)
		heading.size(titleWidth,titleHeight)
	    heading.style("font-family","Centaur")
	    heading.style("text-align","center")
	    heading.style("font-weight","bold")
	    heading.style("font-size","40px")

	    look = createElement("div", innerText)
		look.position(marginL,marginT)
		look.size(textWidth,textHeight)
		look.style("font-family","Centaur")
		look.style("font-size","25px")

		setInterval(randNoise,random(1000,10000))
	},5000)
};

window.addEventListener('keydown', function(e) {
	if(e.keyCode == 32 && e.target == document.body) {
		e.preventDefault();
	}

	let a = event.key
	let b = event.keyCode
	print(b)

	print(b,randKey1,randKey2,structure)
	keyCount++

	if(b !== 13){
		if(b === 8){
			fillText.pop()
			innerText = fillText.join("")
			look.html(innerText)
		} else {
			fillText.push(a)
			innerText = fillText.join("")
			look.html(innerText)
		}
	}

	if(structure === 0){
		if(b === 32){
			choir.nextNote(2,pos,1)
			pos++
			spacePos++
			if(pos > posLen){pos = 0}
			decInc = random(0.005,1)
			choir.panner(0,random(-1,1))
			choir.panner(1,random(-1,1))
		} else if(b === randKey1 && key1State === false){
			vox.begin(0)
			key1State = true
		} else if(b === randKey2 && key2State === false){
			vox.begin(1)
			key2State = true
		} else if(b === randKey1 && key1State === true){
			vox.stop(0)
			key1State = false
		} else if(b === randKey2 && key2State === true){
			vox.stop(1)
			key2State = false
		}
	} else if(structure === 1){
		vox.inton(0)
		vox.inton(1)
		choir.nextNote(0,pos,1)
		choir.nextNote(1,pos,1)
		choir.nextNote(2,pos,1)
		pos++
		spacePos++
		
		if(pos > posLen){pos = 0}

		if(b === randKey1 && key1State === false){
			vox.intonPitch(0)
			key1State = true
		} else if(b === randKey2 && key2State === false){
			vox.intonPitch(1)
			key2State = true
		} else if(b === randKey1 && key1State === true){
			vox.intonStop(0)
			key1State = false
		} else if(b === randKey2 && key2State === true){
			vox.intonStop(1)
			key2State = false
		}
		
		decInc = random(0.005,1)
		choir.panner(0,random(-1,1))
		choir.panner(1,random(-1,1))
	}
	
	choir.envChange(decInc)
	choir.freqChange(random(500,5000))
	choir.tuning(0.5)

	if(keyCount === rand){
		if(keyState === true){
			keyCount = 0
			rand = round(random(12,24))
			structure = 1
			keyState = false

			choir.stop(0)
			choir.stop(1)
			choir.stop(2)
		} else if(keyState === false){
			keyCount = 0
			rand = round(random(12,24))
			structure = 0
			keyState = true
		}
		
	}

	if(tintTrig === spacePos){
		fader()
		tintTrig = round(random(1,12))
		spacePos = 0
	}

	let saveQuote1 = []
	let off1 = round(random(0,innerText.length-72))
	for(i=0;i<72;i++){
		saveQuote1[i] = innerText[i+off1]
	}
	saveQuote1 = saveQuote1.join("")
	sessionStorage.setItem("typed1", JSON.stringify(saveQuote1))
});

function randNoise(){
	let q = random([0,1])
	choir.counterpoint()
	if(q === 0){
		choir.voices(0,1)
		choir.voices(1,1)
	} else if(q === 1){
		choir.voices(0,0)
		choir.voices(1,0)
	}
}

function fader(){ 
	choir.counterpoint()
	let r = Math.random()*width
	let t = Math.random()*height
	print(r,t)

	alph = innerText.length
	print(alph)
	tint(255,alph)
	image(backMap,r,t,200,200,r,t,200,200); 
} 