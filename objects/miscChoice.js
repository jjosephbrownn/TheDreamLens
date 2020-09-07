let misc = [
	"/commentary/introFinal.txt",
	"/commentary/scatter.txt",
	"/commentary/gather.txt",
	"/commentary/repurpose.txt",
	"/commentary/cartography.txt",
	"/commentary/tatters.txt",
	"/commentary/lacunae.txt",
	"/commentary/miscera.txt"
]

function commentary(){

	this.miscChoice = function(src){ // delete above and use this when content is ready
		if(src === 0){
			return(misc[src])
		}if(src === 1){
			return(misc[src])
		}
	}

	
}	