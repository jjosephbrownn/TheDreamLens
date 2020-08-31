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

let strings
let posLen
let pos1 = 0
let pos2 = 0
let pos3 = 0
let detune = 0
let dur

let mouseCount = 0
let rand
let toggle = true
let structure = 0

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

	textChoice = new pages()
	t = textChoice.centChoice()
	t = loadStrings(t)
}


function setup(){
	cnv = createCanvas(windowWidth*0.95,windowHeight*0.95)
	background(255);

	let loops = parseInt(sessionStorage.getItem("numLoops"))

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

	strings = new linden(2,0.1,0.1)//change this
	strings.startUp()
	posLen = strings.length()-1
	dur = strings.duration()

	plonk = new aphex(loops,random(36,60),random(30,90),round(random(4,16)))//change this
	plonk.startUp()
	plonk.envChange(1)
	
	setTimeout(function(){
		clear()
		td.class("loaded")

		rand = round(random(8,26))

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

function mouseDragged(){
	plonk.freqChange(map(mouseX,0,width,200,5000))
	plonk.envChange(map(mouseY,0,height,0.05,1))
}


function mouseWheel(event){
	mouseCount++
	console.log(mouseCount,rand,structure)
	let r = round(random(5))
	if(structure === 0){
		strings.droneStop(0)
		strings.droneStop(1)
		strings.droneStop(2)
		if(r === 3){
			currPara = round(random(5))
			strings.play1(pos1,detune,random([1,2]))
			pos1++
			detune += 0.5
			if(pos1 > posLen){pos1 = 0}
		} else if(r === 5){
			currPara--
			strings.play2(pos2,detune,random([1,2]))
			pos2++
			detune += 0.5
			if(pos2 > posLen){pos2 = 0}
		} else {
			currPara++
			strings.play3(pos3,detune,random([1,2]))
			pos3++
			detune += 0.5
			if(pos3 > posLen){pos3 = 0}
		}

		if(currPara < 0){
			currPara = 6 - (Math.abs(currPara))
		}

		if(currPara > 5){
			currPara = currPara % 5
		}

		innerText = paras[currPara]

	    look.html(innerText)
	} else if (structure === 1){
		if(r === 3){
			currPara = round(random(5))
			plonk.pos(0)
		} else if(r === 5){
			currPara--
			plonk.pos(1)
		} else {
			currPara++
			plonk.pos(2)
			plonk.bpm(random(30,90))
		}

		innerText = paras[currPara]

	    look.html(innerText)

	}else if (structure === 2){
		if(r === 3){
			currPara = round(random(5))
			plonk.pos(0)
			strings.play1(pos1,detune,random([1,2]))
			pos1++
			detune += 0.5
			if(pos1 > posLen){pos1 = 0}
		} else if(r === 5){
			currPara--
			plonk.pos(1)
			strings.play2(pos2,detune,random([1,2]))
			pos2++
			detune += 0.5
			if(pos2 > posLen){pos2 = 0}
		} else {
			currPara++
			plonk.pos(2)
			strings.play3(pos3,detune,random([1,2]))
			pos3++
			detune += 0.5
			if(pos3 > posLen){pos3 = 0}
			plonk.bpm(random(30,90))
		}

		innerText = paras[currPara]

	    look.html(innerText)

	}

    if(mouseCount === rand){
		structure++
		mouseCount = 0
		rand = round(random(6,18))    		
    }

    if(structure === 0){
    	strings.paramChange(0,random(0.05,1),random(0.5,1))
    	strings.paramChange(1,random(0.05,1),random(0.5,1))
    	strings.paramChange(2,random(0.05,1),random(0.5,1))
		plonk.stop(0)
		plonk.stop(1)
		plonk.stop(2)
		detune = 0
    } else if(structure === 1){
    	strings.paramChange(0,random(0.05,1),random(0.5,1))
    	strings.paramChange(1,random(0.05,1),random(0.5,1))
    	strings.paramChange(2,random(0.05,1),random(0.5,1))
    	plonk.play(0)
		plonk.play(1)
		plonk.play(2)
		detune = 0
    }else if(structure === 3){
    	strings.paramChange(0,random(0.05,1),random(0.5,1))
    	strings.paramChange(1,random(0.05,1),random(0.5,1))
    	strings.paramChange(2,random(0.05,1),random(0.5,1))
		structure = 0
		detune = 0
    }
}
