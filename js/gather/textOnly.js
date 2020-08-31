
let marginL,marginT
let heading
let titleT,titleL
let style;
let textChoice
let t

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
	t = textChoice.centChoice()
	t = loadStrings(t)
}

function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight)
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
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	let fillText = join(t,"\n")
		
	let textWidth = width*0.7
	let textHeight = height/2

	marginL = (width/2)-(textWidth/2)
	marginT = 25
	
	setTimeout(function(){
		clear()
		td.class("loaded")

	    let look = createDiv(fillText)
	    look.class("textOnly")
		look.position(marginL,marginT)
		look.size(textWidth,textHeight)
	},5000)
};
