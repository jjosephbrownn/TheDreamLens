
let look
let hide
let hidSplit
let hidLen
let textChoice
let t1,t2

let cnv;
let div1

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
	t1 = textChoice.centChoice()
	t1 = loadStrings(t1)

	t2 = textChoice.fragChoice()
	t2 = loadStrings(t2)
}

function setup(){
	cnv = createCanvas(windowWidth*0.95,windowHeight*0.95)

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
});


function filler(fill){
	let newFill = []
	let offset = round(random(hidLen-1))
	let end = round(random(8))
	for(i=0;i<end;i++){
		newFill[i] = hidSplit[offset]
		offset++
	}
	let newWords = newFill.join(" ")
	setTimeout(function(){
		fill.textContent = newWords
		fill.className = "textOn"
	},random(5000))
}