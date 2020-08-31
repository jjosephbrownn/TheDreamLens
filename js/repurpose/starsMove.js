// randomises start here - but would be cool if it remembered drawn star maps from earlier pages (see stars.js)
// looks mint, constrain map into square, stop movement if it comes up against edge

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
let cnv;
let x1 = []
let y1 = []
let ex = []
let ey = []

let inc1 = 1,inc2 =1 ,inc3 =1 ,inc4 =1 
let xmax,xmin,ymax,ymin

let diffX
let diffY

let starX = []
let starY = []
let mouseState = true

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
}


function setup() {
	cnv = createCanvas(windowWidth,windowHeight);

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
		background(0);
		xmin = width/20
		xmax = width-xmin
		ymin = height/10
		ymax = height-ymin
		console.log(xmin,xmax,ymin,ymax)

		for(i=0;i<9;i++){
			x1[i] = Math.floor(Math.random()*(xmax-xmin+1)+xmin)
			y1[i] = Math.floor(Math.random()*(ymax-ymin+1)+ymin)
			ex[i] = x1[i]+((Math.random()*50)-25)
			ey[i] = y1[i]+((Math.random()*50)-25)
		};	

		for(i=0;i<100;i++){
			starX[i] = Math.random()*width
			starY[i] = Math.random()*height
			stroke(255)
			strokeWeight(1.5)
			point(starX[i],starY[i])
		}

		mapper()
		setInterval(mapper,25)

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

function mapper(){
	cnv.clear()
	background(0);
	
	for(i=0;i<100;i++){
		stroke(255)
		strokeWeight(1.5)
		point(starX[i],starY[i])
	}

	noFill()
	stroke(255)
	strokeWeight(1)
	line(x1[0],y1[0],x1[1],y1[1])
	line(x1[1],y1[1],x1[2],y1[2])
	line(x1[2],y1[2],x1[3],y1[3])
	line(x1[3],y1[3],x1[4],y1[4])
	line(x1[4],y1[4],x1[5],y1[5])
	line(x1[5],y1[5],x1[6],y1[6])
	line(x1[6],y1[6],x1[7],y1[7])
	line(x1[7],y1[7],x1[8],y1[8])

	line(x1[0],y1[0],ex[0],ey[0])
	line(x1[1],y1[1],ex[1],ey[1])
	line(x1[2],y1[2],ex[2],ey[2])
	line(x1[3],y1[3],ex[3],ey[3])
	line(x1[4],y1[4],ex[4],ey[4])
	line(x1[5],y1[5],ex[5],ey[5])
	line(x1[6],y1[6],ex[6],ey[6])
	line(x1[7],y1[7],ex[7],ey[7])

	for(i=0;i<8;i++){
		if(i%2 === 0){
			x1[i] += inc1
			y1[i] += inc2
			ex[i] += inc2
			ey[i] += inc1
		
			if(x1[i] > xmax ){
				x1[i] = xmax
			} else if(x1[i] < xmin ){
				x1[i] = xmin				
			}

			if(y1[i] > ymax ){
				y1[i] = ymax				
			} else if(y1[i] < ymin ){
				y1[i] = ymin				
			}

		} else if(i%2 === 1){
			x1[i] -= inc2
			y1[i] -= inc1
			ex[i] += inc1
			ey[i] += inc2

			if(x1[i] > xmax){
				x1[i] = xmax
			} else if(x1[i] < xmin){
				x1[i] = xmin
			}

			if(y1[i] > ymax){
				y1[i] = ymax
			} else if(y1[i] < ymin){
				y1[i] = ymin
			}
			
		}
	}


	for(i=0;i<100;i++){
		if(i%2 === 0){			
			starX[i] += inc1
			starY[i] += inc2
		} else if(i%2 === 1){			
			starX[i] += inc2
			starY[i] += inc1
		}
		
	}

	inc1 = map(pmouseX,0,width,0,2)-1
	inc2 = map(pmouseY,0,height,0,2)-1

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


