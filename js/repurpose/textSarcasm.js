

// let textSpace = document.getElementById("div1")
// let firstText = "I died to the mineral state and became a plant,I died to the vegetal state and reached animality,I died to the animal state and became a man,Then what should I fear? I have never become less from dying.At the next charge (forward) I will die to human nature,So that I may lift up (my) head and wings (and soar) among the angels,And I must (also) jump from the river of (the state of) the angel,Everything perishes except His Face,Once again I will become sacrificed from (the state of) the angel,I will become that which cannot come into the imagination,Then I will become non-existent; non-existence says to me (in tones) like an organ,Truly, to Him is our return."
// let node = document.createTextNode(firstText)
// textSpace.appendChild(node);

let marginL,marginT
let heading
let titleT,titleL
let style;
let sarcText

let titleWidth
let titleHeight
let textWidth
let textHeight

let cnv;
let div1

let title
let look
let fillText = []
let innerText

let circuits = [
	"/pics/circuits/circ1.jpg",
	"/pics/circuits/circ2.jpg",
	"/pics/circuits/circ3.jpg",
	"/pics/circuits/circ4.jpg",
	"/pics/circuits/circ5.jpg",
	"/pics/circuits/circ6.jpg",
	"/pics/circuits/circ7.jpg",
	"/pics/circuits/circ8.jpg",
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
	},5000)
};

document.addEventListener("keydown",typer)

function typer(event){
	if(event.altKey || event.ctrlKey || event.shiftKey){
		return null
	}
	let a = event.key
	let b = event.keyCode

	if(b === 32){
		spacePos++
	}

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

	if(tintTrig === spacePos){
		fader()
		tintTrig = round(random(1,12))
		spacePos = 0
		let snark = fillText
		for(i=0;i<snark.length;i++){
			let randUp = random([0,1,2])
				if(randUp === 0){
					snark[i] = snark[i].toUpperCase()
				} else{
					snark[i] = snark[i]
				}
		}
		sarcText = snark.join("")
		look.html(sarcText)
	}

	let saveQuote1 = []
	let off1 = round(random(0,innerText.length-72))
	for(i=0;i<72;i++){
		saveQuote1[i] = innerText[i+off1]
	}
	saveQuote1 = saveQuote1.join("")
	sessionStorage.setItem("typed1", JSON.stringify(saveQuote1))
}

function fader(){ 
	let r = Math.random()*width
	let t = Math.random()*height

	alph = innerText.length
	print(alph)
	tint(255,alph)
	image(backMap,r,t,200,200,r,t,200,200); 
} 