//right click reset chooses new sequence
//left click drag alters current sequence a bit
//adding places lengthens sequence
//well cool if circle size is randomised in draw


let loadStep
let loadImg
let loadText
let pChoice
let photo1
let photo2

let song
let listVoice

let dots = []
let numDots = 1
let sites1 = [
	"Old Sarum",
	"Odstock",
	"Coombe Bissett",
	"Little Durnford",
	"Lower Woodford",
	"Larkhill",
	"Ford",
	"Great Wishford",
	"Steeple Langford",
	"Compton Chamberlayne",
	"Teffont Magna",
	"Chilmark",
	"Sixpenny Handley",
	"Beaulieu",
	"Lyndhurst",
	"Lyme Regis",
	"Nomansland",
	"Kimmeridge",
	"Corfe Castle",
	"Lulworth",
	"Worth Matravers",
	"Swanage",
	"Studland",
	"Alton Priors White Horse",
	"Avebury",
	"Bratton Camp",
	"Cley Hill",
	"Figsbury",
	"Wayland's Smith",
	"Uffington",
	"Dorset Cursus",
	"Maiden Castle",
	"Danebury",
	"Bokerley Dyke",
	"Silbury Hill",
	"Avebury",
	"Stonehenge",
	"Woodhenge"
]

let sites2 = [
	"Green Lanes",
	"Finsbury Park",
	"Harringay",
	"Wood Green",
	"Seven Sisters",
	"Stamford Hill",
	"Clapton Pond",
	"London Fields",
	"Willesden Green",
	"Kilburn",
	"Shacklewell",
	"Bethnal Green",
	"Walthamstow",
	"Tottenham Hale"
]

let sites3 =[
	"Heaton",
	"Prudhoe",
	"Cramlington",
	"Whitley Bay",
	"Ashington",
	"Corbridge",
	"Hexham",
	"Spennymoor",
	"Morpeth",
	"Cheeseburn",
	"Alnmouth",
	"Craster",
	"Newton-by-the-Sea",
	"Seahouses",
	"Bamburgh",
	"Lindisfarne",
	"Kielder Water",
	"Butterburn",
	"Falstone",
	"Otterburn",
	"Wylam"
]

let sites4 = [
	"Sirius",
	"Canopus",
	"Arcturus",
	"Vega",
	"Capella",
	"Rigel",
	"Procyon",
	"Achernar",
	"Hadar",
	"Altair",
	"Acrux",
	"Aldebaran",
	"Spica",
	"Pollux",
	"Fomalhaut",
	"Miaplacidus",
	"Alioth",
	"Wezen",
	"Menkalinan",
	"Mirzam",
	"Polaris",
	"Alpheratz",
	"Muhlifain",
	"Sadr",
	"Almach",
	"Dschubba",
	"Ankaa",
	"Enif",
	"Markab",
	"Aljanah",
	"Eltanin",
	"Alphecca",
	"Algol",
	"Aspidiske",
	"Alphard"
]

let userSites = []

let allSites = [sites1,sites2,sites3,sites4]
let siteNames
let siteNum

let inst1,inst2,inst3

let cols = [0,0,0,255]
let mapFont
let numChanges = 0
let numResets = 0
let wordNum1,wordNum2
let mapx,mapy

function preload(){
	let pChoice = new tatpiccer()
	let pic1 = pChoice.mapPic()
	photo1 = loadImage(pic1);
	mapFont = loadFont("/fonts/PfefferMediaeval.otf")
}

function setup() {
 	createCanvas(windowWidth-20, windowHeight-20);
 	
 	song = new songer(numDots)
 	listVoice = new fracture(1,2,1)//two spoken word samples, cartGath style
 	listVoice.params(12)

 	userSites = JSON.parse(sessionStorage.getItem("newSiteNames"))

 	let fonts = ["Centaur", mapFont]
 	typ = fonts[round(random(fonts.length-1))]

 	imageMode(CENTER)
 	photo1.resize(width*2,0)
 	mapx = 0
 	mapy = random(-height*0.25,0)

 	siteNum = round(random(allSites.length-1))
	siteNames = allSites[siteNum]
	if(userSites !== null){
		for(i=0;i<userSites.length;i++){
			siteNames.push(userSites[i])
		}
	} 
	
	for (i = siteNames.length - 1; i > 0; i--) {//shuffle it up dude
    	let j = Math.floor(Math.random() * (i + 1)); 
    	[siteNames[i], siteNames[j]] = [siteNames[j], siteNames[i]];
	}
	
	let cy = random(50,height-50) 
	let cx = random(50,width-50) 
    dots[0] = createVector(cx,cy) 

	setInterval(colours,2000)

	wordNum1 = round(random(allSites.length-1))
	wordNum2 = round(random(allSites.length-1))
	if(wordNum2 === wordNum1){
		wordNum2 = round(random(allSites.length-1))
	}
}

function draw(){
	stroke(0)
    strokeWeight(2)  
    image(photo1,mapx,mapy);  
  	textSize(24)
  	// textFont("Centaur")
  	textFont(typ)

  	if(numDots === 1){
  		strokeWeight(4)
  		point(dots[0].x,dots[0].y)
	    noFill()
	    stroke(cols[0])
	    circle(dots[0].x,dots[0].y,50)       
	  	text(siteNames[0],dots[0].x+25,dots[0].y-25)
  	}
	
    for(m=0;m<numDots-1;m++){//draws tris
    	stroke(0)
    	strokeWeight(4)
        line(dots[m].x,dots[m].y,dots[m+1].x,dots[m+1].y)//tri dots
        if(numChanges > 4){
        	noFill()
	        stroke(cols[m])
	        circle(dots[m].x,dots[m].y,random(10,50))
        } else {
        	noFill()
	        stroke(cols[m])
	        circle(dots[m].x,dots[m].y,50)
        }
        
    } 

    for(m=0;m<numDots-1;m++){//draws tris
    	stroke(0)
    	strokeWeight(1)
     	text(siteNames[m],dots[m].x+25,dots[m].y-25)
    } 
    
}

function mousePressed(){
	if(mouseButton === LEFT){
		dots[numDots] = createVector(mouseX,mouseY)
		numDots++
		listVoice.add(0,random(0,2))
		listVoice.add(1,random(0,2))
		cols.push([0,0,0,255])
		song.lenChange(numDots)
		if(siteNum === wordNum1){
			listVoice.fracBegin(0)
		} else if(siteNum === wordNum2){
			listVoice.fracBegin(1)
		} 
		if(numDots === 15){
			numDots = 1
			song.songStop(0)
			song.songStop(1)
			song.songStop(2)
			song.samplePlay(0,0,-0.5)
			song.samplePlay(1,0,0.5)
			song.samplePlay(2,0,0)
			numChanges = 0
			numResets++
		}

		if(siteNum === 0){
			song.songStop(2)
			if(mouseX > width/2){
				song.songBegin(0)
			} else if(mouseX < width/2){
				song.songStop(0)
			}
			if(mouseY > height/2){
				song.songBegin(1)
			} else if(mouseY < height/2){
				song.songStop(1)
			}

		} if(siteNum === 1){
			song.songStop(0)
			if(mouseX > width/2){
				song.songBegin(1)
			} else if(mouseX < width/2){
				song.songStop(1)
			}
			if(mouseY > height/2){
				song.songBegin(2)
			} else if(mouseY < height/2){
				song.songStop(2)
			}

		} if(siteNum === 2){
			song.songStop(1)
			if(mouseX > width/2){
				song.songBegin(2)
			} else if(mouseX < width/2){
				song.songStop(2)
			}
			if(mouseY > height/2){
				song.songBegin(0)
			} else if(mouseY < height/2){
				song.songStop(0)
			}

		} if(siteNum === 3){
			if(mouseX < width/3){
				song.songBegin(0)
			} else if(mouseX > width/3 && mouseX < (width/3)+width/3){
				song.songBegin(1)
			} else if(mouseX > (width/3)+width/3){
				song.songBegin(2)
			} 

			if(mouseY < height/3){
				song.songStop(0)
			} else if(mouseY > height/3 && mouseY < (height/3)+height/3){
				song.songStop(1)
			} else if(mouseY > (height/3)+height/3){
				song.songStop(2)
			} 
		}

	} else if(mouseButton === RIGHT){
		mapper()
		siteNum = round(random(allSites.length-1))
		siteNames = allSites[siteNum]
		for(i=0;i<userSites.length;i++){
			siteNames.push(userSites[i])
		}
		for (i = siteNames.length - 1; i > 0; i--) {//shuffle it up dude
	    	let j = Math.floor(Math.random() * (i + 1)); 
	    	[siteNames[i], siteNames[j]] = [siteNames[j], siteNames[i]];
		}
		song.pattern(0,numDots)
		song.pattern(1,numDots)
		listVoice.samplePause(1)
		listVoice.samplePause(0)
		numChanges++

	}

	if(numResets > 3){
		song.rates(0,1)
	}

	if(numResets > 6){
		song.rates(1,1)
	}

	if(numResets > 7){
		song.rates(0,0)
		song.rates(1,0)
		numResets = 0
	}
}

function mouseReleased(){
	if(mouseButton === LEFT){
		listVoice.fracStop(0)
		listVoice.fracStop(1)
	}
}

function mouseDragged(){
	let x1 = mouseX
    let y1 = mouseY
    let prevY,prevX
    let currY,currX
       
	for(i=0;i<dots.length;i++){
	    let d = dist(x1,y1,dots[i].x,dots[i].y)
	    if(d < 50){
	    	prevX = dots[i].x
	    	prevY = dots[i].y
	        dots[i].x = x1
	        dots[i].y = y1
	        currX = x1
	        currY = y1
	    }
	}
	
	if(currY+currX > prevX+prevY){
		song.alter(round(random(numDots)),random([0,1]))
    } else if(currY+currX < prevX+prevY){
		song.alter(round(random(numDots)),random([0,1]))
	}
}

function colours(){
	let newCols = [round(random(255)),round(random(255)),round(random(255)),255]
    for(i=0;i<round(numDots/3);i++){
    	cols[i] = newCols
    }

    for (i = cols.length - 1; i > 0; i--) {//shuffle it up dude
	    	let j = Math.floor(Math.random() * (i + 1));
	    	[cols[i], cols[j]] = [cols[j], cols[i]];
	 }
}

function mapper(){
	dots = []
	let cx = 50
	for(i=0;i<numDots;i++){       
		cols[i] = [0,0,0,255]
 		let cy = random(50,height-50) 
        dots[i] = createVector(cx,cy)
        cx += 50            
    }
}

