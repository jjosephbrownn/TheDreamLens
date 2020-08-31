let cnv;
let div1
let look
let hide
let hidSplit
let hidLen
let fillText
let hiddenText
let textChoice
let t1,t2

let org
let frac
let pos1 = 0
let pos2 = 0
let pos3 = 0
let detune1 = 0
let detune2 = 0
let dur1,dur2
let inc

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
	t1 = textChoice.centChoice(random([0,1]))
	t1 = loadStrings(t1)

	t2 = textChoice.fragChoice(random([0,1]))
	t2 = loadStrings(t2)
}

function setup(){
	cnv = createCanvas(windowWidth,windowHeight)

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
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	let paramType = random([0,1,2])
	org = new parallel(random([30,60,90]),random([24,36,48]), paramType); // make this param changeable
	org.startup()
	org.firmus()
	org.counterpoint()

	if(paramType === 0 || paramType === 2){
		inc = -0.1
	} else if(paramType === 1){
		inc = 0.1
	}

	frac = new fracture(0,0)
	frac.params()

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

		dur1 = frac.dur1()
		dur2 = frac.dur2()

		setInterval(filler,5000)
		setInterval(reset,random(5000,20000))
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

	frac.add(0,random(dur1))
	frac.add(1,random(dur2))

	org.paramChange(inc)
});

function draw(){
	let stat = mouseX + mouseY
	let move = pmouseX + pmouseY
	let diff = stat - move
	if(diff > 10){
		org.voices(0,1)
	} else if (diff < -10){
		org.voices(1,1)
	} 
}

function filler(fill){
	let newFill = []
	let offset = round(random(hidLen-1))
	let end = round(random(8))
	let detune2 = map(end,0,8,-5,5)
	org.paramChange(0.1)
	for(i=0;i<end;i++){
		newFill[i] = hidSplit[offset]
		offset++
	}

	let newWords = newFill.join(" ")
	setTimeout(function(){
		fill.textContent = newWords
		fill.className = "textOn"
	
		let r = random([0,1,2])
		if(r === 0){
			frac.fracBegin(0)
		} else if (r === 1){
			frac.fracBegin(1)
		} else if(r === 2){
			org.stop()
			frac.fracStop(0)
			frac.fracStop(1)
		}
	},random(5000))
}

function reset(){
	org.counterpoint()
}

