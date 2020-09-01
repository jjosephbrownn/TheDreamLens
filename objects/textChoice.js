let scatCents = [
	"../../words/scatCent1.txt",
	"../../words/scatCent2.txt",
	"../../words/scatCent3.txt",
	"../../words/scatCent4.txt",
	"../../words/scatCent5.txt",
	"../../words/scatCent7.txt",
	"../../words/scatCent8.txt"
]

let gathCents = [
	"../../words/gathCent1.txt",
	"../../words/gathCent2.txt",
	"../../words/gathCent3.txt",
	"../../words/gathCent4.txt",
	"../../words/gathCent5.txt",
	"../../words/gathCent6.txt",
	"../../words/gathCent7.txt",
	"../../words/gathCent8.txt",
	"../../words/gathCent9.txt"
]

let cartCents = [
	"../../words/cartCent1.txt",
	"../../words/cartCent2.txt",
	"../../words/cartCent3.txt",
	"../../words/cartCent4.txt",
	"../../words/cartCent5.txt",
	"../../words/cartCent6.txt",
	"../../words/cartCent7.txt",
	"../../words/cartCent8.txt"
]

let purpCents = [
	"../../words/purpCent1.txt",
	"../../words/purpCent2.txt",
	"../../words/purpCent3.txt",
	"../../words/purpCent4.txt",
	"../../words/purpCent5.txt",
	"../../words/purpCent6.txt",
	"../../words/purpCent7.txt",
	"../../words/purpCent8.txt",
	"../../words/purpCent9.txt",
	"../../words/purpCent10.txt"
]

let scatFrags = [
	"../../words/scatFrag1.txt",
	"../../words/scatFrag2.txt",
	"../../words/scatFrag3.txt",
	"../../words/scatFrag4.txt",
	"../../words/scatFrag5.txt"
]
let gathFrags = [
	"../../words/gathFrag1.txt",
	"../../words/gathFrag2.txt",
	"../../words/gathFrag3.txt",
	"../../words/gathFrag4.txt",
	"../../words/gathFrag5.txt",
	"../../words/gathFrag6.txt",
	"../../words/gathFrag7.txt"
]

let cartFrags = [
	"../../words/cartFrag1.txt",
	"../../words/cartFrag2.txt",
	"../../words/cartFrag3.txt",
	"../../words/cartFrag4.txt"
]

let purpFrags = [
	"../../words/purpFrag1.txt",
	"../../words/purpFrag2.txt",
	"../../words/purpFrag3.txt",
	"../../words/purpFrag4.txt",
	"../../words/purpFrag5.txt",
	"../../words/purpFrag6.txt"
]

let cents = [scatCents,gathCents,cartCents,purpCents]
let frags = [scatFrags,gathFrags,cartFrags,purpFrags]

function pages(){

	let print = sessionStorage.getItem("footsteps")

	this.centChoice = function(){ // delete above and use this when content is ready
		if(print === "scatter"){
			let q = scatCents.length-1
			let r = round(random(q))
			return(scatCents[r])
		} else if(print === "gather"){
			let q = gathCents.length-1
			let r = round(random(q))
			return(gathCents[r])
		} else if(print === "cartography"){
			let q = cartCents.length-1
			let r = round(random(q))
			return(cartCents[r])
		} else if(print === "repurpose"){
			let q = purpCents.length-1
			let r = round(random(q))
			return(purpCents[r])
		} else if(print === "miscera" || print === "tatters" || print === "lacunae"){
			let q = cents.length-1
			let r = round(random(q))
			let d = cents[r]
			let misc = d[round(random(d.length-1))]
			return(misc)
		} else {//if no footsteps
			return(scatCents[0])
		}
	}

	this.fragChoice = function(){
		if(print === "scatter"){
			let q = scatFrags.length-1
			let r = round(random(q))
			return(scatFrags[r])
		} else if(print === "gather"){
			let q = gathFrags.length-1
			let r = round(random(q))
			return(gathFrags[r])
		} else if(print === "cartography"){
			let q = cartFrags.length-1
			let r = round(random(q))
			return(cartFrags[r])
		} else if(print === "repurpose"){
			let q = purpFrags.length-1
			let r = round(random(q))
			return(purpFrags[r])
		} else if(print === "miscera" || print === "tatters" || print === "lacunae"){
			let q = frags.length-1
			let r = round(random(q))
			let d = frags[r]
			let misc = d[round(random(d.length-1))]
			return(misc)
		} else {//if no footsteps
			return(scatFrags[0])
		}
	}
}	