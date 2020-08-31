// randomises start here - but would be cool if it remembered drawn star maps from earlier pages (see stars.js)
// looks mint, constrain map into square, stop movement if it comes up against edge
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

let detune1,detune2
let mousePosX
let mousePosY
let posXState
let posYState
let cue1a
let cue2a
let cue1b
let cue2b
let end1a
let end2a
let end1b
let end2b
let diff
let strin
let masterInc1 = 0,masterInc2 = 0
let infoBox
let synthState = false
let rand 
let mouseCount = 0
let structure = 0

let loadImg
let loadText
let loadStep
let aph,pluck,song

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
	cnv = createCanvas(windowWidth-20,windowHeight-20);

	let td = select("#loader")

	let loops = parseInt(sessionStorage.getItem("numLoops"))

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

	let tatOct = round(random(24,60))
	let tatBPM = round(random(60,90))
	aph = new aphex(loops,tatOct,tatBPM,round(random(16)))
	pluck = new linden(loops,random(0.001,0.1),random(0.1,1))
	song = new songer(round(random(15)))
	aph.startUp()
	pluck.startUp()
	
	setTimeout(function(){
		clear()
		td.class("loaded")
		background(0);

		xmin = width/20
		xmax = width-xmin
		ymin = height/10
		ymax = height-ymin

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

		dur1 = song.dur(0)
		dur2 = song.dur(1)
		cue1a = random(0,dur1-1)
		cue2a = random(0,dur2-1)
		cue1b = random(0,dur1-1)
		cue2b = random(0,dur2-1)
		end1a = random()
		end2a = random()
		end1b = random()
		end2b = random()

		strin = aph.length()-1

		rand = round(random(6,12))

		setInterval(aphNote,500)

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

function mousePressed(){
	if(mouseX > width/2){
		posXState = "xpos1"
	} else if(mouseX < width/2){
		posXState = "xpos2"
	}

	if(mouseY > height/2){
		posYState = "ypos1"
	} else if(mouseY < height/2){
		posYState = "ypos2"
	}

	mouseCount++
	if(mouseCount === rand){
		structure++
		mouseCount = 0
		rand = round(random(6,12))
		if(structure === 1){
			aph.sampler(1)
			aph.play(1)
			aph.play(4)
		} else if(structure === 2){
			structure = 0
			aph.sampler(0)
			aph.stop(1)
			aph.stop(4)
		}
	}
	print(mouseCount,rand,structure)
}

function mouseReleased(){
	if(mouseButton === LEFT){
		song.sampleStop(0)
	} else if(mouseButton === RIGHT){
		song.sampleStop(2)
	}
}

function mouseDragged(){
	if(mouseButton === LEFT){
		if(posXState === "xpos2"){
			if(mouseX < width/2){
				song.looper(0,cue1a,end1a,random(-1,1))
				posXState = "xpos1"
			}
		}else if(posXState === "xpos1"){
			if(mouseX > width/2){
				song.looper(0,cue1b,end1b,random(-1,1))
				posXState = "xpos2"
			}
		}
	}else if(mouseButton === RIGHT){
		if(posYState === "ypos2"){
			if(mouseY < height/2){
				song.looper(2,cue2a,end2a,random(-1,1))
				posYState = "ypos1"
			}
		}else if(posYState === "ypos1"){
			if(mouseY > height/2){
				song.looper(2,cue2a,end2a,random(-1,1))
				posYState = "ypos2"
			}
		}
	}
}

function synthVoice(){
	if(synthState === true){
		aph.play(0)
		aph.play(2)
	} else if(synthState === false){
		aph.stop(0)
		aph.stop(2)
	}	
}

function aphNote(){
	let aphEnv = map(masterInc1,-20,20,0.05,2)
	let aphFreq = map(masterInc2,-20,20,100,10000)
	aph.posChange(0,pitch1)
	aph.posChange(2,pitch2)
	masterInc1 += inc1
	masterInc2 += inc2
	aph.envChange(aphEnv)
	aph.freqChange(aphFreq)
}


function draw(){
	detune1 = map(mouseX,0,width,-10,10)
	detune2 = map(mouseY,0,height,-10,10)	

	let stat = mouseX + mouseY
	let move = pmouseX + pmouseY
	diff = stat - move
	if(diff > 100 || diff < -100){
		synthVoice()
		if(synthState === true){
			synthState = false
		} else if(synthState === false){
			synthState = true
		}
	}
	let absInc1 = Math.abs(inc1)
	let absInc2 = Math.abs(inc2)
	pitch1 = round(map(absInc1,0,1,0,strin))
	pitch2 = round(map(absInc2,0,1,0,strin))

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
		infoBox.html("have you tried pressing keys?")
	},2000)
	
}

function infoOff(){
	console.log("off")
	infoBox.html("info")
}


