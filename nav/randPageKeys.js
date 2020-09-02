let scatter = [
	"/pages/scatter/addOrg.html",
	"/pages/scatter/radio.html",
    "/pages/scatter/textOnly.html",
    "/pages/scatter/textScroll.html",
    "/pages/scatter/picHoles.html",
    "/pages/scatter/picTransAuto.html"
];

let gather = [
	"/pages/gather/perlinFlowColours.html",
    "/pages/gather/picTransClick.html",
    "/pages/gather/starsDraw.html",
    "/pages/gather/textOnly.html",
    "/pages/gather/textHighlight.html",
    "/pages/gather/textHoverMove.html",
];

let repurpose = [
    "/pages/repurpose/starsMove.html",
    "/pages/repurpose/textOnly.html",
    "/pages/repurpose/textTypingPic.html",
    "/pages/repurpose/textTypingSarcasm.html",
    "/pages/repurpose/textRewrite.html", 
    "/pages/repurpose/textHoverMove.html",
    "/pages/repurpose/picTransAuto.html"
];

let cartography = [
	"/pages/cartography/addSites.html",
	"/pages/cartography/addLinden.html",
	"/pages/cartography/stars3DName.html",
    "/pages/cartography/textOnly.html",
    "/pages/cartography/textHoverMove.html",
    "/pages/cartography/mapWord.html",
	"/pages/cartography/textScroll.html"
];

let scatGath = [//ga previous scat, VOICE (sung) samples
	"/pages/scatMusGathVis/picBlendFrac.html", 
	"/pages/scatMusGathVis/picBlendSungFrac.html",
    "/pages/scatMusGathVis/picTransClickEQ.html", //DRAG AND CHANGE PICS
    "/pages/scatMusGathVis/picTransClickSamples.html",  // SAME AS ABOVE
    "/pages/scatMusGathVis/stars3DSamples.html",
    "/pages/scatMusGathVis/textHighlightFrac.html",
    "/pages/scatMusGathVis/textHoverSamples.html"
]

let gathPurp = [ //pu previous gath, ORGANUM/PARALLEL
    "/pages/gathMusPurpVis/starsDrawParallel.html",
    "/pages/gathMusPurpVis/stars3DOrbit.html",
    "/pages/gathMusPurpVis/starsMoveOrganum.html",
    "/pages/gathMusPurpVis/picTransAutoOrganum.html",
    "/pages/gathMusPurpVis/picTransAutoParallel.html",
    "/pages/gathMusPurpVis/textTypingParallel.html"
]

let purpCart = [//ca previous purp, MUSIC SAMPLES
	"/pages/purpMusCartVis/picBlendFrac.html",
    "/pages/purpMusCartVis/textTypingSamples.html",
    "/pages/purpMusCartVis/stars3DSamples.html",
	"/pages/purpMusCartVis/picTransClickSamples.html",
	"/pages/purpMusCartVis/mapWordSong.html",
]
	
let cartScat= [//sc previous cart, LINDEN (strings either chords or heterophonic)
	"/pages/cartMusScatVis/stars3DSeq.html",
	"/pages/cartMusScatVis/starsMoveSeq.html",
    "/pages/cartMusScatVis/textHighlightStrings.html",
	"/pages/cartMusScatVis/textScrollPluck.html",
    "/pages/cartMusScatVis/picTransAutoPluck.html",
    "/pages/cartMusScatVis/picBlendStrings.html",
]

let lacunae = [ // zines, pics, scans of plans etc
	"/pages/lacunae/lacZines.html"
];

let tatters = [ //recombinati	"tatters/mapWordSongList.html",//TODO (mapwordsong with spoken word lists)
    "/pages/tatters/picBlendOrganumFrac.html", // organum and voices/singing  CARTGATH
    "/pages/tatters/stars3DOrganumFrac.html", //samples/voices and organum CARTGATH
    "/pages/tatters/perlinDronePluck.html", //cart from gath (dron) CARTGATH
    "/pages/tatters/textHighlightParallelFrac.html", //with frac sungs voclas CARTHGATH
    "/pages/tatters/starsMovePluckFrac.html"
]

let messages = [
	"a few steps to your left",
	"under the stairs, behind the coats",
	"beneath the pile of dusty oddments",
	"a little further to your right",
	"right around the next corner",
	"something you haven't seen yet",
	"take another turn around the room",
	"find again that room of dusty light",
	"you might have been here before",
	"sometimes these rooms can look very familiar",
	"from cellar to attic",
	"If we were the architects of an oneiric house...",
]

let hoverContent = [
	"going somewhere?",
	"onwards",
	"another path",
	"doorway to doorway",
	"entrances slowly reveal themselves",
	"room upon room",
	"empty time empty space",
	"other voices, other rooms",
	"still silence and dust"
]
let hoverQ = [
	"is there a beneath?",
	"need more light?",
	"which floorboard?",
	"how far?",
	"draw the curtains?",
	"how many doorways?",
	"through or around?",
	"vertical or horizontal?",
	"daydream or nightdream?",
	"complicit or obstructive?",
	"infinite or circular?"
]

let modalities = [
	[0,2,4,5,7,9,11,12],
	[0,2,3,5,7,9,10,12],
	[0,1,3,5,7,8,10,12],
	[0,2,4,6,7,9,11,12],
	[0,2,4,5,7,9,10,12],
	[0,2,3,5,7,9,10,12],
	[0,1,3,5,6,8,10,12],
]

let metamodalities = [ //melodic minor modes
	[0,2,3,5,7,9,11,12],
	[0,1,3,5,7,9,10,12],
	[0,2,4,6,8,9,11,12],
	[0,2,4,6,7,9,10,12],
	[0,2,4,5,7,8,10,12],
	[0,2,3,5,6,8,10,12],
	[0,1,3,4,6,8,10,12],
]

let currModSet
let mel = [7]

let scatCount=0,gathCount=0,purpCount=0,cartCount=0,miscCount=0,lacCount=0,tatCount=0
let allCounts = []
let passKey = ["dream","firmament","fundament","chaos", "yggdrasil", "hel", "bifrost"]//available passwords

let allGroups = [scatter,gather,repurpose,cartography,lacunae]

let userInput // inputted password by user
let which //which password has been prompted, opens next zone, saved in session under "passKey"
let zoneCount = 0

let modaller
let stateState = false
let mod 
let par 
let list
let port1,port2



window.onload = function(){	

	mel = JSON.parse(sessionStorage.getItem("melody"))

	let message = messages[Math.floor(Math.random()*messages.length)]

	let lastPage = sessionStorage.getItem("footsteps")

	allCounts[0] = sessionStorage.getItem("scatter")
	allCounts[1] = sessionStorage.getItem("gather")
	allCounts[2] = sessionStorage.getItem("repurpose")
	allCounts[3] = sessionStorage.getItem("cartography")
	allCounts[4] = sessionStorage.getItem("lacunae")
	allCounts[5] = sessionStorage.getItem("miscera")
	allCounts[6] = sessionStorage.getItem("tatters")

	let newZone = allCounts.includes(null)

	sessionStorage.setItem("placesBeen", JSON.stringify(allCounts))//session storage of above data

	if(newZone === true){ // if all places not visited then mode sets are major modes
		currModSet = modalities
	} else if(newZone === false){ // if all places visited then mode sets are melodic minor mode
		currModSet = metamodalities
	};

	modaller = select("#mymodal");

	mod  = createDiv("")
	mod.class("modal-content")
	modaller.child(mod)

	par = createP(message)
	par.class("modPar")
	mod.child(par)

	let li1 = createElement("li", "scatter")
	let li2 = createElement("li", "gather")
	let li3 = createElement("li", "repurpose")
	let li4 = createElement("li", "cartography")
	let li5 = createElement("li", "lacunae")
	let li6 = createElement("li", "miscera")
	let li7 = createElement("li", "tatters")

	li1.class("list")
	li2.class("list")
	li3.class("list")
	li4.class("list")
	li5.class("list")
	li6.class("list")
	li7.class("list")

	let listStyle = selectAll(".list")

	li1.id("link1")
	li2.id("link2")
	li3.id("link3")
	li4.id("link4")
	li5.id("link5")
	li6.id("link6")
	li7.id("link7")

	par.child(li1)
	par.child(li2)
	par.child(li3)
	par.child(li4)
	par.child(li5)
	par.child(li6)
	par.child(li7)

	li1.mousePressed(randLink)
	li2.mousePressed(randLink)
	li3.mousePressed(randLink)
	li4.mousePressed(randLink)
	li5.mousePressed(randLink)
	li6.mousePressed(randLink)
	li7.mousePressed(randLink)

	if(lastPage === "scatter"){// scatter / gather
		li1.style("display", "block")
		li2.style("display", "block")
		li3.style("display", "none")
		li4.style("display", "none")
		li5.style("display", "none")
		li6.style("display", "none")
		li7.style("display", "none")
	} else if (lastPage === "gather"){ //gather / repurpose
		li1.style("display", "none")
		li2.style("display", "block")
		li3.style("display", "block")
		li4.style("display", "none")
		li5.style("display", "none")
		li6.style("display", "none")
		li7.style("display", "none")
	} else if(lastPage === "repurpose"){ // repurpose / cartography
		li1.style("display", "none")
		li2.style("display", "none")
		li3.style("display", "block")
		li4.style("display", "block")
		li5.style("display", "none")
		li6.style("display", "none")
		li7.style("display", "none")
	} else if(lastPage === "cartography"){ // cartography / scatter / lacunae
		li1.style("display", "block")
		li2.style("display", "none")
		li3.style("display", "none")
		li4.style("display", "block")
		li5.style("display", "block")
		li6.style("display", "none")
		li7.style("display", "none")
	} else if(lastPage === "lacunae"){ // lacunae / miscera / tatters
		li1.style("display", "none")
		li2.style("display", "none")
		li3.style("display", "none")
		li4.style("display", "none")
		li5.style("display", "block")
		li6.style("display", "block")
		li7.style("display", "block")
	} else if(lastPage === "miscera"){ // miscera / tatters 
		li1.style("display", "none")
		li2.style("display", "none")
		li3.style("display", "none")
		li4.style("display", "none")
		li5.style("display", "none")
		li6.style("display", "block")
		li7.style("display", "block")
	} else if(lastPage === "tatters"){ //scatter / gather / tatters
		li1.style("display", "block")
		li2.style("display", "none")
		li3.style("display", "none")
		li4.style("display", "none")
		li5.style("display", "none")
		li6.style("display", "none")
		li7.style("display", "block")
	}

	let hov = select("#navOn")
	hov.position(random(window.innerWidth-100),random(window.innerHeight-100))
	let floatChoice = round(random())
	if(floatChoice === 0){
		let hovCon = hoverContent[Math.floor(Math.random()*hoverContent.length)]
		let hovWords = createSpan(hovCon)
		hovWords.class("floatWords")
		hov.child(hovWords)
		let but = createButton("pathways")
		but.class("floatbutt")
		hov.child(but)
		but.mousePressed(modOpen)
	} else if (floatChoice === 1){
		let Q = hoverQ[Math.floor(Math.random()*hoverQ.length)]
		let hovWords = createSpan(Q)
		hovWords.class("floatWords")
		hov.child(hovWords)
		let form = createDiv("")	
		form.class("formIn")
		let passEnter = createInput("")
		let button = createButton("submit")
		passEnter.class("floatIns")
		button.class("floatbutt")
		button.mousePressed(modOpen)
		form.child(button)
		form.child(passEnter)
		hov.child(form)	
	}

}

function modOpen(){
	modaller.style("display", "block")
}

window.onclick = function(event){
	if(event.target === modaller){
		modaller.style("display","none")
	}
}

function randLink(){//navigation engine, logs data about current activity
	console.log(this.id())
	if(this.id() == "link1"){
		scatCount++
		mel.push(0)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from last choice
		sessionStorage.setItem("prevPlace", tempLast)//saving for next time
		if(tempLast === "scatter" || tempLast === "tatters" || tempLast === "startPage"){
			let chx = Math.round(Math.random()*(scatter.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "scatter")//saving choice
			sessionStorage.setItem("param", "0")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[0]))
			sessionStorage.setItem("scatter", scatCount)
			window.location.href = scatter[chx];
		} else if (tempLast === "cartography"){
			let chx = Math.round(Math.random()*(cartScat.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "scatter")//saving choice
			sessionStorage.setItem("param", "0")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[0]))
			sessionStorage.setItem("scatter", scatCount)
			window.location.href = cartScat[chx];
		}
		
	} else if(this.id() == "link2"){
		gathCount++
		mel.push(1)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from previous load
		sessionStorage.setItem("prevPlace", tempLast)//setting previous

		if(tempLast === "gather" || tempLast === "startPage"){
			let chx = Math.round(Math.random()*(gather.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "gather")
			sessionStorage.setItem("param", "1")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[1]))
			sessionStorage.setItem("gather", gathCount)
			window.location.href = gather[chx];
		} else if (tempLast === "scatter"){
			let chx = Math.round(Math.random()*(scatGath.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "gather")
			sessionStorage.setItem("param", "1")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[1]))
			sessionStorage.setItem("gather", gathCount)
			window.location.href = scatGath[chx];
		}
		
	} else if(this.id() == "link3"){
		purpCount++
		mel.push(2)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from previous load
		sessionStorage.setItem("prevPlace", tempLast)//setting previous 

		if(tempLast === "repurpose" || tempLast === "startPage"){
			let chx = Math.round(Math.random()*(repurpose.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "repurpose")
			sessionStorage.setItem("param", "2")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[2]))
			sessionStorage.setItem("repurpose", purpCount)
			window.location.href = repurpose[chx];
		} else if(tempLast === "gather"){
			let chx = Math.round(Math.random()*(gathPurp.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "repurpose")
			sessionStorage.setItem("param", "2")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[2]))
			sessionStorage.setItem("repurpose", purpCount)
			window.location.href = gathPurp[chx];
		}
		
	} else if(this.id() == "link4"){
		let loopCount = parseInt(sessionStorage.getItem("numLoops"))
		loopCount += 1
		cartCount++
		mel.push(3)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from previous load
		sessionStorage.setItem("prevPlace", tempLast)//setting previous 
		sessionStorage.setItem("numLoops", loopCount)//adds another loop to L system

		if(tempLast === "cartography" || tempLast === "startPage"){
			let chx = Math.round(Math.random()*(cartography.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "cartography")
			sessionStorage.setItem("param", "0")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[3]))
			sessionStorage.setItem("cartography", cartCount)
			window.location.href = cartography[chx];
		} else if (tempLast === "repurpose"){
			let chx = Math.round(Math.random()*(purpCart.length-1))
			sessionStorage.setItem("melody",JSON.stringify(mel))
			sessionStorage.setItem("footsteps", "cartography")
			sessionStorage.setItem("param", "0")
			sessionStorage.setItem("mode", JSON.stringify(currModSet[3]))
			sessionStorage.setItem("cartography", cartCount)
			window.location.href = purpCart[chx];
		}
	} else if(this.id() == "link5"){
		lacCount++
		mel.push(4)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from previous load
		sessionStorage.setItem("prevPlace", tempLast)//setting previous 

		let chx = Math.round(Math.random()*(lacunae.length-1))
		sessionStorage.setItem("melody",JSON.stringify(mel))
		sessionStorage.setItem("footsteps", "lacunae")
		sessionStorage.setItem("param", "1")
		sessionStorage.setItem("mode", JSON.stringify(currModSet[4]))
		sessionStorage.setItem("lacunae", lacCount)
		window.location.href = "/pages/lacunae/lacZines.html";
		
	} else if(this.id() == "link6"){
		miscCount++
		mel.push(5)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from previous load
		sessionStorage.setItem("prevPlace", tempLast)//setting previous 
		sessionStorage.setItem("melody",JSON.stringify(mel))
		sessionStorage.setItem("footsteps", "miscera")
		sessionStorage.setItem("param", "2")
		sessionStorage.setItem("mode", JSON.stringify(currModSet[5]))
		sessionStorage.setItem("miscera", miscCount)
		window.location.href = "/pages/miscera/miscera.html";

	} else if(this.id() == "link7"){
		tatCount++
		let p = round(random(2))
		p = p.toString()	
		mel.push(6)
		let tempLast = sessionStorage.getItem("footsteps")//getting footstep from previous load
		sessionStorage.setItem("prevPlace", tempLast)//setting previous 
		sessionStorage.setItem("melody",JSON.stringify(mel))
		sessionStorage.setItem("footsteps", "tatters")
		sessionStorage.setItem("param", p)
		sessionStorage.setItem("mode", JSON.stringify(currModSet[6]))
		sessionStorage.setItem("tatters", tatCount)	
		let chx = Math.round(Math.random()*(tatters.length-1))
		window.location.href = tatters[chx];
	}
}