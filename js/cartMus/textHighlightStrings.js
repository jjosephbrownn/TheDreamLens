

let look
let hide
let hidSplit
let hidLen
let fillText
let hiddenText
let allSpans = []
let textChoice
let t1,t2
let fifthState = false

let cnv;
let div1

let strings
let trio
let spec
let pos1 = 0
let pos2 = 0
let pos3 = 0
let detune1 = 0
let detune2 = 0
let spoken 
let spDur

let incAdd = [0,0,0,0,0,0]

let posLen

let freq1 = 60
let freq2 = 60
let freq3 = 60
let spans = 0

let structure = 0
let mouseCount = 0
let rand

let loadImg
let loadText
let loadStep
let newFill = []

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
	t1 = textChoice.centChoice()
	t1 = loadStrings(t1)

	t2 = textChoice.fragChoice()
	t2 = loadStrings(t2)
}


function setup(){
	cnv = createCanvas(windowWidth*0.95,windowHeight*0.95)

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

	strings = new linden(loops,36,0.1,0.1,0)//change this
	strings.startUp()
	strings.begin()
	posLen = strings.length()-1

	spoken = new fracture(1) // spoken word stuff

	rand = round(random(6,18))

	spDur = spoken.dur1()

	let fillText = join(t1,"\n")
	let hiddenText = join(t2, "\n")
	
	hidSplit = hiddenText.split(" ")
	hidLen = hidSplit.length	

	let textWidth = width*0.25
	let textHeight = height/2

	
	setTimeout(function(){
		clear()
		td.class("loaded")
		background(255);

		look = createDiv(fillText)
		look.class("text")
		look.position(textWidth*0.66,height*0.05)

		hide = createDiv(hiddenText)
		hide.class("textOff")
		hide.position((width-textWidth)/2,height*0.05)

		setInterval(filler,5000)
		setInterval(reset,10000)
	},5000)
};


$('body').mouseup(function(){
	var spann = document.createElement("span");
	spann.className = "textOff"
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(spann);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    filler(spann)
    allSpans.push(spann)
    spans++


	if(structure === 0){
    	strings.play1(pos1,detune1)
		pos1++
	if(pos1 > posLen){pos1 = 0}
		spoken.samplePause(0)
    }else if(structure === 1){
    	strings.nextNote()
    	spoken.samplePause(0)
    } 
	
	mouseCount++
    
    
	if(mouseCount === rand){
		structure++
		mouseCount = 0
		rand = round(random(6,18))
	}
	if(structure === 2){
		structure = 0
		spoken.samplePause(0)
	}
});

function mousePressed(){
	print(structure, fifthState)
	if(mouseButton === LEFT){
		if(structure === 1){
			let wordPos = map(mouseY,0,width,0,spDur-1)
			wordPos = constrain(wordPos,0,spDur-1)
			spoken.samplePlayCont(0,random(-1,1))
		}
	}
	
}

function mouseDragged(){
	if(mouseButton === LEFT){
		strings.atkChange(random(0.001,1))
	}else if(mouseButton === RIGHT){
		strings.decChange(random(0.1,1))
	}
}

function filler(fill){
 	let offset = round(random(hidLen-1))
	let end = round(random(8))
	let detune2 = map(end,0,8,-5,5)
	for(i=0;i<end;i++){
		newFill[i] = hidSplit[offset]
		offset++
	}

	let newWords = newFill.join(" ")
	setTimeout(function(){
		fill.textContent = newWords
		fill.className = "textOn"
	
		let r = random([0,1])
		if(structure === 0){
			if(r === 0){
				strings.play2(pos2,detune2)
				pos2++
				if(pos2 > posLen){pos2 = 0}
			} else if (r === 1){
				strings.play3(pos3,detune2)
				pos3++
				if(pos3 > posLen){pos3 = 0}
			}
		}
		
	},random(5000))

}

function reset(){
	strings.stop()
	strings.paramInit(0.2)
}

