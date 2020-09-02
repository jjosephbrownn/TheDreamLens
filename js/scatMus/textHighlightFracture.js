let cnv;
let div1
let look
let hide
let hidSplit
let hidLen
let fillText
let hiddenText
let textChoice
let t1,t2

let strings
let trio
let frac
let pos1 = 0
let pos2 = 0
let pos3 = 0

let posLen
let fracDur1, fracDur2

let mouseCount = 0
let structure = 0
let rand

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

	textChoice = new pages()
	t1 = textChoice.centChoice()
	t1 = loadStrings(t1)

	t2 = textChoice.fragChoice()
	t2 = loadStrings(t2)
}


function setup(){
	cnv = createCanvas(windowWidth,windowHeight)

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

	let genPrint = sessionStorage.getItem("prevPlace")
	let cat = random([0,1,2])
    if(genPrint === "scatter"){
        frac = new fracture(random([1,2]))//vocal samples
        frac.params()
    } else if (genPrint === "repurpose"){
        frac = new fracture(0,cat)//sound samples
        frac.params()
    }  else {
    	frac = new fracture(0,cat)//sound samples
        frac.params()
    }

    beat = new beater(random(60,120))

	rand = round(random(4,12))

	let fillText = join(t1,"\n")
	let hiddenText = join(t2, "\n")

	hidSplit = hiddenText.split(" ")
	hidLen = hidSplit.length	

	let textWidth = width*0.25
	let textHeight = height/2

	setTimeout(function(){
		clear()
		td.class("loaded")
		background(255);

		fracDur1 = frac.dur1()
		fracDur2 = frac.dur2()

		look = createDiv(fillText)
		look.class("text")
		look.position(textWidth*0.66,height*0.05)

		hide = createDiv(hiddenText)
		hide.class("textOff")
		hide.position((width-textWidth)/2,height*0.05)

		setInterval(filler,5000)
	},5000)
};


$('body').mouseup(function(){
	var spann = document.createElement("span");
	spann.className = "textOff"
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var range = sel.getRangeAt(0).cloneRange();
            range.surroundContents(spann);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
    filler(spann)

	frac.add(0,random(fracDur1))
	frac.add(1,random(fracDur2))

	if(structure === 0){   	
		frac.sampleStop(0)
		frac.sampleStop(1)
		frac.fracStop(0)
		frac.fracStop(1)
		beat.stop(0)
		beat.stop(1)
		beat.stop(2)
		beat.stop(3)
    }else if(structure === 1){
		frac.fracStop(0)
		frac.fracStop(1)
		beat.stop(0)
		beat.stop(1)
		beat.stop(2)
		beat.stop(3)
    }else if(structure === 2){  	
		frac.sampleStop(0)
		frac.fracStop(1) 
		frac.fracStop(0)    
		beat.stop(0)
		beat.stop(1)
		beat.stop(2)
		beat.stop(3)	
    }else if(structure === 3){
		frac.sampleStop(0)
		frac.sampleStop(1)
	} else if(structure === 4 || structure === 5 || structure === 6){
		beat.stop(0)
		beat.stop(1)
		beat.stop(2)
		beat.stop(3)
		beat.stop(4)
	}
	
});

function mouseDragged(){
	let pan1 = map(mouseX,0,width,-1,1)
	let pan2 = map(mouseY,0,height,-1,1)
	pan1 = constrain(pan1,-1,1)
	pan2 = constrain(pan2,-1,1)
	if(structure !== 0 || structure !== 1 || structure !== 2){
		if(mouseButton === LEFT){
			frac.panner(0,pan1)
		}else if(mouseButton === RIGHT){
			frac.panner(1,pan2)
		}
	}
}

function mousePressed(){
	let fracPos1 = map(mouseX,0,width,0,fracDur1)
	let fracPos2 = map(mouseY,0,height,0,fracDur2)
	fracPos2 = constrain(fracPos2,0,fracDur2-1)

	if(structure === 0){
    	if(mouseButton === LEFT){
    		frac.samplePlay(0,fracPos1,random(-1,1))
    	}else if(mouseButton === RIGHT){
    		frac.samplePlay(1,fracPos2,random(-1,1))
    	}
    }else if(structure === 1){
    	if(mouseButton === LEFT){
    		frac.fracBegin(0)
    	}else if(mouseButton === RIGHT){
    		frac.fracBegin(1)
    	}
    }else if(structure === 2){
    	if(mouseButton === LEFT){
    		frac.samplePlay(0,fracPos1,random(-1,1))
    	}else if(mouseButton === RIGHT){
    		frac.fracBegin(1)
    	}
    }else if(structure === 3){
    	frac.samplePlay(0,fracPos1,random(-1,1))
		frac.samplePlay(1,fracPos2,random(-1,1))
    }else if(structure === 4){
    	beat.add(random([0,2]))
    	frac.fracBegin(0)
		frac.fracBegin(1)
		beat.play(0)
		beat.play(1)
    }else if(structure === 5){
    	beat.add(random([0,2]))
    	frac.fracBegin(0)
		frac.fracBegin(1)
		beat.play(0)
		beat.play(1)
		beat.play(2)
		beat.play(3)
    }else if(structure === 6){
    	frac.fracBegin(0)
		frac.fracBegin(1)
		beat.play(0)
		beat.play(1)
		beat.play(2)
		beat.play(3)
    }else if(structure === 7){
    	beat.stop(2)
    	beat.stop(3)
    	frac.fracBegin(0)
		frac.fracBegin(1)
		beat.play(0)
		beat.play(1)
		beat.play(3)
		beat.play(4)
    }

	if(mouseCount === rand){
		structure++
		mouseCount = 0
		rand = round(random(4,12))
	}
	mouseCount++
	if(structure === 8){
		structure = 0
		beat.oldPat()
	}
}


function filler(fill){
	let newFill = []
	let offset = round(random(hidLen-1))
	let end = round(random(8))
	for(i=0;i<end;i++){
		newFill[i] = hidSplit[offset]
		offset++
	}
	let newWords = newFill.join(" ")
	setTimeout(function(){
		fill.textContent = newWords
		fill.className = "textOn"
	},random(5000))

}

