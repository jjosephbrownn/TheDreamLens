
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

	linkSearch()

	gathHov = createDiv("")
	gathHov.class("hovLink")
	gathHov.id("gathHov")
	look.child(gathHov)
};

function linkSearch(){
	let link = selectAll(".miscLink")
	for(i=0;i<link.length;i++){
		link[i].mousePressed(linker)
		link[i].mouseOver(citOn)
		link[i].mouseOut(citOff)
	}
}

function linker(){
	if(this.id() === "scatTag"){
		let newChoice = textChoice.miscChoice(1)
		print(newChoice)
		let newT = loadStrings(newChoice,texter)		
	}if(this.id() === "gathTag"){
		let newChoice = textChoice.miscChoice(2)
		let newT = loadStrings(newChoice,texter)		
	}if(this.id() === "purpTag"){
		let newChoice = textChoice.miscChoice(3)
		let newT = loadStrings(newChoice,texter)		
	}if(this.id() === "cartTag"){
		let newChoice = textChoice.miscChoice(4)
		let newT = loadStrings(newChoice,texter)		
	}if(this.id() === "miscTag"){
		let newChoice = textChoice.miscChoice(7)
		let newT = loadStrings(newChoice,texter)		
	}if(this.id() === "lacTag"){
		let newChoice = textChoice.miscChoice(6)
		let newT = loadStrings(newChoice,texter)		
	}if(this.id() === "tatTag"){
		let newChoice = textChoice.miscChoice(5)
		let newT = loadStrings(newChoice,texter)		
	}
}

function draw(){
	gathHov.position(mouseX+75,mouseY-100)
}

function texter(result){
	let newText = join(result,"\n")
	look.html(newText)
	linkSearch()
	$('html, body').animate({ scrollTop: 0 }, 400);
}

function citOn(){
	print(this.id())
	if(this.id() === "scatTag"){
		gathHov.style("opacity", "100%")
		gathHov.html("Narrative and Irony")
	}if(this.id() === "gathTag"){
		print("yay")
		gathHov.style("opacity", "100%")
		gathHov.html("The Body and Discursive Subjectivity")
	}if(this.id() === "purpTag"){
		gathHov.style("opacity", "100%")
		gathHov.html("Nature and Technology")
	}if(this.id() === "cartTag"){
		gathHov.style("opacity", "100%")
		gathHov.html("Multiplicity and Musical Organisation")
	}if(this.id() === "tatTag"){
		gathHov.style("opacity", "100%")
		gathHov.html("Future Connection")
	}if(this.id() === "lacTag"){
		gathHov.style("opacity", "100%")
		gathHov.html("Appendices")
	}if(this.id() === "miscTag"){
		gathHov.style("opacity", "100%")
		gathHov.html("Bibliography")
	}
}

function citOff(){
	if(this.id() === "scatTag"){
		gathHov.style("opacity", "0%")
	}if(this.id() === "gathTag"){
		gathHov.style("opacity", "0%")
	}if(this.id() === "purpTag"){
		gathHov.style("opacity", "0%")
	}if(this.id() === "cartTag"){
		gathHov.style("opacity", "0%")
	}if(this.id() === "tatTag"){
		gathHov.style("opacity", "0%")
	}if(this.id() === "lacTag"){
		gathHov.style("opacity", "0%")
	}if(this.id() === "miscTag"){
		gathHov.style("opacity", "0%")
	}
}