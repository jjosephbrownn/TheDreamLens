//based on https://editor.p5js.org/js6450/sketches/kWcChe550
//also cool if mousePressed is changed to draw for drag function

let cnv
let photo1,photo2
let a,b
let mouseState = true
let offPix = []

let org
let rand
let frac
let dur

let wrdVoice
let smpVoice
let wrdDur1,wrdDur2
let smpDur1,smpDur2
let dry,time
	
let pos = 0
let mouseCount = 0
let holeCount = 0
let holeRand
let picState = true
let playState = false
let fracState = true
let holeState = true
let reverse = false
let structure
let totalCount = 0
let posLen
let atkInc = 0
let decInc = 0
let filtInc = 50
let infoBox

let loadImg
let loadText
let loadStep

function preload(){
	loadStep = sessionStorage.getItem("footsteps")
	let load = new loadChoice()
	let loadThing = load.loader()
	pChoice = new tatpiccer()
	let pic1
	let pic2

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
	
	pic1 = pChoice.pic1(random([0,1]))
	pic2 = pChoice.pic2(random([0,1]))	
	
	photo1 = loadImage(pic1);
	photo2 = loadImage(pic2);	
}

function setup() {
	createCanvas(windowWidth*0.9,windowHeight*0.9);

	let td = select("#loader")

	if(loadStep === "scatter"){
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "repurpose"){
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}else if(loadStep === "cartography"){
		loadImg.resize(width*1.5,0)
		image(loadImg,random(-width/2,0),random(-height/2,0))
		if(layerChoice === 0){
			photo1.resize(0,height)
			photo2.resize(width,0)
		}else if(layerChoice === 1){
			photo1.resize(width,0)
			photo2.resize(0,height)
		}else if(layerChoice === 2){
			photo1.resize(width,0)
			photo2.resize(width,0)
		}
	} else if (loadStep === "gather") {
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadText = join(loadText,"\n")
		td.html(loadText)
	} else {
		photo1.resize(0,height)
		photo2.resize(0,height)
		loadImg.resize(0,height)
		image(loadImg,(width/2) - (loadImg.width/2),0)
	}

	noCursor();
	imageMode(CENTER)

	rand = round(random(4,12))
	holeRand = round(random(12,25))
	structure = round(random(25,45))
	// smpVoice = new fracture(random([0,1,2]),1)
	smpVoice = new fracture(0,2,random([0,1]))
	smpVoice.params()
	org = new organa(random(40)+20, round(random([24,36,48,60])),random([0,1,2]))
	org.floral()
	posLen = org.cantLen()
	posLen = posLen*2
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		
		image(photo1,width/2,height/2); 

		infoBox = createDiv("info")
		infoBox.class("info")
		infoBox.style("display", "none")
		infoBox.position(15,15)
		infoBox.mouseOver(infoOn)
		infoBox.mouseOut(infoOff)
		setTimeout(function(){
			infoBox.style("display", "block")
		},120000)

		setTimeout(function(){
			smpDur1 = smpVoice.dur1()
			smpDur2 = smpVoice.dur2()
		},2000)
	},5000) 
}

function mousePressed(){	
	if(reverse === false){
		let hole1,hole2

		if(holeState === true){
			hole1 = 100
			hole2 = 100
		} else if(holeState === false){
			hole1 = random(100,width)
			hole2 = random(5,20)
		}
		
		
		tint(255,255)
		image(photo2,mouseX+255,mouseY,hole1,hole2,mouseX,mouseY,hole1,hole2); 
		
		let mousePos = mouseX+mouseY
		let quad = round(map(mousePos, 0,(width+height),0,2))
		let place3 = round(map(mousePos,0,(width+height),0,smpDur1))
		let place4 = round(map(mousePos,0,(width+height),0,smpDur2))

		smpVoice.add(0,place3)
		smpVoice.add(1,place4)

		if(totalCount === structure){
			reverse = true
			setTimeout(function(){
				reverse = false
			},random(10000,60000))
		}

		if(fracState === true){
			mouseCount++
			holeCount++
			if(mouseButton === RIGHT){
				if(quad === 0){
					smpVoice.fracBPM(0,random([30,60,90,120]))
					smpVoice.fracBegin(0)
				} else if(quad === 1){
					smpVoice.fracBPM(1,random([30,60,90,120]))
					smpVoice.fracBegin(1)
				} else if(quad === 2){
					smpVoice.fracBPM(0,random([30,60,90,120]))
					smpVoice.fracBPM(1,random([30,60,90,120]))
					smpVoice.fracBegin(0)
					smpVoice.fracBegin(1)
				}
			}
			
			if(picState === true){
				org.startup()
				org.begin()
				picState = false
			}

			if(mouseCount === rand){ //part 2
				let r = round(random())
				let q = round(random())
				org.floral()
				org.voices(0,r)
				org.voices(1,q)
				rand = round(random(4,12))
				mouseCount = 0 
				playState = true
			}

			if(holeCount === holeRand){
				holeCount = 0
				mouseCount = 0
				rand = round(random(4,12))
				holeRand = round(random(12,25))
				fracState = false
				playState = false
				holeState = false
				org.stop(0)
				org.stop(1)
				org.stop(2)
				smpVoice.fracStop(0)
				smpVoice.fracStop(1)
			}
			totalCount++

		} else if(fracState === false){
			if(mouseButton === RIGHT){
				if(quad === 0){
					smpVoice.samplePlayCont(0,random(-1,1))
				} else if(quad === 1){
					smpVoice.samplePlayCont(1,random(-1,1))
				} else if(quad === 2){
					smpVoice.samplePlayCont(0,random(-1,1))
					smpVoice.samplePlayCont(1,random(-1,1))
				}
				org.paramChange(atkInc,decInc,filtInc)
				atkInc += 0.05
				decInc += 0.05
				filtInc += 50
			} else if(mouseButton === LEFT){
				org.nextNote(0,pos)
				org.nextNote(1,pos)
				org.nextNote(2,pos)
				pos++
			}
			if(pos === posLen){
				playState = false;
				fracState = true;
				picState = true;
				pos = 0
				holeCount = 0
				mouseCount = 0
				rand = round(random(4,12))
				holeRand = round(random(12,25))
				holeState = true
			}
		}
	} else if(reverse === true){
		if(playState === true){
			return null
		} else if(playState === false && fracState === true){
			smpVoice.fracStop(0)
			smpVoice.fracStop(1)
		} else if(playState === false && fracState === false){
			smpVoice.samplePause(0)
			smpVoice.samplePause(1)
		}
		mouseState = true;
	}
} 

function mouseReleased(){
	if(reverse === false){
		if(playState === true){
			return null
		}else if(playState === false && fracState === true){
			smpVoice.fracStop(0)
			smpVoice.fracStop(1)
		} else if(playState === false && fracState === false){
			smpVoice.samplePause(0)
			smpVoice.samplePause(1)
		}
		mouseState = true;
	} else if(reverse === true){
		let hole1,hole2

		if(holeState === true){
			hole1 = 100
			hole2 = 100
		} else if(holeState === false){
			hole1 = random(100,width)
			hole2 = random(5,20)
		}
		
		
		tint(255,255)
		image(photo2,mouseX+255,mouseY,hole1,hole2,mouseX,mouseY,hole1,hole2); 
		
		let mousePos = mouseX+mouseY
		let quad = round(map(mousePos, 0,(width+height),0,2))
		let place3 = round(map(mousePos,0,(width+height),0,smpDur1))
		let place4 = round(map(mousePos,0,(width+height),0,smpDur2))

		smpVoice.add(0,place3)
		smpVoice.add(1,place4)

		if(totalCount === structure){
			reverse = true
		}

		if(fracState === true){
			mouseCount++
			holeCount++
			if(mouseButton === RIGHT){
				if(quad === 0){
					smpVoice.fracBPM(0,random([30,60,90,120]))
					smpVoice.fracBegin(0)
				} else if(quad === 1){
					smpVoice.fracBPM(1,random([30,60,90,120]))
					smpVoice.fracBegin(1)
				} else if(quad === 2){
					smpVoice.fracBPM(0,random([30,60,90,120]))
					smpVoice.fracBPM(1,random([30,60,90,120]))
					smpVoice.fracBegin(0)
					smpVoice.fracBegin(1)
				}
			}
			
			if(picState === true){
				org.startup()
				org.begin()
				picState = false
			}

			if(mouseCount === rand){ //part 2
				let r = round(random())
				let q = round(random())
				org.floral()
				org.voices(0,r)
				org.voices(1,q)
				rand = round(random(4,12))
				mouseCount = 0 
				playState = true
			}

			if(holeCount === holeRand){
				holeCount = 0
				mouseCount = 0
				rand = round(random(4,12))
				holeRand = round(random(12,25))
				fracState = false
				playState = false
				holeState = false
				org.stop(0)
				org.stop(1)
				org.stop(2)
				smpVoice.fracStop(0)
				smpVoice.fracStop(1)
			}
			totalCount++

		} else if(fracState === false){
			if(mouseButton === RIGHT){
				if(quad === 0){
					smpVoice.samplePlayCont(0,random(-1,1))
				} else if(quad === 1){
					smpVoice.samplePlayCont(1,random(-1,1))
				} else if(quad === 2){
					smpVoice.samplePlayCont(0,random(-1,1))
					smpVoice.samplePlayCont(1,random(-1,1))
				}
				org.paramChange(atkInc,decInc,filtInc)
				atkInc += 0.05
				decInc += 0.05
				filtInc += 50
			} else if(mouseButton === LEFT){
				org.nextNote(0,pos)
				org.nextNote(1,pos)
				org.nextNote(2,pos)
				pos++
			}
			if(pos === posLen){
				playState = false;
				fracState = true;
				picState = true;
				pos = 0
				holeCount = 0
				mouseCount = 0
				rand = round(random(4,12))
				holeRand = round(random(12,25))
				holeState = true
			}
		}
	}
}


function infoOn(){
	setTimeout(function(){
		infoBox.html("have you tried pressing keys?")
	},2000)
	
}

function infoOff(){
	infoBox.html("info")
}