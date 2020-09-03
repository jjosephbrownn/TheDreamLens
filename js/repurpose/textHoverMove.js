//blank canvas that shows text when hovered over.  
//text changed after "rehide"


let cnv;
let div1,div2,div3,div4,div5,div6
let para1=[],para2=[],para3=[],para4=[],para5=[],para6=[]
let paras = []

let pos1 = [];
let pos2 = [];
let pos3 = [];
let pos4 = [];
let pos5 = [];
let pos6 = []
let textChoice
let t

let flag = 0;


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
	"/pics/starMaps/page10.jpg",
]


let loadImg
let loadText
let loadStep
let backMap
let mapChoice
let imgx,imgy
let imgDrag

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let load = new loadChoice()
	let loadThing = load.loader()
	
	if(loadStep === "scatter"){
		loadImg = loadImage(loadThing)
		mapChoice = starMaps[round(random(starMaps.length-1))]
	} else if(loadStep === "cartography"){
		loadImg = loadImage(loadThing)
		mapChoice = maps[round(random(maps.length-1))]
	} else if (loadStep === "gather"){
		loadText = loadStrings(loadThing)
		mapChoice = starMaps[round(random(starMaps.length-1))]
	} else if (loadStep === "repurpose"){
		loadImg = loadImage(loadThing)
		mapChoice = maps[round(random(maps.length-1))]
	} else {
		loadImg = loadImage(loadThing)
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
	
	clear()
	td.class("loaded")
	backMap.resize(width*1.5,0)

	image(backMap,x,y)
	
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
	let del = Math.random()*5000
	this.class("shown")
	let timer =	setTimeout(makeHid,del,this);
}

function makeHid(a){
	a.class("hidden");
}

function draw() {
	background(0);
	imgDrag.show(map(mouseX,0,width,-width/2,0), map(mouseY,0,height,-height/2,0));
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