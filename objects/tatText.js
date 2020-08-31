let scatPurpCents = [
	"../../words/scatCent1.txt",
	"../../words/scatCent2.txt",
	"../../words/scatCent3.txt",
	"../../words/scatCent4.txt",
	"../../words/scatCent5.txt",
	"../../words/scatCent6.txt",
	"../../words/scatCent7.txt",
	"../../words/scatCent8.txt",
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

let cartGathCents = [
	"../../words/gathCent1.txt",
	"../../words/gathCent2.txt",
	"../../words/gathCent3.txt",
	"../../words/gathCent4.txt",
	"..../words/gathCent5.txt",
	"../../words/gathCent6.txt",
	"../../words/gathCent7.txt",
	"../../words/gathCent8.txt",
	"../../words/gathCent9.txt",
	"../../words/cartCent1.txt",
	"../../words/cartCent2.txt",
	"../../words/cartCent3.txt",
	"../../words/cartCent4.txt",
	"../../words/cartCent5.txt",
	"../../words/cartCent6.txt",
	"../../words/cartCent7.txt",
	"../../words/cartCent8.txt"
]

let scatPurpFrags = [
	"../../words/scatFrag1.txt",
	"../../words/scatFrag2.txt",
	"../../words/scatFrag3.txt",
	"../../words/scatFrag4.txt",
	"../../words/scatFrag5.txt",
	"../../words/purpFrag1.txt",
	"../../words/purpFrag2.txt",
	"../../words/purpFrag3.txt",
	"../../words/purpFrag4.txt",
	"../../words/purpFrag5.txt",
	"../../words/purpFrag6.txt"
]

let cartGathFrags = [
	"../../words/gathFrag1.txt",
	"../../words/gathFrag2.txt",
	"../../words/gathFrag3.txt",
	"../../words/gathFrag4.txt",
	"../../words/gathFrag5.txt",
	"../../words/gathFrag6.txt",
	"../../words/gathFrag7.txt",
	"../../words/cartFrag1.txt",
	"../../words/cartFrag2.txt",
	"../../words/cartFrag3.txt",
	"../../words/cartFrag4.txt"
]


function pages(){

	this.centChoice = function(type){ // delete above and use this when content is ready
		if(type === 0){
			let q = scatPurpCents.length-1
			let r = round(random(q))
			return(scatPurpCents[r])
		} else if(type === 1){
			let q = cartGathCents.length-1
			let r = round(random(q))
			return(cartGathCents[r])
		}
	}

	this.fragChoice = function(type){ // delete above and use this when content is ready
		if(type === 0){
			let q = scatPurpFrags.length-1
			let r = round(random(q))
			return(scatPurpFrags[r])
		} else if(type === 1){
			let q = cartGathFrags.length-1
			let r = round(random(q))
			return(cartGathFrags[r])
		}
	}
}	
