let cnv;
let marginL;
let marginT;
let textBox = []
let size;

let content = [];
let written = ""
let memory = [];
let hiddenContent 

let rand;

let count = 0;

let t1
let addWord
let addWordArr
let look

let loadImg
let loadText
let loadStep
let rChoice

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let getQuotes1 = JSON.parse(sessionStorage.getItem("typed1"))
	
	if(getQuotes1 !== undefined){
		quotes.push(getQuotes1)
	}
	let load = new loadChoice()
	let loadThing = load.loader()
	
	if(loadStep === "scatter"){
		image(loadImg,(width/2) - (loadImg.width/2),0)
	} else if(loadStep === "cartography"){
		loadImg = loadImage(loadThing)
	} else if (loadStep === "gather"){
		loadText = loadStrings(loadThing)
	} else if (loadStep === "repurpose"){
		loadText = loadImage(loadThing)
	} else {
		loadImg = loadImage(loadThing)
	}

	rChoice = round(random())
	if(rChoice === 0){
		newWords = new pages()
		let tempWords = newWords.fragChoice()
		t1 = loadStrings(tempWords)
	} else if(rChoice === 1){
		t1 = getQuotes1
	}
	print(t1)
}


function setup(){
	cnv = createCanvas(windowWidth,windowHeight);
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

	rectMode(CORNER)

	if(rChoice === 0){
		addWord = join(t1,"\n")
	} else if(rChoice === 1){
		return null
	}

	addWordArr = addWord.split(" ")

	let titler = new headers()
	title = titler.choice()
	titleWidth = width*0.5
	titleHeight = 125

	titleL = (width/2)-(titleWidth/2)
	titleT = height/25;

	let textWidth = width*0.7
	let textHeight = height/2

	marginL = (width/2)-(textWidth/2)
	marginT = titleT + 150

	setTimeout(function(){
		clear()
		td.class("loaded")
		
		heading = createElement("h1",title)

		heading.position(titleL,titleT)
		heading.class("textTitle")
		heading.size(titleWidth,titleHeight)

	    look = createDiv(written)
	    look.class("textTyping")
		look.position(marginL,marginT)
		look.size(textWidth,textHeight)

		setInterval(texter, random(10000))

	},1000)

	
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});


function keyPressed() {
	if(keyCode === BACKSPACE) {
		content.pop()
		let output = content.join("")
		sessionStorage.setItem("typed1", JSON.stringify(output))
		look.html(output)
	} else {
		content.push(key);
		let output = content.join("")
		sessionStorage.setItem("typed1", JSON.stringify(output))
		look.html(output)
	}
}



function texter(){
	cnv.clear()	
	let len = content.length

	let addStart = round(random(content.length-1))
	let addEnd = round(random(addStart,content.length-1))
	for(i=addStart;i<addEnd;i++){
		let plus = i
		if(addWordArr[i] === " "){
			content[i] = " "
		} else {
			content[i] = addWordArr[i] + " "
		}
	}

	let output = content.join("")
	look.html(output)
}
