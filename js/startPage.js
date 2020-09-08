let marginX,marginY
let title
let typ
let options = ["scatter","gather","repurpose","cartography"]

let allPages = [
    "/pages/scatter/addOrg.html",
    "/pages/scatter/radio.html",
    "/pages/scatter/textOnly.html",
    "/pages/scatter/textScroll.html",
    "/pages/scatter/picHoles.html",
    "/pages/gather/perlinFlowColours.html",
    "/pages/gather/starsDraw.html",
    "/pages/gather/textOnly.html",
    "/pages/gather/textHighlight.html",
    "/pages/gather/textHoverMove.html",
    "/pages/repurpose/starsMove.html",
    "/pages/repurpose/textOnly.html",
    "/pages/repurpose/textTypingSarcasm.html",
    "/pages/repurpose/textRewrite.html", 
    "/pages/repurpose/picTransClick.html",
    "/pages/cartography/addSites.html",
    "/pages/cartography/addLinden.html",
    "/pages/cartography/stars3DName.html",
    "/pages/cartography/textOnly.html",
    "/pages/cartography/mapWord.html"
]

function preload(){
    typ = loadFont("/fonts/PfefferMediaeval.otf")
}

function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight-20)
	background(255);

     let look = createDiv("The Dream Lens")
     look.class("startText")
     look.style("font-family", typ)
     look.position((width/2)-((width*0.7)/2),(height/2)-(height/5))

     let by = createDiv("by")
     by.class("startSub")
     by.style("font-family", typ)
     by.position((width/2)-((width*0.7)/2),height*0.5)

     let sub = createDiv("Hendra Wednesday and Autumn Andersen")
     sub.class("startSub")
     sub.style("font-family", typ)
     sub.position((width/2)-((width*0.7)/2),height*0.65)

     sessionStorage.setItem("numLoops", "4")
};

function draw(){
	let stat = mouseX + mouseY
	let move = pmouseX + pmouseY
	let diff = stat - move
	if(diff > 50 || diff < -50){
		starter()
	}
}

function starter(){
	let ind = Math.round(Math.random()*(allPages.length-1))
     let next = Math.round(Math.random()*(options.length-1))
     window.sessionStorage.setItem("prevPlace", "startPage")
	window.sessionStorage.setItem("footsteps", options[next].toString())
     window.sessionStorage.setItem("melody", JSON.stringify([round(random(0,6)),round(random(0,6)),round(random(0,6))]))
     window.sessionStorage.setItem("mode", JSON.stringify([0,2,4,5,7,9,11,12]))
	window.location.href = allPages[ind];
}


