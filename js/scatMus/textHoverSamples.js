//blank canvas that shows text when hovered over.  
//text changed after "rehide"


let cnv;
let div1,div2,div3,div4,div5,div6
let para1=[],para2=[],para3=[],para4=[],para5=[],para6=[]
let paras = []

let pos1 = [];
let pos2 = [];
let pos3 = [];
let pos4 = []
let pos5 = []
let pos6 = []

let textChoice
let t

let flag = 0;

let visCount = 0
let rand
let structure = 0

let voice
let dur1,dur2
let dw1=1,dw2=1

let starMaps = [
	"/pics/starMaps/page1.jpg",
	"/pics/starMaps/page2.jpg",
	"/pics/starMaps/page3.jpg",
	"/pics/starMaps/page4.jpg",
	"/pics/starMaps/page5.jpg",
	"/pics/starMaps/page6.jpg",
	"/pics/starMaps/page7.jpg",
	"/pics/starMaps/page8.jpg",
	"/pics/starMaps/page9.jpg",
	"/pics/starMaps/page10.jpg"
]

let backMap
let loadImg
let loadText
let loadStep
let mapChoice
let imgx,imgy
let imgDrag

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	if(loadStep === "scatter"){
		mapChoice = starMaps[round(random(starMaps.length-1))]
	} else if(loadStep === "cartography"){
		mapChoice = maps[round(random(maps.length-1))]
	} else if (loadStep === "gather"){
		mapChoice = starMaps[round(random(starMaps.length-1))]
	} else if (loadStep === "repurpose"){
		mapChoice = maps[round(random(maps.length-1))]
	} else {
		mapChoice = starMaps[round(random(starMaps.length-1))]
	}
	textChoice = new pages()
	t = textChoice.fragChoice()
	t = loadStrings(t)
	backMap = loadImage(mapChoice)
}

function setup() {	
	cnv = createCanvas(windowWidth-20,windowHeight-20);

	let td = select("#loader")

	let x = random(-width/2,0)
	let y = random(-height/2,0)
	imgDrag = new backing(x, y);
	
	clear()
	td.class("loaded")
	
	backMap.resize(width*1.5,0)
	image(backMap,x,y)

    voice = new player()//vocal samples
    synth = new aphex(round(random(12)),random(24,48),random(40,90),round(random(12)))//loops,oct,pace,rhythm
    synth.startUp()

	rand = round(random(8,18))
    
	setTimeout(function(){
		dur = voice.dur()
	},2000)

	setTimeout(function(){
		voice.startup()
	},5000)	

	let fillText = join(t,"\n")
	let fillWords = fillText.split(" ") //text split into words
	let textLen = fillWords.length // num words
	let quotient = Math.floor(textLen/6) //round number of division into 6 chunks
	let remainder = textLen % 6 // remainder of above

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

	div1 = createDiv(paras[0]);
	div2 = createDiv(paras[1]);
	div3 = createDiv(paras[2]);
	div4 = createDiv(paras[3]);
	div5 = createDiv(paras[4]);
	div6 = createDiv(paras[5]);

	div1.id("block1")
	div2.id("block2")
	div3.id("block3")
	div4.id("block4")
	div5.id("block5")
	div6.id("block6")

	div1.class("hidden")
	div2.class("hidden")
	div3.class("hidden")
	div4.class("hidden")
	div5.class("hidden")
	div6.class("hidden")

	div1.mouseOver(makeVis);
	div2.mouseOver(makeVis);
	div3.mouseOver(makeVis);
	div4.mouseOver(makeVis)
	div5.mouseOver(makeVis)
	div6.mouseOver(makeVis)

	pos1 = [Math.random()*(width*0.75),Math.random()*(height*0.75)]
	pos2 = [Math.random()*(width*0.75),Math.random()*(height*0.75)]
	pos3 = [Math.random()*(width*0.75),Math.random()*(height*0.75)]
	pos4 = [Math.random()*(width*0.75),Math.random()*(height*0.75)]
	pos5 = [Math.random()*(width*0.75),Math.random()*(height*0.75)]
	pos6 = [Math.random()*(width*0.75),Math.random()*(height*0.75)]

	div1.position(pos1[0],pos1[1]);
	div2.position(pos2[0],pos1[1]);
	div3.position(pos3[0],pos3[1]);
	div4.position(pos4[0],pos4[1])
	div5.position(pos5[0],pos5[1])
	div6.position(pos6[0],pos6[1])
}

function makeVis(){
	let cueStart1 = random(0,dur1)
	let del = random(50000,10000)
	this.class("shown")
	let timer =	setTimeout(makeHid,del,this);

	visCount++
	if(visCount === rand){
		structure++
		visCount = 0
		rand = round(random(8,18))
	}

	if(structure === 2){
		structure = 0
	}

	if(structure === 0){
		if(this.id() === "block1"){
			voice.trig(0,1)
		}else if(this.id() === "block2"){
			voice.trig(1,1)
		}else if(this.id() === "block3"){
			voice.trig(2,1)
		}else if(this.id() === "block4"){
			voice.trig(3,1)
		}	
	} else if(structure === 1){
		if(this.id() === "block1"){
			voice.trig(0,1)
			synth.pos(0)
			synth.play(0)
		}else if(this.id() === "block2"){
			voice.trig(1,1)
			synth.pos(1)
			synth.play(1)
		}else if(this.id() === "block3"){
			voice.trig(2,1)
			synth.pos(2)
			synth.play(2)
		}else if(this.id() === "block4"){
			voice.trig(3,1)
			synth.play(0)
			synth.play(1)
			synth.play(2)
			synth.pos(0)
			synth.pos(1)
			synth.pos(2)
		}	
	}
}

function makeHid(a){
	a.class("hidden");

	if(structure === 0){
		synth.stop(0)
		synth.stop(1)
		synth.stop(2)
		if(a.id() === "block1"){
			voice.trig(0,0)
		}else if(a.id() === "block2"){
			voice.trig(1,0)
		}else if(a.id() === "block3"){
			voice.trig(2,0)
		}else if(a.id() === "block4"){
			voice.trig(3,0)
		}	
	}else if(structure === 1){
		if(a.id() === "block1"){
			voice.trig(0,0)
			synth.stop(0)
		}else if(a.id() === "block2"){
			voice.trig(1,0)
			synth.stop(1)
		}else if(a.id() === "block3"){
			voice.trig(2,0)
			synth.stop(2)
		}else if(a.id() === "block4"){
			voice.trig(3,0)
			synth.stop(0)
			synth.stop(1)
			synth.stop(2)
		}	
	}
}

function draw() {
	background(0);
	imgDrag.show(map(mouseX,0,width,-width/2,0), map(mouseY,0,height,-height/2,0));
}

function mouseDragged(){
	let pole1 = map(mouseX,0,width,0,10000)
	let pole2 = map(mouseY,0,height,0,10000)
	let pole3 = map(mouseX,0,width,10000,0)
	let pole4 = map(mouseY,0,height,10000,0)

	let pan1 = map(mouseX,0,width,-1,1)
	let pan2 = map(mouseY,0,height,-1,1)
	let pan3 = map(mouseX,0,width,-1,1)
	let pan4 = map(mouseY,0,height,-1,1)

	let newEnv = map(mouseX,0,width,0.001,1)
	let newFreq = map(mouseY,0,height,200,5000)

	voice.filt(0,pole1)
	voice.filt(1,pole1)
	voice.filt(2,pole1)
	voice.filt(3,pole1)

	voice.panner(0,pan1)
	voice.panner(1,pan2)
	voice.panner(2,pan3)
	voice.panner(3,pan4)

	synth.envChange(newEnv)
	synth.freqChange(newFreq)
}


function mousePressed() {
	let imgx = map(mouseX,0,width,-width/2,0)
	let imgy = map(mouseY,0,height,-height/2,0)
	imgDrag.pressed(imgx,imgy);
}

function mouseReleased() {
	imgDrag.notPressed();
	div1.position(random(0,width-500), random(0,height-200))
	div2.position(random(0,width-500), random(0,height-200))
	div3.position(random(0,width-500), random(0,height-200))
	div4.position(random(0,width-500), random(0,height-200))
	div5.position(random(0,width-500), random(0,height-200))
	div6.position(random(0,width-500), random(0,height-200))
}

class backing {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.offsetX = 0;
		this.offsetY = 0;
		this.dragging = false;
		this.rollover = false;
	}

	show(px, py) {
		if (this.dragging) {
			this.x = px + this.offsetX;
			this.y = py + this.offsetY;
		}
    	image(backMap,this.x,this.y)
	}

	pressed(px, py) {
		this.dragging = true;
		this.offsetX = this.x - px;
		this.offsetY = this.y - py;
	}

	notPressed(px, py) {
		this.dragging = false;
	}
}


