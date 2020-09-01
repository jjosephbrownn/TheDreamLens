
let quotes = [
	"/words/quotes/q1.txt",
	"/words/quotes/q2.txt",
	"/words/quotes/q3.txt",
	"/words/quotes/q4.txt",
	"/words/quotes/q5.txt",
	"/words/quotes/q6.txt",
	"/words/quotes/q7.txt",
	"/words/quotes/q8.txt",
	"/words/quotes/q9.txt",
	"/words/quotes/q10.txt",
	"/words/quotes/q11.txt",
	"/words/quotes/q12.txt",
	"/words/quotes/q13.txt"
]

let cartoons = [
	"/pics/cartoons/toon1.jpg",
	"/pics/cartoons/toon2.jpg",
	"/pics/cartoons/toon3.jpg",
	"/pics/cartoons/toon4.jpg",
	"/pics/cartoons/toon5.jpg",
	"/pics/cartoons/toon6.jpg",
	"/pics/cartoons/toon7.jpg",
	"/pics/cartoons/toon8.jpg",
	"/pics/cartoons/toon9.jpg"
]

let instructions = [ // ALSO PICS!
	"/pics/instructions/inst1.jpg",
	"/pics/instructions/inst2.jpg",
	"/pics/instructions/inst3.jpg",
	"/pics/instructions/inst4.jpg",
	"/pics/instructions/inst5.jpg"
]

let maps = [
	"/pics/maps/map3.jpg",
	"/pics/maps/map8.jpg",
	"/pics/maps/map11.jpg"
]

let allThings = [quotes,cartoons,instructions,maps]

function loadChoice(){

	let print = sessionStorage.getItem("footsteps")
	let file1,file2

	this.loader = function(){
		if(print === "scatter"){
			let r = round(random(cartoons.length-1))
			file1 = cartoons[r]
			return(file1)
		} else if(print === "gather"){
			let r = round(random(quotes.length-1))
			file1 = quotes[r]
			return(file1)
		} else if(print === "repurpose"){
			let r = round(random(instructions.length-1))
			file1 = instructions[r]
			return(file1)
		} else if(print === "cartography"){
			let r = round(random(maps.length-1))
			file1 = maps[r]
			return(file1)
		} else if(print === "lacunae" || print === "miscera"){
			let r = round(random(allThings.length-1))
			gr1 = allThings[r]
			file1 = gr1[round(random(gr1.length-1))]
			return(file1)
		}else {
			let r = round(random(cartoons.length-1))
			file1 = cartoons[r]
			return(file1)
		}
	}

	
}
	
