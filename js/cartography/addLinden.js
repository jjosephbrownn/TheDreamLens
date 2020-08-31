// developed from https://www.youtube.com/watch?v=E1B4UoSQMFw
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

let numLoops
let but,but2
 
let angle
let axiom = "F"
let sentence = axiom
let len = 50

let rules = []
rules[0] = {
	a: "F",
	b: "FF+[+F-F-F]-[-F+F+F]"
}

function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight-20)
	background(0)

	translate(width*0.75,height)
	angle = radians(25)

	numLoops = parseInt(sessionStorage.getItem("numLoops"))
	generate()
	turtle()

	let textWidth = width*0.5
	let textHeight = height/8

	marginL = (width/4)-(textWidth/4)
	marginT = height/8

	let butL = (width/4) + 50
	let butT = height*0.75

    caption = createDiv("The loops of our Lindenmayer system so far.  A L-System is a recursive language for describing natural patterns - this one controls the shape of melodies within the Cartography pages")
    caption.class("caption")
	caption.position(marginL,marginT)
	caption.size(textWidth,textHeight)
	caption.style("color","white")	

	but = createButton("stutter")
	but.mousePressed(generate)
	but.class("siteBut")
	but.size(120)
	but.position(butL, butT)

	but2 = createButton("somewhere else")
	but2.mousePressed(link)
	but2.class("siteBut")
	but2.size(120)
	but2.position(butL, butT + 50)

	getOut = select("#mymodal")
};

function generate(){
	len *= 0.5
	let nextSentence = ""
	for(i=0;i<sentence.length;i++){
		let current = sentence.charAt(i)
		let found = false
		for(j=0;j<rules.length;j++){
			if(current == rules[j].a){
				found = true;
				nextSentence +=rules[j].b;
				break;
			}
		}
		if(!found){
			nextSentence += current
		}
	}
	sentence = nextSentence
	turtle()
	numLoops++
}

function turtle(){
	stroke(255,100)
	for(i = 0; i <sentence.length;i++){
		let current = sentence.charAt(i)

		if(current == "F"){
			line(0,0,0,-len)
			translate(0,-len)
		} else if(current == "+"){
			rotate(angle)
		} else if(current == "-"){
			rotate(-angle)
		} else if(current == "["){
			push()
		} else if(current == "]"){
			pop()
		}
	}
	sessionStorage.setItem("numLoops", numLoops)
}

function link(){
	getOut.style("display", "block")
}
