///from
//  https://www.youtube.com/watch?v=ikwNrFvnL3g&list=PLRqwX-V7Uu6bgPNQAdxQZpJuJCjeOr7VD&index=4
// un bracket the vector bit!

let inc = 0.1
let scl = 40;
let cols,rows;
let zoff = 0

var particle = [];
let pix = []
let per;
let part = 1;

let mode1 = [0,2,4,5,7,9,11,12]
let mode2 = [2,3,4,6,7,0,11,12]
let mode3 = [0,4,7,2,4,9,10,12]
let octaves = [24,24,48,48,48,48,60,60,60,60]
let note1,note2,note3
let fr;
let detune = 0.1
let pluck
let dur1 = 1, dur2 = 1
let fracPix1, fracPix2,fracPix3
let diffBPm
let diff
let pos1=0,pos2=0,pos3=0

var flowfield;
let state = true

let v1 = [];//vector
let infoBox

let loadImg
let loadText
let loadStep
let c1
let c2
let c3
let mouseCount = 0,rand

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
	var cnv = createCanvas(windowWidth,windowWidth);

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

	strings = new stringQuartet();
	strings.preset()

	pluck = new linden(6,0.1,0.1)//change this
	pluck.startUp()
	posLen = pluck.length()-1
	rand = round(random(8,16))

	c1 = random(0,255)
	c2 = random(0,255)
	c3 = random(0,255)


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
		background(255)
		timer(5000)

		infoBox = createDiv("info")
		infoBox.class("info")
		infoBox.style("display", "none")
		infoBox.position(15,15)
		infoBox.mouseOver(infoOn)
		infoBox.mouseOut(infoOff)
		setTimeout(function(){
			infoBox.style("display", "block")
		},120000)

		fracTimer(5000)
	},5000)
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
	for(i = 0; i <particle.length; i++){
		particle[i].follow(flowfield);
		particle[i].update()
		particle[i].edges()
		particle[i].show(c1,c2,c3)	
	};

	pix = get(mouseX,mouseY)
	note1 = Math.round(map((pix[0]+pix[2]),0,510,7,0))
	note2 = Math.round(map((pix[3]+pix[1]),0,510,7,0))
	note3 = Math.round(map((pix[1]+pix[2]),0,510,7,0))

	pat1 = Math.round(map((pix[0]+pix[2]),0,510,0,0.2))

	fracPix1 = pix[0] + pix[2]
	fracPix2 = pix[1] + pix[2]
	fracPix3 = pix[1] + pix[3]

	strings.filter(map(mouseX+mouseY,0,(width+height),100,10000))
}


function timer(del){
	per = setInterval(note,del);
}

function fracTimer(del){
	int1 = setTimeout(fracTrig,del);
}

function fracTrig() {
	detune1 = Math.round(map((pix[1]+pix[3]),0,510,0.2,0))
	if(fracPix1 < 500){
		pluck.play1(pos1,detune1)
		pos1++
		if(pos1 === posLen){pos1 = 0}
	} 

	if(fracPix2 < 500){
		pluck.play2(pos2,detune1)
		pos2++
		if(pos2 === posLen){pos2 = 0}
	}

	if(fracPix3 < 500){
		pluck.play3(pos3,detune1)
		pos3++
		if(pos3 === posLen){pos3 = 0}
	}
	fracTimer(random(2000))
}

function note(){	
	let oct = octaves[Math.round(Math.random()*9)]
		switch(part%3){
			case 0:
				console.log(pat1)
				strings.play1(mode1[note1]+1+oct+detune);	
				detune += 0.1
				break;
			case 1:
			console.log(pat1)
				strings.play2(mode2[note2]+1+oct+detune);		
				break;
			case 2:
			console.log(pat1)
				strings.play3(mode3[note3]+1+oct+detune);
				break;
		}
		part++

		clearInterval(per)
		timer(Math.random()*5000)
};

function mouseDragged(){
	pluck.paramChange(map(mouseX,0,width,0.001,1),map(mouseY,0,height,0.1,1))
	pluck.paramChange(map(mouseX,0,width,0.001,1),map(mouseY,0,height,0.1,1))
	pluck.paramChange(map(mouseX,0,width,0.001,1),map(mouseY,0,height,0.1,1))

	strings.paramChange(map(mouseX,0,width,0.001,1),map(mouseY,0,height,0.1,1))
	strings.paramChange(map(mouseX,0,width,0.001,1),map(mouseY,0,height,0.1,1))
	strings.paramChange(map(mouseX,0,width,0.001,1),map(mouseY,0,height,0.1,1))

	c1 = map(mouseX,0,width,0,255)
	c2 = map(mouseY,0,height,0,255)
	c3 = map(mouseY,0,height,255,0)


}

function mousePressed(){
	print(mouseCount,rand)
	mouseCount++
	if(mouseCount === rand){
		pluck.oct(0.5)
		mouseCount = 0
		rand = round(random(6,18))
	}
	if(state === true){
		userStartAudio();
		strings.begin();
		state = false;
	}
};

function infoOn(){
	console.log("on")
	setTimeout(function(){
		infoBox.html("have you tried pressing keys?")
	},2000)
	
}

function infoOff(){
	console.log("off")
	infoBox.html("info")
}