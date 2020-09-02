
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

let allSiteNames = []

let maps = [
	"/pics/maps/map1.jpg",
	"/pics/maps/map2.jpg",
	"/pics/maps/map3.jpg",
	"/pics/maps/map4.jpg"
]
let backMap

function preload(){
	let picChoice = round(random(maps.length-1))
	backMap = loadImage(maps[picChoice])
}


function setup(){
	cnv = createCanvas(windowWidth-20,windowHeight-20)
	backMap.resize(width,0)
	image(backMap,0,0)
		
	let textWidth = width*0.7
	let textHeight = height/8

	marginL = (width/2)-(textWidth/2)
	marginT = (height/2) - 100

	let titleL = (width/2)-(width/3)
	let titleT = height/8

	let fieldL = (width/2) - (width/5)/2
	let fieldT = height/2 + 75

	let butL = (width/2) - 50
	let butT = height*0.75

	title = createElement("h1", "Oneiric Cartography")
	title.class("textTitle")
	title.position(titleL, titleT)

    caption = createDiv("A collection of place names from dreams and memory requested by the engravers of maps, celestial charts and topographies")
    caption.class("caption")
	caption.position(marginL,marginT)
	caption.size(textWidth,textHeight)	

	field = createInput()
	field.class("siteInput")
	field.position(fieldL, fieldT)

	but = createButton("log")
	but.class("siteBut")
	but.size(100)
	but.position(butL, butT)
	but.mousePressed(nameLog)
};

function nameLog(){
	let newName = field.value()
	allSiteNames.push(newName)
	sessionStorage.setItem("newSiteNames", JSON.stringify(allSiteNames))
	field.value("")
}