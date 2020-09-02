
let marginL,marginT
let heading
let titleT,titleL
let style;
let textChoice
let t
let look
let gathHov

let cnv;
let div1

function preload(){
	textChoice = new commentary()
	t = textChoice.miscChoice(0)
	t = loadStrings(t)
}

function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight*6)
	background(255);
	let td = select("#loader")

	let fillText = join(t,"\n")
		
	let textWidth = width*0.55
	let textHeight = height/2

	marginL = (width/2)-(textWidth/2)
	marginT = 25

	td.class("loaded")

    look = createDiv(fillText)
    look.class("miscText")
	look.position(marginL,marginT)
	look.size(textWidth,textHeight)

	let gathLink = select(".miscLink")
	gathLink.mousePressed(linker)
	gathLink.mouseOver(citOn)
	gathLink.mouseOut(citOff)

	gathHov = createDiv("The Body and Discursive Subjectivity")
	gathHov.class("hovLink")
	gathHov.id("gathHov")
	look.child(gathHov)
};

function linker(){
	print("yay")
	if(this.id() === "gathTag"){
		let newChoice = textChoice.miscChoice(1)
		let newT = loadStrings(newChoice,texter)		
	}
}

function draw(){
	gathHov.position(mouseX+100,mouseY-100)
}

function texter(result){
	let newText = join(result,"\n")
	look.html(newText)
}

function citOn(){
	if(this.id() === "gathTag"){
		gathHov.style("opacity", "100%")
	}
}

function citOff(){
	if(this.id() === "gathTag"){
		gathHov.style("opacity", "0%")
	}
}