
let cnv
let photo1,photo2
let alph = 0
let int1,int2
let overlay
let spec
let word
let dur

let newScat = [
	"/pages/scatter/radio.html",
    "/pages/scatter/textOnly.html",
    "/pages/scatter/textScroll.html",
    "/pages/scatter/addOrg.html",
    "/pages/scatter/picHoles.html",  
    "/pages/scatter/picTransAuto.html"
 ];

let loadImg
let loadText
let loadStep

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let load = new loadChoice()
	let loadThing = load.loader()
	pChoice = new piccer()
	let pic1
	let pic2
	layerChoice = random([0,1,2])

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
	
	if(loadStep !== "cartography"){
		pic1 = pChoice.pic1()
		pic2 = pChoice.pic2()	
	}else if(loadStep === "cartography"){
		if(layerChoice === 0){
			pic1 = pChoice.pic1()
			pic2 = pChoice.mapPic()
		} else if(layerChoice === 1){
			pic1 = pChoice.mapPic()
			pic2 = pChoice.pic2()
		}else if(layerChoice === 2){
			pic1 = pChoice.mapPic()
			pic2 = pChoice.mapPic()
		}
	}
	photo1 = loadImage(pic1);
	photo2 = loadImage(pic2);	
}

function setup() {
	cnv = createCanvas(windowWidth-20,windowHeight-20);

	let td = select("#loader")

	if(loadStep === "scatter"){
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "repurpose"){
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "cartography"){
		loadImg.resize(width*1.5,0)
		image(loadImg,random(-width/2,0),random(-height/2,0))
		if(layerChoice === 0){
			photo1.resize(0,height)
			photo2.resize(width,0)
		}else if(layerChoice === 1){
			photo1.resize(width,0)
			photo2.resize(0,height)
		}else if(layerChoice === 2){
			photo1.resize(width,0)
			photo2.resize(width,0)
		}
	} else if (loadStep === "gather") {
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadText = join(loadText,"\n")
		td.html(loadText)
	} else {
		photo1.resize(0,height)
		photo2.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	noCursor();
	imageMode(CENTER)
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		image(photo1,width/2,height/2); 
		
		setTimeout(timer, 3000)
	},5000)
}

function timer(){
	int1 = setInterval(fade,2000)
	dur = random(60000,120000)
	setTimeout(getAway, dur)
}


function fade(){
	let r = Math.random()*width
	let t = Math.random()*height

	alph = map(mouseX,0,width,0,255)
	tint(255,alph)
	image(photo2,r+255,t,100,100,r,t,100,100);	
}

function getAway(){
	let chx = Math.round(Math.random()*(newScat.length-1))
	
	window.location.href = newScat[chx];
	sessionStorage.setItem("footsteps", "scatter")
}



