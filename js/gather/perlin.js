///from
//  https://www.youtube.com/watch?v=ikwNrFvnL3g&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=4
// un bracket the vector bit!
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
let inc = 0.1
let scl = 40;
let cols,rows;
let zoff = 0

var particle = [];
let pix = []
let per;
let part = 1;

var flowfield;
let state = true

let v1 = [];//vector
let infoBox

let squareCol = [255,255,255,1]

let loadImg
let loadText
let loadStep
let backMap

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
}

function setup(){
	var cnv = createCanvas(windowWidth-20,windowHeight-20);
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
	
	setTimeout(function(){
		clear()
		td.class("loaded")
	 
	 	var x = (windowWidth - width) / 2;
	  	var y = (windowHeight - height) / 2;
	  	cnv.position(x, y);

		cols = floor(width/scl)
		rows = floor(height/scl)

		flowfield = new Array(cols*rows);

		for(i=0;i<100;i++){
			particle[i] = new Particle();
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

	},1000)
};


function draw(){	
	var yoff = 0;

	for(var x = 0;x < rows; x++){
		var xoff = 0;
		for(var y = 0; y < cols; y++){
			var index = x + y * cols
			flowfield[index] = v1
			var angle = noise(xoff,yoff,zoff)*TWO_PI*4;
			v1 = p5.Vector.fromAngle(angle)	
			v1.setMag(0.2);
			xoff += 0.01
			
			stroke(0,50)
			strokeWeight(1)
			
			// push();  //draw vectors
			// translate(x*scl, y*scl)
			// rotate(v.heading());
			// line(0,0,scl,0)
			// pop()
		}
		
		yoff += inc;
		zoff += 0.0001
	}
	let c1 = map(mouseX,0,width,0,255)
	let c2 = map(mouseY,0,height,0,255)
	let c3 = map(mouseY,0,height,255,0)
	for(i = 0; i <particle.length; i++){
		particle[i].follow(flowfield);
		particle[i].update()
		particle[i].edges()
		particle[i].show(c1,c2,c3)	
	};
}

function infoOn(){
    console.log("on")
    setTimeout(function(){
        infoBox.html(randInfoMess[round(random(randInfoMess.length-1))])
    },2000)
    
}

function infoOff(){
	console.log("off")
	infoBox.html("info")
}