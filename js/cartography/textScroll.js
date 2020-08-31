let marginL,marginT
let heading
let titleT,titleL
let style;

let titleWidth 
let titleHeight

let textWidth
let textHeight
let textChoice

let cnv;
let div1

let look

let innerText
let currPara = 0
let roll = 0

let paras = []
let para1 = []
let para2 = []
let para3 = []
let para4 = []
let para5 = []
let para6 = []

let loadImg
let loadText
let loadStep

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let load = new loadChoice()
	let loadThing = load.loader()
	print(loadThing)
	
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

	textChoice = new pages()
	t = textChoice.fragChoice()
	t = loadStrings(t)
}


function setup(){
	cnv = createCanvas(windowWidth*0.95,windowHeight*0.95)
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

	let fillText = join(t,"\n")
		
	let fillWords = fillText.split(" ") //text split into words
	let textLen = fillWords.length // num words
	let quotient = Math.floor(textLen/6) //round number of division into 6 chunks
	let remainder = textLen % 6 // remainder of above

	let title = new headers()
	let titleText = title.choice()

	for(i=0;i<quotient;i++){
		para1[i] = fillWords[i]
	}
		
	for(i=0;i<quotient;i++){
		para2[i] = fillWords[i+quotient]
	}

	for(i=0;i<quotient;i++){
		para3[i] = fillWords[i+quotient*2]
	}
		
	for(i=0;i<quotient;i++){
		para4[i] = fillWords[i+quotient*3]
	}

	for(i=0;i<quotient;i++){
		para5[i] = fillWords[i+quotient*4]
	}
		
	for(i=0;i<remainder;i++){
		para6[i] = fillWords[i+quotient*5]
	}

	paras[0] = para1.join(" ")
	paras[1] = para2.join(" ")
	paras[2] = para3.join(" ")
	paras[3] = para4.join(" ")
	paras[4] = para5.join(" ")
	paras[5] = para6.join(" ")

	textWidth = width*0.7
	textHeight = height/2

	marginL = (width/2)-(textWidth/2)
	marginT = height/3

	setTimeout(function(){
		clear()
		td.class("loaded")
		heading = createElement("h1",titleText)

		heading.position(width*0.5,height*0.05)
	    heading.class("scrollTitles")
	    heading.center("horizontal")

	    look = createElement("div", fillText)
		look.position((width-textWidth)/2,height*0.3)
		look.size(textWidth,textHeight)
		look.class("text")
	},5000)
};


function mouseWheel(event){

	let r = round(random(5))
	if(r === 3){
		currPara = round(random(5))
	} else if(r === 5){
		currPara--
	} else {
		currPara++
	}

	if(currPara < 0){
		currPara = 6 - (Math.abs(currPara))
	}

	if(currPara > 5){
		currPara = currPara % 5
	}

	innerText = paras[currPara]

    look.html(innerText)
}
