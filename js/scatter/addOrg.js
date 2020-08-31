
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

let caption
let field 

let allNotes = []
let melPos = []
let orgX = 50
let storedMel
let xPlus
let limit
let pressState = true
let getOut

let maps = [ // PICS OF PLAINCHANT!!!
	"/pics/notation/page1.jpg",
	"/pics/notation/page2.jpg",
	"/pics/notation/page3.jpg"
]
let backMap

function preload(){
	let picChoice = round(random(maps.length-1))
	backMap = loadImage(maps[picChoice])
}


function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight-20)
	backMap.resize(width*1.5,0)
	image(backMap,random(-width/4,0),random(-height/2,0))

	storedMel = JSON.parse(sessionStorage.getItem("melody"))

	xPlus = (width/2)/storedMel.length
	limit = storedMel.length*2
	rectMode(CENTER)

	for(i=0;i<storedMel.length;i++){
		melPos[i] = createVector(orgX,(storedMel[i]*25) + height/2)
		fill("black")
		rect(melPos[i].x,melPos[i].y,25,25)
		orgX += xPlus
	}
	console.log(xPlus)

	for(i=0;i<storedMel.length-1;i++){
		line(melPos[i].x,melPos[i].y,melPos[i+1].x,melPos[i+1].y)
	}
		
	let textWidth = width*0.7
	let textHeight = height/8

	marginL = (width/2)-(textWidth/2)
	marginT = height/4

	let titleL = (width/2)-(width/3)
	let titleT = height/16

	let butL = (width/2) - 50
	let butT = height*0.9

	title = createElement("h1", "Vox Principalis")
	title.class("textTitle")
	title.position(titleL, titleT)

    caption = createDiv("Our Cantus Firmus so far sounds like this.  Please add some more notes (your footsteps have already contributed)")
    caption.class("caption")
	caption.position(marginL,marginT)
	caption.size(textWidth,textHeight)	

	but = createButton("organalis")
	but.class("siteBut")
	but.size(100)
	but.position(butL, butT)
	but.mousePressed(nameLog)

	getOut = select("#mymodal")
	
};

function mousePressed(){
	if(storedMel.length === limit){
		pressState = false
	}
	if(pressState === true){
		let noteLen = melPos.length
		fill("black")
		let newRect = createVector(orgX,map(mouseY,0,height,(height/2)-50,(height/2)+250))
		melPos.push(newRect)
		rect(newRect.x,newRect.y,25,25)
		line(melPos[noteLen-1].x,melPos[noteLen-1].y,newRect.x,newRect.y)
		orgX += xPlus
		let newtone = round(map(newRect.y,0,height,0,6))
		storedMel.push(newtone)

	}
}

function nameLog(){
	sessionStorage.setItem("melody", JSON.stringify(storedMel))
	setTimeout(function(){
		getOut.style("display", "block")
	})
}