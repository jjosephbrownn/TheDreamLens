//this looked great with 
//only e1 and e2 nad -50 to 50 pix
// and black and white
let randInfoMess = [
    "do you have any idea whats going on?", 
    "what are you looking at?", 
    "go away", 
    "you're nearly there", 
    "what now?", 
    "there's bound to be something round the next corner", 
    "keep searching",
    "what",
    "nothing here",
    "yep, same thing again",
    "no help here",
    "this looks good on our CV",
    "floating info boxes rule",
    "stop getting distracted",
    "worked it out yet?",
    "one of these days...",
    "behind you!",
    "no",
    "hi",
    "nah",
    "internet > real life",
    "apple is not good",
    "Musk will not save you",
    "eat the rich"
]
let cnv
let p1 = []
let p2 = []
let e1 = []
let e2 = []
let starX = [], starY = []
let allLines = [];
let mouseState = true;
let firstClick = false
let flag = 0;
let starName = "";
let name = []
let infoBox

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
	typ = loadFont("/fonts/PfefferMediaeval.otf")
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

function setup() {
	cnv = createCanvas(windowWidth,windowHeight,WEBGL);

	let td = select("#loader")

	if(loadStep === "scatter"){
		loadImg.resize(0,height)
		image(loadImg,0 - (loadImg.width/2),-height/2)
	}else if(loadStep === "repurpose"){
		loadImg.resize(0,height)
		image(loadImg,0 - (loadImg.width/2),-height/2)
	}else if(loadStep === "cartography"){
		loadImg.resize(width*1.5,0)
		image(loadImg,random(-width/2,0),random(-height/2,0))
	} else if (loadStep === "gather") {
		loadText = join(loadText,"\n")
		td.html(loadText)
	} else {
		loadImg.resize(0,height)
		image(loadImg,0 - (loadImg.width/2),-height/2)
	}
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		background(0);
		translate(-width/2,-height/2,0)

		for(i=0;i<100;i++){
			starX[i] = Math.random()*width
			starY[i] = Math.random()*height
			stroke(255)
			strokeWeight(1)
			point(starX[i],starY[i])
		}

		infoBox = createDiv("info")
		infoBox.class("info")
		infoBox.style("display", "none")
		infoBox.position(15,15)
		infoBox.mouseOver(infoOn)
		infoBox.mouseOut(infoOff)
		setTimeout(function(){
			infoBox.style("display", "block")
		},120000)
	},5000)
};


function keyTyped(){
	name.push(key)
	starName = name.join("")
}

function draw(){
	textFont(typ)
    textSize(width/50)
    text(starName,-500,100)
}


function mousePressed() {
	translate(-width/2,-height/2,0)

	if(allLines.length<16){
		let extra = [];
		for(i=0;i<8;i++){
			let a = Math.random();
			extra[i] = map(a,0,1,-100,100);
		}	
		if(mouseState === true) {
			p1 = [mouseX,mouseY];
			e1 = [mouseX+extra[0], mouseY+extra[1]];
			point(p1[0],p1[1])
			point(e1[0],e1[1])
	
			stroke(255)

			if(firstClick === false){
				p2[0] = p1[0]
				p2[1] = p1[1]
				firstClick = true
			}

			line(p1[0],p1[1],e1[0],e1[1])
			line(p1[0],p1[1],p2[0],p2[1])


			
			mouseState = false;	

		} else if (mouseState === false) {
			p2 = [mouseX,mouseY];
			e2 = [mouseX+extra[4], mouseY+extra[5]];
			point(p2[0],p2[1])
			point(e2[0],e2[1])
		
			stroke(255)

			line(p2[0],p2[1],e2[0],e2[1])
			line(p1[0],p1[1],p2[0],p2[1])

			mouseState = true;	
		}
	} 

}


function infoOn(){
    setTimeout(function(){
        infoBox.html(randInfoMess[round(random(randInfoMess.length-1))])
    },2000) 
}

function infoOff(){
	infoBox.html("info")
}
