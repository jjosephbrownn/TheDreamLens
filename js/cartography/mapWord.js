//right click reset chooses new sequence
//left click drag alters current sequence a bit
//adding places lengthens sequence
//well cool if circle size is randomised in draw
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

let loadStep
let loadImg
let loadText
let pChoice
let photo1
let photo2

let song

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
let mapx
let mapy

function preload(){
	let pChoice = new piccer()
	let pic1 = pChoice.mapPic()
	photo1 = loadImage(pic1);
	mapFont = loadFont("/fonts/PfefferMediaeval.otf")
}

function setup() {
 	createCanvas(windowWidth-20, windowHeight-20);

 	userSites = JSON.parse(sessionStorage.getItem("newSiteNames"))
 	let td = select("#loader")
 	td.class("loaded")

 	let fonts = ["Centaur", mapFont]
 	typ = fonts[round(random(fonts.length-1))]

 	imageMode(CENTER)
 	photo1.resize(width*2,0)
 	mapx = 0
 	mapy = random(-height*0.25,0)

 	let cy = random(50,height-50) 
	let cx = random(50,width-50) 
    dots[0] = createVector(cx,cy) 

	setInterval(colours,2000)

	siteNum = round(random(allSites.length-1))
	siteNames = allSites[siteNum]
	
	if(userSites !== null){
		for(i=0;i<userSites.length;i++){
			siteNames.push(userSites[i])
		}
	}else {
 		return null
 	}

	for (i = siteNames.length - 1; i > 0; i--) {//shuffle it up dude
    	let j = Math.floor(Math.random() * (i + 1)); 
    	[siteNames[i], siteNames[j]] = [siteNames[j], siteNames[i]];
	}

}

function draw(){
	stroke(1)
    strokeWeight(1)  
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
    	stroke(1)
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
    	stroke(1)
    	strokeWeight(1)
     	text(siteNames[m],dots[m].x+25,dots[m].y-25)
    } 
    
}

function mousePressed(){
	if(mouseButton === LEFT){

		dots[numDots] = createVector(mouseX,mouseY)
		numDots++
		cols.push([0,0,0,255])
		if(numDots === 15){
			numDots = 1
			numChanges = 0
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
		numChanges++
	}
}

function mouseDragged(){
	let x1 = mouseX
    let y1 = mouseY
          
	for(i=0;i<dots.length;i++){
	    let d = dist(x1,y1,dots[i].x,dots[i].y)
	    if(d < 50){
	        dots[i].x = x1
	        dots[i].y = y1
	    }
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
	cx = 50
	for(i=0;i<numDots;i++){       
		cols[i] = [0,0,0,255]
 		let cy = random(50,height-50) 
        dots[i] = createVector(cx,cy)
        cx += 50            
    }
}

